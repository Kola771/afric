<template>
    <div class="max-w-6xl mx-auto space-y-6">

        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Gestion des
                    Pays</h1>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Gérez les pays et suivez leurs performances.
                </p>
            </div>
            <div class="flex gap-3">
                <button @click="exportCountries"
                    class="dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 h-9 px-4 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:export-linear" class="w-5 h-5" />
                    Exporter
                </button>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Pays</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ filteredCountries.length }}</p>
                    <Icon name="mdi:globe" class="text-slate-300" width="24" />
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Pays actifs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ actifCount }}</p>
                    <span class="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-300 mb-1">Total Pays inactifs</p>
                <div class="flex items-end justify-between">
                    <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200">{{ inactifCount }}</p>
                    <span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xl font-medium text-cyan-500 mb-1">28%</p>
                <div class="flex items-end justify-between">
                    <p class="text-xs text-slate-500 dark:text-slate-300">Des auteurs proviennent du/de Bénin</p>
                    <span class="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
                </div>
            </div>
            <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-xl font-medium text-pink-500 mb-1">5%</p>
                <div class="flex items-end justify-between">
                    <p class="text-xs text-slate-500 dark:text-slate-300">Des auteurs proviennent du/de Sénégal</p>
                    <span class="w-2 h-2 rounded-full bg-pink-600 animate-pulse"></span>
                </div>
            </div>
        </div>

        <!-- Filters & Toolbar -->
        <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-3 rounded-xl border border-slate-200 shadow-sm">
            <!-- Actions -->
            <div class="flex items-center gap-3 w-full">
                <div class="relative flex-1">
                    <Icon name="solar:magnifer-linear"
                        class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="search" v-model="searchQuery" @keydown.enter="executeSearch"
                        placeholder="Rechercher un pays..."
                        class="h-8 pl-8 pr-3 dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 w-full rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
                </div>
                <button @click="toggleSort('name')"
                    class="h-8 px-3 rounded-lg border border-slate-200 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors">
                    <Icon :name="sortKey === 'name'
                            ? sortDirection === 'asc'
                                ? 'solar:arrow-up-linear'
                                : 'solar:arrow-down-linear'
                            : 'solar:sort-vertical-linear'
                        " class="w-5 h-5" />
                    <span class="text-xs font-medium hidden sm:inline">Trier</span>
                </button>
                <nuxt-link to="/dashboard/countries/create"
                    class="h-8 px-3 rounded-lg border border-slate-200 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2 transition-colors">
                    <Icon name="mdi:plus" class="w-5 h-5" />
                    <span class="text-xs font-medium hidden sm:inline">Ajouter</span>
                </nuxt-link>
            </div>
        </div>

        <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-y-auto overflow-x-auto custom max-h-[500px]">
                <table class="w-full text-left border-collapse">
                    <thead class="sticky top-0 z-10 bg-slate-50">
                        <tr class="text-xs text-slate-400 dark:text-slate-300 border-b border-slate-100 bg-slate-50/50 dark:bg-slate-800">
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Pays</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Code</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Préfixe</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Langue</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Status</th>
                            <th class="font-semibold text-left py-3 px-6 whitespace-nowrap">Deadline</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr class="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50"
                            v-for="(country, index) in sortedCountries" :key="index">
                            <td class="py-3 px-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-10 lg:h-8 bg-slate-200 rounded object-cover overflow-hidden">
                                        <img :src="`${config.public.apiBackendUrl}/uploads/countries/${country.flag}`"
                                            class="w-full h-full object-cover opacity-80">
                                    </div>
                                    <span
                                        class="font-medium text-slate-900 dark:text-slate-200 group-hover:text-orange-600 transition-colors">{{
                                        country.name }}</span>
                                </div>
                            </td>
                            <td class="py-3 px-6 text-slate-600 dark:text-slate-200 text-xs">{{ country.code }}</td>
                            <td class="py-3 px-6 text-slate-600 dark:text-slate-200 text-xs">{{ country.prefix }}</td>
                            <td class="py-3 px-6 text-slate-600 dark:text-slate-200 text-xs">{{ country.language }}</td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span
                                    :class="`capitalize inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${country.status === 'actif' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'} `">
                                    <span
                                        :class="`w-1 h-1 rounded-full ${country.status === 'actif' ? 'bg-green-600' : 'bg-red-600'}`"></span>
                                    {{ country.status }}
                                </span>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span
                                    :class="`inline-flex items-center gap-1.5 text-[10px] font-medium ${country.status === 'actif' ? ' text-green-700' : 'text-red-700'} `">
                                    <span
                                        :class="`w-1 h-1 rounded-full ${country.status === 'actif' ? 'bg-green-600' : 'bg-red-600'}`"></span>
                                    {{ formatLocalDate(country.deadline || '') }}
                                </span>
                            </td>
                            <td class="py-3 px-6 text-right whitespace-nowrap">
                                <nuxt-link :to="`/dashboard/countries/edit/${country.uuid}`"
                                    v-if="country.status === 'actif'"
                                    class="ml-2 text-orange-600 hover:text-orange-700 transition-colors">
                                    <Icon name="mdi:edit" class="w-4 h-4" />
                                </nuxt-link>
                                <button @click="toggleDeleteModal(country)" v-if="country.status === 'actif'"
                                    class="ml-2 text-red-600 hover:text-red-700 transition-colors">
                                    <Icon name="mdi:trash" class="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex items-center justify-between p-4 border-t border-slate-100">
                <span class="text-xs font-bold text-slate-500 dark:text-slate-300">{{ filteredCountries.length }} pays</span>
            </div>
        </div>
        <DashboardCountryDelete @close-delete-modal="closeDeleteModal" :country="country"
            :showDeleteModal="showDeleteModal" v-if="country && showDeleteModal" />
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
const { allCountries } = countriesData();
const countries = ref<Country[]>([])
const country = ref<Country | null>(null)
const showDeleteModal = ref(false);
const searchQuery = ref<string>('');
const filteredCountries = ref<Country[]>([]);
type SortDirection = 'asc' | 'desc' | null;
const sortKey = ref<keyof Country | null>(null);
const sortDirection = ref<SortDirection>(null);

const toggleDeleteModal = (c: Country) => {
    country.value = c
    showDeleteModal.value = !showDeleteModal.value;
}

const closeDeleteModal = async () => {
    showDeleteModal.value = !showDeleteModal.value;
    await onLoad();
}

const executeSearch = () => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) {
        filteredCountries.value = [...countries.value];
        return;
    }
    filteredCountries.value = countries.value.filter((c: any) =>
        c.name.toLowerCase().includes(query)
    );
};

const onLoad = async () => {
    countries.value = await allCountries()
    // Au départ, afficher toutes les pays
    filteredCountries.value = [...countries.value];
}

const actifCount = computed(() =>
    filteredCountries.value.filter(c => c.status === 'actif').length
);

const inactifCount = computed(() =>
    filteredCountries.value.filter(c => c.status === 'inactif').length
);

const toggleSort = (key: keyof Country) => {
    if (sortKey.value === key) {
        // Inverse la direction si on reclique
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortDirection.value = 'asc';
    }
};

const exportCountries = () => {
    if (!filteredCountries.value.length) return;

    const headers = ['Nom', 'Code', 'Préfixe', 'Langue', 'Status', 'Deadline'];
    const rows = filteredCountries.value.map(c => [
        c.name,
        c.code,
        c.prefix,
        c.language,
        c.status,
        c.deadline ? new Date(c.deadline).toLocaleString() : ''
    ]);

    // Création du CSV
    const csvContent =
        [headers, ...rows].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `countries_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const sortedCountries = computed(() => {
    if (!sortKey.value || !sortDirection.value) return filteredCountries.value;

    return [...filteredCountries.value].sort((a, b) => {
        const valA = a[sortKey.value!];
        const valB = b[sortKey.value!];

        // Comparaison simple pour string ou number
        if (valA == null) return 1;
        if (valB == null) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
            return sortDirection.value === 'asc' ? valA - valB : valB - valA;
        }

        return sortDirection.value === 'asc'
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });
});

onMounted(async () => {
    await onLoad();
})
</script>