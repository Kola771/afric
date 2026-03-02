<template>
  <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-20 pb-12 lg:py-24">
    <div :class="`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${selectedGroup ? 'gap-4' : 'gap-8'}`">
      <StoryHero v-if="!selectedGroup" />

      <div v-if="selectedGroup" class="pt-1 lg:pt-0">
        <button @click="selectedGroup = null" class="text-sm font-medium">
          <Icon name="mdi:arrow-left" class="w-5 h-5 dark:text-slate-200" />
        </button>
      </div>
      <template v-for="ageGroup in ageGroups" :key="ageGroup.label">
        <div v-if="!selectedGroup || selectedGroup === ageGroup.label"
          :class="`${selectedGroup ? 'pt-4' : 'pt-8 lg:pt-6'} border-slate-200 border-t flex flex-col gap-8`">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">
              {{ ageGroup.label }}
            </h2>

            <button class="flex items-center gap-1 text-sm font-medium hover:text-orange-600 transition-colors"
              @click="handleSelect(ageGroup.label)" v-if="!selectedGroup">
              <span class="hidden sm:block">Voir tout</span>
              <Icon name="mdi:arrow-right" class="w-5 h-5" />
            </button>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
            <HomeBookCard v-for="book in books" :key="book.id" :book="book" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const selectedGroup = ref<string | null>(null);

const ageGroups = [
  { label: '18ans+' },
  { label: '16ans+' },
  { label: '12ans+' },
];

const handleSelect = (label: string) => {
  selectedGroup.value = label
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

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
  },
])
</script>
