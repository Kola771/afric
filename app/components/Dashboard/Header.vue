<template>
      <!-- SIDEBAR -->
    <aside class="hidden min-h-screen lg:flex w-64 flex-col border-r border-slate-200 bg-white dark:bg-dark relative z-20">
        <!-- Logo -->
        <div class="h-16 flex items-center px-6 border-b border-slate-100">
            <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-slate-200 dark:shadow-slate-600">
                    <Icon name="solar:book-2-bold" class="w-5 h-5" />
                </div>
                <span class="font-display font-bold text-slate-900 dark:text-white tracking-tight text-sm">Afric Storyline</span>
            </div>
        </div>

        <!-- Navigation -->
        <div class="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scroll">
            
            <!-- Group: Principal -->
            <div class="space-y-1">
                <p class="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-200 uppercase tracking-widest mb-2">Principal</p>
                <nuxt-link to="/dashboard" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="solar:home-smile-linear" class="w-5 h-5" />
                    Accueil
                </nuxt-link>
            </div>

            <!-- Group: Contenu -->
            <div class="space-y-1">
                <p class="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-200 uppercase tracking-widest mb-2">Gestion du Contenu</p>
                <nuxt-link to="#" :class="`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-stories' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <div class="flex items-center gap-3">
                        <Icon name="solar:documents-minimalistic-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                        Histoires
                    </div>
                    <span class="px-1.5 py-0.5 rounded-md bg-brand-50 text-brand-600 text-[10px] font-semibold">12</span>
                </nuxt-link>
                <nuxt-link to="#" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-categories' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="solar:tag-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Catégories
                </nuxt-link>
            </div>

            <!-- Group: Communauté -->
            <div class="space-y-1">
                <p class="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-200 uppercase tracking-widest mb-2">Communauté</p>
                <nuxt-link to="#" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-users' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="solar:users-group-rounded-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Utilisateurs
                </nuxt-link>
                <nuxt-link to="/dashboard/authors" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-authors' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="solar:pen-new-square-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Auteurs
                </nuxt-link>
                <nuxt-link to="#" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-visitors' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="solar:eye-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Visiteurs
                </nuxt-link>
            </div>

            <!-- Group: Géographie & Système -->
            <div class="space-y-1">
                <p class="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-200 uppercase tracking-widest mb-2">Système</p>
                <nuxt-link to="#" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-countries' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="mdi:globe" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Pays / Régions
                </nuxt-link>
                <nuxt-link to="#" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="solar:settings-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Paramètres
                </nuxt-link>
            </div>
        </div>

        <!-- User Profile (Bottom) -->
        <div class="p-4 border-t border-slate-100">
            <button class="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50 transition-colors text-left">
                <img src="https://ui-avatars.com/api/?name=Jean+Kouassi&background=0f172a&color=fff" alt="Admin" class="w-8 h-8 rounded-full">
                <div class="flex-1 min-w-0">
                    <p class="text-xs font-semibold text-slate-900 dark:text-white truncate">Jean Kouassi</p>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-200 truncate">Admin Principal</p>
                </div>
                <Icon name="solar:alt-arrow-right-linear" class="w-5 h-5 text-slate-400" />
            </button>
        </div>
    </aside>
</template>
<script setup lang="ts">
const route = useRoute();
</script>