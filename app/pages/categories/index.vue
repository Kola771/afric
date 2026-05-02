<template>
    <div class="bg-[#fffcfccc] dark:bg-transparent pt-8">
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">
                        {{ filteredCategories.length }} différentes catégories</h2>
                    <p class="text-slate-500 text-sm mt-1 dark:text-slate-200">Faites votre choix.</p>
                </div>
                <input type="search" name="search" id="search" required placeholder="Rechercher une catégorie" v-model="search"
                    class="w-full md:w-1/3 placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 bg-slate-50 dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200 rounded-md px-2 py-1.5 md:py-2 lg:text-sm">
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Skeleton -->
                <template v-if="loading">
                    <CategoryCardSkeleton v-for="i in 8" :key="i" />
                </template>

                <!-- Vraies cartes -->
                <template v-else>
                    <CategoryCard v-for="category in filteredCategories" :key="category.id" :category="category" />
                </template>
            </div>

            <div v-if="!loading && filteredCategories.length === 0"
                class="col-span-full flex flex-col items-center justify-center gap-2 text-center text-slate-500 text-sm">
                <Icon name="solar:tag-linear" class="w-14 h-14" />
                Aucune catégorie trouvée
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
const { allCategorieActifs } = categoriesData();
const categories = ref<Category[]>([])
const loading = ref<boolean>(true);
const search = ref<string>('');

const normalize = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const filteredCategories = computed(() => {
    if (!search.value.trim()) return categories.value;

    const term = normalize(search.value);

    return categories.value.filter(category =>
        normalize(category.name).includes(term)
    );
});

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
