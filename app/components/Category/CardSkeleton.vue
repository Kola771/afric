<template>
  <article
    class="bg-white dark:bg-transparent dark:border dark:border-slate-200 p-2 rounded-xl shadow-md flex gap-2 animate-pulse"
  >
    <!-- image -->
    <div
      class="w-24 h-24 flex-shrink-0 rounded-lg
      bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200
      dark:from-slate-700 dark:via-slate-600 dark:to-slate-700
      bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"
    ></div>

    <!-- texte -->
    <div class="flex-1 space-y-2 min-w-0">
      <div class="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700"></div>

      <div class="space-y-1">
        <div class="h-3 w-full rounded bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-3 w-4/6 rounded bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </div>
  </article>
</template>