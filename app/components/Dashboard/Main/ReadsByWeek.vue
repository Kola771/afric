<template>
  <div
    class="lg:col-span-2 bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-base font-semibold text-slate-900 dark:text-slate-200">
        Trafic de lecture
      </h3>

      <select
        v-model="selectedWeek"
        @change="loadData"
        class="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-600 outline-none"
      >
        <option v-for="week in weeks" :key="week.start" :value="week">
          {{ week.label }}
        </option>
      </select>
    </div>

    <!-- Chart -->
    <div class="flex items-end justify-between h-48 gap-2 pt-4">
      <div
        v-for="(value, index) in chartData"
        :key="index"
        class="flex flex-col items-center gap-2 w-full max-w-[24px]"
      >
        <!-- Barre -->
        <div class="relative w-full h-40 bg-slate-100 rounded-t-sm overflow-hidden">
          <div
            class="absolute bottom-0 left-0 w-full bg-orange-500 rounded-t-sm transition-all duration-300"
            :style="{ height: getHeight(value) }"
          ></div>

          <!-- Valeur -->
          <div
            class="absolute inset-0 flex items-start justify-center text-[10px] font-medium text-slate-800 select-none"
          >
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
import { ref, computed, onMounted } from "vue"

const { getReadsByWeek } = useChapterReads()

interface ApiResponse {
  date: string
  total: number
}

interface Week {
  label: string
  start: string
  end: string
}

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

const weeks = ref<Week[]>([])
const selectedWeek = ref<Week | null>(null)
const apiData = ref<ApiResponse[]>([])


// ✅ Générer les 4 dernières semaines + semaine actuelle
const getLastWeeks = () => {
  const list: Week[] = []
  const today = new Date()

  // Trouver lundi de cette semaine
  const currentMonday = new Date(today)
  const day = (today.getDay() + 6) % 7
  currentMonday.setDate(today.getDate() - day)

  for (let i = 4; i >= 0; i--) {
    const start = new Date(currentMonday)
    start.setDate(currentMonday.getDate() - i * 7)

    const end = new Date(start)
    end.setDate(start.getDate() + 6)

    const isCurrentWeek = i === 0

    list.push({
      label: isCurrentWeek
        ? "Cette semaine"
        : `${start.getDate()} ${start.toLocaleString("fr", { month: "short" })} - ${end.getDate()} ${end.toLocaleString("fr", { month: "short" })}`,
      start: start.toISOString(),
      end: end.toISOString(),
    })
  }

  weeks.value = list
  selectedWeek.value = list[list.length - 1]
}


// ✅ Transformer les données API en 7 jours
const chartData = computed(() => {
  const data = Array(7).fill(0)

  apiData.value.forEach((item) => {
    const d = new Date(item.date)
    const day = (d.getDay() + 6) % 7
    data[day] = item.total
  })

  return data
})


// ✅ Normalisation du graphe (important)
const maxValue = computed(() => Math.max(...chartData.value, 1))

const getHeight = (value: number) => {
  return `${(value / maxValue.value) * 100}%`
}


// ✅ Format des nombres
const formatNumber = (value: number) => {
  return value.toLocaleString()
}


// ✅ Charger les données
const loadData = async () => {
  if (!selectedWeek.value) return

  apiData.value =
    (await getReadsByWeek({
      start: selectedWeek.value.start,
      end: selectedWeek.value.end,
    })) || []
}


onMounted(async () => {
  getLastWeeks()
  await loadData()
})
</script>