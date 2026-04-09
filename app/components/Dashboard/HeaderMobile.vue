<template>
    <transition name="slide">
        <aside class="fixed inset-0 z-50 lg:hidden bg-black/50 cursor-pointer" @click="closeModal">
            <div class="absolute left-0 top-0 h-full w-64 bg-white dark:bg-dark shadow-xl flex flex-col">

                <!-- Navigation -->
                <div class="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scroll">

                    <!-- Group: Principal -->
                    <div class="space-y-1">
                        <p
                            class="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-200 uppercase tracking-widest mb-2">
                            Principal</p>
                        <nuxt-link to="/dashboard"
                            :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard' ? 'bg-slate-100 text-slate-900 dark:bg-transparent dark:text-slate-200 dark:border' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                            <Icon name="solar:home-smile-linear" class="w-5 h-5 text-slate-900" />
                            Accueil
                        </nuxt-link>
                    </div>

                    <!-- Group: Contenu -->
                    <div class="space-y-1">
                        <p
                            class="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-200 uppercase tracking-widest mb-2">
                            Gestion du Contenu</p>
                        <nuxt-link to="/dashboard/stories"
                            :class="`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-stories' ? 'bg-slate-100 text-slate-900 dark:bg-transparent dark:text-slate-200 dark:border' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                            <div class="flex items-center gap-3">
                                <Icon name="solar:documents-minimalistic-linear"
                                    class="w-5 h-5 group-hover:text-slate-900 dark:group-hover:text-slate-400 transition-colors" />
                                Histoires
                            </div>
                            <span
                                class="px-1.5 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[10px] font-semibold">{{
                                formatNumber(countAll) }}</span>
                        </nuxt-link>
                        <nuxt-link to="/dashboard/categories"
                            :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-categories' ? 'bg-slate-100 text-slate-900 dark:bg-transparent dark:text-slate-200 dark:border' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                            <Icon name="solar:tag-linear"
                                class="w-5 h-5 group-hover:text-slate-900 dark:group-hover:text-slate-400 transition-colors" />
                            Catégories
                        </nuxt-link>
                    </div>

                    <!-- Group: Communauté -->
                    <div class="space-y-1">
                        <p
                            class="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-200 uppercase tracking-widest mb-2">
                            Communauté</p>
                        <nuxt-link to="/dashboard/users"
                            :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-users' ? 'bg-slate-100 text-slate-900 dark:bg-transparent dark:text-slate-200 dark:border' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                            <Icon name="solar:users-group-rounded-linear"
                                class="w-5 h-5 group-hover:text-slate-900 dark:group-hover:text-slate-400 transition-colors" />
                            Utilisateurs
                        </nuxt-link>
                        <nuxt-link to="/dashboard/authors"
                            :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-authors' ? 'bg-slate-100 text-slate-900 dark:bg-transparent dark:text-slate-200 dark:border' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                            <Icon name="solar:pen-new-square-linear"
                                class="w-5 h-5 group-hover:text-slate-900 dark:group-hover:text-slate-400 transition-colors" />
                            Auteurs
                        </nuxt-link>
                        <nuxt-link to="/dashboard/visitors"
                            :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-visitors' ? 'bg-slate-100 text-slate-900 dark:bg-transparent dark:text-slate-200 dark:border' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                            <Icon name="solar:eye-linear"
                                class="w-5 h-5 group-hover:text-slate-900 dark:group-hover:text-slate-400 transition-colors" />
                            Visiteurs
                        </nuxt-link>
                    </div>

                    <!-- Group: Géographie & Système -->
                    <div class="space-y-1">
                        <p
                            class="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-200 uppercase tracking-widest mb-2">
                            Système</p>
                        <nuxt-link to="/dashboard/countries"
                            :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-countries' ? 'bg-slate-100 text-slate-900 dark:bg-transparent dark:text-slate-200 dark:border' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                            <Icon name="mdi:globe" class="w-5 h-5 group-hover:text-slate-900 dark:group-hover:text-slate-400 transition-colors" />
                            Pays / Régions
                        </nuxt-link>
                        <nuxt-link to="/dashboard/roles"
                            :class="`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${route.name === 'dashboard-roles' ? 'bg-slate-100 text-slate-900 dark:bg-transparent dark:text-slate-200 dark:border' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'} group transition-colors`">
                            <Icon name="mdi:lock-plus" class="w-5 h-5 group-hover:text-slate-900 dark:group-hover:text-slate-400 transition-colors" />
                            Rôles
                        </nuxt-link>
                    </div>
                </div>

                <!-- User Profile (Bottom) -->
                <div class="p-4 flex flex-col gap-2 border-t border-slate-100" v-if="user">
                    <nuxt-link to="/dashboard/account"
                        class="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left">
                        <img v-if="user?.photo" :src="user.photo.includes('https') ? user.photo : `${config.public.apiBackendUrl}/uploads/users/${user?.photo}`"
                            alt="Profil"
                            class="w-8 h-8 rounded-full" />
                        <span v-if="!user?.photo"
                            class="p-1 text-xs flex items-center justify-center w-8 h-8 rounded-full"
                            :style="`background-color: ${user?.code_color}`">
                            {{ user?.name.split(" ").length > 1 ? `${user?.name.charAt(0).toUpperCase() +
                                user?.name.split(" ")[1]?.charAt(0).toUpperCase()}` : user?.name.charAt(0).toUpperCase() }}
                        </span>
                        <div class="flex-1 min-w-0">
                            <p class="text-xs font-semibold text-slate-900 dark:text-white truncate">{{ user?.name }}
                            </p>
                            <p class="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-200 truncate">{{
                                user?.role }}</p>
                        </div>
                        <Icon name="solar:alt-arrow-right-linear" class="w-5 h-5 text-slate-400" />
                    </nuxt-link>
                    <button v-if="user" @click="logout()"
                        class="flex items-center justify-center gap-2 text-sm text-center bg-red-600 text-white py-2 md:px-6 px-4 rounded-lg dark:border-gray-600 dark:border-[1px]">
                        <Icon name="mdi:logout" class="w-5 h-5" />
                        Déconnexion
                    </button>
                </div>
            </div>
        </aside>
    </transition>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const emit = defineEmits(['close-modal']);
const { toConnectUser, logout } = authenticate();
const { findAllBooksPaginated } = booksData();
const countAll = ref<number>(0);
const user = ref<User | null>(null);

onMounted(async () => {
    const { countAll: cA } = await findAllBooksPaginated(1, 2);
    countAll.value = cA;
    user.value = await toConnectUser();
})

const closeModal = () => {
    emit('close-modal');
} 
</script>

<style scoped>
/* Transition sidebar mobile */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
    opacity: 1;
}
</style>