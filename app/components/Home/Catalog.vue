<template>
  <div id="popular">
    <section class="border-b border-slate-200 bg-white dark:bg-dark sticky top-16 z-10 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-600 dark:text-primary">
        <div class="flex items-center gap-2 py-4 overflow-x-auto custom">
          <button
            class="flex-shrink-0 px-4 py-1.5 rounded bg-slate-900 text-white text-xs font-medium transition-transform hover:scale-105 dark:border-gray-600 dark:border-[1px]">Pour
            vous</button>
          <div class="flex items-center gap-2">
            <nuxt-link v-for="(category, index) in categories" :key="index" :to="`/categories/${category.uuid}`"
              class="flex-shrink-0 px-4 py-1.5 rounded bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-medium transition-all whitespace-nowrap dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800">{{
                category.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </section>

    <div class="bg-lightOrange dark:bg-slate-800">
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div class="flex items-center md:items-end justify-between mb-8">
          <div>
            <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">Populaire cette
              semaine</h2>
            <p class="text-slate-500 text-sm mt-1 dark:text-slate-200">Les livres qui captivent la communauté.</p>
          </div>
          <nuxt-link to="/stories"
            class="flex items-center gap-1 text-sm font-medium text-slate-900 hover:text-orange-600 transition-colors dark:text-slate-200 dark:hover:text-orange-500"
            v-if="books.length >= 5">
            <span class="hidden sm:block">Voir tout</span>
            <Icon name="mdi:arrow-right" class="w-5 h-5" />
          </nuxt-link>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          <!-- Skeleton -->
          <template v-if="loading">
            <HomeCardSkeleton v-for="i in 5" :key="i" />
          </template>

          <!-- Vraies cartes -->
          <template v-else>
            <HomeCard v-for="(book, index) in books" :key="index" :index="index" :book="book" />
          </template>
        </div>
      </section>
    </div>
    <div class="wave-divider bg-white dark:bg-dark" style="transform: rotate(180deg);"><svg
        class="fill-lightOrange dark:fill-slate-800" viewBox="0 0 1440 120" preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"></path>
      </svg></div>
  </div>
</template>

<style>
.custom::-webkit-scrollbar {
  height: 6px;
}

.custom::-webkit-scrollbar-track {
  background: transparent;
}

.custom::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}

/* Firefox */
.custom {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
</style>

<script lang="ts" setup>
const { allCategorieActifs } = categoriesData();
const { getFiveTopBooks } = booksData();
const loading = ref<boolean>(true);
const categories = ref<Category[]>([]);
const books = ref<BookData[]>([]);
onMounted(async () => {
  categories.value = await allCategorieActifs();
  books.value = await getFiveTopBooks();
  loading.value = false;
})
</script>
