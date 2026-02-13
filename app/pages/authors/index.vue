<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-24 pb-12 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center md:items-end justify-between mb-8">
                <div>
                    <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">Nos différents auteurs</h2>
                    <p class="text-slate-500 text-sm mt-1 dark:text-slate-200">Découvrez nos auteurs préférés.</p>
                </div>
            </div>
             <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                <AuthorCard v-for="author in authors" :key="author.id" :author="author" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const authors = ref<Author[]>([
  {
    id: 1,
    name: "Alain Mabanckou",
    image: "/assets/alain_mabanckou.jpg",
    country: "Congo",
    storyCount: 5,
    chapterCount: 98,
    viewCount: "30k",
    url: "/authors/alain-mabanckou",
    bibliography: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
  },
  {
    id: 2,
    name: "Camara Laye",
    image: "/assets/camara_laye.webp",
    country: "Sénégal",
    storyCount: 3,
    chapterCount: 45,
    viewCount: "15k",
    url: "/authors/camara-laye",
    isNew: true,
    bibliography: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
  },
  {
    id: 3,
    name: "Chinua Achebe",
    image: "/assets/chinua_achebe.webp",
    country: "Nigeria",
    storyCount: 7,
    chapterCount: 120,
    viewCount: "50k",
    url: "/authors/chinua-achebe",
    bibliography: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
  },
  {
    id: 4,
    name: "Wole Soyinka",
    image: "/assets/wole_soyinka.webp",
    country: "Nigeria",
    storyCount: 4,
    chapterCount: 67,
    viewCount: "25k",
    url: "/authors/wole-soyinka",
    bibliography: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
  }
]);
</script>
