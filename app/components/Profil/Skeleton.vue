<template>
    <div
        class="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white dark:bg-slate-300 border border-slate-100 shadow-sm animate-pulse">
        <!-- image -->
        <div class="w-full sm:w-24 h-32 sm:h-36 bg-slate-200 rounded-lg flex-shrink-0"></div>

        <!-- content -->
        <div class="flex flex-col justify-between py-1 flex-grow">
            <div>
                <!-- category -->
                <div class="flex items-center justify-between mb-2">
                    <div class="h-4 w-20 bg-slate-200 rounded-full"></div>
                </div>

                <!-- title -->
                <div class="h-5 w-3/4 bg-slate-200 rounded mb-2"></div>

                <!-- reaction -->
                <div class="h-4 w-40 bg-slate-200 rounded mb-2"></div>

                <!-- stats -->
                <div class="h-4 w-52 bg-slate-200 rounded"></div>
            </div>

            <!-- button -->
            <div class="mt-4 sm:mt-0">
                <div class="h-8 w-32 bg-slate-200 rounded-lg mt-3"></div>
            </div>
        </div>
    </div>
</template>