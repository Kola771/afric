<template>
  <div id="popular">
    <section class="border-b border-slate-200 bg-white dark:bg-dark sticky top-14 lg:top-16 z-10 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-600 dark:text-primary">

        <div class="relative">

          <!-- bouton gauche -->
          <button @click="scrollLeft"
            class="hidden lg:flex lg:justify-center lg:items-center w-9 h-9 absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-slate-800 hover:bg-slate-900 hover:duration-300 hover:ease-linear text-white shadow p-2 rounded-full">
            <Icon name="mdi:arrow-left" class="w-4 h-4" />
          </button>

          <!-- slider -->
          <div ref="slider" class="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar scroll-smooth">
            <!-- bouton fixe -->
            <button
              class="flex-shrink-0 px-4 py-1.5 rounded bg-slate-900 text-white text-xs font-medium transition-transform hover:scale-105">
              Pour vous
            </button>

            <!-- catégories -->
            <div v-if="!loadingCategory && categories.length > 0" class="flex items-center gap-2">
              <nuxt-link v-for="(category, index) in categories" :key="index" :to="`/categories/${category.uuid}`"
                class="flex-shrink-0 px-4 lg:px-3 py-1.5 rounded bg-white dark:bg-transparent dark:text-slate-200 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-medium whitespace-nowrap flex items-center gap-2">
                <img :src="category.image?.includes('https')
                  ? category.image
                  : `${$config.public.apiBackendUrl}/uploads/categories/${category.image}`" :alt="category.name"
                  class="w-5 h-5 rounded" />
                {{ category.name }}
              </nuxt-link>
            </div>

            <!-- skeleton -->
            <div v-else class="flex items-center gap-2">
              <button v-for="index in 8" :key="index"
                class="animate-pulse flex-shrink-0 px-4 py-3.5 w-1/4 lg:w-1/3 rounded bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200"></button>
            </div>
          </div>

          <!-- bouton droite -->
          <button @click="scrollRight"
            class="hidden lg:flex lg:justify-center lg:items-center w-9 h-9 absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-slate-800 hover:bg-slate-900 hover:duration-300 hover:ease-linear text-white shadow p-2 rounded-full">
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </button>

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
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-6 gap-y-10">
          <!-- Skeleton -->
          <template v-if="loading || books.length === 0">
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

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script lang="ts" setup>
const { allCategorieActifs } = categoriesData();
const { getFiveTopBooks } = booksData();
const loading = ref<boolean>(true);
const loadingCategory = ref<boolean>(true);
const categories = ref<Category[]>([]);
const books = ref<BookData[]>([]);
const slider = ref<HTMLElement | null>(null)

const scrollLeft = () => {
  if (!slider.value) return

  slider.value.scrollBy({
    left: -300,
    behavior: "smooth"
  })
}

const scrollRight = () => {
  if (!slider.value) return

  slider.value.scrollBy({
    left: 300,
    behavior: "smooth"
  })
}

onMounted(async () => {
  categories.value = await allCategorieActifs();
  books.value = await getFiveTopBooks();
  loading.value = false;
  loadingCategory.value = false;
})
</script>
