<template>
    <div class="bg-white dark:bg-slate-100 rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
        <h3 class="text-base font-semibold text-slate-900 mb-4">Top Pays Lecteurs</h3>
        <div class="flex-1 space-y-4 lg:max-h-56 lg:overflow-y-auto">

            <div v-for="(country, index) in displayedCountries" :key="country.origin" class="space-y-1">

                <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-slate-700">
                        {{ country.origin }}
                    </span>

                    <span class="text-sm font-semibold text-slate-900">
                        {{ country.percentage }}%
                    </span>
                </div>

                <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div class="h-full rounded-full" :class="colors[index % colors.length]" :style="{ width: country.percentage + '%' }"></div>
                </div>

            </div>

        </div>
        <button v-if="visitorsPercentageByCountry.length > 3" @click="showAll = !showAll"
            class="w-full mt-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            {{ showAll ? "Voir moins" : "Voir tous les pays" }}
        </button>
    </div>
</template>
<script setup lang="ts">

interface CountryStat {
    origin: string
    percentage: number
    total_visitors: number
}

const props = defineProps<{
    visitorsPercentageByCountry: CountryStat[]
}>()

const showAll = ref(false)

const colors = [
  "bg-blue-600",
  "bg-green-600",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-600",
  "bg-pink-500",
  "bg-indigo-600",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500"
]

const displayedCountries = computed(() => {
    if (showAll.value) return props.visitorsPercentageByCountry
    return props.visitorsPercentageByCountry.slice(0, 3)
})

</script>