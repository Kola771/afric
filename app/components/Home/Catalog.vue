<template>
    <div id="popular">
        <section class="border-b border-slate-200 bg-white dark:bg-dark sticky top-16 z-10 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-600 dark:text-primary">
                <div class="flex items-center gap-1 py-4 overflow-x-auto">
                    <button class="flex-shrink-0 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium transition-transform hover:scale-105 dark:border-gray-600 dark:border-[1px]">Pour vous</button>
                    <div class="w-px h-4 bg-slate-200 mx-2"></div>
                    <nuxt-link to="/categories/category-uuid-1" class="flex-shrink-0 px-4 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-medium transition-all whitespace-nowrap dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800">Romance</nuxt-link>
                    <nuxt-link to="/categories/category-uuid-2" class="flex-shrink-0 px-4 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-medium transition-all whitespace-nowrap dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800">Afrofuturisme</nuxt-link>
                    <nuxt-link to="/categories/category-uuid-3" class="flex-shrink-0 px-4 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-medium transition-all whitespace-nowrap dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800">Thriller</nuxt-link>
                    <nuxt-link to="/categories/category-uuid-4" class="flex-shrink-0 px-4 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-medium transition-all whitespace-nowrap dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800">Historique</nuxt-link>
                    <nuxt-link to="/categories/category-uuid-5" class="flex-shrink-0 px-4 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-medium transition-all whitespace-nowrap dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800">Poésie</nuxt-link>
                    <nuxt-link to="/categories/category-uuid-6" class="flex-shrink-0 px-4 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-medium transition-all whitespace-nowrap dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800">Jeunesse</nuxt-link>
                </div>
            </div>
        </section>

        <div class="bg-lightOrange dark:bg-slate-800">
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                <div class="flex items-center md:items-end justify-between mb-8">
                    <div>
                        <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">Populaire cette semaine</h2>
                        <p class="text-slate-500 text-sm mt-1 dark:text-slate-200">Les histoires qui captivent la communauté.</p>
                    </div>
                    <nuxt-link to="/stories" class="flex items-center gap-1 text-sm font-medium text-slate-900 hover:text-orange-600 transition-colors dark:text-slate-200 dark:hover:text-orange-500">
                        <span class="hidden sm:block">Voir le classement</span>
                        <Icon name="mdi:arrow-right" class="w-5 h-5" />
                    </nuxt-link>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
                    <HomeBookCard v-for="book in books" :key="book.id" :book="book" />
                </div>
            </section>
        </div>
        <div class="wave-divider bg-white dark:bg-dark" style="transform: rotate(180deg);"><svg class="fill-lightOrange dark:fill-slate-800" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"></path></svg></div>
    </div>
</template>

<script lang="ts" setup>
const books = ref<Book[]>([
  {
    id: 1,
    title: "L'Héritage des Sables",
    author: "Kader Diaby",
    image: "/assets/img1.jpg",
    rating: 4.8,
    category: "Aventure",
    state: "En cours",
    rank: "#1",
    url: "/books/book-uuid-1"
  },
  {
    id: 2,
    title: "Nairobi by Night",
    author: "Sarah O.",
    image: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=600&auto=format&fit=crop",
    rating: 4.6,
    category: "Polar",
    state: "Arrêté",
    rank: "#2",
    url: "/books/book-uuid-2"
  },
  {
    id: 3,
    title: "Le Chant du Baobab",
    author: "Moussa Traoré",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    category: "Conte",
    state: "En cours",
    rank: "#3",
    url: "/books/book-uuid-3"
  },
  {
    id: 4,
    title: "Projet Sankara",
    author: "Léa M.",
    image: "https://images.unsplash.com/photo-1518558997970-4ddc236affcd?q=80&w=600&auto=format&fit=crop",
    rating: 4.5,
    category: "Sci-Fi",
    state: "Terminé",
    isNew: true,
    url: "/books/book-uuid-4"
  },
  {
    id: 5,
    title: "Amour et Hibiscus",
    author: "Chloé B.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    rating: 4.2,
    category: "Romance",
    state: "En cours",
    url: "/books/book-uuid-5"
  }
])
</script>
