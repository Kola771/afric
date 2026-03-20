<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b pt-8 md:pt-12 pb-12 flex-1 min-h-screen"
        v-if="author">
        <section class="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-100">
            <button @click="back"
                class="mb-2 p-1 lg:p-1.5 border rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Icon name="mdi:arrow-left" class="w-6 h-6 lg:w-5 lg:h-5" />
            </button>

            <div class="grid grid-cols-1 gap-4">
                <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">

                    <h2 class="text-xl font-bold text-slate-900 dark:text-slate-200">
                        Les abonnés de {{ author.name }}
                    </h2>

                    <div class="relative w-full lg:w-1/4">
                        <Icon name="solar:magnifer-linear"
                            class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

                        <input type="search" v-model="searchQuery" @input="executeSearch"
                            placeholder="Rechercher un abonné..."
                            class="h-10 pl-8 pr-3 w-full rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors" />
                    </div>

                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <div v-for="i in 4" :key="i" v-if="loadingSkeleton"
                        class="flex items-start gap-3 p-3 rounded-lg border border-slate-100 animate-pulse">
                        <!-- Avatar skeleton -->
                        <div class="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-slate-200"></div>

                        <!-- Text skeleton -->
                        <div class="flex flex-col gap-2 w-full">
                            <div class="h-3 w-3/4 bg-slate-200 rounded"></div>
                            <div class="h-3 w-1/2 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                    <div v-else v-for="(follower, index) in filteredFollowers" :key="index"
                        :ref="el => cardRefs[index] = { cardRef: el }"
                        class="group flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                        <!-- Avatar -->
                        <span>
                            <img v-if="follower.photo"
                                :src="`${config.public.apiBackendUrl}/uploads/users/${follower.photo}`"
                                class="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover" :alt="follower.name" />
                            <span v-else
                                class="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg font-semibold text-white text-sm"
                                :style="`background:${follower.code_color}`">
                                {{
                                    follower.name.split(" ").length > 1
                                        ? `${follower.name.charAt(0)}${follower.name.split(" ")[1]?.charAt(0)}`
                                        : follower.name.charAt(0)
                                }}
                            </span>
                        </span>
                        <div class="flex flex-col gap-1">
                            <span
                                class="font-medium text-sm text-slate-800 dark:text-slate-200 dark:group-hover:text-slate-700 hover:text-orange-600 transition">
                                {{ follower?.name }}
                            </span>
                            <span
                                class="font-medium text-xs text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-700 hover:text-orange-600 transition">
                                {{ follower?.pseudonym }}
                            </span>
                        </div>
                    </div>
                </div>
                <div v-if="!loadingSkeleton && !filteredFollowers.length" class="text-center text-slate-500 py-10">
                    Aucun abonné trouvé
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
const { toConnectUser } = authenticate();
const { getUsersByFollowerId } = useFollowers();
const user = ref<User | null>(null);
const author = ref<Author | null>(null);
const followers = ref<any[]>([]);
const books = ref<BookData[]>([]);
const loading = ref<boolean>(false)
const loadingSkeleton = ref<boolean>(false)
const page = ref(1)
const limit = ref(25)
const totalPages = ref(1)
const cardRefs = ref<any[]>([]);
const observer = ref<IntersectionObserver | null>(null);
const searchQuery = ref("");
const filteredFollowers = ref<any[]>([]);

const executeSearch = () => {
    if (!searchQuery.value.trim()) {
        filteredFollowers.value = followers.value;
        return;
    }

    const query = searchQuery.value.toLowerCase();

    filteredFollowers.value = followers.value.filter((follower) =>
        follower.name.toLowerCase().includes(query) ||
        follower.pseudonym.toLowerCase().includes(query)
    );
};

const onLoad = async () => {
    user.value = await toConnectUser();
    const res = await findByUuid(`${route.params.uuid}`);
    if (res.success) {
        author.value = res.data;
        if (author.value) {
            useSeoMeta({
                title: `Abonnés - ${author.value.name}`
            });
        }
    }
}

const back = () => {
    router.back();
}

// ============================
// Load Followers
// ============================

const loadFollowers = async () => {
    if (!author.value) return;
    if (loading.value) return;
    if (page.value > totalPages.value) return;

    loading.value = true;
    loadingSkeleton.value = true;

    try {
        const res = await getUsersByFollowerId(author.value.id, page.value, limit.value);

        followers.value.push(...res.data || res);
        filteredFollowers.value = followers.value;
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
                    loadFollowers();
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
    () => followers.value.length,
    () => {
        observeLastCard();
    }
);

// ============================
// Mounted
// ============================

onMounted(async () => {
    await onLoad();
    await loadFollowers();
})

onUnmounted(() => {
    observer.value?.disconnect();
});
</script>