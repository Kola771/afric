<template>
    <!-- Skeleton Book Card -->
    <div
        class="flex flex-col justify-between gap-1 rounded shadow-sm bg-white dark:bg-slate-800 border border-slate-100 animate-pulse">

        <div class="flex flex-col">

            <!-- Image -->
            <div class="w-full h-40 md:h-36 lg:h-40 rounded-t bg-slate-300 dark:bg-slate-700"></div>

            <div class="px-2.5 pt-2 flex flex-col gap-2">

                <!-- Title -->
                <div class="h-4 w-3/4 bg-slate-300 dark:bg-slate-700 rounded"></div>

                <!-- Description -->
                <div class="space-y-1">
                    <div class="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div class="h-3 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>

                <!-- Categories -->
                <div class="flex gap-1 flex-wrap mt-1">
                    <div class="h-5 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div class="h-5 w-14 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>

                <!-- Status -->
                <div class="mt-1">
                    <div class="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>

            </div>
        </div>

        <!-- Footer Actions -->
        <div
            class="flex justify-between items-center gap-2 px-2.5 py-2 w-full text-[11px] border-t border-slate-200 dark:border-slate-700">

            <div class="h-3 w-14 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div class="h-3 w-16 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div class="h-3 w-12 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div class="h-3 w-16 bg-slate-300 dark:bg-slate-700 rounded"></div>

        </div>

    </div>
</template>