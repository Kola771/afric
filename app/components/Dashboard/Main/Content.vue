<template>
    <div class="max-w-6xl mx-auto space-y-8" v-if="user && profil">

        <!-- Welcome Section -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
                <h1 class="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Bonjour, {{
                    user.name }} 👋</h1>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Voici ce qui se passe sur Afric Storyline
                    aujourd'hui.</p>
            </div>
            <div class="flex gap-3">
                <!-- <button class="h-9 px-4 rounded-lg bg-white dark:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:filter-linear" class="w-5 h-5" />
                    Filtres
                </button> -->
                <nuxt-link target="_blank" to="/my-stories"
                    class="h-9 dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 px-4 rounded-lg dark:bg-slate-800 dark:border bg-slate-900 text-xs font-medium text-white hover:bg-slate-800 shadow-sm transition-colors flex items-center gap-2">
                    <Icon name="solar:add-circle-linear" class="w-5 h-5" />
                    Mes histoires
                </nuxt-link>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Stat Card 1 -->
            <div
                class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <Icon name="solar:users-group-rounded-linear" class="w-5 h-5" />
                    </div>
                </div>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-300">Utilisateurs Totaux</p>
                <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200 mt-1">{{ formatNumber(userActifs) }}</p>
            </div>

            <!-- Stat Card 2 -->
            <div
                class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                        <Icon name="solar:documents-minimalistic-linear" class="w-5 h-5" />
                    </div>
                </div>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-300">Histoires Publiées</p>
                <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200 mt-1">{{ formatNumber(booksPublish) }}</p>
            </div>

            <!-- Stat Card 3 -->
            <div
                class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                        <Icon name="solar:eye-linear" class="w-5 h-5" />
                    </div>
                </div>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-300">Visiteurs (7j)</p>
                <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200 mt-1">{{ formatNumber(visitors) }}</p>
            </div>

            <!-- Stat Card 4 -->
            <div
                class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                        <Icon name="solar:star-linear" class="w-5 h-5" />
                    </div>
                </div>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-300">Auteurs Actifs</p>
                <p class="text-2xl font-display font-bold text-slate-900 dark:text-slate-200 mt-1">{{ formatNumber(authorActifs) }}</p>
            </div>
        </div>

        <!-- Main Grid: Traffic & Map (Placeholder) -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Chart Area -->
            <DashboardMainReadsByWeek />

            <!-- Top Countries / Categories -->
            <DashboardMainVisitorsPercentageByCountry :visitorsPercentageByCountry="visitorsPercentageByCountry" />
        </div>

        <!-- Top five books -->
        <div class="bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 class="text-base font-semibold text-slate-900 dark:text-slate-200">Top 5 des livres populaires</h3>
                <nuxt-link to="/dashboard/stories"
                    class="text-xs font-medium text-orange-600 dark:text-orange-500 hover:text-orange-700 hover:underline">Tout
                    voir</nuxt-link>
            </div>
            <div class="overflow-x-auto custom">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-xs text-slate-400 dark:text-slate-300 border-b border-slate-100 bg-slate-50/50 dark:bg-slate-800">
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Titre du livre</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Auteur</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Catégorie</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Performance</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Âge autorisé</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">Statut</th>
                            <th class="font-semibold py-3 px-6 whitespace-nowrap">...</th>
                        </tr>
                    </thead>
                    <tbody v-if="books.length === 0 && !loading" class="text-xs">
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
                                <div class="h-5 w-16 bg-slate-200 dark:bg-slate-300 rounded-full animate-pulse"></div>
                            </td>

                            <!-- Rating age -->
                            <td class="py-3 px-6">
                                <div class="h-5 w-16 bg-slate-200 dark:bg-slate-300 rounded-full animate-pulse"></div>
                            </td>

                            <!-- ... -->
                            <td class="py-3 px-6">
                                <div class="h-5 w-16 bg-slate-200 dark:bg-slate-300 rounded-full animate-pulse"></div>
                            </td>

                        </tr>
                    </tbody>

                    <tbody v-if="!loading && books.length !== 0" class="text-sm">
                        <tr class="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 text-xs"
                            v-for="(book, index) in books" :key="index">
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
                            <td class="py-3 px-6 text-slate-600 dark:text-slate-200"><nuxt-link
                                    class="hover:underline hover:text-orange-600 dark:hover:text-orange-500 hover:duration-300 hover:ease-linear whitespace-nowrap"
                                    :to="`/dashboard/authors/${book.user?.uuid}`">{{ book.user?.name }}</nuxt-link></td>
                            <td class="py-3 px-6 space-x-1 whitespace-nowrap">
                                <span
                                    class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                                    v-for="(category, i) in book.book_categories">
                                    {{ category?.name }}
                                </span>
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <div class="flex items-center gap-4">
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-200">{{ formatNumber(book?.book_reactions)
                                        }}</span> <span class="text-slate-400 text-[10px]">réactions
                                        </span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                            formatNumber(Number(book?.total_views)) }}</span> <span
                                            class="text-slate-400 text-[10px]">vues
                                        </span>
                                    </div>
                                    <div class="w-px h-3 bg-slate-200"></div>
                                    <div class="text-xs">
                                        <span class="font-semibold text-slate-900 dark:text-slate-200">{{ formatNumber(book?.book_comments)
                                        }}</span> <span class="text-slate-400 text-[10px]">commentaires
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6 text-center whitespace-nowrap dark:text-slate-200">
                                {{ book.rating_age }}
                            </td>
                            <td class="py-3 px-6 whitespace-nowrap">
                                <span
                                    :class="`${book.status === 'inactive' ? 'text-red-600 bg-red-50 dark:text-red-600' : (book.status === 'completed' ? 'text-green-600 dark:text-green-500 bg-green-50' : (book.status === 'ongoing' ? 'text-blue-600 dark:text-blue-500 bg-blue-50' : 'bg-slate-100 text-slate-500'))} inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium`">
                                    <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                                    {{ status(book.status) }}
                                </span>
                            </td>
                            <td class="py-3 px-6 text-right whitespace-nowrap">
                                <nuxt-link :to="`/books/${book.uuid}`" target="_blank"
                                    v-if="!['draft', 'inactive'].includes(book.status)"
                                    class="mr-2 text-amber-600 dark:text-amber-500 hover:text-amber-700 transition-colors text-xs underline">Rendu
                                    en ligne</nuxt-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
const { countDistinctIpsLast7Days, getVisitorsPercentageByCountry } = visitorsData();
const { getProfile, countUserActifs, countAuthorsActifs } = usersData();
const { getFiveTopBooks, countDistinctBooks } = booksData();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const books = ref<BookData[]>([]);
const userActifs = ref<number>(0);
const booksPublish = ref<number>(0);
const visitors = ref<number>(0);
const visitorsPercentageByCountry = ref<any>([]);
const authorActifs = ref<number>(0);
const loading = ref(true)

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

onMounted(async () => {
    user.value = await toConnectUser();
    profil.value = await getProfile();
    books.value = await getFiveTopBooks();
    userActifs.value = await countUserActifs();
    booksPublish.value = await countDistinctBooks();
    visitors.value = await countDistinctIpsLast7Days();
    authorActifs.value = await countAuthorsActifs();
    visitorsPercentageByCountry.value = await getVisitorsPercentageByCountry();
    loading.value = false;
})
</script>