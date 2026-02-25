<template>
    <div class="max-w-6xl mx-auto space-y-6">
                
        <!-- Page Header -->
        <div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                        <button @click="back" class="py-2 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Icon name="mdi:arrow-left" class="w-4 h-4" />
                        </button>
                        <span>Histoires de <strong class="text-orange-600 dark:text-orange-500">Amadou Bah</strong></span>
                    </h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-200">Originaire du/de : Congo; amadoubah@gmail.com</p>
                </div>
                <div class="flex gap-3">
                        <button class="h-9 px-4 rounded-lg bg-white dark:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                        <Icon name="solar:export-linear" class="w-5 h-5" />
                        Exporter
                    </button>
                </div>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Total Histoires</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">42</p>
                    <Icon name="solar:book-linear" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Histoires Terminées</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">12</p>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Histoires en cours</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">5</p>
                    <span class="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Histoires en pause</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">8</p>
                    <span class="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Histoires en brouillon</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">7</p>
                    <span class="w-2 h-2 rounded-full bg-pink-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Histoires désactivées</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">10</p>
                    <span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                </div>
            </div>
        </div>

        <!-- Filters & Toolbar -->
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <!-- Tabs -->
            <div class="flex bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-full">
                <button class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-50 text-slate-900 shadow-sm rounded-md transition-all whitespace-nowrap">Tous</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Terminées</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">En cours</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">En pause</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Brouillon</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Inactive</button>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3 w-full sm:w-auto">
                <div class="relative flex-1 sm:flex-none">
                    <Icon name="solar:magnifer-linear" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="search" placeholder="Rechercher une histoire..." class="h-8 pl-8 pr-3 w-full sm:w-48 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
                </div>
                <button class="h-8 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                    <Icon name="solar:sort-vertical-linear" class="w-5 h-5" />
                    <span class="text-xs font-medium hidden sm:inline">Trier</span>
                </button>
            </div>
        </div>

        <!-- Authors Table -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-xs text-slate-400 dark:text-slate-700 border-b border-slate-100 bg-slate-50/50">
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Titre de l'histoire</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Catégorie</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Performance</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Statut</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr class="group hover:bg-slate-50 transition-colors border-b border-slate-50">
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-10 bg-slate-200 rounded object-cover overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover opacity-80">
                                    </div>
                                    <span class="font-medium text-slate-900 group-hover:text-orange-600 transition-colors">Les Larmes du Soleil</span>
                                </div>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                    Roman
                                </span>
                                <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                    Thriller
                                </span>
                                <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                    Policier
                                </span>
                            </td>
                            <td class="py-3 px-6">
                                <nuxt-link to="/dashboard/stories/story-uuid-14/detail-like-comment" class="flex items-center gap-4">
                                    <span class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-700">42</span> <span class="text-slate-400"><Icon name="mdi:heart" class="w-4 h-4" /></span>
                                    </span>
                                    <span class="w-px h-3 bg-slate-200"></span>
                                    <span class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-700">12k</span> <span class="text-slate-400"><Icon name="mdi:eye" class="w-4 h-4" /></span>
                                    </span>
                                    <span class="w-px h-3 bg-slate-200"></span>
                                    <span class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-700">1.1k</span> <span class="text-slate-400"><Icon name="mdi:comments" class="w-4 h-4" /></span>
                                    </span>
                                </nuxt-link>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium bg-green-50 text-green-700 border border-green-100">
                                    <span class="w-1 h-1 rounded-full bg-green-600"></span>
                                    Terminée
                                </span>
                            </td>
                            <td class="py-3 px-6 text-right">
                                <nuxt-link to="/dashboard/stories/story-uuid-1" class="text-slate-400 hover:text-slate-900 transition-colors"><Icon name="mdi:eye" width="16" /></nuxt-link>
                                <button @click="toggleDeleteModal" class="ml-2 text-red-600 hover:text-red-700 transition-colors"><Icon name="mdi:trash" width="16" /></button>
                            </td>
                        </tr>
                        <tr class="group hover:bg-slate-50 transition-colors border-b border-slate-50">
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-10 bg-slate-200 rounded object-cover overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover opacity-80">
                                    </div>
                                    <span class="font-medium text-slate-900 group-hover:text-orange-600 transition-colors">L'Héritage Perdu</span>
                                </div>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                    Drame
                                </span>
                                <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                    Comédie
                                </span>
                            </td>
                            <td class="py-3 px-6">
                                <nuxt-link to="/dashboard/stories/story-uuid-14/detail-like-comment" class="flex items-center gap-4">
                                    <span class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-700">42</span> <span class="text-slate-400"><Icon name="mdi:heart" class="w-4 h-4" /></span>
                                    </span>
                                    <span class="w-px h-3 bg-slate-200"></span>
                                    <span class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-700">12k</span> <span class="text-slate-400"><Icon name="mdi:eye" class="w-4 h-4" /></span>
                                    </span>
                                    <span class="w-px h-3 bg-slate-200"></span>
                                    <span class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-700">1.1k</span> <span class="text-slate-400"><Icon name="mdi:comments" class="w-4 h-4" /></span>
                                    </span>
                                </nuxt-link>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                    <span class="w-1 h-1 rounded-full bg-amber-600"></span>
                                    En pause
                                </span>
                            </td>
                            <td class="py-3 px-6 text-right">
                                <nuxt-link to="/dashboard/stories/story-uuid-1" class="text-slate-400 hover:text-slate-900 transition-colors"><Icon name="mdi:eye" width="16" /></nuxt-link>
                                <button @click="toggleDeleteModal" class="ml-2 text-red-600 hover:text-red-700 transition-colors"><Icon name="mdi:trash" width="16" /></button>
                            </td>
                        </tr>
                        <tr class="group hover:bg-slate-50 transition-colors">
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-10 bg-slate-200 rounded object-cover overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover opacity-80">
                                    </div>
                                    <span class="font-medium text-slate-900 group-hover:text-orange-600 transition-colors">Chroniques d'Abidjan</span>
                                </div>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                    Tragédie
                                </span>
                            </td>
                            <td class="py-3 px-6">
                                <nuxt-link to="/dashboard/stories/story-uuid-14/detail-like-comment" class="flex items-center gap-4">
                                    <span class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-700">42</span> <span class="text-slate-400"><Icon name="mdi:heart" class="w-4 h-4" /></span>
                                    </span>
                                    <span class="w-px h-3 bg-slate-200"></span>
                                    <span class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-700">12k</span> <span class="text-slate-400"><Icon name="mdi:eye" class="w-4 h-4" /></span>
                                    </span>
                                    <span class="w-px h-3 bg-slate-200"></span>
                                    <span class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-700">1.1k</span> <span class="text-slate-400"><Icon name="mdi:comments" class="w-4 h-4" /></span>
                                    </span>
                                </nuxt-link>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium bg-green-50 text-green-700 border border-green-100">
                                    <span class="w-1 h-1 rounded-full bg-green-600"></span>
                                    Terminée
                                </span>
                            </td>
                            <td class="py-3 px-6 text-right">
                                <nuxt-link to="/dashboard/stories/story-uuid-1" class="text-slate-400 hover:text-slate-900 transition-colors"><Icon name="mdi:eye" width="16" /></nuxt-link>
                                <button @click="toggleDeleteModal" class="ml-2 text-red-600 hover:text-red-700 transition-colors"><Icon name="mdi:trash" width="16" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="flex items-center justify-between p-4 border-t border-slate-100">
                <span class="text-xs text-slate-500">Affichage de <span class="font-medium text-slate-900">1-4</span> sur <span class="font-medium text-slate-900">42</span> histoires</span>
                <div class="flex gap-2">
                    <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50" :disabled="true">Précédent</button>
                    <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 hover:bg-slate-50">Suivant</button>
                </div>
            </div>
        </div>
        <DashboardAuthorDeleteDetail @close-delete-modal="toggleDeleteModal" :showDeleteModal="showDeleteModal" v-if="showDeleteModal" />
    </div>
</template>
<script setup lang="ts">
    const back = () => {
        window.history.back()
    }
    const showDeleteModal = ref(false);
    const toggleDeleteModal = () => {
        showDeleteModal.value = !showDeleteModal.value
    }
</script>
