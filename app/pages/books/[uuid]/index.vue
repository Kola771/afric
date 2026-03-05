<template>
    <div v-if="book" class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b">

        <!-- BOOK INFO SECTION -->
        <section class="max-w-7xl mx-auto pt-16 lg:pt-8 border-t border-slate-100">
            <div class="p-4 md:p-10 lg:p-12">
                <button @click="back"
                    class="mb-4 hover:bg-slate-200 hover:duration-300 hover:ease-in-out dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-lg border-slate-400 border-[1px] flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Icon name="mdi:arrow-left" class="w-4 h-4" />
                </button>
                <div class="grid md:grid-cols-12 gap-6 md:gap-10">

                    <!-- LEFT: Cover & Actions -->
                    <div
                        class="md:col-span-4 flex flex-col gap-4 items-start lg:col-span-3 md:sticky md:top-24 self-start">
                        <div
                            class="rounded-xl overflow-hidden shadow-2xl border border-slate-200 rotate-1 hover:rotate-0 transition-transform duration-500">
                            <img v-if="book" :src="`${config.public.apiBackendUrl}/uploads/books/${book.image}`"
                                class="w-full object-cover aspect-[3/4]" alt="Cover Large">
                        </div>

                        <div class="mt-6 flex flex-col gap-3 w-full">
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

                            <div class="">
                                <!-- Likes & Comments -->
                                <div class="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3 text-sm md:text-xs">
                                    <div class="relative" ref="reactionWrapper" @mouseenter="handleMouseEnter"
                                        @mouseleave="handleMouseLeave">
                                        <!-- Bouton principal -->
                                        <button @click="toggleLike" @touchstart="startPress" @touchend="cancelPress"
                                            @touchmove="cancelPress"
                                            :class="`w-full border border-slate-200 ${(reactionUser && !selectedReaction)
                                                ? reactionUser.color
                                                : (selectedReaction ? selectedReaction.color : 'bg-white text-gray-700')
                                                } py-3 md:py-3.5 lg:py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2`">
                                            <span v-if="reactionUser && !selectedReaction && reactionUser?.emoji"
                                                class="animate-pulse">
                                                {{ reactionUser?.emoji }}
                                            </span>
                                            <span v-else-if="selectedReaction?.emoji"
                                                :class="selectedReaction.animation">
                                                {{ selectedReaction?.emoji }}
                                            </span>
                                            <Icon v-else name="mdi:heart-outline" class="w-5 h-5 lg:w-4 lg:h-4" />
                                            {{ counterReaction }}
                                            {{ (reactionUser && !selectedReaction) ? reactionUser.label :
                                                (selectedReaction
                                                    ? selectedReaction.label : 'J’aime') }}
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
                                    <button @click="openStatsBook('comments')"
                                        class="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800 transition-colors flex items-center justify-center gap-2">
                                        <Icon name="mdi:comment" class="w-5 h-5 lg:w-4 lg:h-4" />
                                        {{ book.book_comments }}
                                    </button>
                                </div>
                                <div class="text-xs text-slate-500 dark:text-slate-200 text-center mt-2 cursor-pointer hover:underline"
                                    @click="openStatsBook('likes')">
                                    <p v-if="!reactionUser">
                                        {{ reactionsState.list.length > 0
                                            ? `${reactionsState.list[0].emoji} ${formatNumber(book.book_reactions)}
                                        personne${book.book_reactions > 1 ? 's ont' : ' a'} réagi à ce livre`
                                            : ''
                                        }}
                                    </p>
                                    <p v-else>
                                        {{ reactionsState.list.length > 0
                                            ? `${reactionUser.emoji} vous et ${formatNumber(book.book_reactions - 1)}
                                        autre${book.book_reactions - 1 > 1 ? 's' : ''} personne${book.book_reactions > 2 ? 's' : ''} avez réagi à ce livre`
                                            : ''
                                        }}
                                    </p>
                                </div>
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
                                        class="p-1 text-[8px] font-bold flex items-center justify-center w-6 h-6 rounded-full"
                                        :style="`background-color: ${book.user.code_color}`">
                                        {{ book.user.name.charAt(0).toUpperCase() }}
                                    </span>
                                    <p class="text-slate-900 font-medium dark:text-white flex hover:underline truncate">
                                        {{ book.user.name }}
                                    </p>
                                </nuxt-link>

                                <div class="hidden md:flex items-center gap-1 text-xs truncate">
                                    <Icon name="mdi:book-multiple" class="w-5 h-5" />
                                    <span>{{ formatNumber(book.chapters.length) }} Chapitre{{ book.chapters.length > 1 ? 's' : '' }}</span>
                                </div>

                                <div class="hidden md:flex items-center gap-1 text-xs truncate">
                                    <Icon name="mdi:eye" class="w-5 h-5" />
                                    <span>{{formatNumber(Number(book.total_views))}} Vue{{ Number(book.total_views) > 1 ? 's' : '' }}</span>
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
                                <h3 class="font-display font-medium text-slate-900 dark:text-white">{{
                                    formatNumber(book.chapters.length) }} chapitre(s)</h3>
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
                                                class="font-medium text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
                                                {{ chapter.title }}</p>
                                            <p class="text-xs text-slate-400 dark:text-slate-200">il y a {{
                                                formatRelativeDate(chapter.created_at) }}</p>
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
                            {{ counterReaction }}
                        </button>
                    </div>
                </div>

                <!-- CONTENT -->
                <div v-if="step === 'comments'" ref="commentsWrapper" @scroll="handleScroll"
                    class="flex-1 overflow-y-auto p-4 space-y-6">

                    <!-- COMMENT LOOP -->
                    <div v-for="commentItem in commentsState.list" :key="commentItem.id" v-if="commentsState.list.length > 0">

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
                            <textarea v-model="replyContent" id="replyInput" @input="autoResizeReply" rows="1" autofocus
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

                    <div v-else class="flex flex-col items-center justify-center text-center p-6">
                        <Icon name="mdi:comment-outline" class="w-12 h-12 text-slate-300 mb-3" />
                        <p class="text-slate-500 text-sm font-medium">Aucun commentaire disponible</p>
                        <p class="text-slate-500 text-sm">Soyez le premier à le faire !</p>
                    </div>

                    <!-- LOADING -->
                    <div v-if="commentsState.loading" class="text-center text-sm text-slate-500">
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
                            placeholder="Ajouter un commentaire..."></textarea>

                        <button v-if="!commentUuid && comment.trim().length > 0" @click="submitComment()"
                            class="bg-orange-600 text-white px-4 py-2 rounded-xl">
                            <Icon name="mdi:send" class="w-4 h-4" />
                        </button>

                        <button v-if="commentUuid && comment.trim().length > 0" @click="updateCommentLocal()"
                            class="bg-orange-600 text-white px-4 py-2 rounded-xl">
                            <Icon name="mdi:send" class="w-4 h-4" />
                        </button>
                    </div>

                    <p v-else class="flex flex-col gap-2 text-xs text-slate-500 text-center">
                        Vous devez être connecté pour commenter
                        <nuxt-link to="/login"
                            class="flex items-center justify-center gap-2 bg-primary hover:bg-slate-800 dark:bg-white dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800 dark:text-stone-700 text-white px-4 py-2 lg:py-3 rounded-full text-xs xl:text-sm font-medium transition-all shadow-sm hover:shadow-md transform active:scale-95">
                            <span>Se connecter</span>
                        </nuxt-link>
                    </p>
                </div>

                <div v-if="step === 'likes'" ref="reactionsWrapper" @scroll="handleScrollReactions"
                    class="flex-1 overflow-y-auto p-4 space-y-6">
                    <div class="flex gap-2" v-for="(reaction, index) in reactionsState.list" :key="index" v-if="reactionsState.list.length > 0">
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

                    <div v-else class="flex flex-col items-center justify-center text-center p-6">
                        <Icon name="mdi:heart-outline" class="w-12 h-12 text-slate-300 mb-3" />
                        <p class="text-slate-500 text-sm font-medium">Aucune réaction disponible</p>
                    </div>

                    <!-- LOADING -->
                    <div v-if="reactionsState.loading" class="text-center text-sm text-slate-500">
                        Chargement...
                    </div>
                </div>
            </div>
        </StatsModal>

    </div>
</template>

<style scoped>
/* 👍 Petit rebond positif */
@keyframes bounce-like {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-6px);
    }
}

/* ❤️ Battement cœur */
@keyframes heartbeat {
    0% {
        transform: scale(1);
    }

    25% {
        transform: scale(1.25);
    }

    40% {
        transform: scale(1);
    }

    60% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

/* 🔥 Flammes dynamiques */
@keyframes flame {

    0%,
    100% {
        transform: scale(1) rotate(-3deg);
    }

    50% {
        transform: scale(1.2) rotate(3deg);
    }
}

/* 🤯 Explosion mentale */
@keyframes explode {
    0% {
        transform: scale(1);
    }

    40% {
        transform: scale(1.4) rotate(-10deg);
    }

    100% {
        transform: scale(1) rotate(0);
    }
}

/* 😂 Secousse rire */
@keyframes laugh {

    0%,
    100% {
        transform: rotate(0);
    }

    25% {
        transform: rotate(-10deg);
    }

    75% {
        transform: rotate(10deg);
    }
}

/* 😮 Surprise rotation */
@keyframes surprise {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.3);
    }
}

/* 😡 Tremblement */
@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-3px);
    }

    75% {
        transform: translateX(3px);
    }
}

/* 👏 Applaudissement */
@keyframes clap {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }
}

/* 🤔 Légère rotation réfléchie */
@keyframes thinking {

    0%,
    100% {
        transform: rotate(0);
    }

    50% {
        transform: rotate(-12deg);
    }
}

/* 😭 Tremblement vertical émotion */
@keyframes cry {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-4px);
    }
}

/* 😱 Choc violent */
@keyframes shock {
    0% {
        transform: scale(1);
    }

    30% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(1);
    }
}

/* 🌟 Brillance */
@keyframes sparkle {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.3);
    }
}

/* 🥶 Frisson */
@keyframes chill {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-2px);
    }

    75% {
        transform: translateX(2px);
    }
}


/* Classes hover */
.react-like:hover {
    animation: bounce-like 0.6s ease infinite;
}

.react-love:hover {
    animation: heartbeat 0.8s ease infinite;
}

.react-fire:hover {
    animation: flame 0.6s ease infinite;
}

.react-mindblown:hover {
    animation: explode 0.7s ease infinite;
}

.react-laugh:hover {
    animation: laugh 0.5s ease infinite;
}

.react-wow:hover {
    animation: surprise 0.6s ease infinite;
}

.react-angry:hover {
    animation: shake 0.4s ease infinite;
}

.react-clap:hover {
    animation: clap 0.6s ease infinite;
}

.react-thinking:hover {
    animation: thinking 0.7s ease infinite;
}

.react-tear:hover {
    animation: cry 0.6s ease infinite;
}

.react-shock:hover {
    animation: shock 0.5s ease infinite;
}

.react-star:hover {
    animation: sparkle 0.8s ease infinite;
}

.react-goosebumps:hover {
    animation: chill 0.5s ease infinite;
}
</style>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, reactive, computed, onMounted, nextTick } from 'vue';
interface Reaction {
    id: string
    label: string
    emoji: string
    color: string
    animation: string
}

const { getBookByUuid } = booksData();
const { toConnectUser } = authenticate();
const { getCommentsByBook, getReplies, createComment, updateComment, deleteComment } = useBookComments();
const { getReactionsByBook, createReaction, createDefaultReaction, findByUserIdAndBookId } = useBookReactions();
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const counterReaction = ref<number>(0);
const back = () => {
    window.history.back()
}

// ---------- STATE ----------
const showStatsModal = ref(false);
const step = ref<'comments' | 'likes'>('comments');
const comment = ref<string>('');
const commentUuid = ref<string>('');
const commentId = ref<number>(0);
const commentReplyId = ref<number | null>(0);
const textarea = ref<HTMLTextAreaElement | null>(null);
const reactionWrapper = ref<HTMLElement | null>(null)
const replyFormId = ref<number | null>(null);
const replyContent = ref<string>('');
const sortDirection = ref<'asc' | 'desc'>('asc');
const user = ref<User | null>(null);
const book = ref<BookData | null>(null);
const reactionUser = ref<any>(null);
const showReactions = ref(false);
const selectedReaction = ref<Reaction | null>(null)
let pressTimer: NodeJS.Timeout | null = null
const isMobile = ref(false);
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
    if (book.value && user.value) {
        const res = await createDefaultReaction({ id_book: book.value.id, id_user: user.value.id, ...defaultReaction });
        counterReaction.value = res.length;
        const response = await getReactionsByBook(book.value.id, reactionsState.page);

        if (response?.data?.length) {
            reactionsState.list = response.data;
            reactionsState.total = response.total;
        }

        reactionUser.value = await findByUserIdAndBookId(user.value.id, book.value.id);
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
        if (book.value) {
            const res = await createReaction({ id_book: book.value.id, id_user: user.value.id, label: reaction.label, emoji: reaction.emoji, color: reaction.color });
            counterReaction.value = res.length;
            reactionUser.value = await findByUserIdAndBookId(user.value.id, book.value.id);
        }
    } else {
        router.push('/login');
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

// =============================
// INIT
// =============================
onMounted(async () => {
    isMobile.value = window.innerWidth < 768
    user.value = await toConnectUser();
    book.value = await getBookByUuid(`${route.params.uuid}`);

    if (book.value) {
        if (user.value) {
            reactionUser.value = await findByUserIdAndBookId(user.value.id, book.value.id);
        }
        counterReaction.value = Number(book.value.book_reactions);
        await loadComments();
        await loadReactions();
        useSeoMeta({
            title: `${book.value.title}`
        })
    }
});
</script>