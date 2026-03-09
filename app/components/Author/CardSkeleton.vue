<template>
  <article
    class="group border border-slate-200 rounded-2xl flex flex-col bg-slate-50 dark:bg-slate-800 w-full mx-auto animate-pulse"
  >
    <div class="flex flex-col p-2 gap-2">
      <!-- avatar/image -->
      <div
        class="w-full h-24 md:h-36 lg:h-48 rounded-lg bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200
               dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"
      ></div>

      <!-- texte -->
      <div class="space-y-2">
        <div class="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700"></div> <!-- nom -->
        <div class="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-700"></div> <!-- pays -->
      </div>

      <!-- stats abonnés / livres -->
      <div class="flex items-center justify-between gap-4 pt-2">
        <div class="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </div>

    <!-- boutons -->
    <div class="p-2 grid grid-cols-1 gap-2">
      <div class="h-8 w-full rounded bg-orange-200 dark:bg-orange-700"></div>
    </div>
  </article>
</template>