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
                <nuxt-link to="/dashboard/stories" :class="`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-stories' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <div class="flex items-center gap-3">
                        <Icon name="solar:documents-minimalistic-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                        Histoires
                    </div>
                    <span class="px-1.5 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[10px] font-semibold">12</span>
                </nuxt-link>
                <nuxt-link to="/dashboard/categories" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-categories' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="solar:tag-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Catégories
                </nuxt-link>
            </div>

            <!-- Group: Communauté -->
            <div class="space-y-1">
                <p class="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-200 uppercase tracking-widest mb-2">Communauté</p>
                <nuxt-link to="/dashboard/users" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-users' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="solar:users-group-rounded-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Utilisateurs
                </nuxt-link>
                <nuxt-link to="/dashboard/authors" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-authors' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="solar:pen-new-square-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Auteurs
                </nuxt-link>
                <nuxt-link to="/dashboard/visitors" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-visitors' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="solar:eye-linear" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Visiteurs
                </nuxt-link>
            </div>

            <!-- Group: Géographie & Système -->
            <div class="space-y-1">
                <p class="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-200 uppercase tracking-widest mb-2">Système</p>
                <nuxt-link to="/dashboard/countries" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-countries' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="mdi:globe" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Pays / Régions
                </nuxt-link>
                <nuxt-link to="/dashboard/roles" :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-roles' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                    <Icon name="mdi:lock-plus" class="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                    Rôles
                </nuxt-link>
            </div>
        </div>

        <!-- User Profile (Bottom) -->
        <div class="p-4 border-t border-slate-100" v-if="user">
            <nuxt-link to="/dashboard/account" class="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left">
                <img v-if="user?.photo" :src="`${config.public.apiBackendUrl}/uploads/users/${user?.photo}`" alt="Profil" class="w-8 h-8 border-orange-600 border-2 dark:border-orange-500 rounded-full" />
                <span v-if="!user?.photo" class="p-1 text-xs flex items-center justify-center w-8 h-8 rounded-full" :style="`background-color: ${user?.code_color}`">
                {{ user?.name.split(" ").length > 1 ? `${user?.name.charAt(0).toUpperCase() + user?.name.split(" ")[1]?.charAt(0).toUpperCase()}` : user?.name.charAt(0).toUpperCase() }}
                </span>
                <div class="flex-1 min-w-0">
                    <p class="text-xs font-semibold text-slate-900 dark:text-white truncate">{{ user?.name }}</p>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-200 truncate">{{ user?.role }}</p>
                </div>
                <Icon name="solar:alt-arrow-right-linear" class="w-5 h-5 text-slate-400" />
            </nuxt-link>
        </div>
    </aside>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const { toConnectUser } = authenticate();
const user = ref<User | null>(null);

onMounted(async () => {
  user.value = await toConnectUser();
})
</script>