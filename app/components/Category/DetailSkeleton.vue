<template>
  <div class="rounded-lg w-full animate-pulse">
    <!-- image skeleton -->
    <div class="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] w-full h-72 rounded-lg"></div>

    <!-- texte skeleton -->
    <div class="py-4 space-y-2">
      <!-- titre -->
      <div class="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-700"></div>

      <!-- description -->
      <div class="h-4 w-full rounded bg-slate-200 dark:bg-slate-700"></div>
      <div class="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700"></div>

      <!-- compteur de livres -->
      <div class="h-4 w-1/4 rounded bg-orange-200 dark:bg-orange-700"></div>
    </div>
  </div>
</template>