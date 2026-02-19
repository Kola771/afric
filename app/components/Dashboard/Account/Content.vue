<template>
    <div class="max-w-6xl mx-auto space-y-8">
                
        <!-- Welcome Section -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
                <h1 class="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Bonjour, Jean 👋</h1>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Faîtes une mise à jour de vos informations personnelles !</p>
            </div>
            <div class="flex gap-3">
                <button class="h-9 px-4 rounded-lg bg-red-600 text-white dark:bg-red-700 border border-slate-200 text-xs font-medium hover:bg-red-700 dark:hover:bg-red-800 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:logout-linear" class="w-5 h-5" />
                    Déconnexion
                </button>
            </div>
        </div>
        <form class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-1">
                <label for="fullname" class="text-sm text-slate-900 font-medium dark:text-white">Nom complet :</label>
                <input type="text" id="fullname" class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
            </div>
            <div class="flex flex-col gap-1">
                <label for="username" class="text-sm text-slate-900 font-medium dark:text-white">Pseudonyme :</label>
                <input type="text" id="username" class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
            </div>
            <div class="flex flex-col gap-1">
                <label for="email" class="text-sm text-slate-900 font-medium dark:text-white">Adresse électronique :</label>
                <input type="email" id="email" class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
            </div>
            <div class="flex flex-col gap-1">
                <label for="bio" class="text-sm text-slate-900 font-medium dark:text-white flex items-center justify-between">Bibliographie : <span class="font-normal text-slate-500 dark:text-slate-200 text-xs">(Optionnel)</span></label>
                <textarea id="bio" name="bio" rows="3" 
                    class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3 resize-none"
                    placeholder="Vos publications précédentes..."></textarea>
            </div>
            <div class="flex flex-col gap-1">
                <label for="country" class="text-sm text-slate-900 font-medium dark:text-white">Pays d'origine :</label>
                <select required id="country" name="country" class="mt-1 block w-full rounded-lg border-0 py-2.5 lg:p-3 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all">
                    <option value="" disabled selected>Pays d'origine</option>
                    <option value="benin">Bénin</option>
                    <option value="burkina_faso">Burkina Faso</option>
                    <option value="cote_d_ivoire">Côte d'Ivoire</option>
                    <option value="mali">Mali</option>
                    <option value="niger">Niger</option>
                    <option value="senegal">Sénégal</option>
                    <option value="togo">Togo</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-1">Vos préférences :</label>
                <div class="flex flex-wrap gap-2">
                    <label class="cursor-pointer group">
                        <input type="checkbox" class="peer sr-only" checked>
                        <div class="rounded-md px-3 py-2.5 lg:py-2 lg:px-5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                            <span>Roman</span>
                        </div>
                    </label>
                    <label class="cursor-pointer group">
                        <input type="checkbox" class="peer sr-only">
                        <div class="rounded-md px-3 py-2.5 lg:py-2 lg:px-5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                            <span>Poésie</span>
                        </div>
                    </label>
                    <label class="cursor-pointer group">
                        <input type="checkbox" class="peer sr-only" checked>
                        <div class="rounded-md px-3 py-2.5 lg:py-2 lg:px-5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                            <span>Sci-Fi</span>
                        </div>
                    </label>
                    <label class="cursor-pointer group">
                        <input type="checkbox" class="peer sr-only">
                        <div class="rounded-md px-3 py-2.5 lg:py-2 lg:px-5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                            <span>Essai</span>
                        </div>
                    </label>
                </div>
            </div>
            <div class="mt-2 flex flex-col md:flex-row md:justify-end">
                <button class="px-4 py-2.5 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors">Enregistrer les modifications</button>
            </div>
        </form>

    </div>
</template>