<template>
    <div class="bg-[#fffcfccc] dark:bg-transparent">
        <div class="max-w-7xl z-10 mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 gap-10" v-if="user">
            <div class="bg-red-50 text-red-500 flex flex-col items-start gap-2 text-xs p-2 rounded-lg font-medium border-red-100 border"
                v-if="user?.preferences && user.preferences.length === 0">
                Choisissez vos préférences afin de {{user.role === 'lecteur' ? "personnaliser votre expérience de lecture" : "mettre en avant votre profil auprès des lecteurs qui vous correspondent"}}.
                <nuxt-link to="/profil/personal"
                    class="bg-red-600 hover:bg-red-700 transition-all duration-300 hover:ease-linear text-white px-5 py-2 rounded-lg">
                    Choisir mes préférences</nuxt-link>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <!-- LEFT COLUMN (Main Content) -->
                <div class="lg:col-span-8 space-y-6 lg:space-y-10">
                    <!-- Tabs -->
                    <div class="flex items-center gap-8 border-b border-slate-200 pb-px overflow-x-auto custom">
                        <button @click="onLoadChapterRead"
                            class="pb-3 text-slate-900 dark:text-slate-200 font-medium text-sm whitespace-nowrap"
                            :class="loadChapterRead ? 'border-b-2 border-slate-900 dark:border-orange-200' : 'border-b-2 border-transparent'">Lectures
                            récentes</button>
                        <button @click="onLoadBookReactions"
                            class="pb-3 text-slate-900 dark:text-slate-200 font-medium text-sm transition-colors whitespace-nowrap"
                            :class="loadBookReaction ? 'border-b-2 border-slate-900 dark:border-orange-200' : 'border-b-2 border-transparent'">Histoires
                            appréciées</button>
                    </div>
                    <!-- Skeleton -->
                    <template v-if="skeleton">
                        <ProfilSkeleton v-for="index in 2" :key="index" />
                    </template>
                    <template v-else>
                        <ProfilChapterRead v-if="loadChapterRead" :chapterRead="chapterRead" />
                        <ProfilBookReaction v-if="loadBookReaction" :bookReactions="bookReactions" />
                    </template>
                    <!-- Section: Saved List -->
                    <section v-if="user.role === 'lecteur'">
                        <div class="flex items-center justify-between mb-6" v-if="books.length > 0">
                            <h2
                                class="text-lg font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                                À
                                lire plus tard</h2>
                            <nuxt-link to="/stories"
                                class="text-xs font-medium text-slate-500 dark:text-slate-200 hover:text-slate-900 transition-colors">Tout
                                voir</nuxt-link>
                        </div>
                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            <!-- Skeleton -->
                            <template v-if="bookSkeleton">
                                <HomeCardSkeleton v-for="i in 3" :key="i" />
                            </template>
                            <template v-else>
                                <!-- Book Item 1 -->
                                <HomeCard :to="`/books/${book.uuid}`" class="group" v-for="(book, index) in books"
                                    :book="book" :index="index" :key="index" />
                                <!-- Add New -->
                                <nuxt-link to="/stories"
                                    class="flex flex-col items-center justify-center aspect-[2/3] bg-slate-50 border border-dashed border-slate-300 rounded-xl hover:bg-slate-100 hover:border-slate-400 transition-all group">
                                    <span
                                        class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:scale-110 transition-all mb-2">
                                        <Icon name="mdi:plus"
                                            class="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                                    </span>
                                    <span class="text-xs font-medium text-slate-500 dark:text-slate-800">Explorer</span>
                                </nuxt-link>
                            </template>
                        </div>
                    </section>
                </div>
                <!-- RIGHT COLUMN (Sidebar) -->
                <div class="lg:col-span-4 space-y-8 lg:space-y-10">
                    <div v-if="user.role === 'lecteur'">
                        <h3 class="font-display font-semibold text-slate-900 dark:text-white mb-4 text-sm">Auteurs
                            suggérés
                        </h3>
                        <div class="space-y-4">
                            <!-- Skeleton -->
                            <template v-if="authorSkeleton">
                                <div v-for="index in 3" :key="index"
                                    class="flex items-center justify-between border-slate-200 border-b-[1px] pb-2">
                                    <div class="flex items-center gap-3 text-xs">
                                        <!-- Skeleton image -->
                                        <div class="w-12 h-12 rounded-lg bg-slate-300 dark:bg-slate-700 animate-pulse">
                                        </div>
                                        <div class="flex flex-col gap-1">
                                            <!-- Skeleton name -->
                                            <div class="w-24 h-4 rounded bg-slate-300 dark:bg-slate-700 animate-pulse">
                                            </div>
                                            <!-- Skeleton books/followers -->
                                            <div class="w-32 h-3 rounded bg-slate-200 dark:bg-slate-600 animate-pulse">
                                            </div>
                                            <!-- Skeleton rank -->
                                            <div class="w-16 h-4 rounded bg-slate-200 dark:bg-slate-600 animate-pulse">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Skeleton button -->
                                    <div class="w-16 h-6 rounded-lg bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
                                </div>
                            </template>
                            <template v-else>
                                <!-- Item 1 -->
                                <div :class="`flex items-center justify-between ${index !== authors.length - 1 ? 'border-slate-200 border-b-[1px] pb-2' : ''}`"
                                    v-for="(author, index) in authors" :key="index">
                                    <div class="flex items-center gap-3 text-xs">
                                        <img v-if="author.photo"
                                            :src="`${config.public.apiBackendUrl}/uploads/users/${author.photo}`"
                                            class="w-12 h-12 rounded-lg object-cover" :alt="author.name" />
                                        <span v-else
                                            class="flex items-center justify-center w-12 h-12 rounded-lg font-semibold text-white text-sm"
                                            :style="`background:${author.code_color}`">
                                            {{
                                                author.name.split(" ").length > 1
                                                    ? `${author.name.charAt(0)}${author.name.split(" ")[1]?.charAt(0)}`
                                                    : author.name.charAt(0)
                                            }}
                                        </span>
                                        <div class="flex flex-col">
                                            <span class="font-medium text-slate-900 dark:text-white">{{ author.name
                                                }}</span>
                                            <span class="text-[12px] text-slate-500 dark:text-slate-200"><strong>{{
                                                formatNumber(author.books.length || 0) }}</strong> livre{{
                                                        author.books.length > 1 ? 's' : '' }}, <strong>{{
                                                    formatNumber(author.total_followers) }}</strong> abonné{{
                                                        author.total_followers > 1 ? 's' : '' }}</span>
                                            <!-- Rank -->
                                            <span :class="[
                                                'text-[11px] mt-1 w-fit px-2 py-0.5 rounded-md flex items-center gap-1',
                                                author.rank === 'certifié'
                                                    ? 'bg-orange-50 text-orange-700 border border-orange-100'
                                                    : author.rank === 'best'
                                                        ? 'bg-purple-50 text-purple-700 border border-purple-100'
                                                        : author.rank === 'top'
                                                            ? 'bg-green-50 text-green-700 border border-green-100'
                                                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                                            ]">
                                                <Icon name="mdi:star-outline" size="14" />
                                                {{ author.rank }}
                                            </span>
                                        </div>
                                    </div>
                                    <nuxt-link :to="`/authors/${author.uuid}`"
                                        class="text-[12px] font-medium bg-slate-900 dark:bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2">Voir <Icon name="mdi:arrow-right" size="14" class="text-white" /></nuxt-link>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div v-if="user.whatsapp_link || user.facebook_link || user.other_link">
                        <h3 class="font-display font-semibold text-slate-900 dark:text-white mb-4 text-sm">Liens utiles
                        </h3>
                        <div class="space-y-4">
                            <div :class="`flex items-center justify-between border-slate-200 border-b-[1px] pb-2`" v-if="user.whatsapp_link">
                                <h5 class="text-[12px] font-medium text-slate-900 dark:text-white flex items-center gap-2"><Icon name="mdi:whatsapp" size="16" class="text-green-600 dark:text-green-500" /> Whatsapp</h5>
                                <nuxt-link :to="user.whatsapp_link" target="_blank"
                                    class="text-[12px] font-medium bg-orange-700 dark:bg-orange-600 text-white px-3 py-1.5 rounded-lg hover:bg-orange-800 transition-colors flex items-center gap-2">Accéder <Icon name="mdi:arrow-right" size="14" class="text-white" /></nuxt-link>
                            </div>
                            <div :class="`flex items-center justify-between border-slate-200 border-b-[1px] pb-2`" v-if="user.facebook_link">
                                <h5 class="text-[12px] font-medium text-slate-900 dark:text-white flex items-center gap-2"><Icon name="mdi:facebook" size="16" class="text-blue-600 dark:text-blue-500" /> Facebook</h5>
                                <nuxt-link :to="user.facebook_link" target="_blank"
                                    class="text-[12px] font-medium bg-orange-700 dark:bg-orange-600 text-white px-3 py-1.5 rounded-lg hover:bg-orange-800 transition-colors flex items-center gap-2">Accéder <Icon name="mdi:arrow-right" size="14" class="text-white" /></nuxt-link>
                            </div>
                            <div :class="`flex items-center justify-between`" v-if="user.other_link">
                                <h5 class="text-[12px] font-medium text-slate-900 dark:text-white flex items-center gap-2"><Icon name="mdi:link-variant" size="16" class="text-slate-600 dark:text-slate-500" /> Autre</h5>
                                <nuxt-link :to="user.other_link" target="_blank"
                                    class="text-[12px] font-medium bg-orange-700 dark:bg-orange-600 text-white px-3 py-1.5 rounded-lg hover:bg-orange-800 transition-colors flex items-center gap-2">Accéder <Icon name="mdi:arrow-right" size="14" class="text-white" /></nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div v-if="user.role !== 'lecteur'">
                        <h3 class="font-display font-semibold text-slate-900 dark:text-white mb-4 text-sm">Votre profil sera proposé aux lecteurs ayant les mêmes préférences que vous.
                        </h3>
                        <div class="space-y-4">
                            <div :class="`flex items-center justify-between ${i !== (user.preferences?.length || 0) - 1 ? 'border-slate-200 border-b-[1px] pb-2' : ''}`" v-for="(pref, i) in user.preferences" :key="i">
                                <h5 class="text-[12px] font-medium text-slate-900 dark:text-white flex items-center gap-2"><Icon name="solar:tag-linear" size="16" class="text-sky-600 dark:text-sky-500" /> {{ pref.name }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
const config = useRuntimeConfig();
const router = useRouter();
const { getProfile } = usersData();
const user = ref<User | null>(null);
const authors = ref<Author[]>([]);
const books = ref<BookData[]>([]);
const bookReactions = ref<BookData[]>([]);
const chapterRead = ref<ChapterReadData[]>([]);
const bookSkeleton = ref<boolean>(true);
const skeleton = ref<boolean>(true);
const authorSkeleton = ref<boolean>(true);
const loadChapterRead = ref<boolean>(true);
const loadBookReaction = ref<boolean>(false);
const { propositionsAuthors } = usersData();
const { propositionsBooks, getBooksReactionsByIdUser } = booksData();
const { getChapterRead } = useChapterReads();

const onLoadChapterRead = async () => {
    skeleton.value = true;
    loadBookReaction.value = false;
    const res = await getChapterRead();
    chapterRead.value = res;
    loadChapterRead.value = true;
    skeleton.value = false;
}

const onLoadBookReactions = async () => {
    skeleton.value = true;
    loadChapterRead.value = false;
    const res = await getBooksReactionsByIdUser();
    bookReactions.value = res;
    loadBookReaction.value = true;
    skeleton.value = false;
}

const onLoad = async () => {
    user.value = await getProfile();
    await onLoadChapterRead();
    const { data } = await propositionsAuthors();
    const res = await propositionsBooks();
    authors.value = data;
    books.value = res;
    bookSkeleton.value = false;
    skeleton.value = false;
    authorSkeleton.value = false;
}

onMounted(async () => {
    await onLoad();
})
</script>