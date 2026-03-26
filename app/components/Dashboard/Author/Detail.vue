<template>
    <div class="max-w-6xl mx-auto">
        <div class="space-y-6" v-if="author">

            <!-- Page Header -->
            <div>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2
                            class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                            <button @click="back"
                                class="py-2 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <Icon name="mdi:arrow-left" class="w-4 h-4" />
                            </button>
                            <span>Histoires de <strong class="text-orange-600 dark:text-orange-500">{{ author.name
                                    }}</strong></span>
                        </h2>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-200">Originaire du/de : {{
                            author.country.name
                            }}</p>
                    </div>
                    <div class="flex gap-3">
                        <button @click="exportBooks"
                            class="h-9 px-4 dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-lg bg-white dark:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                            <Icon name="solar:export-linear" class="w-5 h-5" />
                            Exporter
                        </button>
                    </div>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Histoires</p>
                    <div class="flex items-end justify-between">
                        <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAll) }}</p>
                        <Icon name="solar:book-linear" class="text-slate-300" width="24" />
                    </div>
                </div>
                <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Histoires Terminées</p>
                    <div class="flex items-end justify-between">
                        <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countCompleted) }}</p>
                        <span class="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                    </div>
                </div>
                <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Histoires en cours</p>
                    <div class="flex items-end justify-between">
                        <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countOngoing) }}</p>
                        <span class="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                    </div>
                </div>
                <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Histoires en pause</p>
                    <div class="flex items-end justify-between">
                        <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countPaused) }}</p>
                        <span class="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
                    </div>
                </div>
                <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Histoires en brouillon</p>
                    <div class="flex items-end justify-between">
                        <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countDraft) }}</p>
                        <span class="w-2 h-2 rounded-full bg-pink-600 animate-pulse"></span>
                    </div>
                </div>
                <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Histoires désactivées</p>
                    <div class="flex items-end justify-between">
                        <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countInactive) }}</p>
                        <span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    </div>
                </div>
            </div>

            <!-- Filters & Toolbar -->
            <div
                class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-3 rounded-xl border border-slate-200 shadow-sm">
                <!-- Tabs -->
                <div class="flex bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-full custom">
                    <button v-for="filter in filters" :key="filter.value" @click="activeFilter = filter.value" :class="activeFilter === filter.value
                        ? 'bg-white dark:bg-slate-50 text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'"
                        class="px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap">

                        {{ filter.label }}

                    </button>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-3 w-full md:w-auto">
                    <div class="relative flex-1 md:flex-none">
                        <Icon name="solar:magnifer-linear"
                            class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input type="search" placeholder="Rechercher une histoire..." v-model="search"
                            class="h-8 pl-8 pr-3 dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 w-full md:w-48 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
                    </div>
                    <button @click="sortAsc = !sortAsc"
                        class="h-8 px-3 rounded-lg border border-slate-200 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors">
                        <Icon name="solar:sort-vertical-linear" class="w-5 h-5" />
                        <span class="text-xs font-medium hidden sm:inline">
                            Trier {{ sortAsc ? "A-Z" : "" }}
                        </span>
                    </button>
                </div>
            </div>

            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="overflow-y-auto overflow-x-auto custom max-h-[500px]">
                    <table class="w-full text-left border-collapse">
                        <thead class="sticky top-0 z-10 bg-slate-50">
                            <tr
                                class="text-xs text-slate-400 dark:text-slate-300 border-b border-slate-100 bg-slate-50/50 dark:bg-slate-800">
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Titre de l'histoire</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Catégorie</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Performance</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Statut</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Deadline</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Âge autorisé</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="filteredBooks.length === 0 && !loading" class="text-xs">
                            <tr class="border-b border-slate-50 whitespace-nowrap">

                                <!-- Book -->
                                <td class="py-3 px-6" v-for="i in 7" :key="i">
                                    Pas de données
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if="loading" class="text-sm">
                            <tr v-for="i in 5" :key="i" class="border-b border-slate-50">

                                <!-- Book -->
                                <td class="py-3 px-6">
                                    <div class="flex items-center gap-3 animate-pulse">
                                        <div class="w-8 h-10 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                        <div class="h-3 w-32 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                    </div>
                                </td>

                                <!-- Author -->
                                <td class="py-3 px-6">
                                    <div class="h-3 w-24 bg-slate-200 dark:bg-slate-300 rounded animate-pulse"></div>
                                </td>

                                <!-- Categories -->
                                <td class="py-3 px-6 space-x-2">
                                    <div class="flex gap-2 animate-pulse">
                                        <div class="h-4 w-16 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                        <div class="h-4 w-12 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                    </div>
                                </td>

                                <!-- Stats -->
                                <td class="py-3 px-6">
                                    <div class="flex items-center gap-4 animate-pulse">
                                        <div class="h-3 w-10 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                        <div class="w-px h-3 bg-slate-200 dark:bg-slate-300"></div>
                                        <div class="h-3 w-10 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                        <div class="w-px h-3 bg-slate-200 dark:bg-slate-300"></div>
                                        <div class="h-3 w-10 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                    </div>
                                </td>

                                <!-- Status -->
                                <td class="py-3 px-6">
                                    <div class="h-5 w-16 bg-slate-200 dark:bg-slate-300 rounded-full animate-pulse">
                                    </div>
                                </td>

                                <td class="py-3 px-6">
                                    <div class="h-5 w-16 bg-slate-200 dark:bg-slate-300 rounded-full animate-pulse">
                                    </div>
                                </td>

                                <!-- Status -->
                                <td class="py-3 px-6">
                                    <div class="h-5 w-16 bg-slate-200 dark:bg-slate-300 rounded-full animate-pulse">
                                    </div>
                                </td>

                            </tr>
                        </tbody>

                        <tbody v-if="!loading && filteredBooks.length !== 0" class="text-sm">
                            <tr class="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 text-xs"
                                v-for="(book, index) in filteredBooks" :key="index">
                                <td class="py-3 px-6">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-8 h-10 flex-shrink-0 bg-slate-200 rounded object-cover overflow-hidden">
                                            <img :src="`${config.public.apiBackendUrl}/uploads/books/${book?.image}`"
                                                class="w-full h-full object-cover opacity-80" :alt="book.title">
                                        </div>
                                        <nuxt-link :to="`/dashboard/stories/${book.uuid}`"
                                            class="font-medium text-slate-900 dark:text-slate-200 group-hover:text-orange-600 transition-colors underline whitespace-nowrap">{{
                                                book.title }}</nuxt-link>
                                    </div>
                                </td>
                                <td class="py-3 px-6 space-x-1 whitespace-nowrap dark:text-slate-300">
                                    <span
                                        class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                                        v-for="(category, i) in book.book_categories">
                                        {{ category?.name }}
                                    </span>
                                </td>
                                <td class="py-3 px-6 whitespace-nowrap">
                                    <div class="flex items-center gap-4">
                                        <div class="text-xs">
                                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                                formatNumber(book?.book_reactions)
                                                }}</span> <span class="text-slate-400 text-[10px]">réactions
                                            </span>
                                        </div>
                                        <div class="text-xs">
                                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                                formatNumber(Number(book?.total_views))
                                                }}</span> <span class="text-slate-400 text-[10px]">vues
                                            </span>
                                        </div>
                                        <div class="w-px h-3 bg-slate-200"></div>
                                        <div class="text-xs">
                                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                                formatNumber(book?.book_comments)
                                                }}</span> <span class="text-slate-400 text-[10px]">commentaires
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td class="py-3 px-6 whitespace-nowrap">
                                    <span
                                        :class="`${book.status === 'inactive' ? 'text-red-600 bg-red-50 dark:text-red-600' : (book.status === 'completed' ? 'text-green-600 dark:text-green-500 bg-green-50' : (book.status === 'ongoing' ? 'text-blue-600 dark:text-blue-500 bg-blue-50' : 'bg-slate-100 text-slate-500'))} inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium`">
                                        <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                                        {{ status(book.status) }}
                                    </span>
                                </td>
                                <td class="py-3 px-6 text-center whitespace-nowrap">
                                    <span
                                        :class="`inline-flex items-center gap-1.5 text-[10px] font-medium text-red-700`"
                                        v-if="book.status === 'inactive'">
                                        <span :class="`w-1 h-1 rounded-full bg-red-600`"></span>
                                        {{ formatLocalDate(book.deadline || '') }}
                                    </span>
                                </td>
                                <td class="py-3 px-6 text-center whitespace-nowrap dark:text-slate-300">
                                    {{ book.rating_age }}
                                </td>
                                <td class="py-3 px-6 text-right whitespace-nowrap">
                                    <select v-if="profil && !['support', 'auteur', 'lecteur'].includes(profil.role)"
                                        :value="book.status" @change="(e) => changeValStatus(e, book)"
                                        class="mr-2 text-[10px] bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-600 outline-none">
                                        <option value="" disabled selected>Changez le statut</option>
                                        <option value="draft">Brouillon</option>
                                        <option value="ongoing">En cours</option>
                                        <option value="paused">En pause</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    <nuxt-link :to="`/books/${book.uuid}`" target="_blank"
                                        v-if="!['draft', 'inactive'].includes(book.status)"
                                        class="mr-2 text-amber-600 dark:text-amber-500 hover:text-amber-700 transition-colors text-xs underline">Rendu
                                        en ligne</nuxt-link>
                                    <button @click="showModalDelete(book)"
                                        v-if="profil && !['support', 'auteur', 'lecteur'].includes(profil.role)"
                                        class="p-1 rounded-md hover:bg-slate-100 text-red-600 hover:text-red-700 transition-colors">
                                        <Icon name="mdi:trash" width="16" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex items-center justify-between p-4 border-t border-slate-100">
                    <span class="text-xs text-slate-500 dark:text-slate-300">Page <span class="font-medium text-slate-900 dark:text-slate-200">{{ page }} / {{
                        total }}</span> - {{ filteredBooks.length }} données</span>
                    <div class="flex gap-2">
                        <button @click="prevPage" :disabled="page === 1"
                            class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                            Précédent
                        </button>
                        <button @click="nextPage" :disabled="page === total"
                            class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                            Suivant
                        </button>
                    </div>
                </div>
            </div>

            <DashboardStoryDelete @close-delete-modal="toggleDeleteModal" @on-load="onLoad"
                :showDeleteModal="showDeleteModal" :book="book" v-if="showDeleteModal && book" />
            <DashboardStoryChangeStatus @close-change-modal="toggleChangeModal" @on-load="onLoad"
                :showChangeStatusModal="showChangeStatusModal" :book="book" :statut="statut"
                v-if="showChangeStatusModal && book" />
        </div>

        <div class="text-center text-sm text-gray-600 dark:text-gray-400 mt-10" v-if="!loading && !author">Cet auteur
            n'existe
            pas !</div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" v-if="loading && !author">
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm animate-pulse"
                v-for="index in 6">

                <!-- Label -->
                <div class="h-3 w-24 bg-slate-200 dark:bg-slate-300 rounded mb-2"></div>

                <div class="flex items-end justify-between">

                    <!-- Number -->
                    <div class="h-7 w-16 bg-slate-200 dark:bg-slate-300 rounded"></div>

                    <!-- Icon placeholder -->
                    <div class="w-6 h-6 bg-slate-200 dark:bg-slate-300 rounded"></div>

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
const { toConnectUser } = authenticate();
const { getProfile, findByUuid } = usersData();
const { findAllPaginatedAuthor } = booksData();
const route = useRoute();
const router = useRouter();
const user = ref<User | null>(null);
const author = ref<Author | null>(null);
const profil = ref<User | null>(null);
const books = ref<BookData[]>([]);
const book = ref<BookData | null>(null);
const statut = ref<string>("");
const loading = ref<boolean>(true);
const page = ref<number>(1);
const limit = ref<number>(25);
const total = ref<number>(0);
const position = ref<number>(0);
const countAll = ref<number>(0);
const countCompleted = ref<number>(0);
const countOngoing = ref<number>(0);
const countPaused = ref<number>(0);
const countDraft = ref<number>(0);
const countInactive = ref<number>(0);
const showDeleteModal = ref(false);
const showChangeStatusModal = ref<boolean>(false);
const search = ref<string>("");
const activeFilter = ref<string>("all");
const sortAsc = ref<boolean>(false);

const filters = [
    { label: "Tous", value: "all" },
    { label: "Terminées", value: "completed" },
    { label: "En cours", value: "ongoing" },
    { label: "En pause", value: "paused" },
    { label: "Brouillon", value: "draft" },
    { label: "Inactive", value: "inactive" }
]

const changeValStatus = (e: any, b: BookData) => {
    statut.value = e.target.value;
    book.value = b;
    showChangeStatusModal.value = !showChangeStatusModal.value;
}

const filteredBooks = computed(() => {
    let data = [...books.value]

    if (activeFilter.value !== "all") {
        data = data.filter(book => book.status === activeFilter.value)
    }

    if (search.value) {
        const q = search.value.toLowerCase()
        data = data.filter(book =>
            book.title.toLowerCase().includes(q) ||
            book.user?.name?.toLowerCase().includes(q)
        )
    }

    if (sortAsc.value) {
        data.sort((a, b) => a.title.localeCompare(b.title))
    }

    return data
})

const exportBooks = () => {

    const rows = filteredBooks.value.map(book => ({
        titre: book.title,
        auteur: book.user?.name ?? "",
        reactions: book.book_reactions ?? 0,
        commentaires: book.book_comments ?? 0,
        statut: status(book.status),
        deadline: book.status === "inactive" ? formatLocalDate(book.deadline) : "",
        age: book.rating_age,
    }))

    if (rows.length === 0) return

    const csv = [
        Object.keys(rows[0]!).join(","),
        ...rows.map(r => Object.values(r).join(","))
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "stories.csv"
    link.click()

    URL.revokeObjectURL(url)
}

const back = () => {
    router.back();
}

const showModalDelete = (b: BookData) => {
    book.value = b;
    showDeleteModal.value = !showDeleteModal.value;
}

const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value;
}

const toggleChangeModal = () => {
    showChangeStatusModal.value = !showChangeStatusModal.value
}

const status = (status: string) => {
    switch (status.toLocaleLowerCase()) {
        case "ongoing":
            return "En cours"
        case "completed":
            return "Terminé"
        case "paused":
            return "Pause"
        case "draft":
            return "Brouillon"
        case "inactive":
            return "Inactif"
        default:
            return "Brouillon"
    }
}

const nextPage = async () => {
    if (page.value >= total.value) return
    page.value++
    await onLoad()
}

const prevPage = async () => {
    if (page.value <= 1) return
    page.value--
    await onLoad()
}

const onLoad = async () => {
    loading.value = true;
    const { data: datas } = await findByUuid(`${route.params.uuid}`);
    author.value = datas;

    if (!author.value) return loading.value = false;
    const { data, totalPages, currentPage, countAll: cA, countCompleted: cC, countOngoing: cO, countPaused: cP, countDraft: cD, countInactive: cI } = await findAllPaginatedAuthor(page.value, limit.value, author.value.id);

    books.value = data;
    total.value = totalPages;
    position.value = currentPage;
    countAll.value = cA;
    countCompleted.value = cC;
    countOngoing.value = cO;
    countPaused.value = cP;
    countDraft.value = cD;
    countInactive.value = cI;

    loading.value = false;
}

onMounted(async () => {
    user.value = await toConnectUser();
    profil.value = await getProfile();
    await onLoad();
})
</script>
