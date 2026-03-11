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
                        class="mt-16 pt-8 border-t border-slate-200 text-slate-500 dark:text-slate-200 flex flex-col">
                        <div class="flex items-center gap-4">
                            <div class="">
                                <div class="relative" ref="reactionWrapper" @mouseenter="handleMouseEnter"
                                    @mouseleave="handleMouseLeave">
                                    <button @click="toggleLike" @touchstart="startPress" @touchend="cancelPress"
                                        @touchmove="cancelPress"
                                        :class="`${(reactionUser && !selectedReaction)
                                            ? reactionUser.color
                                            : (selectedReaction ? selectedReaction.color : '')
                                            } transition-colors flex items-center justify-center gap-2 !bg-transparent`">
                                        <!-- class="flex items-center gap-2 hover:text-red-500 transition-colors group" -->
                                        <span v-if="reactionUser && !selectedReaction && reactionUser?.emoji"
                                            class="animate-pulse">
                                            {{ reactionUser?.emoji }}
                                        </span>
                                        <span v-else-if="selectedReaction?.emoji" :class="selectedReaction.animation">
                                            {{ selectedReaction?.emoji }}
                                        </span>
                                        <Icon v-else name="mdi:heart" class="w-5 h-5" />
                                        <span class="text-sm font-medium">{{ formatNumber(counterReaction) }}
                                            {{ (reactionUser && !selectedReaction) ? reactionUser.label :
                                                (selectedReaction
                                                    ? selectedReaction.label : 'J’aime') }}</span>
                                    </button>
                                    <!-- Popover -->
                                    <transition name="fade">
                                        <div v-if="showReactions"
                                            class="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 dark:border-slate-300 shadow-xl border border-slate-200 rounded-xl px-3 py-2 flex flex-wrap w-[200px] gap-3 items-center justify-center z-50">
                                            <!-- Triangle -->
                                            <div
                                                class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white">
                                            </div>
                                            <button v-for="reaction in reactions" :key="reaction.id"
                                                @click="selectReaction(reaction)"
                                                :class="`${reaction.animation} hover:scale-125 flex-shrink-0 w-8 h-8 hover:-translate-y-1 transition-all duration-200 ${(reactionUser && reactionUser.emoji === reaction.emoji) ? 'border-orange-600 p-1.5 bg-slate-50 dark:bg-slate-300 border-[1px] rounded-full text-sm flex items-center justify-center' : 'text-xl'}`">
                                                {{ reaction.emoji }}
                                            </button>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <button class="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <Icon name="mdi:message-text-outline" class="w-5 h-5" />
                                <span class="text-sm font-medium">{{ formatNumber(chapter.chapter_reads.length || 0) }}
                                    Vue{{chapter.chapter_reactions.length > 1 ? 's' : '' }}</span>
                            </button>
                            <button class="flex items-center gap-2 hover:text-blue-600 transition-colors"
                                @click="openStats('comments')">
                                <Icon name="mdi:message-text-outline" class="w-5 h-5" />
                                <span class="text-sm font-medium">{{ formatNumber(chapter.chapter_comments) }}
                                    Com.</span>
                            </button>
                        </div>
                        <div class="text-xs text-slate-500 dark:text-slate-200 md:text-center mt-2 cursor-pointer hover:underline"
                            @click="openStats('likes')">
                            <p v-if="!reactionUser">
                                {{ reactionsState.list.length > 0
                                    ? `${reactionsState.list[0].emoji} ${formatNumber(chapter.chapter_reactions)}
                                personne${chapter.chapter_reactions > 1 ? 's ont' : ' a'} réagi à ce chapitre`
                                    : ''
                                }}
                            </p>
                            <p v-else>
                                {{ reactionsState.list.length > 1
                                    ? `${reactionUser.emoji} vous et ${formatNumber(chapter.chapter_reactions - 1)}
                                autre${chapter.chapter_reactions - 1 > 1 ? 's' : ''} personne${chapter.chapter_reactions > 2
                                        ? 's' : ''} avez réagi à ce chapitre`
                                    : `${reactionUser.emoji} vous avez réagi à ce chapitre`
                                }}
                            </p>
                        </div>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="grid grid-cols-2 gap-4 mt-8" v-if="!connectedModal">
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

        <!-- STATS MODAL -->
        <StatsModal :show="showStatsModal" @close="closeStats">
            <div class="flex flex-col h-full w-full">

                <!-- HEADER -->
                <div
                    class="flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800 z-10 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <h3 class="text-lg font-medium text-slate-900 dark:text-white truncate">
                        {{ chapter?.title }}
                    </h3>

                    <div class="text-xs flex items-center gap-4 dark:text-white">
                        <button @click="showComments"
                            :class="step === 'comments' ? 'border-orange-600' : 'border-transparent'"
                            class="border-b-2 pb-1 flex items-center gap-2">
                            <Icon name="mdi:comment-multiple" class="w-4 h-4" />
                            {{ formatNumber(chapter.chapter_comments) }}
                        </button>

                        <button @click="showLikes"
                            :class="step === 'likes' ? 'border-orange-600' : 'border-transparent'"
                            class="border-b-2 pb-1 flex items-center gap-2">
                            <Icon name="mdi:heart" class="w-4 h-4" />
                            {{ formatNumber(counterReaction) }}
                        </button>
                    </div>
                </div>

                <!-- CONTENT -->
                <div v-if="step === 'comments'" ref="commentsWrapper" @scroll="handleScrollComments"
                    class="flex-1 overflow-y-auto p-4 space-y-6">

                    <!-- COMMENT LOOP -->
                    <div v-for="commentItem in commentsState.list" :key="commentItem.id"
                        v-if="commentsState.list.length > 0">

                        <!-- MAIN COMMENT -->
                        <div class="flex gap-2">

                            <!-- Avatar -->
                            <img v-if="commentItem.user.photo"
                                :src="`${config.public.apiBackendUrl}/uploads/users/${commentItem.user.photo}`"
                                class="w-6 h-6 rounded-full" />
                            <div v-else
                                class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                                :style="`background-color: ${commentItem.user.code_color}`">
                                {{ commentItem.user.name.charAt(0).toUpperCase() }}
                            </div>


                            <!-- Content -->
                            <div class="flex-1 text-xs">

                                <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-2">
                                    <nuxt-link
                                        :to="`${(commentItem.user && Number(commentItem.user.id) === Number(book.id_user)) ? `/authors/${book.user.uuid}` : ''}`"
                                        class="flex justify-between items-center font-semibold text-slate-900 dark:text-white">
                                        <span class="flex items-center gap-1">{{ commentItem.user.name }}
                                            <span class="text-slate-500 text-[11px] dark:text-slate-200 block">
                                                {{ formatRelativeDate(commentItem.created_at) }}
                                            </span>
                                        </span>
                                        <span class="font-light text-[10px] flex items-center gap-1"
                                            v-if="(commentItem.user && Number(commentItem.user.id) === Number(book.id_user))">
                                            <Icon name="mdi:edit" class="w-3 h-3 text-orange-600 animate-pulse" />
                                            Auteur/trice
                                        </span>
                                    </nuxt-link>
                                    <p class="text-slate-700 text-[11px] dark:text-slate-200"
                                        v-html="commentItem.content"></p>
                                </div>

                                <div
                                    class="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-200">
                                    <button class="hover:underline text-orange-600 dark:text-orange-400" v-if="user"
                                        @click="toggleReplies(commentItem.id)">
                                        Répondre
                                    </button>

                                    <button class="hover:underline text-blue-600 dark:text-blue-400"
                                        v-if="(user && (commentItem.user.id === user.id))"
                                        @click="handleUpdateComment(commentItem.uuid, commentItem.id, null, commentItem.content)">
                                        Modifier
                                    </button>
                                    <button
                                        v-if="(user && (commentItem.user.id === user.id || user.id === book.id_user))"
                                        class="hover:underline text-red-600 dark:text-red-400"
                                        @click="handleDeleteComment(commentItem.uuid, commentItem.id)">
                                        Supprimer
                                    </button>
                                </div>

                                <!-- VOIR REPONSES -->
                                <div v-if="commentItem.replies_count > 0 && !commentsState.replies[commentItem.id]"
                                    class="mt-1">
                                    <button class="text-[11px] text-slate-500 dark:text-slate-200 hover:underline"
                                        @click="loadReplies(commentItem.id)">
                                        Voir {{ commentItem.replies_count }} réponse(s)
                                    </button>
                                </div>

                            </div>
                        </div>

                        <!-- REPLY FORM -->
                        <div v-if="replyFormId === commentItem.id" class="flex items-end gap-2 ml-11 mt-2 text-xs">
                            <textarea v-model="replyContent" id="replyInput" @input="autoResizeReply" rows="1" autofocus
                                class="w-full border border-slate-200 rounded-lg p-2 resize-none outline-none"
                                :placeholder="`Répondre en tant que ${user?.name}`"></textarea>

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
                                    class="w-5 h-5 rounded-full" />
                                <div v-else
                                    class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                                    :style="`background-color: ${reply.user.code_color}`">
                                    {{ reply.user.name.charAt(0).toUpperCase() }}
                                </div>

                                <div class="flex-1">
                                    <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-2">
                                        <nuxt-link
                                            :to="`${(reply.user && Number(reply.user.id) === Number(book.id_user)) ? `/authors/${book.user.uuid}` : ''}`"
                                            class="text-[12px] flex justify-between items-center font-semibold text-slate-900 dark:text-white">
                                            <span class="flex items-center gap-1">{{ reply.user.name }}
                                                <span class="text-slate-500 text-[11px] dark:text-slate-200 block">
                                                    {{ formatRelativeDate(reply.created_at) }}
                                                </span>
                                            </span>
                                            <span class="font-light text-[10px] flex items-center gap-1"
                                                v-if="(reply.user && Number(reply.user.id) === Number(book.id_user))">
                                                <Icon name="mdi:edit" class="w-3 h-3 text-orange-600 animate-pulse" />
                                                Auteur/trice
                                            </span>
                                        </nuxt-link>
                                        <p class="text-[11px] text-slate-700 dark:text-slate-200"
                                            v-html="reply.content">
                                        </p>
                                    </div>

                                    <div class="text-[10px] flex items-center gap-2 mt-1">
                                        <button class="hover:underline text-blue-600 dark:text-blue-400"
                                            v-if="(user && (reply.user.id === user.id))"
                                            @click="handleUpdateComment(reply.uuid, reply.id, commentItem.id, reply.content)">
                                            Modifier
                                        </button>
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

                    <div v-else
                        class="flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-slate-200">
                        <Icon name="mdi:comment-outline" class="w-12 h-12 text-slate-300 mb-3" />
                        <p class="text-sm font-medium">Aucun commentaire disponible</p>
                        <p class="text-sm">Soyez le premier à le faire !</p>
                    </div>

                    <!-- LOADING -->
                    <div v-if="commentsState.loading" class="text-center text-sm text-slate-500 dark:text-slate-200">
                        Chargement...
                    </div>
                </div>

                <!-- ADD COMMENT -->
                <div v-if="step === 'comments'" class="border-t border-slate-200 p-4 text-xs">
                    <div v-if="user" class="flex items-end gap-2">
                        <img v-if="user.photo" :src="`${config.public.apiBackendUrl}/uploads/users/${user.photo}`"
                            class="w-8 h-8 rounded-full" />
                        <div v-else class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            :style="`background-color: ${user.code_color}`">
                            {{ user.name.charAt(0).toUpperCase() }}
                        </div>

                        <textarea ref="textarea" v-model="comment" @input="autoResize" rows="1"
                            class="flex-1 border border-slate-200 rounded-xl px-4 py-2 resize-none outline-none"
                            :placeholder="`Commenter en tant que ${user?.name}`"></textarea>

                        <button v-if="!commentUuid && comment.trim().length > 0" @click="submitComment()"
                            class="bg-orange-600 text-white px-4 py-2 rounded-xl">
                            <Icon name="mdi:send" class="w-4 h-4" />
                        </button>

                        <button v-if="commentUuid && comment.trim().length > 0" @click="updateCommentLocal()"
                            class="bg-orange-600 text-white px-4 py-2 rounded-xl">
                            <Icon name="mdi:send" class="w-4 h-4" />
                        </button>
                    </div>

                    <p v-else class="flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-200 text-center">
                        Vous devez être connecté pour commenter
                        <nuxt-link to="/login"
                            class="flex items-center justify-center gap-2 bg-primary hover:bg-slate-800 dark:bg-white dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800 dark:text-stone-700 text-white px-4 py-2 lg:py-3 rounded-full text-xs xl:text-sm font-medium transition-all shadow-sm hover:shadow-md transform active:scale-95">
                            <span>Se connecter</span>
                        </nuxt-link>
                    </p>
                </div>

                <div v-if="step === 'likes'" ref="reactionsWrapper" @scroll="handleScrollReactions"
                    class="flex-1 overflow-y-auto p-4 space-y-6">
                    <div class="flex gap-2" v-for="(reaction, index) in reactionsState.list" :key="index"
                        v-if="reactionsState.list.length > 0">
                        <div class="relative">
                            <img v-if="reaction.user.photo"
                                :src="`${config.public.apiBackendUrl}/uploads/users/${reaction.user.photo}`"
                                class="w-7 h-7 rounded-full" />
                            <div v-else class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                                :style="`background-color: ${reaction.user.code_color}`">
                                {{ reaction.user.name.charAt(0).toUpperCase() }}
                            </div>
                            <span class="text-xs absolute bottom-0 right-0 animate-bounce">{{ reaction.emoji }}</span>
                        </div>
                        <div class="flex flex-col">
                            <div class="flex items-center gap-3">
                                <div class="flex items-baseline gap-2">
                                    <span class="text-[13px] font-semibold text-slate-900 dark:text-slate-200">{{
                                        reaction.user.name }}</span>
                                </div>
                                <span
                                    class="px-3 py-0.5 rounded-full bg-orange-50 border border-orange-100/50 text-orange-800 text-[10px] font-medium">
                                    {{ reaction.user.role }}
                                </span>
                            </div>
                            <p class="text-[12px] lg:text-xs text-slate-600 dark:text-slate-200">{{
                                reaction.user.pseudonym
                                }} a réagi : <span class="font-medium">{{ reaction.label }} {{ reaction.emoji }}</span>
                            </p>
                        </div>
                    </div>

                    <div v-else
                        class="flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-slate-200">
                        <Icon name="mdi:heart-outline" class="w-12 h-12 text-slate-300 mb-3" />
                        <p class="text-sm font-medium">Aucune réaction disponible</p>
                    </div>

                    <!-- LOADING -->
                    <div v-if="reactionsState.loading" class="text-center text-sm text-slate-500 dark:text-slate-200">
                        Chargement...
                    </div>
                </div>
            </div>
        </StatsModal>

        <div class="fixed top-[60px] left-0 w-full h-[3px] bg-slate-200 dark:bg-slate-700 z-40">
            <div class="h-full bg-orange-500 transition-all duration-200" :style="{ width: scrollPercent + '%' }">
            </div>
        </div>

        <div v-if="connectedModal && !user" class="fixed inset-0 z-50">
            <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
            <div
                class="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md ring-1 ring-black/5">

                    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 sm:mx-0 sm:h-10 sm:w-10 ring-1 ring-amber-100">
                                <Icon name="mdi:account-alert-outline" class="text-amber-600" width="24"></Icon>
                            </div>
                            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 class="text-base font-semibold leading-6 text-slate-900">Connexion requise</h3>
                                <div class="mt-2">
                                    <p class="text-sm text-slate-500">
                                        Vous avez atteint la limite de chapitres accessibles sans compte. Connectez-vous
                                        pour continuer à lire ce livre et profiter de tous les chapitres.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 border-t border-slate-100 text-sm lg:text-[13px]">
                        <button @click="router.push('/login')"
                            class="inline-flex w-full justify-center rounded-lg bg-slate-900 px-3 py-2 font-semibold text-white shadow-sm hover:bg-slate-800 sm:ml-3 lg:ml-1 sm:w-auto transition-colors">
                            Se connecter
                        </button>
                        <button @click="router.push('/register')"
                            class="mt-2 inline-flex w-full justify-center rounded-lg bg-orange-600 dark:bg-orange-500 text-white px-3 py-2 font-semibold sm:mt-0 sm:w-auto transition-colors">
                            S'inscrire
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "not-layout",
});

import { onClickOutside } from '@vueuse/core'
import { format } from 'node:path';
import { ref, reactive, computed, onMounted, nextTick } from 'vue';
interface Reaction {
    id: string
    label: string
    emoji: string
    color: string
    animation: string
}

const route = useRoute();
const router = useRouter();
const { getBookByUuid } = booksData();
const { getChapterByUuid } = chaptersData();
const { saveRead } = useChapterReads();
const { toConnectUser } = authenticate();
const { getCommentsByChapter, getReplies, createComment, updateComment, deleteComment } = useChapterComments();
const { getReactionsByChapter, createReaction, createDefaultReaction, findByUserIdAndChapterId } = useChapterReactions();
const config = useRuntimeConfig();
const user = ref<User | null>(null);
const book = ref<BookData | null>(null);
const chapter = ref<ChapterData | null>(null);
const chapterReadSent = ref<boolean>(false);
const connectedModal = ref<boolean>(false);
const showStatsModal = ref(false)
const step = ref<'comments' | 'likes'>('comments');
const scrollPercent = ref<number>(0)
const startReadingTime = ref<number | null>(null);
const counterReaction = ref<number>(0);
const comment = ref<string>('');
const commentUuid = ref<string>('');
const commentId = ref<number>(0);
const commentReplyId = ref<number | null>(0);
const textarea = ref<HTMLTextAreaElement | null>(null);
const reactionWrapper = ref<HTMLElement | null>(null)
const replyFormId = ref<number | null>(null);
const replyContent = ref<string>('');
const reactionUser = ref<any>(null);
const showReactions = ref<boolean>(false);
const loading = ref<boolean>(false);
const selectedReaction = ref<Reaction | null>(null)
let pressTimer: NodeJS.Timeout | null = null
const isMobile = ref<boolean>(false);
// ---------- COMMENTS ----------
const commentsState = reactive({
    list: [] as any[],
    replies: {} as Record<number, any[]>,
    page: 1,
    total: 0,
    loading: false,
});
// ---------- REACTIONS ----------
const reactionsState = reactive({
    list: [] as any[],
    page: 1,
    total: 0,
    loading: false,
});

const reactions: Reaction[] = [
    { id: 'like', label: 'J’aime', emoji: '👍', color: 'text-blue-600 bg-blue-50', animation: 'react-like' },
    { id: 'love', label: 'Coup de cœur', emoji: '❤️', color: 'text-red-600 bg-red-50', animation: 'react-love' },
    { id: 'fire', label: 'Incroyable', emoji: '🔥', color: 'text-orange-600 bg-orange-50', animation: 'react-fire' },
    { id: 'mindblown', label: 'Mind blown', emoji: '🤯', color: 'text-purple-600 bg-purple-50', animation: 'react-mindblown' },
    { id: 'laugh', label: 'Haha', emoji: '😂', color: 'text-amber-600 bg-amber-50', animation: 'react-laugh' },
    { id: 'wow', label: 'Surprenant', emoji: '😮', color: 'text-yellow-600 bg-yellow-50', animation: 'react-wow' },
    { id: 'angry', label: 'Frustrant', emoji: '😡', color: 'text-red-600 bg-red-50', animation: 'react-angry' },
    { id: 'clap', label: 'Bravo', emoji: '👏', color: 'text-green-600 bg-green-50', animation: 'react-clap' },
    { id: 'thinking', label: 'Intrigant', emoji: '🤔', color: 'text-indigo-500 bg-indigo-50', animation: 'react-thinking' },
    { id: 'tear', label: 'Bouleversant', emoji: '😭', color: 'text-cyan-600 bg-cyan-50', animation: 'react-tear' },
    { id: 'shock', label: 'Choquant', emoji: '😱', color: 'text-fuchsia-600 bg-fuchsia-50', animation: 'react-shock' },
    { id: 'star', label: 'Chef-d’œuvre', emoji: '🌟', color: 'text-yellow-600 bg-yellow-50', animation: 'react-star' },
    { id: 'goosebumps', label: 'Frissons', emoji: '🥶', color: 'text-blue-700 bg-blue-100', animation: 'react-goosebumps' },
]

onClickOutside(reactionWrapper, () => {
    showReactions.value = false
})

const startPress = () => {
    if (!isMobile.value) return

    pressTimer = setTimeout(() => {
        showReactions.value = true
    }, 400) // durée appui long
}

const cancelPress = () => {
    if (pressTimer) {
        clearTimeout(pressTimer)
        pressTimer = null
    }
}

const handleMouseEnter = () => {
    if (!isMobile.value) {
        showReactions.value = true
    }
}

const handleMouseLeave = () => {
    if (!isMobile.value) {
        showReactions.value = false
    }
}

const defaultReaction = {
    id: 'like',
    label: 'J’aime',
    emoji: '👍',
    color: 'bg-blue-50 text-blue-600'
}

const toggleLike = async () => {
    if (chapter.value && user.value) {
        const res = await createDefaultReaction({ id_chapter: chapter.value.id, id_user: user.value.id, ...defaultReaction });
        counterReaction.value = res.length;
        const response = await getReactionsByChapter(chapter.value.id, reactionsState.page);

        if (response?.data?.length) {
            reactionsState.list = response.data;
            reactionsState.total = response.total;
        }

        reactionUser.value = await findByUserIdAndChapterId(user.value.id, chapter.value.id);
        if (reactionUser.value) {
            selectedReaction.value = reactionUser.value;
        } else {
            selectedReaction.value = null
        }
    } else {
        router.push('/login');
    }
}

const selectReaction = async (reaction: Reaction) => {
    selectedReaction.value = reaction
    showReactions.value = false;
    if (user.value) {
        if (chapter.value) {
            const res = await createReaction({ id_chapter: chapter.value.id, id_user: user.value.id, label: reaction.label, emoji: reaction.emoji, color: reaction.color });
            counterReaction.value = res.length;
            reactionUser.value = await findByUserIdAndChapterId(user.value.id, chapter.value.id);
        }
    } else {
        router.push('/login');
    }
}

// =============================
// LOAD COMMENTS (PAGINATION)
// =============================
const loadComments = async () => {
    if (!chapter.value || commentsState.loading) return;

    commentsState.loading = true;

    const res = await getCommentsByChapter(chapter.value.id, commentsState.page);

    if (res?.data?.length) {
        commentsState.list.push(...res.data);
        commentsState.total = res.total;
    }

    commentsState.loading = false;
};

// =============================
// LOAD REACTIONS (PAGINATION)
// =============================
const loadReactions = async () => {
    if (!chapter.value || reactionsState.loading) return;

    reactionsState.loading = true;

    const res = await getReactionsByChapter(chapter.value.id, reactionsState.page);

    if (res?.data?.length) {
        reactionsState.list.push(...res.data);
        reactionsState.total = res.total;
    }

    reactionsState.loading = false;
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

const updateCommentLocal = async () => {
    const res = await updateComment(commentUuid.value, comment.value.replace(/\n/g, '<br>'));
    if (!res.success) return;
    // Modification commentaire principal
    if (commentReplyId.value === null) {
        const commentToUpdate = commentsState.list.find(
            c => c.id === commentId.value
        );

        if (commentToUpdate) {
            commentToUpdate.content = comment.value.replace(/\n/g, '<br>');
            comment.value = "";
            commentUuid.value = "";
            commentReplyId.value = null;
        }

        return;
    }

    // Modification reply
    const replies = commentsState.replies[commentReplyId.value];

    if (!replies) return;

    const replyToUpdate = replies.find(
        c => c.id === commentId.value
    );

    if (replyToUpdate) {
        replyToUpdate.content = comment.value.replace(/\n/g, '<br>');
        comment.value = "";
        commentUuid.value = "";
        commentReplyId.value = null;
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

const handleUpdateComment = async (uuid: string, id: number, parent_id?: any, content?: string) => {
    commentUuid.value = uuid;
    commentId.value = id;
    commentReplyId.value = parent_id;
    comment.value = content ? content.replace(/<br>/g, '\n') : '';
    textarea.value?.focus();
};

// =============================
// SUBMIT COMMENT (MAIN + REPLY)
// =============================
const submitComment = async (parent_id?: number) => {
    if (!chapter.value || !user.value) return;

    const content = parent_id
        ? replyContent.value.trim()
        : comment.value.trim();

    if (!content) return;

    const newComment = await createComment({
        content: content.replace(/\n/g, '<br>'),
        id_chapter: chapter.value.id,
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
const handleScrollComments = async (e: Event) => {
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
// INFINITE SCROLL
// =============================
const handleScrollReactions = async (e: Event) => {
    const el = e.target as HTMLElement;
    if (!el) return;

    if (
        el.scrollTop + el.clientHeight >= el.scrollHeight - 50 &&
        !reactionsState.loading &&
        reactionsState.list.length < reactionsState.total
    ) {
        reactionsState.page += 1;
        await loadReactions();
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
const openStats = (show: 'comments' | 'likes') => {
    step.value = show;
    showStatsModal.value = true;
};

const showLikes = () => {
    step.value = "likes";
}

const showComments = () => {
    step.value = "comments";
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
    if (index >= 5 && !user.value) {
        connectedModal.value = true;
        return null;
    }
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
    isMobile.value = window.innerWidth < 768

    window.scrollTo({ top: 0 })

    user.value = await toConnectUser()

    book.value = await getBookByUuid(`${route.params.uuid}`);

    const { data } = await getChapterByUuid(`${route.params.uuid_chapter}`);

    chapter.value = data

    if (chapter.value) {
        if (user.value) {
            reactionUser.value = await findByUserIdAndChapterId(user.value.id, chapter.value.id);
        }
        counterReaction.value = Number(chapter.value?.chapter_reactions || 0);

        await loadComments();

        await loadReactions();

        useSeoMeta({
            title: `${chapter.value.title}`
        })
    }

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
