<template>
    <section class="relative overflow-hidden border-b border-slate-200">
        <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-32">
            <div class="grid lg:grid-cols-2 gap-16 items-center">

                <!-- Left: Content -->
                <div class="max-w-2xl relative z-10">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100/50 text-orange-800 text-xs font-medium mb-8 animate-fade-in-up">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        Faîtes vous plaisir dans la lecture
                    </div>

                    <h1
                        class="text-5xl sm:text-6xl lg:text-7xl font-display font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-6">
                        L'Afrique s'écrit <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">au
                            futur.</span>
                    </h1>

                    <p class="text-lg text-slate-500 dark:text-slate-200 leading-relaxed mb-10 max-w-lg">
                        Une plateforme de lecture nouvelle génération. Découvrez des milliers d'histoires originales, du
                        thriller urbain de Lagos aux légendes réinventées du Sahel.
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <nuxt-link to="#popular"
                            class="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 dark:shadow-slate-800 dark:border-[1px] dark:border-gray-600">
                            Lire gratuitement
                            <Icon name="mdi:arrow-right" class="w-5 h-5" />
                        </nuxt-link>
                        <button v-if="!user" @click="registerAuthor"
                            class="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all">
                            <Icon name="mdi:pen" class="w-5 h-5" />
                            Devenir auteur
                        </button>
                    </div>

                    <!-- Stats/Trust -->
                    <div
                        class="mt-12 pt-8 border-t border-slate-200 flex items-center gap-8 text-slate-500 dark:text-slate-200">
                        <div>
                            <div
                                class="text-2xl font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                                {{ formatNumber(books) }}+</div>
                            <div class="text-xs font-medium uppercase tracking-wide mt-1">Histoires</div>
                        </div>
                        <div class="w-px h-8 bg-slate-200"></div>
                        <div>
                            <div
                                class="text-2xl font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                                {{ formatNumber(chapters) }}+</div>
                            <div class="text-xs font-medium uppercase tracking-wide mt-1">Chapitres</div>
                        </div>
                        <div class="w-px h-8 bg-slate-200"></div>
                        <div>
                            <div
                                class="text-2xl font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                                {{ formatNumber(visitors) }}+</div>
                            <div class="text-xs font-medium uppercase tracking-wide mt-1">Visiteurs</div>
                        </div>
                    </div>
                </div>

                <!-- Right: Visual (Featured Book Card) -->
                <div class="relative hidden lg:block perspective-1000">
                    <!-- Decorative blobs -->
                    <div
                        class="absolute -top-20 -right-20 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob">
                    </div>
                    <div
                        class="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000">
                    </div>

                    <!-- Main Card -->
                    <!-- Skeleton -->
                    <template v-if="loading && !book">
                        <HomeBannerSkeleton />
                    </template>
                    <template v-else>
                        <div class="relative z-10 w-[420px] mx-auto bg-white dark:bg-dark rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-700 border border-slate-100 dark:border-slate-400 p-5 rotate-2 hover:rotate-0 transition-all duration-700 group cursor-pointer"
                            v-if="book">
                            <div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-5">
                                <img :src="`${config.public.apiBackendUrl}/uploads/books/${book.image}`"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    :alt="book.title">
                                <nuxt-link :to="`/books/${book.uuid}`">
                                    <span
                                        class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></span>
                                </nuxt-link>

                                <div
                                    class="absolute top-4 right-4 bg-dark/30 backdrop-blur-md border border-dark/30 text-white px-3 py-1 rounded-lg text-xs font-semibold tracking-wide shadow-lg">
                                    TENDANCE #1
                                </div>

                                <div class="absolute bottom-6 left-6 right-6 text-white">
                                    <h3 class="font-display font-semibold text-2xl tracking-tight mb-2 flex"><span
                                            class="truncate">{{ book.title }}</span></h3>
                                    <div class="flex items-center gap-3 text-[13px] text-white/80">
                                        <img v-if="book.user?.photo"
                                            :src="`${config.public.apiBackendUrl}/uploads/users/${book.user?.photo}`"
                                            alt="Profil"
                                            class="w-6 h-6 flex-shrink-0 border-orange-600 border-2 dark:border-orange-500 rounded-full" />
                                        <span v-if="!book.user?.photo"
                                            class="p-1 text-[8px] flex items-center justify-center w-6 h-6 text-slate-900 flex-shrink-0 rounded-full font-medium"
                                            :style="`background-color: ${book.user?.code_color}`">
                                            {{ book.user?.name.split(" ").length > 1 ?
                                                `${book.user?.name.charAt(0).toUpperCase() +
                                                book.user?.name.split(" ")[1]?.charAt(0).toUpperCase()}` :
                                                book.user?.name.charAt(0).toUpperCase() }}
                                        </span>
                                        <p class="flex">
                                            <span class="truncate">{{
                                                book.user?.name
                                            }}</span>
                                        </p>
                                        <span>•</span>
                                        <span>{{ book.book_categories[0]?.name || '' }}</span>
                                        <span>•</span>
                                        <span>{{ formatNumber(book.chapters.length) || 0 }} chapitre{{
                                            book.chapters.length > 0 ? 's' : ''}}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Footer UI -->
                            <div class="flex items-center justify-between">
                                <div class="flex gap-1">
                                    <span
                                        class="flex items-center justify-center gap-0.5 bg-red-600 dark:bg-red-500 text-white text-[11px] rounded px-1.5 py-1 dark:border-slate-200 dark:border-[2px]">
                                        {{ formatNumber(book.book_reactions || 0) }}
                                        <Icon name="mdi:heart" class="w-2.5 h-2.5" />
                                    </span>
                                    <span
                                        class="flex items-center justify-center gap-0.5 bg-blue-600 dark:bg-blue-500 text-white text-[11px] rounded px-1.5 py-1 dark:border-slate-200 dark:border-[2px]">
                                        {{ formatNumber(book.book_comments || 0) }}
                                        <Icon name="mdi:comments" class="w-2.5 h-2.5" />
                                    </span>
                                    <span
                                        class="flex items-center justify-center gap-0.5 bg-cyan-600 dark:bg-cyan-500 text-white text-[11px] rounded px-1.5 py-1 dark:border-slate-200 dark:border-[2px]">
                                        {{ formatNumber(Number(book.total_views) || 0) }}
                                        <Icon name="mdi:eye" class="w-2.5 h-2.5" />
                                    </span>
                                </div>
                                <nuxt-link :to="`/books/${book.uuid}/chapter/${book.chapters[0]?.uuid}`"
                                    class="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Démarrez votre lecture
                                    <Icon name="mdi:arrow-right" class="w-5 h-5" />
                                </nuxt-link>
                            </div>
                        </div>
                    </template>

                    <!-- Floating secondary card (behind) -->
                    <div
                        class="absolute top-12 -right-12 z-0 w-64 bg-white dark:bg-dark rounded-xl shadow-xl border border-slate-200 p-3 -rotate-6 opacity-60 scale-90 pointer-events-none">
                        <div class="aspect-[3/4] bg-slate-200 rounded-lg mb-3 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400"
                                class="w-full h-full object-cover opacity-80">
                        </div>
                        <div class="h-2 w-3/4 bg-slate-200 rounded mb-2"></div>
                        <div class="h-2 w-1/2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const { toConnectUser } = authenticate();
const { findAll } = visitorsData();
const { countDistinctBooks, findTopBook } = booksData();
const { countDistinctChapters } = chaptersData();
const user = ref<User | null>(null);
const visitors = ref<number>(0);
const books = ref<number>(0);
const book = ref<BookData | null>(null);
const chapters = ref<number>(0);
const loading = ref<boolean>(true)
const router = useRouter();
const registerAuthor = async () => {
    localStorage.setItem("register_author", "true");
    router.push("/register")
};

onMounted(async () => {
    visitors.value = await findAll();
    books.value = await countDistinctBooks();
    chapters.value = await countDistinctChapters();
    book.value = await findTopBook();
    loading.value = false;
    user.value = await toConnectUser();
})
</script>