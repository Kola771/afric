<template>
    <div class="max-w-6xl mx-auto space-y-6">
                
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Gestion des Auteurs</h1>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Gérez les écrivains, leurs permissions et suivez leurs performances.</p>
            </div>
            <div class="flex gap-3">
                    <button class="h-9 px-4 rounded-lg bg-white dark:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:export-linear" class="w-5 h-5" />
                    Exporter
                </button>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Total Auteurs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">340</p>
                    <Icon name="solar:users-group-two-rounded-linear" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Auteurs Actifs (30j)</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">182</p>
                    <span class="text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+12%</span>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Auteurs certifiés</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">8</p>
                    <span class="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Top Catégorie</p>
                <div class="flex items-end justify-between">
                    <p class="text-lg font-display font-bold text-slate-900 truncate">Contes Africains</p>
                    <Icon name="solar:bookmark-linear" class="text-slate-300" width="20" />
                </div>
            </div>
        </div>

        <!-- Filters & Toolbar -->
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <!-- Tabs -->
            <div class="flex bg-slate-100 p-1 rounded-lg">
                <button class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-50 text-slate-900 shadow-sm rounded-md transition-all">Tous</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all">Standard</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all">Top</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all">Certifiés</button>
                <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-all">Bloqués</button>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3 w-full sm:w-auto">
                <div class="relative flex-1 sm:flex-none">
                    <Icon name="solar:magnifer-linear" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="search" placeholder="Rechercher un auteur..." class="h-8 pl-8 pr-3 w-full sm:w-48 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
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
                        <tr class="text-xs text-slate-500 dark:text-slate-700 border-b border-slate-100 bg-slate-50/50">
                            <th class="font-medium py-3 px-6 w-10"><input type="checkbox" class="rounded border-slate-300 text-slate-900 focus:ring-0 w-3.5 h-3.5"></th>
                            <th class="font-medium py-3 px-6">Auteur</th>
                            <th class="font-medium py-3 px-6">Performance</th>
                            <th class="font-medium py-3 px-6">Statut</th>
                            <th class="font-medium py-3 px-6">Date d'inscription</th>
                            <th class="font-medium py-3 px-6 text-right"></th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-50">
                        
                        <!-- Row 1 -->
                        <tr class="group hover:bg-slate-50 transition-colors">
                            <td class="py-3 px-6"><input type="checkbox" class="rounded border-slate-300 text-slate-900 focus:ring-0 w-3.5 h-3.5"></td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-3">
                                    <div class="relative">
                                        <img src="https://ui-avatars.com/api/?name=Amadou+Bah&background=cffafe&color=0e7490" class="w-9 h-9 rounded-full object-cover ring-2 ring-white">
                                        <div class="absolute -bottom-0.5 -right-0.5 bg-green-500 w-2.5 h-2.5 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div>
                                        <p class="font-medium text-slate-900 group-hover:text-orange-600 transition-colors">Amadou Bah</p>
                                        <p class="text-xs text-slate-400">amadou.bah@email.com</p>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-4">
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">42</span> <span class="text-slate-400">Histoires</span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">12k</span> <span class="text-slate-400">Vues</span>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-1.5">
                                    <Icon name="solar:verified-check-bold" class="text-orange-500 w-4 h-4" />
                                    <span class="text-xs font-medium text-slate-700">Certifié</span>
                                </div>
                            </td>
                            <td class="py-3 px-6 text-xs text-slate-500">22 Jan 2023</td>
                            <td class="py-3 px-6 text-right">
                                <button class="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
                                    <Icon name="mdi:eye" width="16" />
                                </button>
                                <button class="ml-1 p-1 rounded-md hover:bg-slate-100 text-red-600 hover:text-red-700 transition-colors">
                                    <Icon name="mdi:trash" width="16" />
                                </button>
                            </td>
                        </tr>

                        <!-- Row 2 -->
                        <tr class="group hover:bg-slate-50 transition-colors">
                            <td class="py-3 px-6"><input type="checkbox" class="rounded border-slate-300 text-slate-900 focus:ring-0 w-3.5 h-3.5"></td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-3">
                                    <div class="relative">
                                        <img src="https://ui-avatars.com/api/?name=Sarah+Kone&background=fdf4ff&color=a21caf" class="w-9 h-9 rounded-full object-cover ring-2 ring-white">
                                    </div>
                                    <div>
                                        <p class="font-medium text-slate-900 group-hover:text-orange-600 transition-colors">Sarah Koné</p>
                                        <p class="text-xs text-slate-400">sarah.k@email.com</p>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-4">
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">15</span> <span class="text-slate-400">Histoires</span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">3.2k</span> <span class="text-slate-400">Vues</span>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6">
                                <span class="text-xs font-medium text-slate-600">Standard</span>
                            </td>
                            <td class="py-3 px-6 text-xs text-slate-500">10 Mar 2023</td>
                            <td class="py-3 px-6 text-right">
                                <button class="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
                                    <Icon name="mdi:eye" width="16" />
                                </button>
                                <button class="ml-1 p-1 rounded-md hover:bg-slate-100 text-red-600 hover:text-red-700 transition-colors">
                                    <Icon name="mdi:trash" width="16" />
                                </button>
                            </td>
                        </tr>

                        <!-- Row 3 -->
                        <tr class="group hover:bg-slate-50 transition-colors">
                            <td class="py-3 px-6"><input type="checkbox" class="rounded border-slate-300 text-slate-900 focus:ring-0 w-3.5 h-3.5"></td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-3">
                                    <div class="relative">
                                        <img src="https://ui-avatars.com/api/?name=Marc+Ouedraogo&background=fff7ed&color=c2410c" class="w-9 h-9 rounded-full object-cover ring-2 ring-white">
                                        <div class="absolute -bottom-0.5 -right-0.5 bg-green-500 w-2.5 h-2.5 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div>
                                        <p class="font-medium text-slate-900 group-hover:text-orange-600 transition-colors">Marc Ouedraogo</p>
                                        <p class="text-xs text-slate-400">marc.o@email.com</p>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-4">
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">8</span> <span class="text-slate-400">Histoires</span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">850</span> <span class="text-slate-400">Vues</span>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-1.5">
                                    <Icon name="solar:shield-star-linear" class="text-purple-500 w-4 h-4" />
                                    <span class="text-xs font-medium text-slate-700">Top</span>
                                </div>
                            </td>
                            <td class="py-3 px-6 text-xs text-slate-500">05 Avr 2023</td>
                            <td class="py-3 px-6 text-right">
                                <button class="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
                                    <Icon name="mdi:eye" width="16" />
                                </button>
                                <button class="ml-1 p-1 rounded-md hover:bg-slate-100 text-red-600 hover:text-red-700 transition-colors">
                                    <Icon name="mdi:trash" width="16" />
                                </button>
                            </td>
                        </tr>

                            <!-- Row 4 -->
                            <tr class="group hover:bg-slate-50 transition-colors">
                            <td class="py-3 px-6"><input type="checkbox" class="rounded border-slate-300 text-slate-900 focus:ring-0 w-3.5 h-3.5"></td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-3">
                                    <div class="relative">
                                        <span class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 ring-2 ring-white">NN</span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-slate-900 group-hover:text-orange-600 transition-colors">Nouveau Nom</p>
                                        <p class="text-xs text-slate-400">nouveau@email.com</p>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-4">
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">0</span> <span class="text-slate-400">Histoires</span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">0</span> <span class="text-slate-400">Vues</span>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6">
                                <span class="text-xs font-medium text-slate-600">Standard</span>
                            </td>
                            <td class="py-3 px-6 text-xs text-slate-500">Auj.</td>
                            <td class="py-3 px-6 text-right">
                                <button class="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
                                    <Icon name="mdi:eye" width="16" />
                                </button>
                                <button class="ml-1 p-1 rounded-md hover:bg-slate-100 text-red-600 hover:text-red-700 transition-colors">
                                    <Icon name="mdi:trash" width="16" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Pagination -->
            <div class="flex items-center justify-between p-4 border-t border-slate-100">
                <span class="text-xs text-slate-500">Affichage de <span class="font-medium text-slate-900">1-4</span> sur <span class="font-medium text-slate-900">340</span> auteurs</span>
                <div class="flex gap-2">
                    <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50" :disabled="true">Précédent</button>
                    <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 hover:bg-slate-50">Suivant</button>
                </div>
            </div>
        </div>

    </div>
</template>