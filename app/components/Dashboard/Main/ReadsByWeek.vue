<template>
  <div class="lg:col-span-2 bg-white dark:bg-slate-100 rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-base font-semibold text-slate-900">Trafic de lecture</h3>
      <select v-model="selectedWeek" @change="loadData"
        class="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-600 outline-none">
        <option v-for="week in weeks" :key="week.start" :value="week">
          {{ week.label }}
        </option>
      </select>
    </div>

    <!-- Chart -->
    <div class="flex items-end justify-between h-48 gap-2 pt-4">
      <div v-for="(value, index) in chartData" :key="index" class="flex flex-col items-center gap-2 w-full max-w-[24px]">

        <!-- Barre -->
        <div class="relative w-full h-40 bg-slate-100 rounded-t-sm overflow-hidden group">
          <div
            class="absolute bottom-0 left-0 w-full bg-orange-500 rounded-t-sm transition-all duration-300"
            :style="{ height: getHeight(value) }">
          </div>
          <!-- Valeur au-dessus (apparait au hover) -->
          <div
            class="absolute inset-0 text-center text-[10px] font-medium text-slate-800 select-none opacity-100 transition-opacity pointer-events-none">
            {{ formatNumber(value) }}
          </div>
        </div>

        <!-- Label jour -->
        <span class="text-[10px] font-medium text-slate-400 select-none">
          {{ days[index] }}
        </span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const { getReadsByWeek } = useChapterReads()

interface ApiResponse { date: string; total: number }
interface Week { label: string; start: string; end: string }

const props = defineProps<{ month?: number; year?: number }>()

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

const weeks = ref<Week[]>([])
const selectedWeek = ref<Week | null>(null)
const apiData = ref<ApiResponse[]>([])

const getWeeksOfMonth = () => {
  const list: Week[] = []
  const today = new Date()
  const month = props.month ?? today.getMonth()
  const year = props.year ?? today.getFullYear()

  // Premier jour du mois
  let current = new Date(year, month, 1)

  // Si le 1er n’est pas lundi, avancer jusqu’au premier lundi du mois
  const dayOfWeek = (current.getDay() + 6) % 7 // lundi=0
  if (dayOfWeek !== 0) {
    current.setDate(current.getDate() + (7 - dayOfWeek))
  }

  while (current <= today) {
    const monday = new Date(current)
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    // Si la semaine dépasse aujourd’hui, on ajuste la fin
    const endDate = sunday > today ? today : sunday

    list.push({
      label: `${monday.getDate()} - ${endDate.getDate()} ${monday.toLocaleString('fr', { month: 'short' })}`,
      start: monday.toISOString(),
      end: endDate.toISOString(),
    })

    current.setDate(current.getDate() + 7)
  }

  weeks.value = list
  selectedWeek.value = list[list.length - 1] ?? null
}

const chartData = computed(() => {
  const data = Array(7).fill(0)
  apiData.value.forEach(item => {
    const d = new Date(item.date)
    const day = (d.getDay() + 6) % 7 // lundi = 0
    data[day] = item.total
  })
  return data
})

const getHeight = (value: number) => {
  const heightPercent = value > 100 ? 100 : value
  return `${heightPercent}%`
}

const loadData = async () => {
  if (!selectedWeek.value) return
  apiData.value = await getReadsByWeek({
    start: selectedWeek.value.start,
    end: selectedWeek.value.end,
  }) || []
}

onMounted(async () => {
  getWeeksOfMonth()
  await loadData()
})
</script>