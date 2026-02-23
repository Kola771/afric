<template>
    <div class="max-w-6xl mx-auto space-y-6">
                
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Gestion des Catégories</h1>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Gérez les catégories et suivez leurs performances.</p>
            </div>
            <div class="flex gap-3">
                    <button class="h-9 px-4 rounded-lg bg-white dark:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:export-linear" class="w-5 h-5" />
                    Exporter
                </button>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Total Catégories</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ categories.length }}</p>
                    <Icon name="mdi:category" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Total Catégories les plus lues</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">4</p>
                    <p class="text-xs text-slate-500">Avec plus de 101K vues chacune</p>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Catégorie phare</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">Roman</p>
                    <span class="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                </div>
            </div>
        </div>

        <!-- Filters & Toolbar -->
        <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <!-- Actions -->
            <div class="flex items-center gap-3 w-full">
                <div class="relative flex-1">
                    <Icon name="solar:magnifer-linear" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="search" placeholder="Rechercher une catégorie..." class="h-8 pl-8 pr-3 w-full rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
                </div>
                <button class="h-8 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                    <Icon name="solar:sort-vertical-linear" class="w-5 h-5" />
                    <span class="text-xs font-medium hidden sm:inline">Trier</span>
                </button>
                <nuxt-link to="/dashboard/categories/create" class="h-8 px-3 rounded-lg border border-slate-200 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2 transition-colors">
                    <Icon name="mdi:plus" class="w-5 h-5" />
                    <span class="text-xs font-medium hidden sm:inline">Ajouter</span>
                </nuxt-link>
            </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto lg:max-h-96 lg:overflow-y-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-xs text-slate-400 dark:text-slate-700 border-b border-slate-100 bg-slate-50/50">
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Catégorie</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Histoires</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr class="group hover:bg-slate-50 transition-colors border-b border-slate-50" v-for="(category, index) in categories" :key="index"> 
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-10 bg-slate-200 rounded object-cover overflow-hidden">
                                        <img :src="`${config.public.apiBackendUrl}/uploads/categories/${category.image}`" class="w-full h-full object-cover opacity-80">
                                    </div>
                                    <span class="font-medium text-slate-900 group-hover:text-orange-600 transition-colors">{{ category.name }}</span>
                                </div>
                            </td>
                            <td class="py-3 px-6 text-slate-600 text-xs"><nuxt-link class="flex items-center gap-2 hover:underline hover:text-orange-600 dark:hover:text-orange-500 hover:duration-300 hover:ease-linear" to="/dashboard/categories/category-uuid-1/stories"><Icon name="mdi:book-open-page-variant" class="w-4 h-4" /> 154</nuxt-link></td>
                            <td class="py-3 px-6 text-right">
                                <nuxt-link :to="`/dashboard/categories/${category.uuid}`" class="text-slate-400 hover:text-slate-900 transition-colors"><Icon name="mdi:eye" class="w-4 h-4" /></nuxt-link>
                                <nuxt-link :to="`/dashboard/categories/edit/${category.uuid}`" class="ml-2 text-orange-600 hover:text-orange-700 transition-colors"><Icon name="mdi:edit" class="w-4 h-4" /></nuxt-link>
                                <button @click="toggleDeleteModal(category)" class="ml-2 text-red-600 hover:text-red-700 transition-colors"><Icon name="mdi:trash" class="w-4 h-4" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="flex items-center justify-between p-4 border-t border-slate-100">
                <span class="text-xs text-slate-500"><strong>{{ categories.length }}</strong> catégories</span>
            </div>
        </div>
        <DashboardCategoryDelete @close-delete-modal="toggleDeleteModal" v-if="category && showDeleteModal" :category="category" :showDeleteModal="showDeleteModal" />
    </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
const { allCategories } = categoriesData();
const categories = ref<Category[]>([])
const category = ref<Category | null>(null)
const showDeleteModal = ref(false);
const toggleDeleteModal = (cat: Category) => {
    category.value = cat
    showDeleteModal.value = !showDeleteModal.value
}

onMounted(async () => {
    categories.value = await allCategories()
})
</script>