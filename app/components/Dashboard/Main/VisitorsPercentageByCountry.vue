<template>
  <div class="hidden md:h-72 lg:h-auto md:flex md:flex-col bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl border border-slate-200 shadow-sm p-6">
    <h3 class="text-base font-semibold text-slate-900 dark:text-slate-200 mb-4">Trafic</h3>

    <div class="flex-1 lg:max-h-56">
      <BarChart
        v-if="chartJsData.labels.length"
        :data="chartJsData"
        :options="chartOptions"
        class="h-48"
      />
    </div>

    <!-- <button
      v-if="props.visitorsPercentageByCountry.length > 3"
      @click="showAll = !showAll"
      class="w-full mt-4 py-2 text-xs font-medium text-slate-500 dark:text-slate-300 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
    >
      {{ showAll ? "Voir moins" : "Voir tous les pays" }}
    </button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js"
import { Bar } from "vue-chartjs"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const BarChart = Bar

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
  "#3b82f6", // blue-600
  "#16a34a", // green-600
  "#eab308", // yellow-500
  "#ef4444", // red-500
  "#8b5cf6", // purple-600
  "#ec4899", // pink-500
  "#4f46e5", // indigo-600
  "#f97316", // orange-500
  "#14b8a6", // teal-500
  "#06b6d4"  // cyan-500
]

const displayedCountries = computed(() => {
//   if (showAll.value) return props.visitorsPercentageByCountry
  return props.visitorsPercentageByCountry
//   return props.visitorsPercentageByCountry.slice(0, 3)
})

// Chart.js data
const chartJsData = computed(() => ({
  labels: displayedCountries.value.map(c => c.origin || "Inconnu"),
  datasets: [
    {
      label: "% Lecteurs",
      data: displayedCountries.value.map(c => c.percentage),
      backgroundColor: displayedCountries.value.map((_, i) => colors[i % colors.length]),
      borderRadius: 6
    }
  ]
}))

// Chart.js options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: "index" as const,
      intersect: false
    }
  },
  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      max: 100, // puisque c'est un pourcentage
      ticks: { stepSize: 10 }
    }
  }
}
</script>