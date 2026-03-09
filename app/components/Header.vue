<template>
  <div>
    <header>
      <nav
        class="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 dark:bg-dark/80 dark:border-slate-300 dark:text-white backdrop-blur-md transition-all">

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <nuxt-link to="/" class="flex items-center gap-2.5 group">
              <div
                class="w-8 h-8 bg-primary rounded-lg dark:border-gray-600 dark:border flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300 tracking-tighter">
                <Icon name="solar:book-2-bold" class="w-5 h-5" />
              </div>
              <span class="font-display font-semibold dark:text-gray-200 text-slate-900 tracking-tight text-lg">
                Afric <span class="text-orange-600 dark:text-orange-500">Storyline</span>
              </span>
            </nuxt-link>
            <!-- Desktop Menu -->
            <div class="hidden lg:flex items-center gap-8 text-slate-500 text-[13.5px] xl:text-sm">
              <nuxt-link to="/"
                :class="`${route.path === '/' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">Découvrir</nuxt-link>
              <nuxt-link to="/categories"
                :class="`${route.path === '/categories' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">Categories</nuxt-link>
              <nuxt-link to="/stories"
                :class="`${route.path === '/stories' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">Livres</nuxt-link>
              <nuxt-link to="/authors"
                :class="`${route.path === '/authors' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">Auteurs</nuxt-link>
              <nuxt-link to="/my-stories" v-if="user && profil && authorizeRoleUser(`${profil?.role}`)"
                :class="`${route.path === '/my-stories' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">Mes
                histoires</nuxt-link>
              <nuxt-link to="/about" v-if="!user"
                :class="`${route.path === '/about' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">A
                propos</nuxt-link>
            </div>
            <!-- Right Actions -->
            <div class="flex items-center gap-3">
              <!-- Desktop actions -->
              <button @click="toggleSearch"
                class="lg:hidden flex p-2 text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-gray-400 transition-colors">
                <Icon name="solar:magnifer-linear" class="w-5 h-5" />
              </button>
              <ThemeToggle class="lg:hidden" />
              <!-- Hamburger (mobile only) -->
              <button @click="isOpen = !isOpen" class="lg:hidden p-2 mt-1 text-slate-700 dark:text-white">
                <Icon :name="isOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6 transition-transform duration-300" />
              </button>
              <!-- Desktop actions -->
              <button @click="toggleSearch"
                class="hidden lg:flex p-2 text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-gray-400 transition-colors">
                <Icon name="solar:magnifer-linear" class="w-4 h-4 xl:w-5 xl:h-5" />
              </button>
              <div class="h-5 w-px bg-slate-200 hidden lg:block"></div>

              <div class="lg:flex items-center gap-1 hidden relative" v-if="user">
                <div class="relative max-w-32" @mouseenter="showProfileMenu = true"
                  @mouseleave="showProfileMenu = false">
                  <!-- Avatar cliquable -->
                  <div
                    class="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300 border-slate-200 border rounded-full py-1 pl-1 pr-1.5 cursor-pointer">
                    <img v-if="user.photo" :src="`${config.public.apiBackendUrl}/uploads/users/${user.photo}`"
                      alt="Profil"
                      class="w-7 h-7 border-orange-600 border-2 dark:border-orange-500 rounded-full flex-shrink-0" />
                    <span v-if="!user.photo"
                      class="p-1 text-xs flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
                      :style="`background-color: ${user.code_color}`">
                      {{ user.name.split(" ").length > 1
                        ? `${user.name.charAt(0).toUpperCase() + user.name.split(" ")[1]?.charAt(0).toUpperCase()}`
                        : user.name.charAt(0).toUpperCase() }}
                    </span>
                    <span class="text-xs flex truncate"><span>{{ user.name }}</span></span>
                  </div>

                  <!-- Menu flottant (en dehors du nuxt-link) -->
                  <div v-if="showProfileMenu"
                    class="absolute top-full text-[13.5px] mt-1 right-0 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-2 z-50">
                    <nuxt-link @click="showProfileMenu = false" to="/profil"
                      class="block px-4 py-2 flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <Icon name="mdi:account" class="w-4 h-4" />
                      Mon profil
                    </nuxt-link>
                    <nuxt-link v-if="profil && authorizeRoleDash(`${profil.role}`)" @click="showProfileMenu = false" to="/dashboard"
                      class="block px-4 py-2 flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <Icon name="mdi:view-dashboard" class="w-4 h-4" />
                      Dashboard
                    </nuxt-link>
                    <button @click="logout(); showProfileMenu = false"
                      class="w-full text-left px-4 py-2 flex items-center gap-2 text-red-600 dark:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <Icon name="mdi:logout" class="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                </div>

              </div>

              <nuxt-link v-if="!user" to="/login"
                class="hidden lg:flex items-center gap-2 text-[13.5px] xl:text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-white dark:hover:text-gray-400 transition-colors px-2">
                <Icon name="mdi:login" class="w-4 h-5" />
                Connexion
              </nuxt-link>
              <nuxt-link v-if="!user" to="/register"
                class="hidden lg:flex items-center gap-2 bg-primary hover:bg-slate-800 dark:bg-white dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800 dark:text-stone-700 text-white px-4 py-2 rounded-full text-[13.5px] xl:text-sm font-medium transition-all shadow-sm hover:shadow-md transform active:scale-95">
                <Icon name="mdi:account-plus" class="w-4 h-5" />
                <span>Commencer</span>
              </nuxt-link>
              <ThemeToggle class="hidden lg:flex" />
            </div>
          </div>
        </div>
      </nav>
    </header>

    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 bg-black/40 z-40 lg:hidden"></div>
    <!-- 🔥 Mobile Menu avec animation -->
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
      <div v-if="isOpen"
        class="fixed flex flex-col justify-between top-0 left-0 h-full w-2/3 bg-white dark:bg-dark border-r border-slate-200 dark:border-gray-700 px-6 py-6 space-y-5 shadow-2xl z-50 lg:hidden">
        <nuxt-link to="/" class="flex items-center gap-2.5 group">
          <div
            class="w-8 h-8 bg-primary rounded-lg dark:border-gray-600 dark:border flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300 tracking-tighter">
            <Icon name="solar:book-2-bold" class="w-5 h-5" />
          </div>
          <span class="font-display font-semibold dark:text-gray-200 text-slate-900 tracking-tight text-lg">
            Afric <span class="text-orange-600 dark:text-orange-500">Storyline</span>
          </span>
        </nuxt-link>

        <div class="space-y-5 flex-1 overflow-y-auto custom">
          <nuxt-link to="/" @click="isOpen = !isOpen"
            :class="`${route.path === '/' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">Découvrir</nuxt-link>
          <nuxt-link to="/categories" @click="isOpen = !isOpen"
            :class="`${route.path === '/categories' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">Categories</nuxt-link>
          <nuxt-link to="/stories" @click="isOpen = !isOpen"
            :class="`${route.path === '/stories' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">Livres</nuxt-link>
          <nuxt-link to="/authors" @click="isOpen = !isOpen"
            :class="`${route.path === '/authors' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">Auteurs</nuxt-link>
          <nuxt-link to="/about" v-if="!user" @click="isOpen = !isOpen"
            :class="`${route.path === '/about' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">A
            propos</nuxt-link>
          <nuxt-link to="/my-stories" v-if="user && profil && authorizeRoleUser(`${profil.role}`)" @click="isOpen = !isOpen"
            :class="`${route.path === '/my-stories' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">Mes
            histoires</nuxt-link>
          <nuxt-link to="/dashboard" v-if="user && profil && authorizeRoleDash(`${profil.role}`)" @click="isOpen = !isOpen"
            :class="`${route.path === '/dashboard' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">Tableau
            de bord</nuxt-link>
        </div>
        <div class="pt-3 border-t border-slate-200 dark:border-gray-700 flex md:flex-row flex-col gap-2 text-[13px]">
          <div class="flex md:flex-row flex-col gap-2" v-if="!user">
            <nuxt-link to="/login" @click="isOpen = !isOpen"
              class="flex items-center justify-center gap-2 text-center font-medium text-primary bg-white rounded-lg px-4 py-3 md:py-2 md:px-6 border-primary border-[1px] dark:border-none">
              <Icon name="mdi:login" class="w-4 h-5" />
              Connexion
            </nuxt-link>
          </div>
          <nuxt-link :to="`/profil`" v-if="user" @click="isOpen = !isOpen"
            class="flex items-center gap-3 w-full pb-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left">
            <img v-if="user?.photo" :src="`${config.public.apiBackendUrl}/uploads/users/${user?.photo}`" alt="Profil"
              class="w-8 h-8 border-orange-600 border-2 dark:border-orange-500 rounded-full" />
            <span v-if="!user?.photo" class="p-1 text-xs flex items-center justify-center w-8 h-8 rounded-full"
              :style="`background-color: ${user?.code_color}`">
              {{ user?.name.split(" ").length > 1 ? `${user?.name.charAt(0).toUpperCase() +
                user?.name.split(" ")[1]?.charAt(0).toUpperCase()}` : user?.name.charAt(0).toUpperCase() }}
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-slate-900 dark:text-white truncate">{{ user?.name }}</p>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-200 truncate">{{ user?.role }}
              </p>
            </div>
            <Icon name="solar:alt-arrow-right-linear" class="w-5 h-5 text-slate-400" />
          </nuxt-link>
          <button v-if="user" @click="logout(); isOpen = !isOpen"
            class="flex items-center justify-center gap-2 text-center bg-red-600 text-white py-2 md:px-6 px-4 rounded-lg dark:border-gray-600 dark:border-[1px]">
            <Icon name="mdi:logout" class="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </div>
    </transition>
    <Search @close-modal="toggleSearch" :showSearch="showSearch" v-if="showSearch" />
  </div>
</template>

<style>
.custom::-webkit-scrollbar {
  height: 6px;
}

.custom::-webkit-scrollbar-track {
  background: transparent;
}

.custom::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}

/* Firefox */
.custom {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
</style>

<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute()
const isOpen = ref<boolean>(false)
const showSearch = ref<boolean>(false);
const showProfileMenu = ref<boolean>(false);
const { toConnectUser, logout } = authenticate();
const { getProfile } = usersData();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);

const toggleSearch = () => {
  showSearch.value = !showSearch.value
}

onMounted(async () => {
  user.value = await toConnectUser();
  profil.value = await getProfile();
})
</script>