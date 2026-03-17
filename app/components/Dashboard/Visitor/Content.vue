<template>
    <div class="max-w-6xl mx-auto space-y-6">

        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Historique de
                    visite</h2>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Suivez l'historique de visite de votre
                    plateforme.</p>
            </div>
            <div class="flex gap-3">
                <button
                    class="h-9 px-4 rounded-lg bg-white dark:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:export-linear" class="w-5 h-5" />
                    Exporter
                </button>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Total Journalier</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(visitorsToday) }}</p>
                    <Icon name="solar:calendar-linear" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Total Mensuel</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(visitorsMonth) }}</p>
                    <Icon name="solar:calendar-linear" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 mb-1">Total Annuel</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900">{{ formatNumber(visitorsYear) }}</p>
                    <Icon name="solar:calendar-linear" class="text-slate-300" width="24" />
                </div>
            </div>
        </div>

        <!-- Filters & Toolbar -->
        <div
            class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <!-- Tabs -->
            <div class="flex bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-lg custom">
                <button v-for="month in months" :key="month" @click="onLoadDataMonth(month)" :class="[
                    'px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all',
                    selectedMonth === month
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                ]">
                    {{ month }}
                </button>
            </div>

            <!-- Actions -->
            <div class="flex flex-col lg:flex-row items-center gap-3 w-full md:w-auto">
                <select v-model="selectedYear"
                    class="w-full text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-600 outline-none">
                    <option disabled value="">Sélectionnez une année</option>
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
                <div class="w-full md:w-auto flex gap-2 ">
                    <div class="relative flex-1 md:flex-none">
                        <Icon name="solar:magnifer-linear"
                            class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input type="search" placeholder="Rechercher la ville ou le pays..." v-model="search"
                            class="h-8 pl-8 pr-3 w-full md:w-48 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
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
        </div>

        <!-- Authors Table -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-xs text-slate-500 dark:text-slate-700 border-b border-slate-100 bg-slate-50/50">
                            <th class="font-medium py-3 px-6">IP</th>
                            <th class="font-medium py-3 px-6">Ville</th>
                            <th class="font-medium py-3 px-6">Pays</th>
                            <th class="font-medium py-3 px-6">Date de venue</th>
                        </tr>
                    </thead>
                    <tbody v-if="filteredVisitors.length === 0 && !loading" class="text-xs">
                        <tr class="border-b border-slate-50 whitespace-nowrap">
                            <td class="py-3 px-6" v-for="i in 4" :key="i">
                                Pas de données
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-if="loading" class="text-sm">
                        <tr v-for="i in 5" :key="i" class="border-b border-slate-50">
                            <td class="py-3 px-6" v-for="y in 4" :key="y">
                                <div class="h-2 w-16 bg-slate-200 dark:bg-slate-300 rounded-full animate-pulse"></div>
                            </td>

                        </tr>
                    </tbody>
                    <tbody v-if="!loading && filteredVisitors.length !== 0" class="text-sm">
                        <tr class="group hover:bg-slate-50 transition-colors"
                            v-for="(visitor, index) in filteredVisitors" :key="index">
                            <td class="py-3 px-6 text-xs text-slate-400">{{ visitor.visitor_id }}</td>
                            <td class="py-3 px-6 text-xs text-slate-400">{{ visitor.city }}</td>
                            <td class="py-3 px-6 text-xs text-slate-400">{{ visitor.origin }}</td>
                            <td class="py-3 px-6 text-xs text-slate-500">{{ formatLocalDate(visitor.visit_date) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex items-center justify-between p-4 border-t border-slate-100">
                <span class="text-xs text-slate-500">Page <span class="font-medium text-slate-900">{{ page }} / {{ total
                }}</span> - {{ filteredVisitors.length }} données</span>
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
import { ref, computed, watch } from "vue";
const { toConnectUser } = authenticate();
const { getProfile } = usersData();
const { getVisitorsStatsCurrent, getVisitorsByYear, getVisitorsByMonth } = visitorsData();
const router = useRouter();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const loading = ref<boolean>(true);
const page = ref<number>(1);
const limit = ref<number>(25);
const total = ref<number>(0);
const visitorsToday = ref<number>(0);
const visitorsMonth = ref<number>(0);
const visitorsYear = ref<number>(0);
const visitors = ref<any>([]);
const search = ref<string>("");
const activeFilter = ref<string>("all");
const sortAsc = ref<boolean>(false);

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth(); // 0 = janvier

// Sélection utilisateur
const selectedYear = ref(currentYear);
const selectedMonth = ref("Tous"); // mois actif

// Années disponibles
const years = [currentYear, currentYear - 1];

// Tous les mois
const allMonths = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

// Mois dynamiques selon l'année sélectionnée
const months = computed(() => {
    if (selectedYear.value === currentYear) {
        return ["Tous", ...allMonths.slice(0, currentMonth + 1)]; // mois jusqu'à aujourd'hui
    }
    return ["Tous", ...allMonths]; // année précédente -> tous les mois
});

// 
const onLoadDataMonth = async (selected: string) => {
    loading.value = true;
    selectedMonth.value = selected;
    if (selected === "Tous") {
        const res = await getVisitorsByYear(page.value, limit.value, selectedYear.value);
        visitors.value = res.data;
    } else {
        const res = await getVisitorsByMonth(page.value, limit.value, selectedYear.value, allMonths.indexOf(selected) + 1);
        visitors.value = res.data;
    }
    loading.value = false;
}

// ⚡️ Watch : reset du mois quand on change d'année
watch(selectedYear, async () => {
    loading.value = true;
    selectedMonth.value = "Tous"; // reset mois
    const res = await getVisitorsByYear(page.value, limit.value, selectedYear.value);
    visitors.value = res.data;
    loading.value = false;
});

const filteredVisitors = computed(() => {
    let data = [...visitors.value]

    if (activeFilter.value !== "all") {
        data = data.filter(visitor => visitor.status === activeFilter.value)
    }

    if (search.value) {
        const q = search.value.toLowerCase()
        data = data.filter(visitor =>
            visitor.city.toLowerCase().includes(q) ||
            visitor.origin?.toLowerCase().includes(q)
        )
    }

    if (sortAsc.value) {
        data.sort((a, b) => a.origin.localeCompare(b.origin))
    }

    return data
})

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
    user.value = await toConnectUser();
    profil.value = await getProfile();
    if (profil.value && ["auteur", "lecteur"].includes(profil.value.role)) router.push("/dashboard");
    const { today, thisMonth, thisYear } = await getVisitorsStatsCurrent();
    visitorsToday.value = today;
    visitorsMonth.value = thisMonth;
    visitorsYear.value = thisYear;
    let res;
    if(selectedMonth.value !== "Tous") {
        res = await getVisitorsByMonth(page.value, limit.value, selectedYear.value, allMonths.indexOf(selectedMonth.value) + 1);
    } else {
        res = await getVisitorsByYear(page.value, limit.value, selectedYear.value);
    }
    visitors.value = res.data;
    loading.value = false;
}

onMounted(async () => {
    await onLoad();
})
</script>