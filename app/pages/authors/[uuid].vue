<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b pt-8 md:pt-12 pb-12" v-if="author">
        <section class="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-100 lg:gap-10 lg:grid lg:grid-cols-4">
            <button @click="back"
                class="lg:hidden mb-2 p-1 border rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Icon name="mdi:arrow-left" class="w-6 h-6" />
            </button>
            <div
                class="flex lg:flex-col lg:justify-start justify-center items-center gap-2 lg:sticky lg:top-20 self-start">
                <div class="group flex flex-col lg:justify-center items-center gap-2 w-full">
                    <div class="flex lg:flex-col lg:justify-center items-center gap-2 w-full">
                        <img v-if="author.photo" :src="`${config.public.apiBaseUrl}/uploads/users/${author.photo}`"
                            class="w-16 h-16 md:w-24 md:h-24 lg:group-hover:scale-95 hover:duration-300 transition-all lg:w-full lg:h-72 object-cover rounded-full lg:rounded-lg"
                            alt="Image de l'auteur">
                        <span v-if="!author.photo"
                            class="p-1 text-md lg:text-2xl xl:text-3xl font-bold flex items-center justify-center w-16 h-16 md:w-24 md:h-24 lg:group-hover:scale-95 hover:duration-300 transition-all lg:w-full lg:h-72 object-cover rounded-full lg:rounded-lg"
                            :style="`background-color: ${author.code_color}`">
                            {{ author.name.split(" ").length > 1 ? `${author.name.charAt(0).toUpperCase() +
                                author.name.split(" ")[1]?.charAt(0).toUpperCase()}` : author.name.charAt(0).toUpperCase()
                            }}
                        </span>
                        <div class="flex flex-col gap-0.5">
                            <div class="flex flex-col">
                                <h2 class="lg:text-center text-lg font-bold text-slate-900 dark:text-white">{{
                                    author.name }}</h2>
                                <p
                                    class="lg:text-center text-slate-600 text-xs lg:text-xs dark:text-slate-300 -mt-1 lg:mt-0">
                                    Originaire : {{ author.country?.name }}</p>
                            </div>
                            <div class="text-[11px] flex flex-wrap items-center gap-2 lg:hidden">
                                <div>
                                    <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                        formatNumber(author.total_followers) }}</span>
                                    <span class="text-slate-400"> follower(s)</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                        formatNumber(author.books.length) }}</span>
                                    <span class="text-slate-400"> livre(s)</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                        formatNumber(countChapters(author.books)) }}</span>
                                    <span class="text-slate-400"> chapitre(s)</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                        formatNumber(countViews(author.books)) }}</span>
                                    <span class="text-slate-400"> vue(s)</span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="lg:rounded-lg lg:bg-slate-50 dark:lg:bg-slate-800 lg:p-3 lg:mt-1 lg:flex lg:justify-between lg:items-center gap-2 text-slate-200 dark:text-slate-200 hidden w-full">
                            <span class="text-xs">
                                <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                    formatNumber(author.total_followers) }}</span> <span class="text-slate-400">
                                    <Icon name="mdi:users" class="w-4 h-4" />
                                </span>
                            </span>
                            <span class="w-px h-3 bg-slate-200"></span>
                            <span class="text-xs">
                                <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                    formatNumber(author.books.length) }}</span> <span class="text-slate-400">
                                    <Icon name="mdi:books" class="w-4 h-4" />
                                </span>
                            </span>
                            <span class="w-px h-3 bg-slate-200"></span>
                            <span class="text-xs">
                                <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                    formatNumber(countChapters(author.books)) }}</span> <span class="text-slate-400">
                                    <Icon name="mdi:book-open-page-variant" class="w-4 h-4" />
                                </span>
                            </span>
                            <span class="w-px h-3 bg-slate-200"></span>
                            <span class="text-xs">
                                <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                    formatNumber(countViews(author.books)) }}</span> <span class="text-slate-400">
                                    <Icon name="mdi:eye" class="w-4 h-4" />
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="w-full">
                        <button v-if="!follow" :disabled="loading" @click.stop="followAuthor(author.id)"
                            class="bg-orange-700 hover:bg-orange-800 transition-all duration-300 ease-linear dark:border dark:border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-900 hover:bg-primary text-white text-xs w-full p-2.5 rounded-lg">
                            Suivre
                        </button>

                        <button v-else :disabled="loading" @click.stop="unFollowAuthor(author.id)"
                            class="bg-orange-800 hover:bg-orange-900 transition-all duration-300 ease-linear dark:border dark:border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-900 hover:bg-primary text-white text-xs w-full p-2.5 rounded-lg">
                            Se désabonner
                        </button>
                    </div>
                </div>
            </div>
            <div class="border-t border-slate-200 lg:border-none lg:pt-0 pt-6 mt-6 lg:mt-0 lg:col-span-3 2xl:pr-0">
                <div class="lg:mt-0 text-sm max-w-none text-slate-600 dark:text-slate-200">
                    <button @click="back"
                        class="hidden lg:flex p-1 border rounded-lg items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <Icon name="mdi:arrow-left" class="w-5 h-5" />
                    </button>
                    <h3 class="font-display text-xl font-bold text-slate-900 dark:text-white mb-1">Bibliographie</h3>
                    <p v-if="author.bibliography" v-html="author.bibliography"></p>
                    <p v-else class="text-slate-500 dark:text-slate-400">Aucune bibliographie de cet auteur disponible !
                    </p>
                </div>
                <!-- stories List -->
                <div class="border-t border-slate-200 mt-6 pt-6">
                    <div class="flex items-center md:items-end justify-between mb-4">
                        <h3 class="font-display text-xl font-medium text-slate-900 dark:text-white">Livres</h3>

                        <div class="flex gap-2 text-xs">
                            <select v-model="statusFilter"
                                class="bg-slate-50 dark:bg-slate-800 dark:text-white outline-none px-3 py-1.5 rounded-lg border-slate-300 border">
                                <option :value="null">Statut</option>
                                <option value="ongoing">En cours</option>
                                <option value="paused">En pause</option>
                                <option value="completed">Terminé</option>
                            </select>
                            <select v-model="ageFilter"
                                class="bg-slate-50 dark:bg-slate-800 dark:text-white outline-none px-3 py-1.5 rounded-lg border-slate-300 border">
                                <option :value="null">Options</option>
                                <option value="12+">12 ans+</option>
                                <option value="16+">16 ans+</option>
                                <option value="18+">18 ans+</option>
                            </select>
                            <button @click="clearFilters"
                                class="text-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-400 transition flex items-center justify-center gap-1">
                                <Icon name="mdi:refresh" class="w-4 h-4" />
                                <span class="hidden md:block">Réinitialiser</span>
                            </button>
                        </div>

                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10"
                        v-if="filteredBooks.length > 0">
                        <!-- Skeleton -->
                        <template v-if="loadingSkeleton">
                            <HomeCardSkeleton v-for="i in 10" :key="i" />
                        </template>

                        <!-- Vraies cartes -->
                        <template v-else>
                            <HomeCard v-for="(book, index) in filteredBooks" :key="book.id" :book="book"
                                :index="index" />
                        </template>
                    </div>
                    <!-- Message vide -->
                    <div v-else class="flex flex-col items-center justify-center py-16 text-center">
                        <Icon name="mdi:book-open-variant" class="w-12 h-12 text-slate-300 mb-3" />

                        <p class="text-slate-500 text-sm font-medium">
                            Aucun livre trouvé
                        </p>
                    </div>
                    <!-- LOADING -->
                    <div v-if="loading" class="text-center text-sm text-slate-500 dark:text-slate-200">
                        Chargement...
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const { findByUuid } = usersData();
const { findAllPaginatedByAuthor } = booksData();
const { toConnectUser } = authenticate();
const { createFollower, deleteFollow } = useFollowers();
const user = ref<User | null>(null);
const author = ref<Author | null>(null);
const books = ref<BookData[]>([]);
const loading = ref<boolean>(false)
const loadingSkeleton = ref<boolean>(false)
const follow = ref<boolean | any>(false)
const page = ref(1)
const limit = ref(25)
const totalPages = ref(1)
const cardRefs = ref<any[]>([]);
const observer = ref<IntersectionObserver | null>(null);
const statusFilter = ref<string | null>(null)
const ageFilter = ref<string | null>(null)

const onLoad = async () => {
    user.value = await toConnectUser();
    const res = await findByUuid(`${route.params.uuid}`);
    if (res.success) {
        author.value = res.data;
        if (author.value) {
            useSeoMeta({
                title: `Auteur - ${author.value.name}`
            })
            if (author.value.status !== 'actif') {
                router.back();
            } else {
                const result = author.value.followers?.some(
                    (f: any) => f.follower_id === user.value?.id
                );

                follow.value = result;
            }
        }
    }
}

const countChapters = (books: BookData[]): number => {
    return books.reduce((total, book) => {
        const validChapters =
            book?.chapters?.filter((chapter: ChapterData) => chapter.status !== 'draft') ?? [];

        return total + validChapters.length;
    }, 0);
};

const countViews = (books: BookData[]): number => {
    return books.reduce((total, book) => total + (Number(book?.total_views) ?? 0), 0);
};

onMounted(async () => {
    await onLoad();
    await loadBooks();
})

const filteredBooks = computed(() => {
    return books.value.filter((book) => {

        if (statusFilter.value && book.status !== statusFilter.value) {
            return false
        }

        if (ageFilter.value && book.rating_age !== ageFilter.value) {
            return false
        }

        return true
    })
})

const clearFilters = () => {
    statusFilter.value = null
    ageFilter.value = null
}

const followAuthor = async (authorId: number) => {
    if (!user.value) {
        router.push("/login");
        return;
    }

    loading.value = true;

    try {
        await createFollower({
            follower: { id: user.value.id },
            following: { id: authorId },
        });

        follow.value = true;
    } finally {
        loading.value = false;
    }
};

const unFollowAuthor = async (authorId: number) => {
    if (!user.value) {
        router.push("/login");
        return;
    }

    loading.value = true;

    try {
        await deleteFollow(user.value.id, authorId);

        follow.value = false;
    } finally {
        loading.value = false;
    }
};

const back = () => {
    router.back();
}

// ============================
// Load Books
// ============================

const loadBooks = async () => {
    if (!author.value) return;
    if (loading.value) return;
    if (page.value > totalPages.value) return;

    loading.value = true;
    loadingSkeleton.value = true;

    try {
        const res = await findAllPaginatedByAuthor(page.value, limit.value, author.value.id);

        books.value.push(...res.data);

        totalPages.value = res.totalPages;
        page.value++;
    } finally {
        loading.value = false;
        loadingSkeleton.value = false;
    }
};

// ============================
// Intersection Observer
// ============================

const observeLastCard = () => {
    if (observer.value) observer.value.disconnect();

    nextTick(() => {
        const cards = cardRefs.value;
        if (!cards.length) return;

        const lastCard = cards[cards.length - 1]?.cardRef;

        if (!lastCard) return;

        observer.value = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry?.isIntersecting) {
                    loadBooks();
                }
            },
            {
                threshold: 0.8
            }
        );

        observer.value.observe(lastCard);
    });
};

// ============================
// Watch DOM rendering
// ============================

watch(
    () => books.value.length,
    () => {
        observeLastCard();
    }
);

// ============================
// Mounted
// ============================

onMounted(async () => {
    await loadBooks();
});

onUnmounted(() => {
    observer.value?.disconnect();
});
</script>