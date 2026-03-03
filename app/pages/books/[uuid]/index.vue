<template>
    <div v-if="book" class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b">

        <!-- BOOK INFO SECTION -->
        <section class="max-w-7xl mx-auto pt-12 border-t border-slate-100">
            <div class="p-4 md:p-10 lg:p-12">
                <div class="grid md:grid-cols-12 gap-6 md:gap-10">

                    <!-- LEFT: Cover & Actions -->
                    <div class="md:col-span-4 lg:col-span-3 md:sticky md:top-24 self-start">
                        <div
                            class="rounded-xl overflow-hidden shadow-2xl border border-slate-200 rotate-1 hover:rotate-0 transition-transform duration-500">
                            <img v-if="book" :src="`${config.public.apiBackendUrl}/uploads/books/${book.image}`"
                                class="w-full object-cover aspect-[3/4]" alt="Cover Large">
                        </div>

                        <div class="mt-6 flex flex-col gap-3">
                            <!-- Read buttons -->
                            <div class="flex flex-col gap-1.5">
                                <nuxt-link v-if="sortedChapters.length > 0"
                                    :to="`/books/${book.uuid}/chapter/${sortedChapters[0].uuid}`"
                                    class="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 dark:shadow-slate-800 dark:border-[1px] dark:border-gray-600 transition-colors flex items-center justify-center gap-2">
                                    <Icon name="mdi:book-open-page-variant" class="w-5 h-5" />
                                    Lire le Chapitre 1
                                </nuxt-link>
                                <nuxt-link v-if="sortedChapters.length > 2"
                                    :to="`/books/${book.uuid}/chapter/${sortedChapters[sortedChapters.length - 1].uuid}`"
                                    class="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 dark:shadow-slate-800 dark:border-[1px] dark:border-gray-600 transition-colors flex items-center justify-center gap-2">
                                    <Icon name="mdi:book-open-page-variant" class="w-5 h-5" />
                                    Lire le dernier chapitre
                                </nuxt-link>
                            </div>

                            <!-- Likes & Comments -->
                            <div class="grid grid-cols-2 gap-3 text-sm">
                                <button
                                    class="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800 transition-colors flex items-center justify-center gap-2">
                                    <Icon name="mdi:heart" class="w-5 h-5" />
                                    140
                                </button>
                                <button @click="openStatsBook"
                                    class="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800 transition-colors flex items-center justify-center gap-2">
                                    <Icon name="mdi:comment" class="w-5 h-5" />
                                    {{ book.book_comments }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT: Info & Chapters -->
                    <div class="md:col-span-8 lg:col-span-9 space-y-8">

                        <!-- Book info -->
                        <div>
                            <div class="flex flex-wrap items-center gap-3 text-xs font-medium text-orange-600 mb-4">
                                <span v-for="(category, index) in book.book_categories" :key="index"
                                    class="bg-orange-50 uppercase border border-orange-100/50 text-orange-600 text-xs font-medium animate-fade-in-up px-2 py-1 rounded">
                                    {{ category.name }}
                                </span>
                                <span
                                    :class="`${book.status === 'inactive' ? 'text-red-600 bg-red-50 dark:text-red-600' : (book.status === 'completed' ? 'text-green-600 dark:text-green-500 bg-green-50' : (book.status === 'ongoing' ? 'text-blue-600 dark:text-blue-500 bg-blue-50' : 'bg-slate-100 text-slate-500'))} px-2 py-1 rounded uppercase`">
                                    {{ status(book.status) }}
                                </span>
                            </div>

                            <h2
                                class="text-3xl md:text-5xl font-display font-semibold text-slate-900 dark:text-white tracking-tight mb-4">
                                {{ book.title }}
                            </h2>

                            <div class="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-200">
                                <!-- Author -->
                                <nuxt-link :to="`/authors/${book.user.uuid}`" class="group flex items-center gap-1">
                                    <img v-if="book.user.photo"
                                        :src="`${config.public.apiBackendUrl}/uploads/users/${book.user.photo}`"
                                        alt="Profil"
                                        class="w-6 h-6 border-orange-600 border-2 dark:border-orange-500 rounded-full" />
                                    <span v-else
                                        class="p-1 text-[8px] flex items-center justify-center w-6 h-6 rounded-full"
                                        :style="`background-color: ${book.user.code_color}`">
                                        {{ book.user.name.charAt(0).toUpperCase() }}
                                    </span>
                                    <p class="text-slate-900 font-medium dark:text-white flex hover:underline truncate">
                                        {{ book.user.name }}
                                    </p>
                                </nuxt-link>

                                <div class="flex items-center gap-1 truncate">
                                    <Icon name="mdi:book-multiple" class="w-5 h-5" />
                                    <span>{{ book.chapters.length }} Chapitres</span>
                                </div>

                                <div class="flex items-center gap-1 truncate">
                                    <Icon name="mdi:eye" class="w-5 h-5" />
                                    <span>125k Vues</span>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="prose prose-slate prose-sm max-w-none text-slate-600 dark:text-slate-200">
                            <p v-html="book.description"></p>
                        </div>

                        <!-- Chapters List -->
                        <div class="border-t border-slate-200 pt-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="font-display font-medium text-slate-900 dark:text-white">Chapitres</h3>
                                <button v-if="sortedChapters.length > 0" @click="toggleSort"
                                    class="h-8 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors">
                                    <Icon
                                        :name="sortDirection === 'asc' ? 'solar:arrow-up-linear' : 'solar:arrow-down-linear'"
                                        class="w-5 h-5" />
                                    <span class="text-xs font-medium hidden sm:inline dark:text-slate-200">Trier</span>
                                </button>
                            </div>

                            <div v-if="sortedChapters.length > 0" class="space-y-2 md:max-h-96 md:overflow-y-auto">
                                <nuxt-link v-for="(chapter, index) in sortedChapters" :key="chapter.id"
                                    :to="`/books/${book.uuid}/chapter/${chapter.uuid}`"
                                    class="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 hover:border-slate-300 transition-all hover:shadow-sm">
                                    <span class="flex items-center gap-4">
                                        <span
                                            class="text-slate-500 dark:text-slate-200 font-display font-bold text-xl w-8">{{
                                                index + 1 }}</span>
                                        <span>
                                            <p
                                                class="font-medium text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                                                {{ chapter.title }}</p>
                                            <p class="text-xs text-slate-400 dark:text-slate-200">Publié le {{
                                                formatLocalDate(chapter.created_at) }}</p>
                                        </span>
                                    </span>
                                    <span
                                        class="text-slate-500 dark:text-slate-200 group-hover:translate-x-1 transition-transform">
                                        <Icon name="mdi:arrow-right" class="w-5 h-5" />
                                    </span>
                                </nuxt-link>
                            </div>

                            <div v-else class="flex flex-col items-center justify-center text-center p-6">
                                <Icon name="mdi:book-open-page-variant" class="w-12 h-12 text-slate-300 mb-3" />
                                <p class="text-slate-500 text-sm font-medium">Aucun chapitre disponible</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <!-- STATS MODAL -->
        <StatsModal :show="showStatsModal" @close="closeStats">
            <div class="flex flex-col h-full w-full">

                <!-- HEADER -->
                <div
                    class="flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800 z-10 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <h3 class="text-lg font-medium text-slate-900 dark:text-white truncate">
                        {{ book?.title }}
                    </h3>

                    <div class="text-xs flex items-center gap-4 dark:text-white">
                        <button @click="showComments"
                            :class="step === 'comments' ? 'border-orange-600' : 'border-transparent'"
                            class="border-b-2 pb-1 flex items-center gap-2">
                            <Icon name="mdi:comment-multiple" class="w-4 h-4" />
                            {{ book.book_comments }}
                        </button>

                        <button @click="showLikes"
                            :class="step === 'likes' ? 'border-orange-600' : 'border-transparent'"
                            class="border-b-2 pb-1 flex items-center gap-2">
                            <Icon name="mdi:heart" class="w-4 h-4" />
                            140
                        </button>
                    </div>
                </div>

                <!-- CONTENT -->
                <div v-if="step === 'comments'" ref="commentsWrapper" @scroll="handleScroll"
                    class="flex-1 overflow-y-auto p-4 space-y-6">

                    <!-- COMMENT LOOP -->
                    <div v-for="commentItem in commentsState.list" :key="commentItem.id">

                        <!-- MAIN COMMENT -->
                        <div class="flex gap-2">

                            <!-- Avatar -->
                            <img v-if="commentItem.user.photo"
                                :src="`${config.public.apiBackendUrl}/uploads/users/${commentItem.user.photo}`"
                                class="w-7 h-7 rounded-full" />
                            <div v-else class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                                :style="`background-color: ${commentItem.user.code_color}`">
                                {{ commentItem.user.name.charAt(0).toUpperCase() }}
                            </div>


                            <!-- Content -->
                            <div class="flex-1 text-xs">

                                <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-2">
                                    <p class="font-semibold text-slate-900 dark:text-white">
                                        {{ commentItem.user.name }}
                                    </p>
                                    <p class="text-slate-700 dark:text-slate-200" v-html="commentItem.content"></p>
                                </div>

                                <div
                                    class="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-200">
                                    <span>{{ formatLocalDate(commentItem.created_at) }}</span>

                                    <button class="hover:underline text-orange-600 dark:text-orange-400" v-if="user"
                                        @click="toggleReplies(commentItem.id)">
                                        Répondre
                                    </button>
                                    <button v-if="(user && (commentItem.user.id === user.id || user.id === book.id_user))"
                                        class="hover:underline text-red-600 dark:text-red-400"
                                        @click="handleDeleteComment(commentItem.uuid, commentItem.id)">
                                        Supprimer
                                    </button>
                                </div>

                                <!-- VOIR REPONSES -->
                                <div v-if="commentItem.replies_count > 0 && !commentsState.replies[commentItem.id]"
                                    class="mt-2">
                                    <button class="text-xs text-slate-500 dark:text-slate-200 hover:underline"
                                        @click="loadReplies(commentItem.id)">
                                        Voir {{ commentItem.replies_count }} réponses
                                    </button>
                                </div>

                            </div>
                        </div>

                        <!-- REPLY FORM -->
                        <div v-if="replyFormId === commentItem.id" class="flex items-end gap-2 ml-11 mt-2 text-xs">
                            <textarea v-model="replyContent" @input="autoResizeReply" rows="1" autofocus
                                class="w-full border border-slate-200 rounded-lg p-2 resize-none outline-none"
                                placeholder="Écrire une réponse..."></textarea>

                            <button @click="submitComment(commentItem.id)"
                                class="bg-orange-600 flex items-center justify-center text-white px-3 py-1.5 rounded-lg">
                                <Icon name="mdi:send" class="w-4 h-4" />
                            </button>
                        </div>

                        <!-- REPLIES -->
                        <div v-if="commentsState.replies[commentItem.id]" class="ml-11 mt-3 space-y-3">
                            <div v-for="reply in commentsState.replies[commentItem.id]" :key="reply.id"
                                class="flex gap-2">
                                <img v-if="reply.user.photo"
                                    :src="`${config.public.apiBackendUrl}/uploads/users/${reply.user.photo}`"
                                    class="w-6 h-6 rounded-full" />
                                <div v-else
                                    class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                                    :style="`background-color: ${reply.user.code_color}`">
                                    {{ reply.user.name.charAt(0).toUpperCase() }}
                                </div>

                                <div class="flex-1">
                                    <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-2">
                                        <p class="text-xs font-semibold text-slate-900 dark:text-white">
                                            {{ reply.user.name }}
                                        </p>
                                        <p class="text-xs text-slate-700 dark:text-slate-200" v-html="reply.content">
                                        </p>
                                    </div>

                                    <div class="text-[10px] flex items-center gap-2 mt-1">
                                        <span class="text-slate-500 dark:text-slate-200 block">
                                            {{ formatLocalDate(reply.created_at) }}
                                        </span>
                                        <button v-if="(user && (reply.user.id === user.id || user.id === book.id_user))"
                                            class="hover:underline text-red-600 dark:text-red-400"
                                            @click="handleDeleteComment(reply.uuid, reply.id, commentItem.id)">
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- LOADING -->
                    <div v-if="commentsState.loading" class="text-center text-sm text-slate-500">
                        Chargement...
                    </div>
                </div>

                <!-- ADD COMMENT -->
                <div v-if="step === 'comments'" class="border-t border-slate-200 p-4 text-xs">
                    <form v-if="user" @submit.prevent="() => submitComment()" class="flex items-end gap-2">
                        <img v-if="user.photo" :src="`${config.public.apiBackendUrl}/uploads/users/${user.photo}`"
                            class="w-8 h-8 rounded-full" />
                        <div v-else class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            :style="`background-color: ${user.code_color}`">
                            {{ user.name.charAt(0).toUpperCase() }}
                        </div>

                        <textarea ref="textarea" v-model="comment" @input="autoResize" rows="1"
                            class="flex-1 border border-slate-200 rounded-xl px-4 py-2 resize-none outline-none"
                            placeholder="Ajouter un commentaire..."></textarea>

                        <button v-if="comment.trim().length > 0" type="submit"
                            class="bg-orange-600 text-white px-4 py-2 rounded-xl">
                            <Icon name="mdi:send" class="w-4 h-4" />
                        </button>
                    </form>

                    <p v-else class="flex flex-col gap-2 text-xs text-slate-500 text-center">
                        Vous devez être connecté pour commenter
                        <nuxt-link to="/login"
                            class="flex items-center justify-center gap-2 bg-primary hover:bg-slate-800 dark:bg-white dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800 dark:text-stone-700 text-white px-4 py-2 lg:py-3 rounded-full text-xs xl:text-sm font-medium transition-all shadow-sm hover:shadow-md transform active:scale-95">
                            <span>Se connecter</span>
                        </nuxt-link>
                    </p>
                </div>

            </div>
        </StatsModal>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue';

const config = useRuntimeConfig();
const route = useRoute();

// ---------- STATE ----------
const showStatsModal = ref(false);
const step = ref<'comments' | 'likes'>('comments');

const comment = ref('');
const textarea = ref<HTMLTextAreaElement | null>(null);

const replyFormId = ref<number | null>(null);
const replyContent = ref<string>('');
const commentsWrapper = ref<HTMLElement | null>(null);

const sortDirection = ref<'asc' | 'desc'>('asc');

const user = ref<User | null>(null);
const book = ref<BookData | null>(null);

// ---------- CHAPTERS ----------
const sortedChapters = computed(() => {
    if (!book.value?.chapters) return [];
    const sorted = [...book.value.chapters].sort((a, b) => {
        const diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        return sortDirection.value === 'asc' ? diff : -diff;
    });
    return sorted;
});

const toggleSort = () => {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
};

const status = (status: string) => {
    switch (status.toLowerCase()) {
        case 'ongoing': return 'En cours';
        case 'completed': return 'Terminé';
        case 'paused': return 'Pause';
        case 'draft': return 'Brouillon';
        case 'inactive': return 'Inactif';
        default: return 'Brouillon';
    }
};

// ---------- COMMENTS ----------
const commentsState = reactive({
    list: [] as any[],
    replies: {} as Record<number, any[]>,
    page: 1,
    total: 0,
    loading: false,
});

const { getBookByUuid } = booksData();
const { toConnectUser } = authenticate();
const { getCommentsByBook, getReplies, createComment, deleteComment } = useBookComments();

// =============================
// LOAD COMMENTS (PAGINATION)
// =============================
const loadComments = async () => {
    if (!book.value || commentsState.loading) return;

    commentsState.loading = true;

    const res = await getCommentsByBook(book.value.id, commentsState.page);

    if (res?.data?.length) {
        commentsState.list.push(...res.data);
        commentsState.total = res.total;
    }

    commentsState.loading = false;
};


// =============================
// LOAD REPLIES (ON DEMAND)
// =============================
const loadReplies = async (commentId: number) => {
    if (commentsState.replies[commentId]) return;

    const res = await getReplies(commentId);
    if (Array.isArray(res)) {
        commentsState.replies[commentId] = res;
    }
};

// =============================
// TOGGLE REPLIES
// =============================
const toggleReplies = async (commentId: number) => {
    replyFormId.value =
        replyFormId.value === commentId ? null : commentId;

    if (!commentsState.replies[commentId]) {
        await loadReplies(commentId);
    }
};

const deleteCommentLocal = (id: number, parent_id?: number) => {
    if (!parent_id) {
        // Suppression commentaire principal
        commentsState.list = commentsState.list.filter(c => c.id !== id);
        commentsState.total -= 1;
    } else {
        // Suppression reply
        if (commentsState.replies[parent_id]) {
            commentsState.replies[parent_id] =
                commentsState.replies[parent_id].filter(r => r.id !== id);
        }
    }
};

const handleDeleteComment = async (uuid: string, id: number, parent_id?: number) => {
    await deleteComment(uuid);

    deleteCommentLocal(id, parent_id);
};

// =============================
// SUBMIT COMMENT (MAIN + REPLY)
// =============================
const submitComment = async (parent_id?: number) => {
    if (!book.value || !user.value) return;

    const content = parent_id
        ? replyContent.value.trim()
        : comment.value.trim();

    if (!content) return;

    const newComment = await createComment({
        content: content.replace(/\n/g, '<br>'),
        id_book: book.value.id,
        id_user: user.value.id,
        parent_id,
    });

    if (!parent_id) {
        // Ajout instantané en haut (Facebook style)
        commentsState.list.unshift(newComment);
        commentsState.total += 1;
        comment.value = '';
    } else {
        if (!commentsState.replies[parent_id]) {
            commentsState.replies[parent_id] = [];
        }

        commentsState.replies[parent_id].push(newComment);
        replyContent.value = '';
        replyFormId.value = null;
    }

    await nextTick();

    if (textarea.value) {
        textarea.value.style.height = 'auto';
    }
};


// =============================
// INFINITE SCROLL
// =============================
const handleScroll = async (e: Event) => {
    const el = e.target as HTMLElement;
    if (!el) return;

    if (
        el.scrollTop + el.clientHeight >= el.scrollHeight - 50 &&
        !commentsState.loading &&
        commentsState.list.length < commentsState.total
    ) {
        commentsState.page += 1;
        await loadComments();
    }
};


// =============================
// AUTO RESIZE
// =============================
const autoResize = (event: Event) => {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 80) + 'px';
};

const autoResizeReply = (event: Event) => {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 80) + 'px';
};


// =============================
// MODAL
// =============================
const openStatsBook = () => {
    step.value = 'comments';
    showStatsModal.value = true;
};

const closeStats = () => (showStatsModal.value = false);
const showLikes = () => (step.value = 'likes');
const showComments = () => (step.value = 'comments');


// =============================
// INIT
// =============================
onMounted(async () => {
    user.value = await toConnectUser();
    book.value = await getBookByUuid(`${route.params.uuid}`);

    if (book.value) {
        await loadComments();
        useSeoMeta({
            title: `${book.value.title}`
        })
    }
});
</script>