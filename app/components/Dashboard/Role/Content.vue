<template>
    <div class="max-w-6xl mx-auto space-y-6">
                
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Gestion des Rôles</h1>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Gérez les rôles et suivez leurs performances.</p>
            </div>
            <div class="flex gap-3">
                    <button class="h-9 px-4 rounded-lg bg-white dark:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:export-linear" class="w-5 h-5" />
                    Exporter
                </button>
            </div>
        </div>

        <!-- Filters & Toolbar -->
        <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <!-- Actions -->
            <div class="flex items-center gap-3 w-full">
                <div class="relative flex-1">
                    <Icon name="solar:magnifer-linear" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="search" placeholder="Rechercher un rôle..." class="h-8 pl-8 pr-3 w-full rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
                </div>
                <button class="h-8 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                    <Icon name="solar:sort-vertical-linear" class="w-5 h-5" />
                    <span class="text-xs font-medium hidden sm:inline">Trier</span>
                </button>
                <nuxt-link to="/dashboard/roles/create" class="h-8 px-3 rounded-lg border border-slate-200 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2 transition-colors">
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
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Nom</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Description</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr class="group hover:bg-slate-50 transition-colors border-b border-slate-50" v-for="index in 4" :key="index">
                            <td class="py-3 px-6 text-slate-600 text-xs">Super-admin</td>
                            <td class="py-3 px-6 text-slate-600 text-xs">L'ensemble des vues</td>
                            <td class="py-3 px-6 text-right whitespace-nowrap">
                                <nuxt-link :to="`/dashboard/roles/edit/role-uuid-${index}`" class="ml-2 text-orange-600 hover:text-orange-700 transition-colors"><Icon name="mdi:edit" class="w-4 h-4" /></nuxt-link>
                                <button @click="toggleDeleteModal" class="ml-2 text-red-600 hover:text-red-700 transition-colors"><Icon name="mdi:trash" class="w-4 h-4" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="flex items-center justify-between p-4 border-t border-slate-100">
                <span class="text-xs text-slate-500">Affichage de <span class="font-medium text-slate-900">1-4</span> sur <span class="font-medium text-slate-900">15</span> rôle(s)</span>
                <div class="flex gap-2">
                    <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50" :disabled="true">Précédent</button>
                    <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 hover:bg-slate-50">Suivant</button>
                </div>
            </div>
        </div>
        <DashboardRoleDelete @close-delete-modal="toggleDeleteModal" :showDeleteModal="showDeleteModal" v-if="showDeleteModal" />
    </div>
</template>
<script setup lang="ts">
const showDeleteModal = ref(false);
const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value
}
</script>