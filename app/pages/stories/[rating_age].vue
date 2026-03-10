<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-24 md:pt-20 pb-12 lg:py-24"
        v-if="age">
        <div :class="`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start gap-4`">
            <button @click="back"
                class="hover:bg-slate-200 hover:duration-300 hover:ease-in-out dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-lg border-slate-400 border-[1px] flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Icon name="mdi:arrow-left" class="w-4 h-4" />
            </button>
            <div class="flex flex-col gap-8 w-full">
                <div class="flex flex-col items-center w-full text-center gap-4 mb-4 md:mb-8">
                    <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-gray-200 shadow-subtle"
                        v-if="age">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span class="text-[11px] font-medium text-gray-600 tracking-tight">Livres pour {{ age
                            }}</span>
                    </div>
                    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black dark:text-white">
                        Livres {{ age ? `pour ${age}` : '' }}
                    </h2>
                    <p class="text-md text-gray-500 dark:text-slate-300 leading-relaxed max-w-2xl">
                        Explorez une sélection de livres africains
                        {{ age ? `adaptés aux lecteurs de ${age}` : '' }},
                        écrits par des auteurs passionnés et publiés sur notre plateforme.
                    </p>
                </div>
                <div class="flex justify-between items-center">
                    <label for="search" class="hidden lg:block font-medium text-slate-600 dark:text-slate-200">Faîtes
                        une recherche</label>
                    <div class="flex items-center justify-between gap-2 w-full lg:w-3/6 xl:w-2/6 lg:flex-none">
                        <div class="relative w-4/5 md:w-full">
                            <Icon name="solar:magnifer-linear"
                                class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input type="search" id="search" v-model="search" placeholder="Rechercher un livre..."
                                class="h-10 pl-8 pr-3 w-full rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
                        </div>

                        <button @click="clearFilters"
                            class="text-white px-4 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-400 transition h-10 flex items-center justify-center gap-1">
                            <Icon name="mdi:refresh" class="w-4 h-4" />
                            <span class="hidden md:block">Réinitialiser</span>
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
                    <!-- Skeleton -->
                    <template v-if="loadingSkeleton">
                        <HomeCardSkeleton v-for="i in 5" :key="i" />
                    </template>

                    <!-- Vraies cartes -->
                    <template v-else>
                        <HomeCard v-for="(book, index) in filteredBooks" :index="index" :key="book.id" :book="book" />
                    </template>
                </div>
                <div v-if="!loadingSkeleton && filteredBooks.length === 0"
                    class="flex flex-col items-center justify-center text-center p-6">
                    <Icon name="mdi:books" class="w-12 h-12 text-slate-300 mb-3" />
                    <p class="text-slate-500 text-sm font-medium">
                        Aucun livre disponible
                    </p>
                </div>
                <div ref="loadMoreTrigger" class="h-10"></div>
                <div v-if="loading" class="text-center py-4 text-sm text-slate-500">
                    Chargement...
                </div>
            </div>
        </div>
    </div>

    <div v-if="!age && !loadingSkeleton"
        class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-slate-200 min-h-screen">

        <Icon name="mdi:book" class="w-12 h-12 text-slate-300 mb-4 animate-pulse" />
        <p class="text-lg font-semibold mb-1 text-slate-700 dark:text-white">
            Oops ! Pas de livre disponible
        </p>
        <p class="text-sm mb-4">
            Merci de revenir à la page précédente
        </p>
        <button @click="back"
            class="mt-2 bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm text-white">
            <Icon name="mdi:arrow-left" class="w-4 h-4" /> Retour
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const route = useRoute();
const router = useRouter();
const { findAllPaginatedRatingAge } = booksData();
const books = ref<BookData[]>([]);
const page = ref(1);
const limit = ref(25); // 25 livres par page
const totalPages = ref<number>(1); // nombre total de pages
const loading = ref(false); // pour éviter les doubles requêtes
const loadingSkeleton = ref<boolean>(true); // skeleton
const age = ref<string>("");
const rating = ref<string>("");
const search = ref<string>("")
const loadMoreTrigger = ref<HTMLElement | null>(null)

const urlRatingAge = (r: string) => {
    switch (r) {
        case 'age18':
            age.value = '18ans+';
            rating.value = '18';
            break;
        case 'age16':
            age.value = '16ans+';
            rating.value = '16';
            break;
        case 'age12':
            age.value = '12ans+';
            rating.value = '12';
            break;

        default:
            age.value = ""
            break;
    }
}

const back = () => {
    router.back();
}

const clearFilters = () => {
    search.value = ""
}

const filteredBooks = computed(() => {
    return books.value.filter((book) => {
        const titleMatch = search.value
            ? book.title.toLowerCase().includes(search.value.toLowerCase())
            : true
        return titleMatch
    })
})

const loadBooks = async () => {
    if (loading.value) return
    if (page.value > totalPages.value) return

    loading.value = true
    loadingSkeleton.value = true;
    const { data, totalPages: tp } = await findAllPaginatedRatingAge(
        page.value,
        limit.value,
        rating.value
    )

    if (page.value <= tp) {
        books.value.push(...data)
        totalPages.value = tp
        page.value++
    }

    loading.value = false
    loadingSkeleton.value = false;
}

const onLoad = async () => {
    urlRatingAge(route.params.rating_age as string);

    const { data, totalPages: tp } = await findAllPaginatedRatingAge(
        page.value,
        limit.value,
        rating.value
    )
    page.value++;
    books.value = data
    loadingSkeleton.value = false;
}

onMounted(async () => {
    await onLoad();
    if (age.value) {
        useSeoMeta({
            title: `Livres pour ${age.value}`
        })
    }

    const observer = new IntersectionObserver(
        async (entries: any) => {
            if (entries[0].isIntersecting) {
                await loadBooks()
            }
        },
        { threshold: 1 }
    )

    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value)
    }
})

useSeoMeta({
    description: 'Explorez des livres africains originaux écrits par des auteurs émergents et passionnés sur Afric Storyline.',

    ogTitle: 'Tous les livres',
    ogDescription: 'Découvrez tous les livres publiés sur notre plateforme.',
    ogImage: 'https://africstoryline.com/afric.png',
    ogUrl: 'https://africstoryline.com/',
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'Toutes les histoires',
    twitterDescription: 'Découvrez toutes les histoires publiées sur notre plateforme.',
    twitterImage: 'https://africstoryline.com/afric.png'
});
</script>
