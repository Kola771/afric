<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b pt-8 md:pt-12 pb-12">
        <section
            class="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-100 lg:gap-10 lg:grid lg:grid-cols-3 2xl:grid-cols-4">
            <button @click="back"
                class="lg:hidden mb-2 p-1 border rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Icon name="mdi:arrow-left" class="w-6 h-6" />
            </button>
            <div class="flex flex-col lg:justify-start justify-center items-center gap-2 lg:sticky lg:top-28">
                <div class="group flex flex-col justify-center items-center gap-2 w-full">
                    <img src="/assets/img.jpg"
                        class="w-24 h-24 md:w-36 md:h-36 lg:group-hover:scale-90 hover:duration-300 transition-all lg:w-full lg:h-72 object-cover rounded-full lg:rounded-lg"
                        alt="Image de l'auteur">
                    <div>
                        <h2 class="text-center text-lg font-bold text-slate-900 dark:text-white">Alain Mabanckou</h2>
                        <p class="text-center text-slate-600 text-sm dark:text-slate-300">Originaire : Congo</p>
                    </div>
                    <div
                        class="lg:rounded-lg lg:bg-slate-50 dark:lg:bg-slate-800 lg:p-3 lg:mt-1 lg:flex lg:justify-between lg:items-center gap-2 text-slate-200 dark:text-slate-200 hidden w-full">
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-slate-200">42</span> <span
                                class="text-slate-400">
                                <Icon name="mdi:books" class="w-4 h-4" />
                            </span>
                        </span>
                        <span class="w-px h-3 bg-slate-200"></span>
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-slate-200">12k</span> <span
                                class="text-slate-400">
                                <Icon name="mdi:book-open-page-variant" class="w-4 h-4" />
                            </span>
                        </span>
                        <span class="w-px h-3 bg-slate-200"></span>
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-slate-200">1.1k</span> <span
                                class="text-slate-400">
                                <Icon name="mdi:eye" class="w-4 h-4" />
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="mt-2 lg:mt-0 lg:col-span-2 2xl:col-span-3 2xl:pr-0">
                <div class="grid grid-cols-3 gap-4 text-slate-500 dark:text-slate-200 lg:hidden">
                    <div class="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl text-center">
                        <div class="text-xl font-bold text-slate-900 dark:text-white">5</div>
                        <div class="text-[10px] uppercase tracking-wide font-medium">Histoires</div>
                    </div>
                    <div class="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl text-center">
                        <div class="text-xl font-bold text-slate-900 dark:text-white">98</div>
                        <div class="text-[10px] uppercase tracking-wide font-medium">Chapitres</div>
                    </div>
                    <div class="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl text-center">
                        <div class="text-xl font-bold text-slate-900 dark:text-white">30k</div>
                        <div class="text-[10px] uppercase tracking-wide font-medium">Vues</div>
                    </div>
                </div>
                <div class="mt-4 lg:mt-0 text-sm max-w-none text-slate-600 dark:text-slate-200">
                    <button @click="back"
                        class="hidden lg:flex p-1 border rounded-lg items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <Icon name="mdi:arrow-left" class="w-5 h-5" />
                    </button>
                    <h3 class="font-display text-xl font-bold text-slate-900 dark:text-white mb-1">Bibliographie</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit repellendus, cupiditate
                        velit molestias dolores atque! Minima quia iste ipsum ipsa aliquid. Deserunt reiciendis
                        laboriosam itaque culpa. Ratione, unde. Ut, quibusdam!</p>
                </div>
                <!-- stories List -->
                <div class="border-t border-slate-200 mt-6 pt-6">
                    <h3 class="font-display text-xl font-medium text-slate-900 dark:text-white mb-4">Histoires</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        <nuxt-link v-for="story in stories" :key="story.id" :to="`/books/book-uuid-${story.id}`"
                            class="group flex flex-col rounded-lg bg-white dark:bg-slate-800 border border-slate-100 hover:border-slate-300 transition-all group-hover:scale-105 hover:shadow-sm pb-2">
                            <img :src="story.image"
                                class="w-full h-full lg:h-40 rounded-t-lg object-cover transition-transform duration-500"
                                :alt="story.title">
                            <div class="px-2.5 pb-2 pt-2 flex flex-col gap-1">
                                <p
                                    class="font-medium text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                                    {{ story.title }}
                                </p>
                                <p class="flex items-center gap-3 text-[10px] font-medium text-orange-600">
                                    <span
                                        class="bg-orange-50 border border-orange-100/50 text-orange-600 font-medium animate-fade-in-up px-2 py-1 rounded">Romance</span>
                                    <span class="bg-slate-100 text-slate-500 px-2 py-1 rounded">En cours</span>
                                </p>
                                <p class="text-xs text-slate-500 dark:text-slate-200 flex flex-wrap gap-2">
                                    <span>{{ story.chapters }} chap,</span> <span class="flex items-center gap-1">
                                        <Icon name="mdi:eye" class="w-3 h-3" /> <span>{{ story.views }} vue(s)</span>
                                    </span>
                                </p>
                            </div>

                            <span
                                class="text-slate-500 flex items-center gap-1 justify-end text-xs text-right dark:text-slate-200 px-1 group-hover:translate-x-1 transition-transform">
                                Lire
                                <Icon name="mdi:arrow-right" class="w-3 h-3" />
                            </span>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const back = () => {
    window.history.back();
}
const stories = ref<any[]>([
    {
        id: 1,
        image: "/assets/img1.jpg",
        number: "01",
        title: "Titre de l'histoire",
        views: "4,5k",
        chapters: 12,
        publishedAt: "12 Oct 2023"
    },
    {
        id: 2,
        image: "/assets/img2.jpg",
        number: "02",
        title: "Titre de l'histoire",
        views: "3,2k",
        chapters: 15,
        publishedAt: "19 Oct 2023"
    },
    {
        id: 3,
        image: "/assets/img3.jpg",
        number: "03",
        title: "Titre de l'histoire",
        views: "2,5k",
        chapters: 10,
        publishedAt: "26 Oct 2023"
    },
    {
        id: 4,
        image: "/assets/img4.jpg",
        number: "04",
        title: "Titre de l'histoire",
        views: "2k",
        chapters: 8,
        publishedAt: "26 Oct 2023"
    },
    {
        id: 5,
        image: "/assets/img5.jpg",
        number: "05",
        title: "Titre de l'histoire",
        views: "1,5k",
        chapters: 6,
        publishedAt: "26 Oct 2023"
    }
])
</script>