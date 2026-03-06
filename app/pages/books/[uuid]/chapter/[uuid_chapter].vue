<template>
    <div class="dark:bg-dark bg-white min-h-screen" v-if="book && chapter">
        <section class="relative">
            <!-- Reader Container simulating a new page/view -->
            <div class="max-w-7xl mx-auto relative">

                <!-- Sticky Reader Header -->
                <div
                    class="sticky top-0 z-40 bg-white/95 dark:bg-dark dark:shadow-white/20 shadow-lg lg:shadow-none backdrop-blur border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <nuxt-link :to="`/books/${book.uuid}`">
                            <Icon name="mdi:arrow-left" class="w-5 h-5 dark:text-slate-200" />
                        </nuxt-link>
                        <div class="flex flex-col">
                            <span
                                class="text-xs text-slate-600 dark:text-slate-200 uppercase tracking-wider font-semibold truncate">{{
                                    book.title }}</span>
                            <span class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ chapter?.title
                            }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="toggleTextSize"
                            class="p-2 flex items-center justify-center text-slate-600 hover:text-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
                            <Icon name="solar:text-square-linear"
                                :class="['w-5 h-5 transition-transform duration-200', textSizeLevel > 0 ? 'scale-110' : '']" />
                        </button>
                        <ThemeToggle />
                    </div>
                </div>

                <!-- Content Body -->
                <div class="px-6 sm:px-12 py-10 max-w-prose lg:max-w-4xl mx-auto">
                    <div
                        :class="['prose prose-slate font-serif text-slate-800 dark:text-slate-200 leading-loose transition-all duration-300', textSizeClass]">
                        <p v-html="chapter.content"></p>
                    </div>

                    <!-- Interactions -->
                    <div
                        class="mt-16 pt-8 border-t border-slate-200 text-slate-500 dark:text-slate-200 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <button class="flex items-center gap-2 hover:text-red-500 transition-colors group">
                                <Icon name="mdi:heart" class="w-5 h-5" />
                                <span class="text-sm font-medium">124 J'aime</span>
                            </button>
                            <button class="flex items-center gap-2 hover:text-blue-600 transition-colors"
                                @click="openStats">
                                <Icon name="mdi:message-text-outline" class="w-5 h-5" />
                                <span class="text-sm font-medium">45 Com.</span>
                            </button>
                        </div>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="grid grid-cols-2 gap-4 mt-8">
                        <button @click="goToPrevChapter" :class="[
                            'px-6 py-4 rounded-xl border text-sm flex items-center justify-center gap-2 transition-all dark:text-slate-200',
                            prevChapter ? 'hover:border-slate-300 hover:bg-slate-50 opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                        ]">
                            <Icon name="mdi:arrow-left" class="w-5 h-5" />
                            Précédent
                        </button>

                        <!-- Suivant -->
                        <button @click="goToNextChapter" :class="[
                            'px-6 py-4 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-sm flex items-center justify-center gap-2 transition-all shadow-lg',
                            nextChapter ? 'hover:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                        ]">
                            Suivant
                            <Icon name="mdi:arrow-right" class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Floating Label for the Presentation -->
            <div class="absolute top-0 left-0 w-full flex justify-center -mt-6">
                <span
                    class="bg-slate-900 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium tracking-wide uppercase">Interface
                    de Lecture</span>
            </div>
        </section>

        <StatsModal :show="showStatsModal" @close="closeStats">
            <div class="flex flex-col h-full lg:h-full lg:w-full">
                <!-- En-tête fixe -->
                <div
                    class="flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800 z-10 border-b border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-medium flex text-slate-900 dark:text-white max-w-2/3">
                        <span class="truncate">L'éveil des ombre</span>
                    </h3>
                    <div class="text-[12px] lg:text-xs flex flex-wrap items-center">
                        <button @click="showComments"
                            :class="step === 'comments' ? 'border-orange-600 dark:border-orange-500' : 'border-slate-300 dark:hover:bg-slate-50'"
                            class="ml-1 p-2 border-b-[1px] flex items-center gap-2 transition-all duration-300 dark:text-white">
                            <Icon name="mdi:comment-multiple" class="w-4 h-4" /> 45
                        </button>
                        <button @click="showLikes"
                            :class="step === 'likes' ? 'border-orange-600 dark:border-orange-500' : 'border-slate-300 dark:hover:bg-slate-50'"
                            class="ml-1 p-2 border-b-[1px] flex items-center gap-2 transition-all duration-300 dark:text-white">
                            <Icon name="mdi:heart" class="w-4 h-4" /> 124
                        </button>
                    </div>
                </div>

                <!-- Contenu scrollable -->
                <div class="flex-1 overflow-y-auto p-4">
                    <div v-if="step === 'likes'" class="grid grid-cols-1 gap-4 mt-2">
                        <div class="flex gap-4" v-for="index in 24" :key="index">
                            <div
                                class="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 dark:bg-orange-600 dark:text-white">
                                A
                            </div>
                            <div>
                                <div class="flex items-center gap-3">
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-[13px] font-semibold text-slate-900 dark:text-slate-200">John
                                            Days</span>
                                        <span class="text-xs text-slate-400 dark:text-slate-200">il y a 2h</span>
                                    </div>
                                    <span
                                        class="px-3 py-0.5 rounded-full bg-orange-50 border border-orange-100/50 text-orange-800 text-[10px] font-medium">
                                        Lecteur
                                    </span>
                                </div>
                                <p class="text-xs lg:text-xs text-slate-600 dark:text-slate-200">@j_day</p>
                            </div>
                        </div>
                    </div>

                    <div v-if="step === 'comments'" class="grid grid-cols-1 gap-4 mt-2">
                        <div class="flex gap-4" v-for="index in 24" :key="index">
                            <div
                                class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 dark:bg-orange-600 dark:text-white">
                                A
                            </div>
                            <div>
                                <div class="flex items-baseline gap-2">
                                    <span
                                        class="text-[13px] font-semibold text-slate-900 dark:text-slate-200">Arnaud</span>
                                    <span class="text-xs text-slate-400 dark:text-slate-200">il y a 5h</span>
                                </div>
                                <p class="text-xs text-slate-600 dark:text-slate-200 mt-1">Très intéressant !</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StatsModal>

        <div class="fixed top-[60px] left-0 w-full h-[3px] bg-slate-200 dark:bg-slate-700 z-50">
            <div class="h-full bg-orange-500 transition-all duration-200" :style="{ width: scrollPercent + '%' }">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const { getBookByUuid } = booksData();
const { getChapterByUuid } = chaptersData();
const { saveRead } = useChapterReads();
const { toConnectUser } = authenticate();
const config = useRuntimeConfig();
const user = ref<User | null>(null);
const book = ref<BookData | null>(null);
const chapter = ref<ChapterData | null>(null);
const chapterReadSent = ref(false);
const scrollPercent = ref(0)
const startReadingTime = ref<number | null>(null)

definePageMeta({
    layout: "not-layout",
});

const showStatsModal = ref(false)
const step = ref<string>("comments");

const showLikes = () => {
    step.value = "likes";
}

const showComments = () => {
    step.value = "comments";
}

const openStats = () => {
    step.value = "comments";
    showStatsModal.value = true
}

const closeStats = () => {
    showStatsModal.value = false
}

const textSizeLevel = ref(0)
// 0 = normal
// 1 = grand
// 2 = très grand

const toggleTextSize = () => {
    textSizeLevel.value = (textSizeLevel.value + 1) % 3
}

const textSizeClass = computed(() => {
    switch (textSizeLevel.value) {
        case 1:
            return "text-lg"
        case 2:
            return "text-xl"
        default:
            return "text-base"
    }
})

// Calculer l'index du chapitre courant
const currentChapterIndex = computed(() => {
    if (!book.value || !chapter.value) return -1;
    return book.value.chapters.findIndex((c: BookData) => c.uuid === chapter.value?.uuid);
});

// Chapitre précédent
const prevChapter = computed(() => {
    const index = currentChapterIndex.value;
    if (index > 0) return book.value?.chapters[index - 1] || null;
    return null;
});

// Chapitre suivant
const nextChapter = computed(() => {
    const index = currentChapterIndex.value;
    if (book.value && index >= 0 && index < book.value.chapters.length - 1) {
        return book.value.chapters[index + 1];
    }
    return null;
});

// Navigation
const goToNextChapter = async () => {

    if (!nextChapter.value) return

    await sendReadingStats()

    router.push(`/books/${book.value?.uuid}/chapter/${nextChapter.value.uuid}`)
}

const goToPrevChapter = async () => {

    if (!prevChapter.value) return

    await sendReadingStats()

    router.push(`/books/${book.value?.uuid}/chapter/${prevChapter.value.uuid}`)
}

const sendReadingStats = async () => {

    if (chapterReadSent.value) return
    if (!chapter.value || !startReadingTime.value) return

    const readingTime = Math.floor((Date.now() - startReadingTime.value) / 1000)

    if (readingTime < 5) return

    chapterReadSent.value = true

    try {

        if (!book.value) return;
        await saveRead({
            id_book: book.value?.id,
            id_user: user.value?.id || null,
            id_chapter: chapter.value.id,
            reading_time: formatReadingTime(readingTime),
        })

    } catch (err) {

        console.log("Erreur stats lecture", err)

    }

}

const handleBeforeUnload = () => {

    if (!chapter.value || !startReadingTime.value) return

    const readingTime = Math.floor((Date.now() - startReadingTime.value) / 1000)

    if (readingTime < 5) return

    if (!book.value) return;
    const payload = JSON.stringify({
        id_book: book.value?.id,
        id_user: user.value?.id || null,
        id_chapter: chapter.value.id,
        reading_time: formatReadingTime(readingTime),
    })

    navigator.sendBeacon(
        `${config?.public?.apiBackendUrl}/chapter_reads`,
        payload
    )
}

const resetReadingStats = () => {

    chapterReadSent.value = false
    scrollPercent.value = 0
    startReadingTime.value = Date.now()

}

let ticking = false

const handleScroll = () => {

    if (!ticking) {

        window.requestAnimationFrame(() => {

            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight
            const winHeight = window.innerHeight

            const percent = (scrollTop / (docHeight - winHeight)) * 100

            scrollPercent.value = Math.min(Math.round(percent), 100)

            ticking = false
        })

        ticking = true
    }
}

// =============================
// INIT
// =============================
onMounted(async () => {

    window.scrollTo({ top: 0 })

    user.value = await toConnectUser()

    book.value = await getBookByUuid(`${route.params.uuid}`)

    const { data } = await getChapterByUuid(`${route.params.uuid_chapter}`)

    chapter.value = data

    startReadingTime.value = Date.now()

    window.addEventListener("scroll", handleScroll)

    window.addEventListener("beforeunload", handleBeforeUnload)

})

onUnmounted(async () => {

    await sendReadingStats()

    window.removeEventListener("scroll", handleScroll)

    window.removeEventListener("beforeunload", handleBeforeUnload)

})

watch(() => route.params.uuid_chapter, async () => {

    await sendReadingStats()

    const { data } = await getChapterByUuid(`${route.params.uuid_chapter}`)

    chapter.value = data

    window.scrollTo({ top: 0 })

    resetReadingStats()

})
</script>
