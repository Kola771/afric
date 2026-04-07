<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-8">
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
            <div class="flex items-center md:items-end justify-between mb-8">
                <div>
                    <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">{{categories.length}} différentes catégories</h2>
                    <p class="text-slate-500 text-sm mt-1 dark:text-slate-200">Faites votre choix.</p>
                </div>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                <!-- Skeleton -->
                <template v-if="loading">
                    <CategoryCardSkeleton v-for="i in 8" :key="i" />
                </template>
                
                <!-- Vraies cartes -->
                <template v-else>
                    <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
                </template>
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
const { allCategorieActifs } = categoriesData();
const categories = ref<Category[]>([])
const loading = ref<boolean>(true)
onMounted(async () => {
    categories.value = await allCategorieActifs();
    loading.value = false
})
  useSeoMeta({
    title: 'Catégories',
    description: 'Explorez nos différentes catégories d\'histoires africaines originales.',
    
    ogTitle: 'Catégories',
    ogDescription: 'Découvrez nos différentes catégories d\'histoires africaines originales.',
    ogImage: `${config.public.frontUrl}/afric.png`,
    ogUrl: `${config.public.frontUrl}`,
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'Catégories',
    twitterDescription: 'Découvrez nos différentes catégories d\'histoires africaines originales.',
    twitterImage: `${config.public.frontUrl}/afric.png`
  });
</script>
