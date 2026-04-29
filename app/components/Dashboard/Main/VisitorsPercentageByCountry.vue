<template>
  <div class="hidden md:h-72 lg:h-auto md:flex md:flex-col bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl border border-slate-200 shadow-sm p-6">
    <h3 class="text-base font-semibold text-slate-900 dark:text-slate-200 mb-4">
      Trafic
    </h3>

    <div class="flex-1 lg:max-h-56">
      <PieChart
        v-if="chartJsData.labels.length"
        :data="chartJsData"
        :options="chartOptions"
        class="h-48"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { Pie } from "vue-chartjs"

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const PieChart = Pie

interface CountryStat {
  origin: string
  percentage: number
  total_visitors: number
}

const props = defineProps<{
  visitorsPercentageByCountry: CountryStat[]
}>()

const colors = [
  "#3b82f6",
  "#16a34a",
  "#eab308",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#4f46e5",
  "#f97316",
  "#14b8a6",
  "#06b6d4"
]

// Données
const displayedCountries = computed(() => {
  return props.visitorsPercentageByCountry
})

// Data Chart.js
const chartJsData = computed(() => ({
  labels: displayedCountries.value.map(c => c.origin || "Inconnu"),
  datasets: [
    {
      label: "% Lecteurs",
      data: displayedCountries.value.map(c => c.percentage),
      backgroundColor: displayedCountries.value.map((_, i) => colors[i % colors.length])
    }
  ]
}))

// Options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return `${context.label}: ${context.raw}%`
        }
      }
    }
  }
}
</script>