<template>
  <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-8">
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 flex flex-col gap-4">
      <div class="flex flex-col items-start" v-if="category">
        <button @click="back"
          class="hover:bg-slate-200 hover:duration-300 hover:ease-in-out dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-lg border-slate-400 border-[1px] flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
          <Icon name="mdi:arrow-left" class="w-4 h-4" />
        </button>
        <div class="bg-slate-50 dark:bg-slate-800 rounded-lg w-full h-72 mt-2 relative">
          <img :src="`${config.public.apiBackendUrl}/uploads/categories/${category?.image}`" v-if="category"
            alt="Image de couverture de l'histoire"
            class="w-full h-full object-cover lg:object-contain grayscale-[20%] rounded-lg transition-transform duration-700">
        </div>
        <div class="py-4">
          <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">{{ category?.name }}
          </h2>
          <p class="text-sm mb-2 text-slate-500 dark:text-slate-200 mt-1">{{ category?.description }}</p>
          <p class="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400">Elle
            contient {{ category?.booksCount }} histoire(s)</p>
        </div>
      </div>
      <div class="pt-5 border-slate-200 border-t flex flex-col gap-8">
        <div class="flex items-center md:items-end justify-between">
          <div>
            <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">Filtre</h2>
          </div>
          <div class="flex gap-2 text-xs">
            <select v-model="selectedStatus"
              class="bg-slate-50 dark:bg-slate-800 dark:text-white outline-none px-3 py-1.5 rounded-lg border-slate-300 border">
              <option value="">Statut</option>
              <option value="ongoing">En cours</option>
              <option value="paused">En pause</option>
              <option value="completed">Terminé</option>
            </select>

            <select v-model="selectedAge"
              class="bg-slate-50 dark:bg-slate-800 dark:text-white outline-none px-3 py-1.5 rounded-lg border-slate-300 border">
              <option value="">Options</option>
              <option value="12+">12 ans+</option>
              <option value="16+">16 ans+</option>
              <option value="18+">18 ans+</option>
            </select>

            <button @click="clearFilters" class="text-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-400 transition flex items-center justify-center gap-1">
              <Icon name="mdi:refresh" class="w-4 h-4" />
              <span class="hidden md:block">Réinitialiser</span>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10" v-if="filteredBooks.length > 0">
          <HomeCard v-for="book in filteredBooks" :key="book.id" :book="book" />
        </div>
        <div v-if="filteredBooks.length === 0" class="flex flex-col items-center justify-center text-center p-6">
          <Icon name="mdi:books" class="w-12 h-12 text-slate-300 mb-3" />

          <p class="text-slate-500 text-sm font-medium">
            Aucun livre disponible
          </p>
        </div>
        <div ref="loadMoreTrigger" class="h-10"></div>

        <div v-if="loading" class="text-center py-4 text-sm text-slate-500">
          Chargement...
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();
const { getCategoryByUuid } = categoriesData();
const { findAllPaginated } = booksData();
const category = ref<Category | null>(null);
const books = ref<BookData[]>([]);
const page = ref(1);
const limit = ref(25); // 25 livres par page
const totalPages = ref<number>(1); // nombre total de pages
const loading = ref(false); // pour éviter les doubles requêtes
const selectedStatus = ref<string>("")
const selectedAge = ref<string>("")
const loadMoreTrigger = ref<HTMLElement | null>(null)

const back = () => {
  window.history.back()
}

const clearFilters = () => {
  selectedStatus.value = ""
  selectedAge.value = ""
}

const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    const statusMatch = selectedStatus.value
      ? book.status === selectedStatus.value
      : true

    const ageMatch = selectedAge.value
      ? book.rating_age === selectedAge.value
      : true

    return statusMatch && ageMatch
  })
})

const loadBooks = async () => {
  if (loading.value) return
  if (page.value > totalPages.value) return

  loading.value = true

  const { data, totalPages: tp } = await findAllPaginated(
    page.value,
    limit.value,
    Number(category.value?.id)
  )

  books.value.push(...data)
  totalPages.value = tp
  page.value++

  loading.value = false
}

onMounted(async () => {
  category.value = await getCategoryByUuid(`${route.params.uuid}`)

  if (category.value) {
    await loadBooks()

    useSeoMeta({
      title: `${category.value?.name}`
    })
  }

  const observer = new IntersectionObserver(
    async (entries: any) => {
      if (entries[0].isIntersecting) {
        await loadBooks()
      }
    },
    { threshold: 1 }
  )

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})
</script>
