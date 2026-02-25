<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b pt-12 pb-12">
        <section class="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-100 lg:gap-10">
            <div
                class="flex flex-col gap-4 md:items-center md:flex-row md:justify-between bg-slate-50 dark:bg-slate-800 border px-3 py-4 lg:p-3 rounded-lg">
                <div class="flex flex-col gap-1 items-start">
                    <button @click="back"
                        class="p-1 border rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <Icon name="mdi:arrow-left" class="w-5 h-5" />
                    </button>
                    <p class="text-[14px] text-slate-500 dark:text-slate-200 max-w-xs">
                        Par défaut, toute histoire créée a pour statut
                        <span class="font-medium text-orange-600 dark:text-orange-500">Brouillon</span>
                        et n'est pas accessible aux lecteurs en ligne.
                    </p>
                </div>
                <nuxt-link to="/my-stories/create_book"
                    class="flex items-center gap-2 bg-primary text-white dark:border hover:bg-slate-700 hover:ease-in-out hover:duration-300 rounded-full py-3 text-[13px] justify-center border-slate-200 border md:px-6 md:py-2.5">
                    <Icon name="mdi:plus" class="w-5 h-5" />
                    Ajouter une histoire
                </nuxt-link>
            </div>
            <div class="border-t border-slate-200 mt-6 pt-6">
                <h3
                    class="font-display text-xl font-medium text-slate-900 dark:text-white flex items-center gap-1 mb-4">
                    <Icon name="mdi:book-multiple-outline" class="w-5 h-5" /> Mes histoires
                </h3>
                <div
                    class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 shadow-sm mb-4">
                    <!-- Tabs -->
                    <div class="flex bg-slate-100 dark:bg-transparent p-1 rounded-lg overflow-x-auto max-w-full custom">
                        <button v-for="tab in ['all', 'draft', 'completed', 'ongoing', 'paused', 'inactive']" :key="tab"
                            @click="setStatusFilter(tab)" :class="[
                                'px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all',
                                selectedStatus === tab
                                    ? 'bg-white dark:bg-slate-50 text-slate-900 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-200'
                            ]">
                            {{ tab === 'all' ? 'Tous' : status(tab) }}
                        </button>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <div class="relative flex-1 md:flex-none">
                            <Icon name="solar:magnifer-linear"
                                class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input type="search" v-model="searchQuery" @keydown.enter="onSearchEnter"
                                placeholder="Rechercher une histoire..."
                                class="h-8 pl-8 pr-3 w-full md:w-48 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
                        </div>
                        <button @click="toggleSort('title')"
                            class="h-8 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors">
                            <Icon :name="sortKey === 'title'
                                    ? sortDirection === 'asc'
                                        ? 'solar:arrow-up-linear'
                                        : 'solar:arrow-down-linear'
                                    : 'solar:sort-vertical-linear'
                                " class="w-5 h-5" />
                            <span class="text-xs font-medium hidden sm:inline dark:text-slate-200">Trier</span>
                        </button>
                    </div>
                </div>
                <div v-if="sortedBooks.length > 0"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    <div class="flex flex-col justify-between gap-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 hover:border-slate-300 transition-all group-hover:scale-105 hover:shadow-sm pb-2"
                        v-for="(book, index) in sortedBooks" ref="bookRefs">
                        <nuxt-link :key="book.id" :to="`/books/${book.uuid}`" class="group flex flex-col">
                            <img :src="`${config.public.apiBackendUrl}/uploads/books/${book?.image}`"
                                class="w-full h-40 md:h-36 lg:h-40 rounded-t-lg object-cover transition-transform duration-500"
                                :alt="book.title">
                            <div class="px-2.5 pt-2 flex flex-col gap-1">
                                <p
                                    class="font-medium text-slate-900 dark:text-white group-hover:text-orange-600 flex transition-colors">
                                    <span class="truncate">{{ book.title }}</span>
                                </p>
                                <p class="flex flex-wrap items-center gap-3 text-[10px] font-medium text-orange-600">
                                    <span v-for="category in book.book_categories"
                                        class="bg-orange-50 border border-orange-100/50 text-orange-600 font-medium animate-fade-in-up px-2 py-1 rounded">{{
                                            category.name }}</span>
                                </p>
                                <p
                                    class="flex flex-wrap items-center gap-3 my-1 text-[10px] font-medium text-orange-600">
                                    <span class="bg-slate-100 text-slate-500 px-2 py-1 rounded">{{ status(book.status)
                                    }}</span>
                                </p>
                            </div>
                        </nuxt-link>
                        <!-- <div class="hover:text-orange-600 transition-colors hover:underline px-2.5 py-2 text-xs text-slate-500 dark:text-slate-200 flex flex-wrap gap-2">
                            <span>{{ book.chapters }} chap,</span> <span class="flex items-center gap-1"><Icon name="mdi:eye" class="w-3 h-3" /> <span>{{ book.views }} vue(s)</span></span>
                        </div> -->
                        <div class="grid grid-cols-2 gap-2 px-2.5 w-full">
                            <nuxt-link :to="`/my-stories/${book.uuid}/edit_book`"
                                class="bg-blue-500 p-1.5 rounded flex items-center gap-1 justify-center text-white font-medium gap-1 text-xs dark:bg-blue-600 px-1 group-hover:translate-x-1 transition-transform hover:underline">
                                <Icon name="mdi:pencil" class="w-3 h-3" />
                                Modifier le livre
                            </nuxt-link>
                            <nuxt-link :to="`/my-stories/${book.uuid}`"
                                class="bg-orange-500 p-1.5 rounded flex items-center gap-1 justify-center text-white font-medium gap-1 text-xs dark:bg-orange-600 px-1 group-hover:translate-x-1 transition-transform hover:underline">
                                <Icon name="mdi:book-open-variant-outline" class="w-3 h-3" />
                                Chapitres
                            </nuxt-link>
                            <nuxt-link :to="`/my-stories/${book.uuid}/likes-and-comments`"
                                class="bg-slate-700 p-1.5 rounded flex items-center gap-1 justify-center text-white font-medium gap-1 text-xs px-1 group-hover:translate-x-1 transition-transform hover:underline">
                                <Icon name="mdi:graph" class="w-3 h-3" />
                                Stats
                            </nuxt-link>
                            <button @click="toggleDeleteModal"
                                class="bg-red-500 p-1.5 rounded flex items-center gap-1 justify-center text-white font-medium gap-1 text-xs dark:bg-red-600 px-1 group-hover:translate-x-1 transition-transform">
                                <Icon name="mdi:delete" class="w-3 h-3" />
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Message vide -->
                <div v-else-if="!loading" class="flex flex-col items-center justify-center py-16 text-center">
                    <Icon name="mdi:book-off-outline" class="w-12 h-12 text-slate-300 mb-3" />

                    <p class="text-slate-500 text-sm font-medium">
                        Aucun livre trouvé
                    </p>

                    <p class="text-xs text-slate-400 mt-1">
                        Essayez de modifier votre recherche ou vos filtres.
                    </p>
                </div>
                <LoadersFirst v-if="loading && books.length > 0" />
            </div>
        </section>
        <MyStoryDeleteBook @close-delete-modal="toggleDeleteModal" :showDeleteModal="showDeleteModal"
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

<script lang="ts" setup>
useSeoMeta({
    title: `Mes créations`,
});
const config = useRuntimeConfig();
const { findAllPaginatedAuthor } = booksData();
const { toConnectUser } = authenticate();
const user = ref<User | null>(null);
const books = ref<BookData[]>([]);
const page = ref(1);
const limit = ref(25); // 25 livres par page
const totalPages = ref<number>(1); // nombre total de pages
const loading = ref(false); // pour éviter les doubles requêtes
const lastBook = ref<HTMLElement | null>(null)
const showDeleteModal = ref(false);
const router = useRouter();
const bookRefs = ref<HTMLElement[]>([]);
const observer = ref<IntersectionObserver | null>(null);
const selectedStatus = ref<string>('all'); // Tous par défaut
const searchQuery = ref(''); // ce que l'utilisateur tape
const searchTerm = ref('');  // utilisé pour filtrer
type SortDirection = 'asc' | 'desc' | null;
const sortKey = ref<keyof BookData | null>(null);
const sortDirection = ref<SortDirection>(null);

// Détecter Enter
const onSearchEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        searchTerm.value = searchQuery.value;
    }
};

const toggleSort = (key: keyof BookData) => {
    if (sortKey.value === key) {
        sortDirection.value =
            sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortDirection.value = 'asc';
    }
};

const sortedBooks = computed(() => {
    if (!sortKey.value || !sortDirection.value) {
        return filteredBooks.value;
    }

    return [...filteredBooks.value].sort((a, b) => {
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


// Watch pour vider le champ
watch(searchQuery, (newVal) => {
    if (newVal === '') {
        searchTerm.value = ''; // déclenche le filtrage complet
    }
});

// Filtrage combiné avec statut + recherche
const filteredBooks = computed(() => {
    return books.value.filter((book) => {
        const matchesStatus =
            selectedStatus.value === 'all' ||
            book.status.toLowerCase() === selectedStatus.value.toLowerCase();

        const matchesSearch =
            !searchTerm.value ||
            book.title.toLowerCase().includes(searchTerm.value.toLowerCase());

        return matchesStatus && matchesSearch;
    });
});

// Fonction pour changer le filtre de statut
const setStatusFilter = (status: string) => {
    selectedStatus.value = status;
};

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
            return "Inactive"
        default:
            return "Brouillon"
    }
}

const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value
}

const back = () => {
    window.history.back();
}

const onLoad = async () => {
    user.value = await toConnectUser();
    if (user.value) {
        const { data, totalPages: tp } = await findAllPaginatedAuthor(page.value, limit.value, user.value?.id);
        books.value = data;
        totalPages.value = tp;
        if (!authorizeRoleUser(`${user.value.role.toLocaleLowerCase()}`)) {
            router.push("/");
        }
    }
}

const loadNextPage = async () => {
    if (loading.value) return; // déjà en cours
    if (page.value > totalPages.value) return; // pas de page suivante

    loading.value = true;
    try {
        page.value++;
        if (user.value) {
            const { data, totalPages: tp } = await findAllPaginatedAuthor(page.value, limit.value, user.value?.id);
            books.value.push(...data); // ajouter à la liste existante
            totalPages.value = tp;
        }
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const createObserver = () => {
    if (!lastBook.value) return

    // On détruit l'ancien observer si déjà créé
    if (observer.value) observer.value.disconnect()

    observer.value = new IntersectionObserver(
        (entries) => {
            const entry = entries[0]
            if (entry?.isIntersecting) {
                loadNextPage()
                if (observer.value && entry.target) observer.value.unobserve(entry.target)
            }
        },
        { root: null, rootMargin: '0px', threshold: 1.0 }
    )

    observer.value.observe(lastBook.value)
}

watchEffect(() => {
    // récupérer le dernier élément visible
    const last = bookRefs.value[bookRefs.value.length - 1];
    if (last) lastBook.value = last;
});

watch(
    () => books.value.length,
    async () => {
        await nextTick() // attendre que le DOM se mette à jour
        const last = bookRefs.value[bookRefs.value.length - 1]
        if (last) {
            lastBook.value = last
            createObserver()
        }
    }
)

onMounted(async () => {
    await onLoad();
});

onUnmounted(() => {
    if (observer.value && lastBook.value) {
        observer.value.unobserve(lastBook.value)
    }
});
</script>