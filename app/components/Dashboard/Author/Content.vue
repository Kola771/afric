<template>
    <div class="max-w-6xl mx-auto space-y-6">

        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Gestion des
                    Auteurs</h2>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Gérez les écrivains, leurs permissions et
                    suivez leurs performances.</p>
            </div>
            <div class="flex gap-3">
                <button @click="exportAuthors"
                    class="h-9 px-4 rounded-lg bg-white dark:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:export-linear" class="w-5 h-5" />
                    Exporter
                </button>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Total Auteurs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(countAllAuthors) }}</p>
                    <Icon name="solar:users-group-two-rounded-linear" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Auteurs Actifs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(countAllActifs) }}</p>
                    <Icon name="solar:users-group-two-rounded-linear" class="text-green-600" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Auteurs Inactifs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(countAllInactifs) }}</p>
                    <Icon name="solar:users-group-two-rounded-linear" class="text-red-500" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Auteurs Suspendus</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(countAllSuspendus) }}</p>
                    <Icon name="solar:users-group-two-rounded-linear" class="text-purple-600" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Auteurs Bannis</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(countAllBannis) }}</p>
                    <Icon name="solar:users-group-two-rounded-linear" class="text-red-600" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Auteurs certifiés</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(countAllCertifies) }}</p>
                    <span class="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Best auteurs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(countAllBest) }}</p>
                    <span class="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Top auteurs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(countAllTop) }}</p>
                    <span class="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Standard auteurs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(countAllStandard) }}</p>
                    <span class="w-2 h-2 rounded-full bg-slate-600 animate-pulse"></span>
                </div>
            </div>
        </div>

        <!-- Filters & Toolbar -->
        <div
            class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
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
            <div class="flex items-center gap-3 w-full sm:w-auto">
                <div class="relative flex-1 sm:flex-none">
                    <Icon name="solar:magnifer-linear"
                        class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="search" placeholder="Rechercher un auteur..." v-model="search"
                        class="h-8 pl-8 pr-3 w-full sm:w-48 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
                </div>
                <button @click="sortAsc = !sortAsc"
                    class="h-8 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                    <Icon name="solar:sort-vertical-linear" class="w-5 h-5" />
                    <span class="text-xs font-medium hidden sm:inline">
                        Trier {{ sortAsc ? "A-Z" : "" }}
                    </span>
                </button>
            </div>
        </div>

        <!-- Authors Table -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto custom">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-xs text-slate-500 dark:text-slate-700 border-b border-slate-100 bg-slate-50/50">
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Auteur</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Adresse électronique</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Origine</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Followers</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Statut</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Rank</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Date d'inscription</th>
                            <th class="font-medium py-3 px-6 text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody v-if="filteredAuthors.length === 0 && !loading" class="text-xs">
                        <tr class="border-b border-slate-50 whitespace-nowrap">

                            <!-- Book -->
                            <td class="py-3 px-6" v-for="i in 8" :key="i">
                                Pas de données
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-if="loading" class="text-xs">
                        <tr v-for="i in 5" :key="i" class="border-b border-slate-50">
                            <td class="py-3 px-6" v-for="y in 8" :key="y">
                                <div class="h-2 w-16 bg-slate-200 dark:bg-slate-300 rounded animate-pulse"></div>
                            </td>

                        </tr>
                    </tbody>

                    <tbody v-if="!loading && filteredAuthors.length !== 0" class="text-xs">
                        <tr class="group hover:bg-slate-50 transition-colors" v-for="(author, index) in filteredAuthors"
                            :key="index">
                            <td class="py-3 px-6 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div class="relative flex-shrink-0">
                                        <img v-if="author.photo"
                                            :src="`${config.public.apiBackendUrl}/uploads/users/${author.photo}`"
                                            class="w-9 h-9 rounded-lg object-cover" :alt="author.name" />

                                        <span v-else
                                            class="flex items-center justify-center w-9 h-9 rounded-lg font-semibold text-white text-sm"
                                            :style="`background:${author.code_color}`">
                                            {{
                                                author.name.split(" ").length > 1
                                                    ? `${author.name.charAt(0)}${author.name.split(" ")[1]?.charAt(0)}`
                                                    : author.name.charAt(0)
                                            }}
                                        </span>
                                    </div>
                                    <div>
                                        <p
                                            class="font-medium text-slate-900 group-hover:text-orange-600 transition-colors">
                                            {{ author.name }}</p>
                                        <p class="text-xs text-slate-400">{{ author.pseudonym }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="text-xs font-medium text-slate-600">{{ author.email?.trim() ?? "---"
                                    }}</span>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="text-xs font-medium text-slate-600">{{ author.country.name }}</span>
                            </td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">
                                {{ formatNumber(author.total_followers) }}
                            </td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">
                                {{ author.status }}
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span :class="[
                                    'text-[11px] w-fit px-2 py-0.5 rounded-md flex items-center gap-1',
                                    author.rank === 'certifié'
                                        ? 'bg-orange-50 text-orange-700 border border-orange-100'
                                        : author.rank === 'best'
                                            ? 'bg-purple-50 text-purple-700 border border-purple-100'
                                            : author.rank === 'top'
                                                ? 'bg-green-50 text-green-700 border border-green-100'
                                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                                ]">
                                    <Icon name="mdi:star-outline" size="14" />
                                    {{ author.rank }}
                                </span>
                            </td>
                            <td class="py-3 px-6 text-xs text-slate-500 whitespace-nowrap">
                                {{ formatLocalDate(author.created_at) }}</td>
                            <td class="py-3 px-6 text-right whitespace-nowrap">
                                <select v-if="profil && !['support', 'auteur', 'lecteur'].includes(profil.role)"
                                    class="mr-2 text-[10px] bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-600 outline-none">
                                    <option value="" disabled selected>Changez le statut</option>
                                    <option value="actif">Actif</option>
                                    <option value="banni">Banni</option>
                                    <option value="suspendu">Suspendu</option>
                                    <option value="inactif">Inactif</option>
                                </select>
                                <nuxt-link :to="`/dashboard/authors/${author.uuid}`"
                                    class="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
                                    <Icon name="mdi:eye" width="16" />
                                </nuxt-link>
                                <button @click="toggleDeleteModal"
                                    v-if="profil && !['support', 'auteur', 'lecteur'].includes(profil.role)"
                                    class="ml-1 p-1 rounded-md hover:bg-slate-100 text-red-600 hover:text-red-700 transition-colors">
                                    <Icon name="mdi:trash" width="16" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="flex items-center justify-between p-4 border-t border-slate-100">
                <span class="text-xs text-slate-500">Page <span class="font-medium text-slate-900">{{ page }} / {{ total
                }}</span> - {{ filteredAuthors.length }} données</span>
                <div class="flex gap-2">
                    <button @click="prevPage" :disabled="page === 1"
                        class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50">
                        Précédent
                    </button>
                    <button @click="nextPage" :disabled="page === total"
                        class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 hover:bg-slate-50 disabled:opacity-50">
                        Suivant
                    </button>
                </div>
            </div>
        </div>
        <DashboardAuthorDelete @close-delete-modal="toggleDeleteModal" :showDeleteModal="showDeleteModal"
            v-if="showDeleteModal" />
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
const { getProfile, getAuthors } = usersData();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const authors = ref<Author[]>([]);
const loading = ref<boolean>(true);
const page = ref<number>(1);
const limit = ref<number>(25);
const total = ref<number>(0);
const position = ref<number>(0);
const countAllAuthors = ref<number>(0);
const countAllBannis = ref<number>(0);
const countAllSuspendus = ref<number>(0);
const countAllInactifs = ref<number>(0);
const countAllActifs = ref<number>(0);
const countAllCertifies = ref<number>(0);
const countAllBest = ref<number>(0);
const countAllTop = ref<number>(0);
const countAllStandard = ref<number>(0);
const showDeleteModal = ref(false);
const search = ref<string>("");
const activeFilter = ref<string>("all");
const sortAsc = ref<boolean>(false);

const filters = [
    { label: "Tous", value: "all" },
    { label: "Certifié", value: "certifié" },
    { label: "Best", value: "best" },
    { label: "Top", value: "top" },
    { label: "Standard", value: "standard" },
    { label: "Actif", value: "actif" },
    { label: "Inactif", value: "inactif" },
    { label: "Suspendu", value: "suspendu" },
    { label: "Banni", value: "banni" },
]

const filteredAuthors = computed(() => {
    let data = [...authors.value]

    if (!["all", "actif", "inactif", "banni", "suspendu"].includes(activeFilter.value)) {
        data = data.filter(authors => authors.rank === activeFilter.value)
    }

    if (["actif", "inactif", "banni", "suspendu"].includes(activeFilter.value)) {
        data = data.filter(authors => authors.status === activeFilter.value)
    }

    if (search.value) {
        const q = search.value.toLowerCase()
        data = data.filter(authors =>
            authors.name.toLowerCase().includes(q) || authors.pseudonym?.toLowerCase().includes(q)
        )
    }

    if (sortAsc.value) {
        data.sort((a, b) => a.name.localeCompare(b.name))
    }

    return data
})

const exportAuthors = () => {
    const rows = filteredAuthors.value.map(author => ({
        auteur: author?.name ?? "",
        pseudonyme: author?.pseudonym ?? "",
        email: author?.email ?? "",
        origine: author?.country?.name ?? "",
        followers: author?.followers ?? "",
        status: author?.status ?? "",
        rank: author?.rank ?? "",
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
    link.download = "utilisateurs.csv"
    link.click()

    URL.revokeObjectURL(url)
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

    const { data, pagination: { totalPages, currentPage, countAllAuthors: cAA, countAllActifs: cA, countAllBannis: cAB, countAllSuspendus: cAS, countAllInactifs: cAI, countAllCertifies: cC, countAllBest: cB, countAllTop: cT, countAllStandard: cS } } = await getAuthors(page.value, limit.value);

    authors.value = data;
    total.value = totalPages;
    position.value = currentPage;
    countAllAuthors.value = cAA;
    countAllBannis.value = cAB;
    countAllSuspendus.value = cAS;
    countAllInactifs.value = cAI;
    countAllActifs.value = cA;
    countAllCertifies.value = cC;
    countAllBest.value = cB;
    countAllTop.value = cT;
    countAllStandard.value = cS;

    loading.value = false;
}

onMounted(async () => {
    user.value = await toConnectUser();
    profil.value = await getProfile();
    await onLoad();
})

const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value
}
</script>