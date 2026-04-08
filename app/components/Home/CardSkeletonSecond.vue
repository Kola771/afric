<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <article class="animate-pulse">
      <div class="relative aspect-[2/3] w-full h-72 lg:h-96 rounded-lg mb-3
        bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200
        dark:from-slate-700 dark:via-slate-600 dark:to-slate-700
        bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]">
      </div>
      <div class="space-y-2">
        <div class="h-4 w-full rounded-xl bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-8 w-full rounded-xl bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </article>

    <div class="lg:col-span-3 grid grid-cols-1 gap-4">
      <div class="pb-4 border-slate-200 border-b-[1px] flex flex-col gap-2">
        <div class="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-4 w-full rounded bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-5 w-full rounded bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-6 w-full rounded bg-slate-200 dark:bg-slate-700"></div>
        <div class="h-8 lg:h-10 w-full lg:w-1/4 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
      </div>
      <div class="grid grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
        <HomeCardSkeleton v-for="index in 10" :key="index" />
      </div>
    </div>
  </div>
</template>