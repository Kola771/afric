<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-8">
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
            <div class="flex items-center md:items-end justify-between mb-8">
                <div>
                    <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">Nos différentes catégories</h2>
                    <p class="text-slate-500 text-sm mt-1 dark:text-slate-200">Faites votre choix.</p>
                </div>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
  useSeoMeta({
    title: 'Catégories',
    description: 'Explorez nos différentes catégories d\'histoires africaines originales.',
    
    ogTitle: 'Catégories',
    ogDescription: 'Découvrez nos différentes catégories d\'histoires africaines originales.',
    ogImage: 'https://africstoryline.com/afric.png',
    ogUrl: 'https://africstoryline.com/',
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'Catégories',
    twitterDescription: 'Découvrez nos différentes catégories d\'histoires africaines originales.',
    twitterImage: 'https://africstoryline.com/afric.png'
  });

const categories = ref<Category[]>([
  {
    id: 1,
    title: "Drame",
    image: "/assets/img1.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda hic deleniti fugit sed autem, facilis, soluta, corporis iusto ab ea ullam incidunt impedit expedita atque voluptatibus. Eum, necessitatibus. Culpa, corrupti?",
    url: "/categories/category-uuid-1"
  },
  {
    id: 2,
    title: "Comédie",
    image: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=600&auto=format&fit=crop",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda hic deleniti fugit sed autem, facilis, soluta, corporis iusto ab ea ullam incidunt impedit expedita atque voluptatibus. Eum, necessitatibus. Culpa, corrupti?",
    isNew: true,
    url: "/categories/category-uuid-2"
  },
  {
    id: 3,
    title: "Aventure",
    image: "/assets/img3.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda hic deleniti fugit sed autem, facilis, soluta, corporis iusto ab ea ullam incidunt impedit expedita atque voluptatibus. Eum, necessitatibus. Culpa, corrupti?",
    isNew: true,
    url: "/categories/category-uuid-3"
  },
  {
    id: 4,
    title: "Tragédie",
    image: "/assets/img2.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda hic deleniti fugit sed autem, facilis, soluta, corporis iusto ab ea ullam incidunt impedit expedita atque voluptatibus. Eum, necessitatibus. Culpa, corrupti?",
    url: "/categories/category-uuid-4"
  },
  {
    id: 5,
    title: "Action",
    image: "/assets/img4.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda hic deleniti fugit sed autem, facilis, soluta, corporis iusto ab ea ullam incidunt impedit expedita atque voluptatibus. Eum, necessitatibus. Culpa, corrupti?",
    isNew: true,
    url: "/categories/category-uuid-5"
  }
])
</script>
