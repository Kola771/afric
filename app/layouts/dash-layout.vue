<template>
  <div class="h-screen flex">
    
    <DashboardHeader />
    <DashboardHeaderMobile v-if="isSidebarOpen" @close-modal="closeSidebar" />

    <div class="flex-1 flex flex-col h-full relative overflow-hidden">
       <!-- Topbar -->
        <header class="h-16 w-full flex items-center justify-between px-6 border-b border-slate-200 bg-white/80 dark:bg-dark backdrop-blur-sm z-10">
            <div class="flex items-center gap-4 lg:hidden">
                <button
                  class="text-slate-500 dark:text-slate-200 flex justify-center items-center"
                  @click="isSidebarOpen = true"
                >
                  <Icon name="solar:hamburger-menu-linear" class="w-5 h-5" />
                </button>
                <nuxt-link target="_blank" to="/" class="font-display font-bold text-slate-900 dark:text-white">Afric Storyline</nuxt-link>
            </div>
            
            <!-- Breadcrumb / Title -->
            <div class="hidden lg:flex items-center text-sm text-slate-500">
                <nuxt-link to="/dashboard" class="hover:text-slate-800 dark:text-white dark:hover:text-slate-200 cursor-pointer">Dashboard</nuxt-link>
                <span class="mx-2 text-slate-300">/</span>
                <span class="font-medium text-slate-900 dark:text-white" v-if="view">{{ view }}</span>
            </div>

            <!-- Right Actions -->
            <div class="flex items-center gap-4">
                <div class="relative hidden sm:block">
                  <Icon name="solar:magnifer-linear" class="absolute left-2 top-3 text-slate-400 w-4 h-4" />
                    <input type="search" placeholder="Rechercher..." class="h-10 pl-9 pr-4 rounded-lg dark:bg-transparent bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-300 w-64 transition-all">
                </div>
                <button class="relative lg:hidden flex items-center justify-center text-slate-500 dark:text-slate-200 dark:hover:bg-slate-800 hover:bg-slate-50 transition-colors">
                  <Icon name="solar:magnifer-linear" class="w-4 h-4" />
                </button>
                <ThemeToggle />
            </div>
        </header>

        <main class="flex-1 overflow-y-auto p-6 lg:p-8 custom-scroll">
          <slot />
        </main>
    </div>

</div>
</template>
<script lang="ts" setup>
  useSeoMeta({
    title: 'Dashboard',
  });
const route = useRoute();
const router = useRouter();
const view = ref<string>("");
const { authorizeRolePage } = authenticate();
const { getProfile } = usersData();
const profil = ref<User | null>(null);

const checkRouteName = () => {
  switch (route.name) {
    case "dashboard":
      view.value = "Vue d'ensemble"
      break;
    case "dashboard-users":
      view.value = "Utilisateurs"
      break;
    case "dashboard-categories":
      view.value = "Catégories"
      break;
    case "dashboard-stories":
      view.value = "Histoires"
      break;
    case "dashboard-authors":
      view.value = "Auteurs"
      break;
    case "dashboard-visitors":
      view.value = "Visiteurs"
      break;
    case "dashboard-countries":
      view.value = "Pays/Région"
      break;
    case "dashboard-roles":
      view.value = "Rôles"
      break;
    default:
      console.log("Default")
      break;
  }
}
watch(() => route.name, () => {
  checkRouteName()
})

onMounted(async () => {
  profil.value = await getProfile();
  if(profil.value && !authorizeRoleDash(`${profil.value.role}`)) {
    router.push("/")
  }
  authorizeRolePage();
  checkRouteName();
})

const isSidebarOpen = ref(false);

const closeSidebar = () => {
  isSidebarOpen.value = false;
}
</script>
