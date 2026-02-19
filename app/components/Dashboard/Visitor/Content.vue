<template>
    <div class="max-w-6xl mx-auto space-y-6">
                
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Historique de visite</h2>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Suivez l'historique de visite de votre plateforme.</p>
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
                <p class="text-xs font-medium text-slate-500 mb-1">Total Journalier</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">1,4k</p>
                    <Icon name="solar:calendar-linear" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Total Mensuel</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">30,2k</p>
                    <Icon name="solar:calendar-linear" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Total Annuel</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">205,6k</p>
                    <Icon name="solar:calendar-linear" class="text-slate-300" width="24" />
                    </div>
            </div>
        </div>

        <!-- Filters & Toolbar -->
        <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <!-- Tabs -->
            <div class="flex bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-full">
                <button class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-50 text-slate-900 shadow-sm rounded-md transition-all whitespace-nowrap">Tous</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Janvier</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Février</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Mars</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Avril</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Mai</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Juin</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Juillet</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Août</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Septembre</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Octobre</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Novembre</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all whitespace-nowrap">Décembre</button>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3 w-full md:w-auto">
                <select class="w-full text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-600 outline-none">
                    <option value="" disabled selected>Séléctionnez une année</option>
                    <option>2026</option>
                    <option>2025</option>
                </select>
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
                        <tr class="text-xs text-slate-500 dark:text-slate-700 border-b border-slate-100 bg-slate-50/50">
                            <th class="font-medium py-3 px-6">IP</th>
                            <th class="font-medium py-3 px-6">La région / état</th>
                            <th class="font-medium py-3 px-6">Provenance</th>
                            <th class="font-medium py-3 px-6">Date de venue</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-50">
                        <tr class="group hover:bg-slate-50 transition-colors" v-for="index in 5" :key="index">
                            <td class="py-3 px-6 text-xs text-slate-400">192.168.1.1</td>
                            <td class="py-3 px-6 text-xs text-slate-400">Dakar</td>
                            <td class="py-3 px-6 text-xs text-slate-400">Sénégal</td>
                            <td class="py-3 px-6 text-xs text-slate-500">22 Jan 2023</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Pagination -->
            <div class="flex items-center justify-between p-4 border-t border-slate-100">
                <span class="text-xs text-slate-500">Affichage de <span class="font-medium text-slate-900">1-4</span> sur <span class="font-medium text-slate-900">205687</span> visiteurs</span>
                <div class="flex gap-2">
                    <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50" :disabled="true">Précédent</button>
                    <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 hover:bg-slate-50">Suivant</button>
                </div>
            </div>
        </div>

    </div>
</template>