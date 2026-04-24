<template>
    <div class="bg-[#fffcfccc] dark:bg-transparent px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12">
        <div class="max-w-7xl mx-auto lg:px-6">
            <div class="flex flex-col gap-4">
                <div class="">
                    <button @click="back"
                        class="p-1 lg:p-2 border rounded-lg flex items-center justify-center gap-1 text-xs hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <Icon name="mdi:arrow-left" class="w-5 h-5 lg:w-4 lg:h-4" /> Retour
                    </button>
                </div>
                <div
                    class="flex flex-col gap-4 lg:gap-1 bg-slate-50 dark:bg-slate-800 border dark:border-slate-400 px-3 py-4 lg:p-3 rounded-lg">
                    <p class="text-[14px] text-slate-500 dark:text-slate-200">
                        Sur cette page, vous pouvez configurer le prix d’achat de votre livre (PDF) ainsi que celui de
                        son
                        abonnement mensuel.
                    </p>
                </div>
                <!-- ATTENTION -->
                <div class="text-xs text-slate-500 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                    💡 Merci de suivre attentivement les consignes indiquées.
                </div>
            </div>

            <div class="border-t border-slate-200 mt-8 lg:mt-7 pt-6 lg:pt-5">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-display text-xl font-medium text-slate-900 dark:text-white flex items-center gap-1">
                        <Icon name="mdi:database" class="w-5 h-5" />
                        Données
                    </h3>

                    <nuxt-link to="/my-stories/books-pricing/create"
                        class="flex items-center gap-2 bg-primary text-white dark:border hover:bg-slate-700 hover:ease-in-out hover:duration-300 rounded-lg py-2 text-[13px] justify-center border-slate-200 border px-4 md:px-6 md:py-2.5">
                        <Icon name="mdi:plus" class="w-5 h-5" />
                        <span class="hidden md:block">Créer une nouvelle configuration</span>
                    </nuxt-link>
                </div>
            </div>


                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 lg:hidden">
                    <!-- Skeleton -->
                    <template v-if="loading">
                        <MyStoryCardSkeleton v-for="i in 4" :key="i" />
                    </template>
                    <template v-else>
                        <div class="flex flex-col justify-between gap-1 rounded shadow-sm hover:shadow-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-400 hover:border-slate-300 transition-all group-hover:scale-105 hover:shadow-sm"
                            v-for="(bookPricing, index) in sortedBooksPricingArrays" ref="bookRefs">
                            <div :key="index" :to="`/books/${bookPricing?.book.uuid}`" class="group flex flex-col">
                                <img :src="`${$config.public.apiBackendUrl}/uploads/books/${bookPricing?.book?.image}`"
                                    class="w-full h-40 md:h-36 lg:h-40 rounded-t object-cover transition-transform duration-500"
                                    :alt="bookPricing?.book.title">
                                <div class="px-2.5 pt-2 flex flex-col gap-1">
                                    <p
                                        class="font-medium text-slate-900 dark:text-white group-hover:text-orange-600 flex transition-colors">
                                        <span class="truncate">{{ bookPricing?.book.title }}</span>
                                    </p>
                                    <p class="text-sm">
                                        <span class="font-medium">Prix du livre : </span>
                                        <span>{{ bookPricing.pdf_price }} {{ bookPricing.currency }}</span>
                                    </p>
                                    <p class="text-sm">
                                        <span class="font-medium">Montant abonnement mensuel : </span>
                                        <span>{{ bookPricing.subscription_price_monthly }} {{ bookPricing.currency }}</span>
                                    </p>
                                    <p class="text-sm":class="bookPricing?.is_pdf_enabled ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">
                                        <span class="font-medium">PDF : </span>
                                        {{ bookPricing?.is_pdf_enabled ? 'Actif' : 'Inactif' }}
                                    </p>
                                    <p class="text-sm":class="bookPricing?.is_subscription_enabled ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">
                                        <span class="font-medium">Abonnement : </span>
                                        {{ bookPricing?.is_subscription_enabled ? 'Actif' : 'Inactif' }}
                                    </p>
                                    <p v-if="bookPricing?.book.status === 'inactive'"
                                        class="text-xs text-center text-red-600 font-medium bg-red-50 p-1 rounded">Ce
                                        livre sera supprimé dans quelques jours...(<strong>{{
                                            getDaysFromToday(`${bookPricing?.book.deadline}`)?.days }}</strong>jrs).</p>
                                </div>
                            </div>
                            <div
                                class="flex justify-between items-center gap-2 px-2.5 py-2 w-full text-[11px] border-t-[1px] dark:text-slate-200 border-slate-200 dark:border-slate-500">
                                <nuxt-link :to="`/my-stories/books-pricing/${bookPricing.uuid}/edit`"
                                    class="flex items-center gap-1 justify-center gap-1 group-hover:translate-x-1 transition-transform">
                                    <Icon name="mdi:pencil" class="w-3 h-3" />
                                    Modifier
                                </nuxt-link>
                                <nuxt-link :to="`#`"
                                    class="flex items-center gap-1 justify-center gap-1 group-hover:translate-x-1 transition-transform">
                                    <Icon name="mdi:eye" class="w-3 h-3" />
                                    Historique
                                </nuxt-link>
                                <button
                                    class="flex items-center gap-1 justify-center text-red-500 gap-1 group-hover:translate-x-1 transition-transform">
                                    <Icon name="mdi:delete" class="w-3 h-3" />
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </template>
                </div>

            <div
                class="hidden lg:block bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="overflow-y-auto overflow-x-auto custom max-h-[500px]">
                    <table class="w-full text-left border-collapse">
                        <thead class="sticky top-0 z-10 bg-slate-50">
                            <tr
                                class="text-xs text-slate-400 dark:text-slate-300 border-b border-slate-100 bg-slate-50/50 dark:bg-slate-800">
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Titre de l'histoire</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Prix du livre</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Montant abonnement mensuel</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Statut</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Deadline</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">PDF</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap">Abonnement</th>
                                <th class="font-semibold py-3 px-6 whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="sortedBooksPricingArrays.length === 0 && !loading" class="text-xs">
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
                                    <div class="h-3 w-24 bg-slate-200 dark:bg-slate-300 rounded animate-pulse">
                                    </div>
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

                        <tbody v-if="!loading && sortedBooksPricingArrays.length !== 0" class="text-sm">
                            <tr class="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 text-xs"
                                v-for="(bookPricing, index) in sortedBooksPricingArrays" :key="index">
                                <td class="py-3 px-6">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-8 h-10 lg:h-8 flex-shrink-0 bg-slate-200 rounded object-cover overflow-hidden">
                                            <img :src="`${$config.public.apiBackendUrl}/uploads/books/${bookPricing?.book?.image}`"
                                                class="w-full h-full object-cover opacity-80"
                                                :alt="bookPricing?.book.title">
                                        </div>
                                        <span
                                            class="font-medium text-slate-900 dark:text-slate-200 group-hover:text-orange-600 transition-colors underline whitespace-nowrap">{{
                                            bookPricing?.book.title }}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center whitespace-nowrap dark:text-slate-300">
                                    {{ bookPricing?.pdf_price }} {{ bookPricing.currency }}
                                </td>
                                <td class="py-3 px-6 text-center whitespace-nowrap dark:text-slate-300">
                                    {{ bookPricing?.subscription_price_monthly }} {{ bookPricing.currency }}
                                </td>
                                <td class="py-3 px-6 whitespace-nowrap">
                                    <span
                                        :class="`${bookPricing?.book.status === 'inactive' ? 'text-red-600 bg-red-50 dark:text-red-600' : (bookPricing?.book.status === 'completed' ? 'text-green-600 dark:text-green-500 bg-green-50' : (bookPricing?.book.status === 'ongoing' ? 'text-blue-600 dark:text-blue-500 bg-blue-50' : 'bg-slate-100 text-slate-500'))} inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium`">
                                        <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                                        {{ status(bookPricing?.book.status) }}
                                    </span>
                                </td>
                                <td class="py-3 px-6 text-center whitespace-nowrap">
                                    <span
                                        :class="`inline-flex items-center gap-1.5 text-[10px] font-medium text-red-700 dark:text-red-500`"
                                        v-if="bookPricing?.book.status === 'inactive'">
                                        <span :class="`w-1 h-1 rounded-full bg-red-600`"></span>
                                        {{ formatLocalDate(bookPricing?.book.deadline || '') }}
                                    </span>
                                </td>
                                <td class="py-3 px-6 text-center whitespace-nowrap"
                                    :class="bookPricing?.is_pdf_enabled ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">
                                    {{ bookPricing?.is_pdf_enabled ? 'Actif' : 'Inactif' }}
                                </td>
                                <td class="py-3 px-6 text-center whitespace-nowrap"
                                    :class="bookPricing?.is_subscription_enabled ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">
                                    {{ bookPricing?.is_subscription_enabled ? 'Actif' : 'Inactif' }}
                                </td>
                                <td class="py-3 px-6 text-right whitespace-nowrap flex items-center justify-end gap-2">
                                    <nuxt-link :to="`/my-stories/books-pricing/${bookPricing.uuid}/edit`"
                                        class="text-blue-600 dark:text-blue-500 hover:text-blue-700 flex items-center gap-1 justify-center transition-colors text-xs underline">
                                        <Icon name="mdi:edit" class="w-3 h-3" />
                                        Modifier
                                    </nuxt-link>
                                    <nuxt-link :to="'#'"
                                        class="text-amber-600 dark:text-amber-500 hover:text-amber-700 flex items-center gap-1 justify-center transition-colors text-xs underline">
                                        <Icon name="mdi:eye" class="w-3 h-3" />
                                        Historiques
                                    </nuxt-link>
                                    <button
                                        class="p-1 rounded-md hover:bg-slate-100 text-red-600 hover:text-red-700 transition-colors">
                                        <Icon name="mdi:trash" width="16" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex items-center justify-between p-4 border-t border-slate-100">
                <span class="text-xs text-slate-500 dark:text-slate-300">Page <span class="font-medium text-slate-900 dark:text-slate-200">{{ currentPage }} / {{ totalPages
                        }}</span> - {{ sortedBooksPricingArrays.length }} données</span>
                    <div class="flex gap-2">
                        <button @click="prevPage" :disabled="page === 1"
                            class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                            Précédent
                        </button>
                        <button @click="nextPage" :disabled="page === totalPages"
                            class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
const { toConnectUser } = authenticate();
const { getBooksPricingByIdUser } = booksPricingData();
const user = ref<User | null>(null);
const page = ref<number>(1);
const totalPages = ref<number>(1);
const currentPage = ref<any>("");
const booksPricing = ref<BookPricing[]>([]);
const searchQuery = ref(''); // ce que l'utilisateur tape
const searchTerm = ref('');  // utilisé pour filtrer
const loading = ref<boolean>(false);
const router = useRouter();
type SortDirection = 'asc' | 'desc' | null;
const sortKey = ref<keyof BookPricing | null>(null);
const sortDirection = ref<SortDirection>(null);

const back = () => {
    router.back();
}

const status = (status: string) => {
    switch (status.toLocaleLowerCase()) {
        case "ongoing":
            return "En cours"
        case "completed":
            return "Terminée"
        case "paused":
            return "Pause"
        case "draft":
            return "Brouillon"
        case "inactive":
            return "Inactive"
        default:
            return "Brouillon"
    }
}

const nextPage = async () => {
    if (page.value >= totalPages.value) return
    page.value++
    await onLoad()
}

const prevPage = async () => {
    if (page.value <= 1) return
    page.value--
    await onLoad()
}

const toggleSort = (key: keyof BookPricing) => {
    if (sortKey.value === key) {
        sortDirection.value =
            sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortDirection.value = 'asc';
    }
};

// Filtrage combiné avec statut + recherche
const filteredBooksArray = computed(() => {
    return booksPricing.value.filter((bookPricing) => {
        const matchesSearch =
            !searchTerm.value ||
            bookPricing.book.title.toLowerCase().includes(searchTerm.value.toLowerCase());

        return matchesSearch;
    });
});

const sortedBooksPricingArrays = computed(() => {
    if (!sortKey.value || !sortDirection.value) {
        return filteredBooksArray.value;
    }

    return [...filteredBooksArray.value].sort((a, b) => {
        const valA = a[sortKey.value!];
        const valB = b[sortKey.value!];

        if (valA == null) return 1;
        if (valB == null) return -1;

        // 🔥 Gestion des dates
        if (valA instanceof Date && valB instanceof Date) {
            return sortDirection.value === 'asc'
                ? valA.getTime() - valB.getTime()
                : valB.getTime() - valA.getTime();
        }

        // 🔢 Numbers
        if (typeof valA === 'number' && typeof valB === 'number') {
            return sortDirection.value === 'asc'
                ? valA - valB
                : valB - valA;
        }

        // 🔤 Strings
        return sortDirection.value === 'asc'
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });
});


const onLoad = async () => {
    loading.value = true
    const res = await getBooksPricingByIdUser(page.value);
    booksPricing.value = res.booksPricing;
    totalPages.value = res.totalPages;
    currentPage.value = res.currentPage;
    loading.value = false;
}

onMounted(async () => {
    await onLoad();
    user.value = await toConnectUser();
    if (!user.value || (user.value && !authorizeRoleUser(user.value.role))) {
        router.push("/login");
    } else {
        useSeoMeta({
            title: `Abonnements et prix - ${user.value.name}`,
        });
    }
})
</script>