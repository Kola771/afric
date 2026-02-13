<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-8">
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
            <div class="flex items-center md:items-end justify-between mb-8">
                <div class="flex items-center gap-4">
                  <nuxt-link :to="`/categories`">
                    <Icon name="mdi:arrow-left" class="w-5 h-5 dark:text-slate-200" />
                  </nuxt-link>
                <div>
                    <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">Toutes les histoires de la catégorie "<span class="text-orange-600 dark:text-orange-400">{{ $route.params.uuid }}</span>"</h2>
                    <p class="text-slate-500 text-sm mt-1 dark:text-slate-200">Vous avez l'embarras du choix.</p>
                </div>
            </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
                <HomeBookCard v-for="book in books" :key="book.id" :book="book" />
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
const books = ref<Book[]>([
  {
    id: 2,
    title: "Nairobi by Night",
    author: "Sarah O.",
    image: "/assets/img6.jpg",
    state: "En cours",
    rating: 4.6,
    rank: "#2",
    url: "/books/book-uuid-2"
  },
  {
    id: 3,
    title: "Le Chant du Baobab",
    author: "Moussa Traoré",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    state: "En cours",
    rating: 4.9,
    rank: "#3",
    url: "/books/book-uuid-3"
  },
])
</script>
