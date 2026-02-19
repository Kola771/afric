<template>
    <div class="max-w-6xl mx-auto space-y-8">
                
        <!-- Welcome Section -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
                <h1 class="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Bonjour, Jean 👋</h1>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Voici ce qui se passe sur Afric Storyline aujourd'hui.</p>
            </div>
            <div class="flex gap-3">
                <button class="h-9 px-4 rounded-lg bg-white dark:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:filter-linear" class="w-5 h-5" />
                    Filtres
                </button>
                <nuxt-link target="_blank" to="/my-stories" class="h-9 px-4 rounded-lg dark:bg-slate-800 dark:border bg-slate-900 text-xs font-medium text-white hover:bg-slate-800 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:add-circle-linear" class="w-5 h-5" />
                    Mes histoires
                </nuxt-link>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Stat Card 1 -->
            <div class="bg-white dark:bg-slate-100 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <Icon name="solar:users-group-rounded-linear" class="w-5 h-5" />
                    </div>
                </div>
                <p class="text-sm font-medium text-slate-500">Utilisateurs Totaux</p>
                <p class="text-2xl font-display font-bold text-slate-900 mt-1">24,592</p>
            </div>

            <!-- Stat Card 2 -->
            <div class="bg-white dark:bg-slate-100 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                        <Icon name="solar:documents-minimalistic-linear" class="w-5 h-5" />
                    </div>
                </div>
                <p class="text-sm font-medium text-slate-500">Histoires Publiées</p>
                <p class="text-2xl font-display font-bold text-slate-900 mt-1">1,843</p>
            </div>

            <!-- Stat Card 3 -->
            <div class="bg-white dark:bg-slate-100 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                        <Icon name="solar:eye-linear" class="w-5 h-5" />
                    </div>
                </div>
                <p class="text-sm font-medium text-slate-500">Visiteurs (7j)</p>
                <p class="text-2xl font-display font-bold text-slate-900 mt-1">89,200</p>
            </div>

            <!-- Stat Card 4 -->
            <div class="bg-white dark:bg-slate-100 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                        <Icon name="solar:star-linear" class="w-5 h-5" />
                    </div>
                </div>
                <p class="text-sm font-medium text-slate-500">Auteurs Actifs</p>
                <p class="text-2xl font-display font-bold text-slate-900 mt-1">340</p>
            </div>
        </div>

        <!-- Main Grid: Traffic & Map (Placeholder) -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Chart Area -->
            <div class="lg:col-span-2 bg-white dark:bg-slate-100 rounded-xl border border-slate-200 shadow-sm p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-base font-semibold text-slate-900">Trafic de lecture</h3>
                    <select class="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-600 outline-none">
                        <option>Cette semaine</option>
                        <option>Ce mois</option>
                    </select>
                </div>
                <!-- Fake Bar Chart CSS Implementation -->
                <div class="flex items-end justify-between h-48 gap-2 pt-4">
                    <!-- Bar Item -->
                    <div class="w-full flex flex-col items-center gap-2 group cursor-pointer">
                        <div class="w-full max-w-[24px] bg-slate-100 rounded-t-sm h-[40%] group-hover:bg-orange-500 transition-all relative">
                            <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">40%</div>
                        </div>
                        <span class="text-[10px] font-medium text-slate-400">Lundi</span>
                    </div>
                    <div class="w-full flex flex-col items-center gap-2 group cursor-pointer">
                        <div class="w-full max-w-[24px] bg-slate-100 rounded-t-sm h-[65%] group-hover:bg-orange-500 transition-all relative">
                            <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">65%</div>
                        </div>
                        <span class="text-[10px] font-medium text-slate-400">Mardi</span>
                    </div>
                    <div class="w-full flex flex-col items-center gap-2 group cursor-pointer">
                        <div class="w-full max-w-[24px] bg-slate-100 rounded-t-sm h-[50%] group-hover:bg-orange-500 transition-all relative">
                            <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">50%</div>
                        </div>
                        <span class="text-[10px] font-medium text-slate-400">Merc</span>
                    </div>
                    <div class="w-full flex flex-col items-center gap-2 group cursor-pointer">
                        <div class="w-full max-w-[24px] bg-orange-500 rounded-t-sm h-[85%] relative shadow-lg shadow-orange-500/20">
                            <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded">85%</div>
                        </div>
                        <span class="text-[10px] font-medium text-slate-900">Jeudi</span>
                    </div>
                    <div class="w-full flex flex-col items-center gap-2 group cursor-pointer">
                        <div class="w-full max-w-[24px] bg-slate-100 rounded-t-sm h-[60%] group-hover:bg-orange-500 transition-all relative">
                                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">60%</div>
                        </div>
                        <span class="text-[10px] font-medium text-slate-400">Vend</span>
                    </div>
                    <div class="w-full flex flex-col items-center gap-2 group cursor-pointer">
                        <div class="w-full max-w-[24px] bg-slate-100 rounded-t-sm h-[75%] group-hover:bg-orange-500 transition-all relative">
                                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">75%</div>
                        </div>
                        <span class="text-[10px] font-medium text-slate-400">Sam</span>
                    </div>
                    <div class="w-full flex flex-col items-center gap-2 group cursor-pointer">
                        <div class="w-full max-w-[24px] bg-slate-100 rounded-t-sm h-[45%] group-hover:bg-orange-500 transition-all relative">
                                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">45%</div>
                        </div>
                        <span class="text-[10px] font-medium text-slate-400">Dim</span>
                    </div>
                </div>
            </div>

            <!-- Top Countries / Categories -->
            <div class="bg-white dark:bg-slate-100 rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
                <h3 class="text-base font-semibold text-slate-900 mb-4">Top Pays Lecteurs</h3>
                <div class="flex-1 space-y-4">
                    <!-- Country Item -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-6 rounded bg-slate-100 overflow-hidden relative border border-slate-200">
                                <!-- Ivory Coast Flag placeholder -->
                                <div class="absolute inset-0 flex">
                                    <div class="w-1/3 bg-orange-500"></div>
                                    <div class="w-1/3 bg-white"></div>
                                    <div class="w-1/3 bg-green-600"></div>
                                </div>
                            </div>
                            <span class="text-sm font-medium text-slate-700">Côte d'Ivoire</span>
                        </div>
                        <span class="text-sm font-semibold text-slate-900">42%</span>
                    </div>
                    <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full bg-slate-900 w-[42%] rounded-full"></div>
                    </div>

                    <!-- Country Item -->
                    <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-6 rounded bg-slate-100 overflow-hidden relative border border-slate-200">
                                <!-- Senegal Flag placeholder -->
                                <div class="absolute inset-0 flex">
                                    <div class="w-1/3 bg-green-600"></div>
                                    <div class="w-1/3 bg-yellow-400 flex items-center justify-center text-[6px] text-green-700">★</div>
                                    <div class="w-1/3 bg-red-600"></div>
                                </div>
                            </div>
                            <span class="text-sm font-medium text-slate-700">Sénégal</span>
                        </div>
                        <span class="text-sm font-semibold text-slate-900">28%</span>
                    </div>
                    <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full bg-slate-400 w-[28%] rounded-full"></div>
                    </div>

                        <!-- Country Item -->
                        <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-6 rounded bg-slate-100 overflow-hidden relative border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-400">
                                FR
                            </div>
                            <span class="text-sm font-medium text-slate-700">France</span>
                        </div>
                        <span class="text-sm font-semibold text-slate-900">15%</span>
                    </div>
                    <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full bg-slate-300 w-[15%] rounded-full"></div>
                    </div>
                </div>
                <button class="w-full mt-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    Voir tous les pays
                </button>
            </div>
        </div>

        <!-- Recent Stories Table -->
        <div class="bg-white dark:bg-slate-100 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 class="text-base font-semibold text-slate-900">Histoires Récentes</h3>
                <nuxt-link to="/dashboard/stories" class="text-xs font-medium text-orange-600 hover:text-orange-700 hover:underline">Tout voir</nuxt-link>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-xs text-slate-400 dark:text-slate-700 border-b border-slate-100 bg-slate-50/50">
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Titre de l'histoire</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Auteur</th>
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
                            <td class="py-3 px-6 text-slate-600"><nuxt-link class="hover:underline hover:text-orange-600 dark:hover:text-orange-500 hover:duration-300 hover:ease-linear" to="/dashboard/authors/author-uuid-1">Amadou Bah</nuxt-link></td>
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
                                <div class="flex items-center gap-4">
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">42</span> <span class="text-slate-400"><Icon name="mdi:heart" class="w-4 h-4" /></span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">12k</span> <span class="text-slate-400"><Icon name="mdi:eye" class="w-4 h-4" /></span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">1.1k</span> <span class="text-slate-400"><Icon name="mdi:comments" class="w-4 h-4" /></span>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium bg-green-50 text-green-700 border border-green-100">
                                    <span class="w-1 h-1 rounded-full bg-green-600"></span>
                                    Terminée
                                </span>
                            </td>
                            <td class="py-3 px-6 text-right">
                                <nuxt-link to="/dashboard/stories/story-uuid-1" class="text-slate-400 hover:text-slate-900 transition-colors"><Icon name="mdi:eye" width="16" /></nuxt-link>
                                <button class="ml-2 text-red-600 hover:text-red-700 transition-colors"><Icon name="mdi:trash" width="16" /></button>
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
                            <td class="py-3 px-6 text-slate-600"><nuxt-link class="hover:underline hover:text-orange-600 dark:hover:text-orange-500 hover:duration-300 hover:ease-linear" to="/dashboard/authors/author-uuid-2">Sarah Koné</nuxt-link></td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                    Drame
                                </span>
                                <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                    Comédie
                                </span>
                            </td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-4">
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">47</span> <span class="text-slate-400"><Icon name="mdi:heart" class="w-4 h-4" /></span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">2k</span> <span class="text-slate-400"><Icon name="mdi:eye" class="w-4 h-4" /></span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">1.4k</span> <span class="text-slate-400"><Icon name="mdi:comments" class="w-4 h-4" /></span>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                    <span class="w-1 h-1 rounded-full bg-amber-600"></span>
                                    En pause
                                </span>
                            </td>
                            <td class="py-3 px-6 text-right">
                                <nuxt-link to="/dashboard/stories/story-uuid-1" class="text-slate-400 hover:text-slate-900 transition-colors"><Icon name="mdi:eye" width="16" /></nuxt-link>
                                <button class="ml-2 text-red-600 hover:text-red-700 transition-colors"><Icon name="mdi:trash" width="16" /></button>
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
                            <td class="py-3 px-6 text-slate-600"><nuxt-link class="hover:underline hover:text-orange-600 dark:hover:text-orange-500 hover:duration-300 hover:ease-linear" to="/dashboard/authors/author-uuid-3">Marc Ouedraogo</nuxt-link></td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                    Tragédie
                                </span>
                            </td>
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-4">
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">502</span> <span class="text-slate-400"><Icon name="mdi:heart" class="w-4 h-4" /></span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">10k</span> <span class="text-slate-400"><Icon name="mdi:eye" class="w-4 h-4" /></span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900">1k</span> <span class="text-slate-400"><Icon name="mdi:comments" class="w-4 h-4" /></span>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium bg-green-50 text-green-700 border border-green-100">
                                    <span class="w-1 h-1 rounded-full bg-green-600"></span>
                                    Terminée
                                </span>
                            </td>
                            <td class="py-3 px-6 text-right">
                                <nuxt-link to="/dashboard/stories/story-uuid-1" class="text-slate-400 hover:text-slate-900 transition-colors"><Icon name="mdi:eye" width="16" /></nuxt-link>
                                <button class="ml-2 text-red-600 hover:text-red-700 transition-colors"><Icon name="mdi:trash" width="16" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>