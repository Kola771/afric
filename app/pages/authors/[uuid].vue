<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b pt-8 md:pt-12 pb-12">
        <section
            class="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-100 lg:gap-10 lg:grid lg:grid-cols-4">
            <button @click="back"
                class="lg:hidden mb-2 p-1 border rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Icon name="mdi:arrow-left" class="w-6 h-6" />
            </button>
            <div class="flex lg:flex-col lg:justify-start justify-center items-center gap-2 lg:sticky lg:top-20 self-start">
                <div class="group flex flex-col lg:justify-center items-center gap-2 w-full">
                    <div class="flex lg:flex-col lg:justify-center items-center gap-2 w-full">
                        <img src="/assets/img.jpg"
                            class="w-16 h-16 md:w-24 md:h-24 lg:group-hover:scale-95 hover:duration-300 transition-all lg:w-full lg:h-72 object-cover rounded-full lg:rounded-lg"
                            alt="Image de l'auteur">
                        <div class="flex flex-col gap-0.5">
                            <div class="flex flex-col">
                                <h2 class="lg:text-center text-lg font-bold text-slate-900 dark:text-white">Alain Mabanckou</h2>
                                <p class="lg:text-center text-slate-600 text-xs lg:text-sm dark:text-slate-300 -mt-1 lg:mt-0">Originaire : Congo</p>
                            </div>
                            <div class="text-[11px] flex flex-wrap items-center gap-2 lg:hidden">
                                <div>
                                    <span class="font-semibold text-slate-900 dark:text-slate-200">3,2k</span>
                                    <span class="text-slate-400"> follower(s)</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-slate-900 dark:text-slate-200">5</span>
                                    <span class="text-slate-400"> histoire(s)</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-slate-900 dark:text-slate-200">98</span>
                                    <span class="text-slate-400"> chapitre(s)</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-slate-900 dark:text-slate-200">30k</span>
                                    <span class="text-slate-400"> vue(s)</span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="lg:rounded-lg lg:bg-slate-50 dark:lg:bg-slate-800 lg:p-3 lg:mt-1 lg:flex lg:justify-between lg:items-center gap-2 text-slate-200 dark:text-slate-200 hidden w-full">
                            <span class="text-xs">
                                <span class="font-semibold text-slate-900 dark:text-slate-200">3,2k</span> <span
                                    class="text-slate-400">
                                    <Icon name="mdi:users" class="w-4 h-4" />
                                </span>
                            </span>
                            <span class="w-px h-3 bg-slate-200"></span>
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
                    <div class="w-full">
                        <button class="bg-dark transition-all duration-300 ease-linear dark:border dark:border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-900 hover:bg-primary text-white text-xs w-full p-2.5 rounded-lg">S'abonner</button>
                    </div>
                </div>
            </div>
            <div class="border-t border-slate-200 lg:border-none lg:pt-0 pt-6 mt-6 lg:mt-0 lg:col-span-3 2xl:pr-0">
                <div class="lg:mt-0 text-sm max-w-none text-slate-600 dark:text-slate-200">
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
                    <div class="flex items-center md:items-end justify-between mb-4">
                        <h3 class="font-display text-xl font-medium text-slate-900 dark:text-white">Livres</h3>

                        <div class="flex gap-2">
                            <select name="" id=""
                                class="bg-slate-50 dark:bg-slate-800 dark:text-white outline-none px-3 py-1.5 text-sm lg:text-xs rounded-lg border-slate-300 border">
                                <option value="" disabled selected>Statut</option>
                                <option value="12+">En cours</option>
                                <option value="16+">En pause</option>
                                <option value="18+">Terminé</option>
                            </select>
                            <select name="" id=""
                                class="bg-slate-50 dark:bg-slate-800 dark:text-white outline-none px-3 py-1.5 text-sm lg:text-xs rounded-lg border-slate-300 border">
                                <option value="" disabled selected>Options</option>
                                <option value="12+">12ans+</option>
                                <option value="16+">16ans+</option>
                                <option value="18+">18ans+</option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        <HomeBookCard v-for="book in stories" :key="book.id" :book="book" />
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
        title: "Histoire 1",
        image: "/assets/img6.jpg",
        state: "En cours",
        rating: 4.6,
        rank: "#2",
        url: "/books/book-uuid-2"
    },
    {
        id: 2,
        title: "Histoire 2",
        image: "/assets/img3.jpg",
        state: "En cours",
        rating: 4.6,
        rank: "#2",
        url: "/books/book-uuid-2"
    },
    {
        id: 3,
        title: "Histoire 3",
        image: "/assets/img7.avif",
        state: "En cours",
        rating: 4.6,
        rank: "#2",
        url: "/books/book-uuid-2"
    },
    {
        id: 4,
        title: "Histoire 4",
        image: "/assets/img5.jpg",
        state: "En cours",
        rating: 4.6,
        rank: "#2",
        url: "/books/book-uuid-2"
    },
    {
        id: 5,
        title: "Histoire 5",
        image: "/assets/img1.jpg",
        state: "En cours",
        rating: 4.6,
        rank: "#2",
        url: "/books/book-uuid-2"
    }
])
</script>