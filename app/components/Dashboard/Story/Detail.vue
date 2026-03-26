<template>
    <div v-if="!loading && book && profil">
        <div class="max-w-6xl mx-auto space-y-6 mb-4">
            <!-- Page Header -->
            <div class="flex flex-col items-start">
                <button @click="back"
                    class="hover:bg-slate-200 hover:duration-300 hover:ease-in-out dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-lg border-slate-400 border-[1px] flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Icon name="mdi:arrow-left" class="w-4 h-4" />
                </button>
                <div class="w-full h-72 mt-2 relative">
                    <div class="bg-slate-100 dark:bg-slate-800 rounded-lg w-full h-72 relative">
                        <img :src="`${config.public.apiBackendUrl}/uploads/books/${book?.image}`" :alt="book.title"
                            class="w-full h-full object-cover lg:object-contain grayscale-[20%] rounded-lg transition-transform duration-700">
                    </div>
                    <div @click="openStatsBook('comments')"
                        class="hidden lg:flex items-center gap-4 absolute bottom-4 right-4 bg-white p-2 rounded-lg cursor-pointer">
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-slate-800">{{
                                formatNumber(book.book_reactions)
                                }}</span> <span class="text-slate-400 dark:text-slate-700">
                                <Icon name="mdi:heart" class="w-4 h-4" />
                            </span>
                        </span>
                        <span class="w-px h-3 bg-slate-200"></span>
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-slate-800">{{
                                formatNumber(Number(book.total_views))
                                }}</span> <span class="text-slate-400 dark:text-slate-700">
                                <Icon name="mdi:eye" class="w-4 h-4" />
                            </span>
                        </span>
                        <span class="w-px h-3 bg-slate-200"></span>
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-slate-800">{{
                                formatNumber(book.book_comments)
                                }}</span> <span class="text-slate-400 dark:text-slate-700">
                                <Icon name="mdi:comments" class="w-4 h-4" />
                            </span>
                        </span>
                    </div>
                </div>
                <div class="mt-3 flex flex-col gap-2">
                    <div class="flex items-center gap-3 uppercase text-xs font-medium text-orange-600">
                        <span v-for="category in book.book_categories" :key="category.id"
                            class="bg-orange-50 border border-orange-100/50 text-orange-600 text-xs font-medium animate-fade-in-up px-2 py-1 rounded">{{
                                category.name }}</span>
                        <span
                            :class="`${book.status === 'inactive' ? 'text-red-600 bg-red-50 dark:text-red-600' : (book.status === 'completed' ? 'text-green-600 dark:text-green-500 bg-green-50' : (book.status === 'ongoing' ? 'text-blue-600 dark:text-blue-500 bg-blue-50' : 'bg-slate-100 text-slate-500'))} px-2 py-1 rounded`">{{
                                status(book.status) }}</span>
                    </div>
                    <div @click="openStatsBook('comments')" class="lg:hidden flex items-center gap-4 cursor-pointer">
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-white">42</span> <span
                                class="text-slate-400">
                                <Icon name="mdi:heart" class="w-4 h-4" />
                            </span>
                        </span>
                        <span class="w-px h-3 bg-slate-200"></span>
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-white">12k</span> <span
                                class="text-slate-400">
                                <Icon name="mdi:eye" class="w-4 h-4" />
                            </span>
                        </span>
                        <span class="w-px h-3 bg-slate-200"></span>
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-white">1.1k</span> <span
                                class="text-slate-400">
                                <Icon name="mdi:comments" class="w-4 h-4" />
                            </span>
                        </span>
                    </div>
                </div>
                <div class="py-4 border-b border-slate-200">
                    <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">{{
                        book.title
                        }}</h2>
                    <p class="text-sm text-slate-500 dark:text-slate-200 mt-1" v-html="book.description"></p>
                </div>
                <div class="flex flex-col lg:flex-row lg:gap-4 lg:justify-between w-full pt-4">
                    <select v-model="selectedChapterId"
                        class="lg:hidden mt-1 block w-full outline-none rounded-lg border-0 py-2.5 text-slate-900 text-sm dark:bg-slate-800 dark:border dark:text-white shadow-sm border-slate-300 border-[1px]">
                        <option :value="null" disabled>Sélectionnez un chapitre</option>
                        <option v-for="chapter in book.chapters" :key="chapter.id" :value="chapter.id">
                            {{ chapter.title }}
                        </option>
                    </select>
                    <div class="hidden lg:block lg:w-1/4 space-y-2 max-h-[550px] overflow-y-auto pr-2">
                        <button v-for="chap in book.chapters" :key="chap.id"
                            @click="() => { attemptSwitchChapter(chap.id); }"
                            :class="['text-sm w-full text-left p-2 rounded transition', chap.id === selectedChapterId ? 'bg-slate-100 border border-slate-200' : 'dark:hover:bg-slate-100 border-slate-400 dark:border-slate-200 border hover:bg-slate-50']">
                            <div class="min-w-0 flex-1">
                                <div class="flex justify-between items-center mb-0.5">
                                    <span
                                        :class="['text-xs font-medium truncate', chap.id === selectedChapterId ? 'text-slate-900' : 'dark:text-slate-500 text-slate-700 group-hover:text-slate-900']">{{
                                            chap.title }}</span>
                                    <span
                                        :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded border', chap.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200']">{{
                                            chap.status === 'completed' ? 'Publié' : 'En cours' }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <p :class="['text-xs line-clamp-1 font-serif', chap.id === selectedChapterId ? 'text-slate-500' : 'text-slate-400']"
                                        v-html="chap.content"></p>
                                    <div class="flex items-center gap-1">
                                        <div class="text-xs">
                                            <span
                                                class="font-semibold text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-700">{{
                                                    formatNumber(chap.chapter_reactions.length)
                                                }}</span> <span class="text-slate-400 dark:text-slate-600">
                                                <Icon name="mdi:heart" class="w-4 h-4" />
                                            </span>
                                        </div>
                                        <div class="text-xs">
                                            <span
                                                class="font-semibold text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-700">{{
                                                    formatNumber(chap.chapter_reads.length)
                                                }}</span> <span class="text-slate-400 dark:text-slate-600">
                                                <Icon name="mdi:eye" class="w-4 h-4" />
                                            </span>
                                        </div>
                                        <div class="w-px h-3 bg-slate-200"></div>
                                        <div class="text-xs">
                                            <span
                                                class="font-semibold text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-700">{{
                                                    formatNumber(chap.chapter_comments.length)
                                                }}</span> <span class="text-slate-400 dark:text-slate-600">
                                                <Icon name="mdi:comments" class="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div class="mt-4 lg:flex-1 lg:mt-0 bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 lg:bg-slate-100 rounded-lg">
                        <div class="p-4" v-if="step === 'chapter' && selectedChapter">
                            <h4 class="text-sm font-medium text-slate-900 dark:text-slate-200">
                                {{ selectedChapter.title }}
                            </h4>
                            <div class="text-sm text-slate-700 dark:text-slate-200 mt-4" v-html="selectedChapter.content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
                            {{ formatNumber(book.book_comments) }}
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
                <div v-if="step === 'comments'" ref="commentsWrapper" @scroll="handleScroll"
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
                                    <button v-if="(user && !['lecteur', 'auteur'].includes(profil.role))"
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
                                        <button v-if="(user && !['lecteur', 'auteur'].includes(profil.role))"
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
    </div>

    <div v-if="loading" class="max-w-6xl mx-auto space-y-6 mb-4">
        <div class="animate-pulse">

            <!-- Image -->
            <div class="w-full h-72 mt-2 relative">
                <div class="bg-slate-200 dark:bg-slate-700 rounded-lg w-full h-72"></div>

                <!-- Stats desktop -->
                <div class="hidden lg:flex items-center gap-4 absolute bottom-4 right-4 bg-white p-2 rounded-lg">
                    <div class="h-3 w-8 bg-slate-200 rounded"></div>
                    <div class="w-px h-3 bg-slate-200"></div>
                    <div class="h-3 w-8 bg-slate-200 rounded"></div>
                    <div class="w-px h-3 bg-slate-200"></div>
                    <div class="h-3 w-8 bg-slate-200 rounded"></div>
                </div>
            </div>

            <!-- Categories + status -->
            <div class="mt-3 flex flex-col gap-2">
                <div class="flex items-center gap-3">
                    <div class="h-5 w-20 bg-slate-200 rounded"></div>
                    <div class="h-5 w-16 bg-slate-200 rounded"></div>
                    <div class="h-5 w-16 bg-slate-200 rounded"></div>
                </div>

                <!-- Stats mobile -->
                <div class="lg:hidden flex items-center gap-4">
                    <div class="h-3 w-8 bg-slate-200 rounded"></div>
                    <div class="w-px h-3 bg-slate-200"></div>
                    <div class="h-3 w-8 bg-slate-200 rounded"></div>
                    <div class="w-px h-3 bg-slate-200"></div>
                    <div class="h-3 w-8 bg-slate-200 rounded"></div>
                </div>
            </div>

            <!-- Title + description -->
            <div class="py-4 border-b border-slate-200">
                <div class="h-6 w-3/4 bg-slate-200 rounded"></div>
                <div class="mt-2 space-y-2">
                    <div class="h-3 w-full bg-slate-200 rounded"></div>
                    <div class="h-3 w-5/6 bg-slate-200 rounded"></div>
                    <div class="h-3 w-4/6 bg-slate-200 rounded"></div>
                </div>
            </div>

        </div>
    </div>

    <div v-if="!loading && !book" class="max-w-6xl mx-auto space-y-6 mb-4">
        <div class="animate-pulse">
            <button @click="back"
                class="hover:bg-slate-200 hover:duration-300 hover:ease-in-out dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-lg border-slate-400 border-[1px] flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Icon name="mdi:arrow-left" class="w-4 h-4" />
            </button>

            <!-- Image -->
            <div class="w-full h-72 mt-2 relative">
                <div class="bg-slate-200 dark:bg-slate-700 rounded-lg w-full flex items-center justify-center h-72">
                    <p class="text-slate-500 dark:text-slate-400 text-center">Ce livre n'existe pas !</p>
                </div>

                <!-- Stats desktop -->
                <div class="hidden lg:flex items-center gap-4 absolute bottom-4 right-4 bg-white p-2 rounded-lg">
                    <div class="h-3 w-8 bg-slate-200 rounded"></div>
                    <div class="w-px h-3 bg-slate-200"></div>
                    <div class="h-3 w-8 bg-slate-200 rounded"></div>
                    <div class="w-px h-3 bg-slate-200"></div>
                    <div class="h-3 w-8 bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const { toConnectUser } = authenticate();
const { getProfile } = usersData();
const { findBookByUuid } = booksData();
const { getCommentsByBook, getReplies, createComment, updateComment, deleteComment } = useBookComments();
const { getReactionsByBook, createReaction, createDefaultReaction, findByUserIdAndBookId } = useBookReactions();
const selectedChapterId = ref<number | null>(null)
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const step = ref<string>("chapter");
const book = ref<BookData | null>(null);
const route = useRoute();
const router = useRouter();
const showStatsModal = ref<boolean>(false);
const comment = ref<string>('');
const commentUuid = ref<string>('');
const commentId = ref<number>(0);
const commentReplyId = ref<number | null>(0);
const textarea = ref<HTMLTextAreaElement | null>(null);
const loading = ref<boolean>(true);
const replyFormId = ref<number | null>(null);
const replyContent = ref<string>('');
const counterReaction = ref<number>(0);
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

const selectedChapter = computed(() =>
    book.value && book.value.chapters.find((ch: ChapterData) => ch.id === selectedChapterId.value)
)

watch(selectedChapterId, () => {
    step.value = "chapter"
})

function attemptSwitchChapter(id: number) {
    step.value = "chapter";
    if (id === selectedChapterId.value) return
    selectedChapterId.value = id
}

const back = () => {
    router.back();
}

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
            return "Inactif"
        default:
            return "Brouillon"
    }
}

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
// LOAD REACTIONS (PAGINATION)
// =============================
const loadReactions = async () => {
    if (!book.value || reactionsState.loading) return;

    reactionsState.loading = true;

    const res = await getReactionsByBook(book.value.id, reactionsState.page);

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
const openStatsBook = (show: 'comments' | 'likes') => {
    step.value = show;
    showStatsModal.value = true;
};

const closeStats = () => (showStatsModal.value = false);
const showLikes = () => (step.value = 'likes');
const showComments = () => (step.value = 'comments');

onMounted(async () => {
    user.value = await toConnectUser();
    profil.value = await getProfile();
    book.value = await findBookByUuid(`${route.params.uuid}`);
    if (book.value) {
        counterReaction.value = Number(book.value.book_reactions);
        await loadComments();
        await loadReactions();
    }
    loading.value = false;
})
</script>