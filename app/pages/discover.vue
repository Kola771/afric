<template>
    <div class="bg-dark">
        <div ref="container" class="max-w-3xl mx-auto h-screen w-full text-white relative overflow-hidden"
            @wheel="handleWheel" @touchstart="touchStart" @touchend="touchEnd">
            <!-- 🌫️ Background -->
            <div class="absolute inset-0 bg-noise pointer-events-none"></div>

            <!-- 🔙 BACK BUTTON -->
            <button @click="goBack"
                class="absolute flex items-center justify-center top-4 left-4 lg:left-2 z-50 bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-black/70 transition">
                <Icon name="mdi:arrow-left" class="w-6 h-6" />
            </button>

            <!-- ❤️ HEARTS -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                v-if="showTimeHeart">
                <span class="absolute text-red-500 text-2xl animate-float">
                    <Icon name="mdi:heart" class="w-24 h-24 text-red-600" />
                </span>
            </div>

            <!-- FEED -->
            <TransitionGroup name="feed" tag="div">
                <div v-for="(item, index) in feed" :key="`${item.type}-${item.data.uuid}`"
                    class="absolute inset-0 transition-all duration-500 flex items-end justify-center" :class="{
                        'opacity-100 z-10 translate-y-0': currentIndex === index,
                        'opacity-0 z-0 translate-y-full': currentIndex !== index
                    }">

                    <!-- 📸 IMAGE -->
                    <img v-if="item.type === 'book' && item.data.image"
                        :src="`${$config.public.apiBackendUrl}/uploads/books/${item.data.image}`"
                        class="absolute inset-0 w-full h-full object-contain" />

                    <img v-if="item.type === 'author' && item.data.photo"
                        :src="`${$config.public.apiBackendUrl}/uploads/users/${item.data.photo}`"
                        class="absolute inset-0 w-full h-full object-contain" />

                    <div class="absolute inset-0 flex items-center justify-center"
                        v-if="item.type === 'author' && !item.data.photo">
                        <div class="p-2.5 text-5xl flex items-center justify-center w-full h-1/3 flex-shrink-0"
                            :style="`background-color: ${item.data.code_color}`">
                            {{ getInitials(item.data.name) }}
                        </div>
                    </div>

                    <div class="absolute inset-0 flex items-center justify-center"
                        v-if="['chapter', 'category'].includes(item.type)" :class="`${bg[index % bg.length]}`">
                    </div>

                    <!-- 🎭 OVERLAY -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    <!-- CONTENT -->
                    <div class="relative z-10 w-full max-w-3xl p-4 md:p-10 space-y-4">

                        <!-- CATEGORY -->
                        <div v-if="item.type === 'category'" class="w-full px-4 py-6">
                            <h3 class="text-sm text-white font-medium mb-2 flex items-center gap-2">
                                <Icon name="solar:tag-linear" class="w-5 h-5" /> Explorer nos différentes catégories
                            </h3>

                            <div class="grid grid-cols-2 gap-2"
                                :class="item.data.length % 2 === 0 ? '' : 'lg:grid-cols-3'">
                                <button v-for="(cat, y) in item.data" :key="cat.uuid" @click="goCategory(cat.uuid)"
                                    class="bg-primary/80 hover:bg-dark/80 hover:border-slate-400 hover:border-[1px] hover:duration-300 hover:ease-linear flex flex-col items-start transition p-3 rounded-lg text-left"
                                    :class="y === 4 ? 'col-span-2' : ''">
                                    <img :src="cat.image?.includes('https') ? cat.image : `${$config.public.apiBackendUrl}/uploads/categories/${cat.image}`"
                                        class="h-24 lg:h-36 w-full rounded-lg" />
                                    <p class="font-semibold text-white">{{ cat.name }}</p>
                                    <p class="text-xs text-gray-300" :class="y === 4 ? 'line-clamp-2' : 'line-clamp-1'">
                                        {{ cat.description }}
                                    </p>
                                </button>
                            </div>
                        </div>

                        <!-- 📖 CHAPTER -->
                        <div v-if="item.type === 'chapter'">
                            <h2 class="text-2xl md:text-4xl font-bold flex items-center gap-2">
                               <Icon name="mdi:book-open-page-variant" class="w-5 h-5 flex-shrink-0" /> {{ item.data.title }}
                            </h2>

                            <p class="text-gray-300 text-sm" v-html="item.data.content.length > 1000
                                ? item.data.content.slice(0, 1000) + '...'
                                : item.data.content">
                            </p>
                            <p class="text-amber-500 text-xs mt-2 font-medium"
                                v-if="Number(item.data.chapter_reactions.length) > 0">{{
                                    item.data.chapter_reactions[0].emoji }} {{
                                    formatNumber(Number(item.data.chapter_reactions.length)) }} personne{{
                                    Number(item.data.chapter_reactions.length) > 1 ? 's ont' : ' a' }} réagi sur ce
                                chapitre.</p>
                            <p class="text-sky-500 text-xs mt-2 font-medium flex items-center gap-1.5"
                                v-if="Number(item.data.chapter_reads.length) > 0">
                                <Icon name="mdi:eye" class="w-4 h-4" /> {{
                                    formatNumber(Number(item.data.chapter_reads.length)) }} personne{{
                                    Number(item.data.chapter_reads.length) > 1 ? 's ont' : ' a' }} lu ce chapitre.
                            </p>
                            <nuxt-link :to="`/books/${item.data.book.uuid}`" class="font-medium underline text-xs mt-1">Tirer du livre : {{ item.data.book.title }}</nuxt-link>
                            <button @click.stop="goToChapter(item.data.book.uuid, item.data.uuid)"
                                class="mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-lg w-[80%] md:w-auto md:px-12 bg-primary lg:bg-orange-900 font-semibold hover:bg-orange-800 transition">
                                <Icon name="mdi:book-open-page-variant" class="w-5 h-5" /> Lire la suite
                            </button>
                        </div>

                        <!-- 📚 BOOK -->
                        <div v-if="item.type === 'book'">
                            <h2 class="text-2xl md:text-4xl font-bold">
                                {{ item.data.title }}
                            </h2>

                            <p class="text-gray-300 text-sm" v-html="item.data.description.length > 1000
                                ? item.data.description.slice(0, 600) + '...'
                                : item.data.description">
                            </p>
                            <p class="text-amber-500 text-xs mt-2 font-medium"
                                v-if="Number(item.data.book_reactions.length) > 0">{{ item.data.book_reactions[0].emoji
                                }} {{
                                    formatNumber(Number(item.data.book_reactions.length)) }} personne{{
                                    Number(item.data.book_reactions.length) > 1 ? 's ont' : ' a' }} réagi sur ce livre.</p>

                            <button @click.stop="goToBook(item.data.uuid)"
                                class="mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-lg w-[80%] md:w-auto md:px-12 bg-primary lg:bg-orange-900 font-semibold hover:bg-orange-800 transition">
                                <Icon name="mdi:book-open-variant" class="w-5 h-5" /> Voir le livre
                            </button>
                        </div>

                        <!-- 👤 AUTHOR -->
                        <div v-if="item.type === 'author'">
                            <h2 class="text-2xl md:text-4xl lg:text-3xl font-bold">
                                {{ item.data.name }}
                            </h2>

                            <h3 class="text-xl md:font-medium font-semibold">
                                {{ item.data.pseudonym }}
                            </h3>

                            <p class="text-gray-400 text-sm"
                                v-html="item.data.bibliography || 'Auteur Afric Storyline'">
                            </p>

                            <p class="text-gray-400 text-sm">
                                <strong>Pays d'origine :</strong> {{ item.data.country }}
                            </p>

                            <p class="text-gray-400 text-sm">
                                <strong>Livres disponibles :</strong> {{ formatNumber(item.data.books.length) }}
                            </p>

                            <p class="text-gray-400 text-sm">
                                <strong>Followers :</strong> {{ formatNumber(item.data.total_followers) }}
                            </p>

                            <button @click.stop="goToAuthor(item.data.uuid)"
                                class="mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-lg w-full md:w-auto md:px-12 bg-primary font-semibold lg:bg-orange-900 hover:bg-orange-800 transition">
                                <Icon name="mdi:user" class="w-5 h-5" /> Voir profil
                            </button>
                        </div>
                    </div>

                    <!-- ❤️ LIKE -->
                    <div class="absolute right-4 bottom-5 lg:bottom-10 flex flex-col items-center z-20"
                        v-if="['book', 'chapter'].includes(item.type)">
                        <button @click.stop="like(item, $event)" class="text-3xl animate-bounce">
                            <Icon name="mdi:heart-outline" class="w-8 h-8 transition"
                                :class="likedItems.has(`${item.type}-${item.data.uuid}`) ? 'text-red-500' : 'text-white'" />
                        </button>
                    </div>
                </div>
            </TransitionGroup>

            <!-- 🖥️ NAV -->
            <div class="hidden md:flex absolute right-4 top-1/2 flex-col gap-3 z-20">
                <button @click="prev" class="nav-btn">
                    <Icon name="mdi:arrow-top" class="w-5 h-5" />
                </button>
                <button @click="next" class="nav-btn">
                    <Icon name="mdi:arrow-bottom" class="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Découvrir notre fil d\'actualité',
    description: 'Explorez des histoires africaines originales écrites par des auteurs émergents et passionnés sur Afric Storyline.',

    ogTitle: 'Découvrir notre fil d\'actualité',
    ogDescription: 'Plongez dans des récits africains captivants publiés par une nouvelle génération d’auteurs talentueux.',
    ogImage: 'https://africstoryline.com/afric.png',
    ogUrl: 'https://africstoryline.com/',
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'Découvrir notre fil d\'actualité',
    twitterDescription: 'Découvrez des récits africains uniques écrits par des auteurs émergents.',
    twitterImage: 'https://africstoryline.com/afric.png'
});

definePageMeta({ layout: "not-layout" });

const { getFeed } = feedData();
const { getProfile } = usersData();
const { saveRead } = useChapterReads();
const { createDefaultReaction } = useBookReactions();
const { createDefaultReaction: createDefaultReactionChapter } = useChapterReactions();
const router = useRouter();
const feed = ref<any[]>([]);
const user = ref<User | null>(null);
const page = ref(1);
const currentIndex = ref(0);
const showTimeHeart = ref<boolean>(false);
const bg = ref<any>(["bg-purple-500", "bg-pink-500", "bg-sky-500", "bg-yellow-500", "bg-cyan-500", "bg-[#f50]", "bg-slate-500", "bg-teal-500", "bg-green-500", "bg-red-500"]);
let startY = 0;
let startX = 0;
const SWIPE_THRESHOLD = 60;
const viewStartTime = ref<number>(Date.now());
const watchTime = ref<Record<string, number>>({});
const likedItems = ref<Set<string>>(new Set());

const hydrateLikes = (items: any[]) => {
    items.forEach((item: any) => {
        const key = `${item.type}-${item.data.uuid}`;

        const reactions =
            item.type === 'book'
                ? item.data.book_reactions
                : item.data.chapter_reactions;

        if (!reactions || !user.value) return;

        const alreadyLiked = reactions.some(
            (r: any) => r.id_user === user.value!.id
        );

        if (alreadyLiked) {
            likedItems.value.add(key);
        }
    });
};

const saveWatchTime = async () => {
    const item = feed.value[currentIndex.value];
    if (!item) return;
    if (['author', 'book', 'category'].includes(item.type)) return;

    const key = `${item.type}-${item.data.uuid}`;
    const timeSpent = Date.now() - viewStartTime.value;

    // ❌ ignore si moins de 5 secondes
    if (timeSpent < 5000) {
        viewStartTime.value = Date.now();
        return;
    }

    watchTime.value[key] = (watchTime.value[key] || 0) + timeSpent;

    viewStartTime.value = Date.now();

    if (!user.value) return;

    const readingTime = Math.floor(timeSpent / 1000);
    const payload = {
        id_book: item.data.book?.id,
        id_user: user.value?.id || null,
        id_chapter: item.data.id,
        reading_time: formatReadingTime(readingTime),
    }
    await saveRead(payload)
};

const preloadImage = (url: string) => {
    const img = new Image();
    img.src = url;
};

// Helper pour les initiales
const getInitials = (name: string | undefined) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return `${parts[0]?.charAt(0).toUpperCase()}${parts[1]?.charAt(0).toUpperCase()}`;
    }
    return `${name?.charAt(0).toUpperCase()}${name?.charAt(1)}`;
};

// fetch
const fetchFeed = async () => {
    user.value = await getProfile();
    const res = await getFeed(page.value);

    if (res) {
        res.forEach((item: any) => {
            let url = null;

            if (item.type === 'category' && item.data.image) {
                url = `${useRuntimeConfig().public.apiBackendUrl}/uploads/categories/${item.data.image}`;
            }

            if (item.type === 'book' && item.data.image) {
                url = `${useRuntimeConfig().public.apiBackendUrl}/uploads/books/${item.data.image}`;
            }

            if (item.type === 'author' && item.data.photo) {
                url = `${useRuntimeConfig().public.apiBackendUrl}/uploads/users/${item.data.photo}`;
            }

            if (url) preloadImage(url);
        });
        hydrateLikes(res);
        feed.value.push(...res);
        page.value++;
    }
};

const handleKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            prev();
            break;

        case 'ArrowDown':
            e.preventDefault();
            next();
            break;

        case 'ArrowRight':
            e.preventDefault();
            openCurrentItem();
            break;
    }
};

onMounted(() => {
    fetchFeed();
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});

// ❤️ HEART SPAWN
const spawnHearts = (x: number, y: number) => {
    showTimeHeart.value = true;

    setTimeout(() => {
        showTimeHeart.value = false;
    }, 2500);
};

// ❤️ LIKE BUTTON
const like = async (item: any, e: MouseEvent) => {
    const key = `${item.type}-${item.data.uuid}`;

    if (likedItems.value.has(key)) {
        likedItems.value.delete(key);
    } else {
        likedItems.value.add(key);
        spawnHearts(e.clientX, e.clientY);
    }

    if (!user.value) return router.push('/login');
    if (item.type === "book") {
        await createDefaultReaction({ id_book: item.data.id, id_user: user.value.id, label: "Coup de cœur", emoji: '❤️', color: "text-red-600 bg-red-50" })
    }
    if (item.type === "chapter") {
        await createDefaultReactionChapter({ id_chapter: item.data.id, id_user: user.value.id, label: "Coup de cœur", emoji: '❤️', color: "text-red-600 bg-red-50" })
    }
};

// scroll
const handleWheel = (e: WheelEvent) => {
    e.deltaY > 0 ? next() : prev();
};

const touchStart = (e: TouchEvent) => {
    startY = e.touches[0]!.clientY;
    startX = e.touches[0]!.clientX;
};

const touchEnd = (e: TouchEvent) => {
    const endY = e.changedTouches[0]!.clientY;
    const endX = e.changedTouches[0]!.clientX;

    const diffY = startY - endY;
    const diffX = startX - endX;

    // 📌 Swipe vertical (feed)
    if (Math.abs(diffY) > Math.abs(diffX)) {
        if (diffY > 50) next();
        if (diffY < -50) prev();
        return;
    }

    // 📌 Swipe gauche → OUVRIR PAGE
    if (diffX > SWIPE_THRESHOLD) {
        openCurrentItem();
    }
};

const openCurrentItem = () => {
    const item = feed.value[currentIndex.value];
    if (!item) return;

    if (item.type === 'book') {
        goToBook(item.data.uuid);
    }

    if (item.type === 'author') {
        goToAuthor(item.data.uuid);
    }

    if (item.type === 'chapter') {
        goToChapter(item.data.book.uuid, item.data.uuid);
    }
};

// nav
const next = async () => {
    await saveWatchTime();

    if (currentIndex.value < feed.value.length - 1) currentIndex.value++;
    else fetchFeed();
    viewStartTime.value = Date.now();
};

const prev = async () => {
    await saveWatchTime();

    if (currentIndex.value > 0) currentIndex.value--;
    viewStartTime.value = Date.now();
};

const goBack = () => navigateTo('/');

// routes
const goToChapter = (bookUuid: string, uuid: string) =>
    navigateTo(`/books/${bookUuid}/chapter/${uuid}`);

const goCategory = (uuid: string) =>
    navigateTo(`/categories/${uuid}`);

const goToBook = (uuid: string) =>
    navigateTo(`/books/${uuid}`);

const goToAuthor = (uuid: string) =>
    navigateTo(`/authors/${uuid}`);
</script>

<style scoped>
.feed-enter-active,
.feed-leave-active {
    transition: all 0.35s ease;
}

.feed-enter-from {
    opacity: 0;
    transform: scale(1.08) translateY(30px);
    filter: blur(8px);
}

.feed-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(-30px);
    filter: blur(10px);
}

.nav-btn {
    @apply bg-white/50 p-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/70 transition;
}

.animate-float {
    animation: floatUp 0.9s ease-out forwards;
}

@keyframes floatUp {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: translateY(-120px) scale(1.6);
        opacity: 0;
    }
}
</style>