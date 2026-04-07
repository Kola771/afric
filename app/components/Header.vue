<template>
  <div>
    <header>
      <nav
        class="fixed top-0 w-full z-50 md:border-b md:border-slate-200 bg-white/40 md:bg-white-80 dark:bg-dark/40 dark:md:bg-dark/80 dark:md:border-slate-300 dark:text-white backdrop-blur-md transition-all">

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-14 md:h-16">
            <!-- Logo -->
            <nuxt-link to="/"
              class="flex items-center gap-1.5 md:gap-2.5 group bg-orange-100 dark:bg-orange-100/90 dark:md:bg-transparent md:bg-transparent rounded-full px-2 py-1 md:p-0">
              <div
                class="w-5 h-5 md:w-8 md:h-8 bg-primary rounded-lg dark:border-gray-600 dark:border flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300 tracking-tighter">
                <Icon name="solar:book-2-bold" class="w-3 h-3 md:w-5 md:h-5" />
              </div>
              <span
                class="font-display font-semibold dark:md:text-gray-200 text-slate-900 tracking-tight text-md md:text-lg">
                Afric <span class="text-orange-600 dark:text-orange-500">Storyline</span>
              </span>
            </nuxt-link>
            <!-- Desktop Menu -->
            <div class="hidden lg:flex items-center gap-8 text-slate-500 text-[13.5px] xl:text-sm">
              <nuxt-link to="/discover"
                :class="`${route.path === '/discover' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">Découvrir</nuxt-link>
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
            <div class="flex items-center gap-1 md:gap-3">
              <!-- Desktop actions -->
              <button @click="toggleSearch"
                class="lg:hidden flex p-2 text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-gray-400 transition-colors"
                :class="profil && authorizeRoleUser(`${profil?.role}`) ? '' : (profil && !authorizeRoleUser(`${profil?.role}`) ? 'hidden' : 'hidden')">
                <Icon name="solar:magnifer-linear" class="w-5 md:h-5" />
              </button>
              <ThemeToggle class="lg:hidden" />
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
                      alt="Profil" class="w-7 h-7 rounded-full flex-shrink-0" />
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
                    <nuxt-link @click="showProfileMenu = false" v-if="authorizeRoleUser(`${profil?.role}`)"
                      to="/notifications"
                      class="block px-4 py-2 flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <Icon name="mdi:bell" class="w-4 h-4" />
                      Notifications <span
                        class="bg-red-600 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center"
                        v-if="notifications > 0">{{ notifications > 9 ? '9+' : notifications }}</span>
                    </nuxt-link>
                    <nuxt-link @click="showProfileMenu = false" v-if="profil && authorizeRoleUser(`${profil?.role}`)"
                      :to="`/authors/${profil.uuid}/followers`"
                      class="block px-4 py-2 flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <Icon name="mdi:users" class="w-4 h-4" />
                      Followers
                    </nuxt-link>
                    <nuxt-link v-if="profil && authorizeRoleDash(`${profil.role}`)" @click="showProfileMenu = false"
                      to="/dashboard"
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

    <Search @close-modal="toggleSearch" @function-search="functionSearch" v-if="showSearch" />
    <ResultSearch @close-modal-result="toggleResultSearch" @previous-data="previousData" @next-data="nextData"
      :results="result" :data="datas" :totalDatas="totalDatas" :currentPage="page" :total="total" :loading="loading"
      v-if="showResultSearch" />

    <div class="fixed lg:hidden bottom-0 z-40 left-0 right-0 flex justify-center py-2 bg-white/90 dark:bg-dark/90 
               border border-white/50 dark:border-white/20
               ring-1 ring-black/5 dark:ring-white/5
               transition-all duration-200">
      <div class="w-[95%] flex items-center justify-between">

        <nuxt-link to="/" class="p-2 rounded-full flex flex-col items-center justify-center" :class="route.path === '/'
                ? 'text-orange-600 dark:text-orange-500 scale-105'
                : 'text-slate-700 dark:text-slate-200'">
          <Icon name="mdi:home" class="w-5 h-5" />
          <span class="text-[8px]">Accueil</span>
        </nuxt-link>


        <nuxt-link to="/discover" class="p-2 rounded-full flex flex-col items-center justify-center 
               transition-all duration-200" :class="route.path === '/discover'
                ? 'text-orange-600 dark:text-orange-500 scale-105'
                : 'text-slate-700 dark:text-slate-200'">
          <Icon name="mdi:newspaper-variant-outline" class="w-5 h-5" />
          <span class="text-[8px]">Découverte</span>
        </nuxt-link>

        <nuxt-link to="/categories" class="p-2 rounded-full flex flex-col items-center justify-center 
               transition-all duration-200" :class="route.path === '/categories'
                ? 'text-orange-600 dark:text-orange-500 scale-105'
                : 'text-slate-700 dark:text-slate-200'">
          <Icon name="solar:tag-linear" class="w-5 h-5" />
          <span class="text-[8px]">Catégories</span>
        </nuxt-link>

        <nuxt-link to="/stories" class="p-2 rounded-full flex flex-col items-center justify-center 
               transition-all duration-200" :class="route.path === '/stories'
                ? 'text-orange-600 dark:text-orange-500 scale-105'
                : 'text-slate-700 dark:text-slate-200'">
          <Icon name="mdi:book-open-variant" class="w-5 h-5" />
          <span class="text-[8px]">Livres</span>
        </nuxt-link>

        <nuxt-link to="/authors" class="p-2 rounded-full flex flex-col items-center justify-center 
               transition-all duration-200" :class="route.path === '/authors'
                ? 'text-orange-600 dark:text-orange-500 scale-105'
                : 'text-slate-700 dark:text-slate-200'">
          <Icon name="mdi:users" class="w-5 h-5" />
          <span class="text-[8px]">Auteurs</span>
        </nuxt-link>

        <button @click="toggleSearch"
          :class="profil && authorizeRoleUser(`${profil?.role}`) ? 'hidden' : (profil && !authorizeRoleUser(`${profil?.role}`) ? '' : '')"
          class="p-2 rounded-full flex flex-col items-center justify-center 
               transition-all duration-200 text-slate-700 dark:text-slate-200">
          <Icon name="solar:magnifer-linear" class="w-5 h-5" />
          <span class="text-[8px]">Recherche</span>
        </button>
        <nuxt-link v-if="profil && authorizeRoleUser(`${profil?.role}`)" to="/notifications" class="relative p-2 rounded-full flex flex-col items-center justify-center 
               transition-all duration-200" :class="route.path === '/notifications'
                ? 'text-orange-600 dark:text-orange-500 scale-105'
                : 'text-slate-700 dark:text-slate-200'">
          <Icon name="mdi:bell" class="w-5 h-5" />
          <span class="text-[8px]">Notifications</span>
          <span
            class="absolute right-1 top-1 text-red-600 text-white text-xs rounded-full w-2 h-2 flex items-center justify-center"
            v-if="notifications > 0"></span>
        </nuxt-link>

        <nuxt-link v-if="!profil" to="/login" class="p-2.5 rounded-full flex flex-col items-center justify-center" :class="route.path === '/login'
                ? 'text-orange-600 dark:text-orange-500 scale-105'
                : 'text-slate-700 dark:text-slate-200'">
          <Icon name="mdi:account" class="w-5 h-5" />
          <span class="text-[8px]">Login</span>
        </nuxt-link>
        <div v-if="profil" class="rounded-full flex flex-col items-center justify-center" @click="onAvatarClick">
          <!-- Image ou Initiales -->
          <img v-if="profil?.photo" :src="`${config.public.apiBackendUrl}/uploads/users/${profil.photo}`" alt="Profil"
            class="w-6 h-6 rounded-full flex-shrink-0" />
          <span v-else class="p-2.5 text-[8px] flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0"
            :style="`background-color: ${profil?.code_color}`">
            {{ getInitials(profil?.name) }}
          </span>
          <span class="text-[8px]">Profil</span>
        </div>

      </div>
    </div>
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
const router = useRouter()
const isOpen = ref<boolean>(false)
const showSearch = ref<boolean>(false);
const showResultSearch = ref<boolean>(false);
const showProfileMenu = ref<boolean>(false);
const loading = ref<boolean>(true);
const datas = ref<{ searchType: string, search: string, status: string, rating_age: string[] }>({ searchType: "", search: "", status: "", rating_age: [] });
const result = ref<Author[] | BookData[] | Category[]>([]);
const notifications = ref<number>(0);
const page = ref<number>(1);
const total = ref<number>(0);
const totalDatas = ref<number>(0);
const limit = ref<number>(25);
const { toConnectUser, logout } = authenticate();
const { getNotifications } = notificationsData();
const { findAllPaginatedStatutOrRatingAge } = booksData();
const { getProfile, getUsers } = usersData();
const { getCategoriesByName } = categoriesData();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);

const toggleSearch = () => {
  showSearch.value = !showSearch.value
}

// compteur de clics
let clickCount = 0;
let clickTimer: number | null = null;

const onAvatarClick = () => {
  clickCount++;
  if (!profil.value) return;
  if (clickCount === 1) {
    // single click possible
    clickTimer = window.setTimeout(() => {
      router.push('/profil'); // single click → profil
      clickCount = 0;
      clickTimer = null;
    }, 250); // délai pour détecter double click
  } else if (clickCount === 2 && !['lecteur', 'auteur'].includes(profil.value?.role || '')) {
    // double click détecté
    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
    }
    router.push('/dashboard'); // double click → dashboard
    clickCount = 0;
  }
};

// Helper pour les initiales
const getInitials = (name: string | undefined) => {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length > 1) {
    return `${parts[0]?.charAt(0).toUpperCase()}${parts[1]?.charAt(0).toUpperCase()}`;
  }
  return name?.charAt(0).toUpperCase();
};

const toggleResultSearch = () => {
  showResultSearch.value = !showResultSearch.value;
  result.value = [];
  page.value = 1;
  total.value = 0;
  totalDatas.value = 0;
}

const functionSearch = async (value: { searchType: string, search: string, status: string, rating_age: string[] }) => {
  datas.value = value;
  await onLoad();
}

const previousData = async () => {
  page.value--;
  if (page.value >= 1) {
    await onLoad();
  }
}

const nextData = async () => {
  page.value++;
  if (page.value <= total.value) {
    await onLoad();
  }
}

const saveSearchHistory = (data: any) => {
  const key = "search_history";

  // récupérer l'historique
  const history = JSON.parse(localStorage.getItem(key) || "[]");

  const newEntry = {
    ...data,
    datetime: new Date().toISOString()
  };

  // ajouter le nouvel élément au début
  history.unshift(newEntry);

  // si plus de 10 éléments → supprimer le dernier (le plus ancien)
  if (history.length > 10) {
    history.pop();
  }

  // sauvegarder
  localStorage.setItem(key, JSON.stringify(history));
};

const onLoad = async () => {
  showResultSearch.value = true;
  loading.value = true;
  saveSearchHistory(datas.value);
  if (datas.value?.searchType === "histoires") {
    const { data, total: t, totalPages: tp } = await findAllPaginatedStatutOrRatingAge({ page: page.value, limit: limit.value, title: datas.value.search, status: datas.value.status, rating_age: datas.value.rating_age });
    result.value = data;
    total.value = tp;
    totalDatas.value = t;
  }
  if (datas.value?.searchType === "auteurs") {
    const { data, pagination } = await getUsers({ page: page.value, limit: limit.value, name: datas.value.search });
    result.value = data;
    total.value = pagination.totalPages;
    totalDatas.value = pagination.total;
  }
  if (datas.value?.searchType === "categories") {
    const { data, total: t, totalPages: tp } = await getCategoriesByName(datas.value.search);
    result.value = data;
    total.value = tp;
    totalDatas.value = t;
  }
  loading.value = false;
}

onMounted(async () => {
  user.value = await toConnectUser();
  profil.value = await getProfile();
  if (profil.value) {
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
    }

    const socket = useSocket(profil.value.id);
    const { countNoRead } = await getNotifications(1, 25, profil.value!.id);
    notifications.value = countNoRead;
    // console.log("🧠 socket instance :", socket);

    socket.off("notification"); // 🔥 évite les doublons

    socket.on("connect", () => {
      // console.log("🟢 socket connecté", socket.id);

      socket.emit("join", profil.value!.id);
    });

    socket.on("notification", (data: any) => {
      notifications.value = data?.countNoRead;
      // 👉 ici tu peux afficher toast / badge
      if (Notification.permission === "granted") {
        new Notification("Nouvelle notification 🔔", {
          body: data?.message || "Vous avez une nouvelle notification",
          icon: "/afric.png", // optionnel (mettre ton logo)
        });
      }
    });
  }
})
</script>