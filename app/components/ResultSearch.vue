<template>
  <div>
    <div class="fixed inset-0 z-50">
      <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
      <div
        class="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full justify-center text-center sm:items-center">
        <div
          class="relative transform overflow-hidden md:rounded-xl bg-white dark:bg-dark dark:md:border text-left shadow-2xl transition-all md:my-8 w-full sm:max-w-md md:max-w-xl lg:max-w-4xl ring-1 ring-black/5 flex flex-col justify-between">

          <div class="flex flex-col min-h-full">
            <div class="sm:flex px-4 pb-4 pt-5 sm:p-6 sm:pb-4 sm:items-start relative">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 sm:mx-0 sm:h-10 sm:w-10 ring-1 ring-amber-100">
                <Icon name="mdi:data" class="text-amber-600" width="24"></Icon>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-slate-900 dark:text-slate-200">Résultats de recherche
                </h3>
                <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 md:mt-1">
                  <p>
                    Voici les résultats correspondant à votre recherche.
                  </p>
                  <div class="mt-1">
                    <p>
                      Filtre de recherche : <strong class="text-orange-600">{{ data?.searchType }}</strong>
                    </p>
                    <p>
                      Moteur de recherche utilisé : <strong class="text-orange-600">{{ data?.search }}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <button @click="closeModalResult" class="absolute right-3 top-3">
                <Icon name="mdi:close" class="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <div class="text-xs pt-4 border-slate-200 border-t-[1px] mt-4 flex-1 flex flex-col justify-between">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 pb-4 max-h-[58vh] lg:max-h-[60vh] overflow-y-auto"
                v-if="data?.searchType === 'histoires'">
                <div v-for="(book, index) in results" :key="index" @click="openPage(`/books/${book.uuid}`)"
                  class="group flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition cursor-pointer">

                  <!-- Avatar -->
                  <span>
                    <img v-if="book.image" :src="`${config.public.apiBackendUrl}/uploads/books/${book.image}`"
                      class="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover" :alt="book.title" />
                  </span>

                  <!-- Infos -->
                  <div class="flex flex-col gap-1 flex-1">

                    <span
                      class="font-medium text-slate-800 dark:text-slate-200 dark:group-hover:text-slate-700 hover:text-orange-600 transition">
                      {{ book?.title }}
                    </span>

                    <!-- Statut -->
                    <span :class="[
                      'text-[11px] w-fit px-2 py-0.5 rounded-md flex items-center gap-1',
                      book.status === 'completed'
                        ? 'bg-orange-50 text-orange-700 border border-orange-100'
                        : book.status === 'paused'
                          ? 'bg-purple-50 text-purple-700 border border-purple-100'
                          : book.status === 'ongoing'
                            ? 'bg-green-50 text-green-700 border border-green-100'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                    ]">
                      <Icon name="mdi:star-outline" size="14" />
                      {{ status(book.status) }}
                    </span>

                    <!-- Bio -->
                    <p v-if="book?.description" class="text-xs text-slate-500 line-clamp-2" v-html="book.description">
                    </p>

                    <!-- Stats -->
                    <div class="flex items-center gap-4 pt-1 text-xs text-slate-500 dark:text-slate-400">

                      <div class="flex items-center gap-1">
                        <Icon name="mdi:eye" size="16" />
                        <span class="font-medium text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-600">
                          {{ formatNumber(Number(book?.total_views)) }}
                        </span>
                      </div>

                      <div class="flex items-center gap-1">
                        <Icon name="mdi:comments" size="16" />
                        <span class="font-medium text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-600">
                          {{ formatNumber(book?.book_comments) }}
                        </span>
                      </div>

                      <div class="flex items-center gap-1">
                        <Icon name="mdi:heart" size="16" />
                        <span class="font-medium text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-600">
                          {{ formatNumber(book?.book_reactions) }}
                        </span>
                      </div>

                      <div class="flex items-center gap-1">
                        <Icon name="mdi:user" size="16" />
                        <span class="font-medium text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-600">
                          {{ ratingAge(book.rating_age) }}
                        </span>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 pb-4 max-h-[58vh] lg:max-h-[60vh] overflow-y-auto"
                v-if="data?.searchType === 'auteurs'">
                <div v-for="(author, index) in results" :key="index" @click="openPage(`/authors/${author.uuid}`)"
                  class="group flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition cursor-pointer">

                  <!-- Avatar -->
                  <span>
                    <img v-if="author.photo" :src="author.photo.includes('https') ? author.photo : `${config.public.apiBackendUrl}/uploads/users/${author.photo}`"
                      class="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover" :alt="author.name" />

                    <span v-else
                      class="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg font-semibold text-white text-sm"
                      :style="`background:${author.code_color}`">
                      {{
                        author.name.split(" ").length > 1
                          ? `${author.name.charAt(0)}${author.name.split(" ")[1]?.charAt(0)}`
                          : author.name.charAt(0)
                      }}
                    </span>
                  </span>

                  <!-- Infos -->
                  <div class="flex flex-col gap-1 flex-1">

                    <span
                      class="font-medium text-slate-800 dark:text-slate-200 dark:group-hover:text-slate-700 hover:text-orange-600 transition">
                      {{ author?.name }}
                    </span>

                    <!-- Rank -->
                    <span :class="[
                      'text-[11px] w-fit px-2 py-0.5 rounded-md flex items-center gap-1',
                      author.rank === 'certifié'
                        ? 'bg-orange-50 text-orange-700 border border-orange-100'
                        : author.rank === 'best'
                          ? 'bg-purple-50 text-purple-700 border border-purple-100'
                          : author.rank === 'top'
                            ? 'bg-green-50 text-green-700 border border-green-100'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                    ]">
                      <Icon name="mdi:star-outline" size="14" />
                      {{ author.rank }}
                    </span>

                    <!-- Bio -->
                    <p v-if="author?.bibliography" class="text-xs text-slate-500 line-clamp-2"
                      v-html="DOMPurify.sanitize(author?.bibliography || '')"></p>

                    <p v-else class="text-xs text-slate-400">
                      Aucune biographie disponible
                    </p>

                    <!-- Stats -->
                    <div class="flex items-center gap-4 pt-1 text-xs text-slate-500 dark:text-slate-400">

                      <div class="flex items-center gap-1">
                        <Icon name="mdi:account-group-outline" size="16" />
                        <span class="font-medium text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-600">
                          {{ formatNumber(author?.total_followers) }} abonné{{ author?.total_followers > 1 ? 's' : '' }}
                        </span>
                      </div>

                      <div class="flex items-center gap-1">
                        <Icon name="mdi:book-open-page-variant-outline" size="16" />
                        <span class="font-medium text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-600">
                          {{ formatNumber(author?.books?.length || 0) }} livre{{ author?.books?.length > 1 ? 's' : '' }}
                        </span>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 pb-4 max-h-[58vh] lg:max-h-[60vh] overflow-y-auto"
                v-if="data?.searchType === 'categories'">
                <div v-for="(category, index) in results" :key="index" @click="openPage(`/categories/${category.uuid}`)"
                  class="group flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition cursor-pointer">

                  <!-- Avatar -->
                  <span>
                    <img :src="category.image?.includes('https')
                ? category.image
                : `${config.public.apiBackendUrl}/uploads/categories/${category?.image}`"
                      class="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover" :alt="category.name" />
                  </span>

                  <!-- Infos -->
                  <div class="flex flex-col gap-1 flex-1">

                    <span
                      class="font-medium text-slate-800 dark:text-slate-200 dark:group-hover:text-slate-700 hover:text-orange-600 transition">
                      {{ category?.name }}
                    </span>

                    <!-- Bio -->
                    <p v-if="category?.description" class="text-xs text-slate-500 line-clamp-2"
                      v-html="DOMPurify.sanitize(category?.description || '')"></p>

                    <p v-else class="text-xs text-slate-400">
                      Aucune description disponible
                    </p>

                    <!-- Stats -->
                    <div class="flex items-center gap-4 pt-1 text-xs text-slate-500 dark:text-slate-400">

                      <div class="flex items-center gap-1">
                        <Icon name="mdi:book-open-page-variant-outline" size="16" />
                        <span class="font-medium text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-600">
                          {{ formatNumber(category?.booksCount) }}
                        </span>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              <!-- Aucun résultat -->
              <div v-if="!loading && !results.length"
                class="flex flex-col items-center justify-center text-slate-400 py-12">
                <Icon name="mdi:magnify-close" size="40" />
                <p class="mt-2 text-xs">Aucun résultat trouvé</p>
              </div>

              <div v-if="loading"
                class="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 pb-4 max-h-[58vh] lg:max-h-[60vh] overflow-y-auto">
                <div v-for="i in 6" :key="i"
                  class="flex items-start gap-3 p-3 rounded-lg border border-slate-100 animate-pulse">
                  <!-- image -->
                  <div class="w-14 h-14 bg-slate-200 rounded-lg"></div>

                  <div class="flex flex-col gap-2 flex-1">

                    <div class="h-3 w-2/3 bg-slate-200 rounded"></div>

                    <div class="h-3 w-20 bg-slate-200 rounded"></div>

                    <div class="h-3 w-full bg-slate-200 rounded"></div>
                    <div class="h-3 w-5/6 bg-slate-200 rounded"></div>

                    <div class="flex gap-3 pt-1">
                      <div class="h-3 w-10 bg-slate-200 rounded"></div>
                      <div class="h-3 w-10 bg-slate-200 rounded"></div>
                      <div class="h-3 w-10 bg-slate-200 rounded"></div>
                    </div>

                  </div>
                </div>
              </div>

              <!-- Pagination -->
              <div class="flex items-center justify-between px-4 pb-4 text-xs text-slate-500 dark:text-slate-400">
                <span>
                  Page {{ currentPage }} / {{ total }}
                </span>

                <span>
                  {{ totalDatas }} résultats
                </span>

                <div class="flex items-center gap-2" v-if="currentPage > 1">

                  <!-- Bouton précédent -->
                  <button v-if="currentPage > 1" @click="previousData"
                    class="flex items-center gap-1 text-slate-600 hover:text-slate-800 dark:text-slate-200 dark:group-hover:text-slate-700 font-medium">
                    <Icon name="mdi:chevron-left" />
                    Précédent
                  </button>

                  <!-- Bouton suivant -->
                  <button v-if="currentPage < total" @click="nextData"
                    class="flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium">
                    Suivant
                    <Icon name="mdi:chevron-right" />
                  </button>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'
const config = useRuntimeConfig();
const emit = defineEmits(['close-modal-result', 'previous-data', 'next-data']);
const props = withDefaults(defineProps<{
  results: any[]
  total?: number
  totalDatas?: number
  currentPage?: number
  data?: any
  loading?: boolean
}>(), {
  results: () => [],
  total: 1,
  totalDatas: 0,
  currentPage: 1,
  loading: false
});

const status = (status: string) => {
  switch (status.toLocaleLowerCase()) {
    case "ongoing":
      return "En cours"
    case "completed":
      return "Terminé"
    case "paused":
      return "Pause"
    case "draft":
      return "Brouillon"
    case "inactive":
      return "Inactif"
    default:
      return "Brouillon"
  }
}

const ratingAge = (rating_age: string) => {
  switch (rating_age.toLocaleLowerCase()) {
    case "12+":
      return "12ans+"
    case "16+":
      return "16ans+"
    case "18+":
      return "18ans+"
    default:
      return ""
  }
}

const router = useRouter();

const openPage = (url: string) => {
  router.push(url);
  closeModalResult();
}

const previousData = () => {
  emit('previous-data')
}

const nextData = () => {
  emit('next-data')
}

const closeModalResult = () => {
  emit('close-modal-result')
}
</script>