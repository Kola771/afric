<template>
    <div class="max-w-6xl mx-auto space-y-6">

        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Gestion des
                    Utilisateurs</h2>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Gérez les utilisateurs de votre plateforme.
                </p>
            </div>
            <div class="flex gap-3">
                <button @click="exportUsers"
                    class="h-9 dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 px-4 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:export-linear" class="w-5 h-5" />
                    Exporter
                </button>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Utilisateurs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAllUsers) }}</p>
                    <Icon name="solar:users-group-two-rounded-linear" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Utilisateurs super-admins</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAllSuperAdmins) }}
                    </p>
                    <Icon name="solar:crown-bold" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Utilisateurs admins</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAllAdmins) }}</p>
                    <Icon name="mdi:account-key" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Utilisateurs support</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAllSupports) }}</p>
                    <span class="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Utilisateurs auteurs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAllAuthors) }}</p>
                    <span class="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Utilisateurs lecteurs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAllReaders) }}</p>
                    <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Utilisateurs actifs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAllUsersActifs) }}
                    </p>
                    <span class="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Utilisateurs inactifs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAllUsersInactifs) }}
                    </p>
                    <span class="w-2 h-2 rounded-full bg-pink-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Utilisateurs suspendus</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAllSuspended) }}</p>
                    <span class="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Utilisateurs bannis</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ formatNumber(countAllUsersBanned) }}
                    </p>
                    <span class="w-2 h-2 rounded-full bg-slate-600 animate-pulse"></span>
                </div>
            </div>
        </div>

        <!-- Filters & Toolbar -->
        <div
            class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-3 rounded-xl border border-slate-200 shadow-sm">
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
                    <input type="search" placeholder="Rechercher un utilisateur..." v-model="search"
                        class="dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 h-8 pl-8 pr-3 w-full sm:w-48 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
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

        <!-- Authors Table -->
        <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto custom">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-xs text-slate-500 dark:text-slate-300 border-b border-slate-100 bg-slate-50/50 dark:bg-slate-800">
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Utilisateurs</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Adresse électronique</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Origine</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Statut</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Rôle</th>
                            <th class="font-medium py-3 px-6 whitespace-nowrap">Deadline</th>
                            <th class="font-medium py-3 px-6 text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody v-if="filteredUsers.length === 0 && !loading" class="text-xs">
                        <tr class="border-b border-slate-50 whitespace-nowrap">

                            <!-- Book -->
                            <td class="py-3 px-6" v-for="i in 7" :key="i">
                                Pas de données
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-if="loading" class="text-xs">
                        <tr v-for="i in 5" :key="i" class="border-b border-slate-50">
                            <td class="py-3 px-6" v-for="y in 7" :key="y">
                                <div class="h-2 w-16 bg-slate-200 dark:bg-slate-300 rounded animate-pulse"></div>
                            </td>

                        </tr>
                    </tbody>

                    <tbody v-if="!loading && filteredUsers.length !== 0" class="text-xs">
                        <tr class="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            :class="u.role === 'super-admin' ? 'bg-slate-100 dark:bg-slate-800' : ''" v-for="(u, index) in filteredUsers"
                            :key="index">
                            <td class="py-3 px-6 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div class="relative flex-shrink-0">
                                        <img v-if="u.photo"
                                            :src="`${config.public.apiBackendUrl}/uploads/users/${u.photo}`"
                                            class="w-9 h-9 rounded-lg object-cover" :alt="u.name" />

                                        <span v-else
                                            class="flex items-center justify-center w-9 h-9 rounded-lg font-semibold text-white text-sm"
                                            :style="`background:${u.code_color}`">
                                            {{
                                                u.name.split(" ").length > 1
                                                    ? `${u.name.charAt(0)}${u.name.split(" ")[1]?.charAt(0)}`
                                                    : u.name.charAt(0)
                                            }}
                                        </span>
                                    </div>
                                    <div>
                                        <p
                                            class="font-medium text-slate-900 dark:text-slate-200 group-hover:text-orange-600 transition-colors">
                                            {{ u.name }}</p>
                                        <p class="text-xs text-slate-400 dark:text-slate-300">{{ u.pseudonym }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="text-xs font-medium text-slate-600 dark:text-slate-200">{{ u.email?.trim() ?? "---"
                                }}</span>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span class="text-xs font-medium text-slate-600 dark:text-slate-200">{{ u.country }}</span>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap capitalize" :class="u.status !== 'actif' ? 'text-red-600 font-medium' : ''">
                                {{ u.status }}
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap capitalize">
                                {{ u.role }}
                            </td>
                            <td class="py-3 px-6 text-center whitespace-nowrap">
                                <span :class="`inline-flex items-center gap-1.5 text-[10px] font-medium text-red-700`"
                                    v-if="u.status !== 'actif'">
                                    <span :class="`w-1 h-1 rounded-full bg-red-600`"></span>
                                    {{ formatLocalDate(u?.sanction_date || '') }}
                                </span>
                            </td>
                            <td class="py-3 px-6 text-right whitespace-nowrap">
                                <select :value="u.role" @change="(e) => changeValRole(e, u)" v-if="!['super-admin'].includes(u.role)"
                                    class="mr-2 text-[10px] bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-600 outline-none">
                                    <option value="" disabled selected>Changez le rôle</option>
                                    <option :value="role.name" v-for="(role, y) in filteredRoles" :key="y">
                                        {{ role.name }}</option>
                                </select>
                                <select :value="u.status" @change="(e) => changeValStatus(e, u)" v-if="!['super-admin'].includes(u.role)"
                                    class="mr-2 text-[10px] bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-600 outline-none">
                                    <option value="" disabled selected>Changez le statut</option>
                                    <option value="actif">Actif</option>
                                    <option value="banni">Banni</option>
                                    <option value="suspendu">Suspendu</option>
                                    <option value="inactif" v-if="profil && !['support', 'auteur', 'lecteur'].includes(profil.role)">Inactif</option>
                                </select>
                                <nuxt-link :to="`/dashboard/authors/${u.uuid}`" v-if="!u.role.includes('lecteur')"
                                    class="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
                                    <Icon name="mdi:eye" width="16" />
                                </nuxt-link>
                                <button @click="showModalDelete(u)"
                                    v-if="profil && !['support', 'auteur', 'lecteur'].includes(profil.role) && (Number(profil.id) !== Number(u.id))"
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
                <span class="text-xs text-slate-500 dark:text-slate-300">Page <span class="font-medium text-slate-900 dark:text-slate-200">{{ page }} / {{ total
                        }}</span> - {{ filteredUsers.length }} données</span>
                <div class="flex gap-2">
                    <button @click="prevPage" :disabled="page === 1"
                        class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                        Précédent
                    </button>
                    <button @click="nextPage" :disabled="page === total"
                        class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                        Suivant
                    </button>
                </div>
            </div>
        </div>
        <DashboardUserDelete @close-delete-modal="toggleDeleteModal" @on-load="onLoad" :showDeleteModal="showDeleteModal" :user="userSelected" v-if="showDeleteModal && userSelected" />
        <DashboardUserChangeStatus @close-change-modal="toggleChangeModal" @on-load="onLoad" :showChangeStatusModal="showChangeStatusModal" :user="userSelected" :statut="statut" v-if="showChangeStatusModal && userSelected" />
        <DashboardUserChangeRole @close-change-role-modal="toggleChangeRoleModal" @on-load="onLoad" :showChangeRoleModal="showChangeRoleModal" :user="userSelected" :role="role" v-if="showChangeRoleModal && userSelected" />
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
const { getProfile, getAllUsers } = usersData();
const { allWithoutInactifRoles } = rolesData();
const router = useRouter();
const user = ref<User | null>(null);
const userSelected = ref<User | null>(null);
const profil = ref<User | null>(null);
const users = ref<User[]>([]);
const roles = ref<any[]>([]);
const loading = ref<boolean>(true);
const statut = ref<string>("");
const role = ref<string>("");
const page = ref<number>(1);
const limit = ref<number>(25);
const total = ref<number>(0);
const position = ref<number>(0);
const countAllUsers = ref<number>(0);
const countAllAdmins = ref<number>(0);
const countAllSupports = ref<number>(0);
const countAllAuthors = ref<number>(0);
const countAllSuperAdmins = ref<number>(0);
const countAllReaders = ref<number>(0);
const countAllUsersActifs = ref<number>(0);
const countAllUsersInactifs = ref<number>(0);
const countAllSuspended = ref<number>(0);
const countAllUsersBanned = ref<number>(0);
const showDeleteModal = ref<boolean>(false);
const showChangeStatusModal = ref<boolean>(false);
const showChangeRoleModal = ref<boolean>(false);
const search = ref<string>("");
const activeFilter = ref<string>("all");
const sortAsc = ref<boolean>(false);

const filters = ref([
    { label: "Tous", value: "all" },
    { label: "Super-admin", value: "super-admin" },
    { label: "admin", value: "admin" },
    { label: "Support", value: "support" },
    { label: "Auteur", value: "auteur" },
    { label: "Lecteur", value: "lecteur" },
    { label: "Actif", value: "actif" },
    { label: "Inactif", value: "inactif" },
    { label: "Suspendu", value: "suspendu" },
    { label: "Banni", value: "banni" },
])

const changeValStatus = (e: any, u: User) => {
    statut.value = e.target.value;
    userSelected.value = u;
    showChangeStatusModal.value = !showChangeStatusModal.value;
}

const changeValRole = (e: any, u: User) => {
    role.value = e.target.value;
    userSelected.value = u;
    showChangeRoleModal.value = !showChangeRoleModal.value;
}

const filteredRoles = computed(() => {
    let data = [...roles.value]

    if (!profil.value) return []

    // super-admin → voit tout
    if (profil.value.role === 'super-admin') {
        return data
    }

    // admin → ne voit pas super-admin
    if (profil.value.role === 'admin') {
        data = data.filter(role => role.name !== 'super-admin')
    }

    // autres → accès limité
    if (['support', 'auteur', 'lecteur'].includes(profil.value.role)) {
        data = data.filter(role =>
            ['support', 'auteur', 'lecteur'].includes(role.name)
        )
    }

    return data
})

const filteredUsers = computed(() => {
    let data = [...users.value]

    if (!["all", "actif", "inactif", "banni", "suspendu"].includes(activeFilter.value)) {
        data = data.filter(users => users.role === activeFilter.value)
    }

    if (["actif", "inactif", "banni", "suspendu"].includes(activeFilter.value)) {
        data = data.filter(users => users.status === activeFilter.value)
    }

    if (search.value) {
        const q = search.value.toLowerCase()
        data = data.filter(users =>
            users.name.toLowerCase().includes(q) || users.pseudonym?.toLowerCase().includes(q)
        )
    }

    if (sortAsc.value) {
        data.sort((a, b) => a.name.localeCompare(b.name))
    }

    return data
})

const showModalDelete = (u: User) => {
    userSelected.value = u;
    showDeleteModal.value = !showDeleteModal.value;
}

const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value;
}

const toggleChangeModal = () => {
    showChangeStatusModal.value = !showChangeStatusModal.value
}

const toggleChangeRoleModal = () => {
    showChangeRoleModal.value = !showChangeRoleModal.value
}

const exportUsers = () => {
    const rows = filteredUsers.value.map(user => ({
        utilisateur: user?.name ?? "",
        pseudonyme: user?.pseudonym ?? "",
        email: user?.email ?? "",
        origine: user?.country ?? "",
        status: user?.status ?? "",
        sanction_date: formatLocalDate(user?.sanction_date) ?? "",
        role: user?.role ?? "",
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
    loading.value = true;
    if (page.value >= total.value) {
        loading.value = false;
        return;
    }
    page.value++
    await onLoad()
    loading.value = false;
}

const prevPage = async () => {
    loading.value = true;
    if (page.value <= 1) {
        loading.value = false;
        return;
    }
    page.value--
    await onLoad()
    loading.value = false;
}


const onLoad = async () => {
    loading.value = true;
    roles.value = await allWithoutInactifRoles();

    const { data, pagination: { totalPages, currentPage, countAllUsers: cAA, countAllSuperAdmins: cA, countAllAdmins: cAB, countAllSupports: cAS, countAllAuthors: cAI, countAllReaders: cC, countAllUsersActifs: cB, countAllUsersInactifs: cT, countAllSuspended: cS, countAllUsersBanned: cAUB } } = await getAllUsers(page.value, limit.value);

    users.value = data;
    total.value = totalPages;
    position.value = currentPage;
    countAllUsers.value = cAA;
    countAllAdmins.value = cAB;
    countAllSupports.value = cAS;
    countAllAuthors.value = cAI;
    countAllSuperAdmins.value = cA;
    countAllReaders.value = cC;
    countAllUsersActifs.value = cB;
    countAllUsersInactifs.value = cT;
    countAllSuspended.value = cS;
    countAllUsersBanned.value = cAUB;

    loading.value = false;
}

onMounted(async () => {
    user.value = await toConnectUser();
    profil.value = await getProfile();
    if (profil.value && ["auteur", "lecteur"].includes(profil.value.role)) router.push("/dashboard");
    if (profil.value?.role === 'support') {
        filters.value = [
            { label: "Tous", value: "all" },
            { label: "Support", value: "support" },
            { label: "Auteur", value: "auteur" },
            { label: "Lecteur", value: "lecteur" },
            { label: "Actif", value: "actif" },
            { label: "Inactif", value: "inactif" },
            { label: "Suspendu", value: "suspendu" },
            { label: "Banni", value: "banni" },
        ]
    }
    if (profil.value?.role === 'admin') {
        filters.value = [
            { label: "Tous", value: "all" },
            { label: "Admin", value: "admin" },
            { label: "Support", value: "support" },
            { label: "Auteur", value: "auteur" },
            { label: "Lecteur", value: "lecteur" },
            { label: "Actif", value: "actif" },
            { label: "Inactif", value: "inactif" },
            { label: "Suspendu", value: "suspendu" },
            { label: "Banni", value: "banni" },
        ]
    }
    await onLoad();
})
</script>