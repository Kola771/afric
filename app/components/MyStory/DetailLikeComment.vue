<template>
    <div class="max-w-7xl mx-auto space-y-6 mb-4 px-6 py-12">

        <!-- Page Header -->
        <div class="pt-12 flex flex-col items-start">
            <div
                class="flex flex-col gap-4 md:items-center md:flex-row md:justify-between bg-slate-50 dark:bg-slate-800 border px-3 py-4 lg:p-3 rounded-lg w-full">
                <div class="flex flex-col gap-1 items-start">
                    <button @click="back"
                        class="p-1 border rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <Icon name="mdi:arrow-left" class="w-5 h-5" />
                    </button>
                    <p class="text-[14px] text-slate-500 dark:text-slate-200 max-w-xs">
                        Détails des mentions J’aime et des commentaires pour le livre «<span class="font-medium text-orange-600 dark:text-orange-500">L'amour et la trahison</span>».
                    </p>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row lg:gap-4 lg:justify-between w-full pt-2 lg:pt-4">
                <div class="mt-4 lg:flex-1 lg:mt-0 bg-white lg:bg-slate-100 rounded-lg">
                    <div class="p-2 text-[13px] lg:text-xs flex flex-wrap items-center gap-x-1 gap-y-2.5">
                        <button @click="showLikes"
                            :class="step === 'likes' ? 'bg-slate-50 dark:bg-slate-200 dark:hover:bg-slate-300' : 'bg-white dark:hover:bg-slate-50'"
                            class="ml-1 px-4 py-2 rounded dark:border-slate-400 dark:border flex items-center gap-2 transition-all duration-300">
                            <Icon name="mdi:heart" class="w-4 h-4" />
                            700 J'aime
                        </button>
                        <button @click="showComments"
                            :class="step === 'comments' ? 'bg-slate-50 dark:bg-slate-200 dark:hover:bg-slate-300' : 'bg-white dark:hover:bg-slate-50'"
                            class="ml-1 px-4 py-2 rounded dark:border-slate-400 dark:border flex items-center gap-2 transition-all duration-300">
                            <Icon name="mdi:comment-multiple" class="w-4 h-4" />
                            200 Commentaires
                        </button>
                    </div>

                    <div class="p-4" v-if="step === 'likes'">
                        <h4 class="text-sm font-medium text-slate-900">
                            J'aime
                        </h4>
                        <div
                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 lg:max-h-[450px] overflow-y-auto">
                            <div class="flex gap-4" v-for="index in 24" :key="index">
                                <div
                                    class="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 dark:bg-orange-600 dark:text-white">
                                    A</div>
                                <div>
                                    <div class="flex items-center gap-3">
                                        <div class="flex items-baseline gap-2">
                                            <span
                                                class="text-[13px] font-semibold text-slate-900 dark:text-slate-700">John
                                                Days</span>
                                            <span class="text-xs text-slate-400 dark:text-slate-500">il y a 2h</span>
                                        </div>
                                        <span
                                            class="px-3 py-0.5 rounded-full bg-orange-50 border border-orange-100/50 text-orange-800 text-[10px] font-medium">Lecteur</span>
                                    </div>
                                    <p class="text-xs lg:text-xs text-slate-600 dark:text-slate-700">@j_day</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 flex flex-col md:flex-row md:justify-end">
                            <button
                                class="text-[13px] lg:text-xs bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-4 py-2 lg:py-2.5 rounded-lg duration-300 transition-all">Afficher
                                plus</button>
                        </div>
                    </div>

                    <div class="p-4" v-if="step === 'comments'">
                        <h4 class="text-sm font-medium text-slate-900">
                            Commentaires
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 lg:max-h-[450px] overflow-y-auto">
                            <div class="flex gap-4" v-for="index in 24" :key="index">
                                <div
                                    class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 dark:bg-orange-600 dark:text-white">
                                    A</div>
                                <div>
                                    <div class="flex items-baseline gap-2">
                                        <span
                                            class="text-[13px] font-semibold text-slate-900 dark:text-slate-700">Arnaud</span>
                                        <span class="text-xs text-slate-400 dark:text-slate-500">il y a 5h</span>
                                    </div>
                                    <p class="text-xs text-slate-600 dark:text-slate-700 mt-1">Très intéressant !</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 flex flex-col md:flex-row md:justify-end">
                            <button
                                class="text-[13px] lg:text-xs bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-4 py-2 lg:py-2.5 rounded-lg duration-300 transition-all">Afficher
                                plus</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const step = ref<string>("likes");

const showLikes = () => {
    step.value = "likes";
}

const showComments = () => {
    step.value = "comments";
}

const back = () => {
    window.history.back()
}
</script>