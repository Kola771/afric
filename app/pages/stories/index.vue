<template>
  <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-20 pb-12 lg:py-24">
    <div :class="`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8`">
      <StoryHero />

      <template v-for="ageGroup in ageGroups" :key="ageGroup.label">
        <div v-if="books[ageGroup.key]?.length" class="pt-8 lg:pt-6 border-slate-200 border-t flex flex-col gap-8">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">
              {{ ageGroup.label }}
            </h2>

            <nuxt-link to="#"
              class="flex items-center gap-1 text-sm font-medium hover:text-orange-600 transition-colors">
              <span class="hidden sm:block">Voir tout</span>
              <Icon name="mdi:arrow-right" class="w-5 h-5" />
            </nuxt-link>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
            <HomeCard v-for="(book, index) in books[ageGroup.key]" :key="book.id" :index="index" :book="book" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const { getFiveRatingAge } = booksData();
const books = ref<Record<string, BookData[]>>({
  "18ans+": [],
  "16ans+": [],
  "12ans+": []
})

const ageGroups = [
  { label: '18ans+', key: 'age18' },
  { label: '16ans+', key: 'age16' },
  { label: '12ans+', key: 'age12' },
]

const onLoad = async () => {
  books.value = await getFiveRatingAge();
  console.log(books.value)
}

onMounted(async () => {
  await onLoad();
})

useSeoMeta({
  title: 'Toutes les histoires',
  description: 'Explorez des histoires africaines originales écrites par des auteurs émergents et passionnés sur Afric Storyline.',

  ogTitle: 'Toutes les histoires',
  ogDescription: 'Découvrez toutes les histoires publiées sur notre plateforme.',
  ogImage: 'https://africstoryline.com/afric.png',
  ogUrl: 'https://africstoryline.com/',
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Toutes les histoires',
  twitterDescription: 'Découvrez toutes les histoires publiées sur notre plateforme.',
  twitterImage: 'https://africstoryline.com/afric.png'
});
</script>
