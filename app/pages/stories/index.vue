<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-20 pb-12 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StoryHero />
            <div class="pt-12 lg:pt-14 border-slate-200 border-t grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
                <HomeBookCard v-for="book in books" :key="book.id" :book="book" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
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
  },
  {
    id: 6,
    title: "Lumière dans l'Obscurité",
    author: "Chloé B.",
    image: "/assets/img8.avif",
    rating: 4.2,
    category: "Romance",
    state: "En cours",
    url: "/books/book-uuid-6"
  },
  {
    id: 7,
    title: "Les Ombres du Passé",
    author: "Chloé B.",
    image: "/assets/img7.avif",
    rating: 4.2,
    category: "Romance",
    state: "En cours",
    url: "/books/book-uuid-7"
  },
])
</script>
