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
            <TransitionGroup name="feed" tag="div" v-if="loading && feed.length > 2">
                <div v-for="(item, index) in feed"
                    :key="item.type === 'category' ? `category-${index}` : `${item.type}-${item.data.uuid}`"
                    class="absolute inset-0 transition-all duration-500 flex items-end justify-center" :class="{
                        'opacity-100 z-10 translate-y-0': currentIndex === index,
                        'opacity-0 z-0 translate-y-full': currentIndex !== index
                    }">

                    <!-- 📸 IMAGE -->
                    <img v-if="item.type === 'book' && item.data.image"
                        :src="`${$config.public.apiBackendUrl}/uploads/books/${item.data.image}`"
                        class="absolute inset-0 w-full h-full object-contain" />

                    <img v-if="item.type === 'author' && item.data.photo"
                        :src="item.data.photo.includes('https') ? item.data.photo : `${$config.public.apiBackendUrl}/uploads/users/${item.data.photo}`"
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
                                <Icon name="mdi:book-open-page-variant" class="w-5 h-5 flex-shrink-0" /> {{
                                    item.data.title }}
                            </h2>

                            <p class="text-gray-300 text-sm" v-html="item.data.content.length > 1000
                                ? item.data.content.slice(0, 1000) + '...'
                                : item.data.content">
                            </p>
                            <div class="flex items-center gap-2 mt-2">
                                <p class="text-amber-500 text-xs font-medium"
                                    v-if="Number(item.data.chapter_reactions.length) > 0">{{
                                        item.data.chapter_reactions[0].emoji }}{{ item.data.chapter_reactions.length > 1 ?
                                        item.data.chapter_reactions[item.data.chapter_reactions.length - 1].emoji : '' }} {{
                                        formatNumber(Number(item.data.chapter_reactions.length)) }}
                                </p>
                                <p class="text-sky-500 text-xs font-medium flex items-center gap-1.5"
                                    v-if="Number(item.data.chapter_reads.length) > 0">
                                    <Icon name="mdi:eye" class="w-4 h-4" /> {{
                                        formatNumber(Number(item.data.chapter_reads.length)) }} vue{{
                                        Number(item.data.chapter_reads.length) > 1 ? 's' : '' }}
                                </p>

                                <p class="text-xs font-medium flex items-center gap-1.5"
                                    v-if="Number(item.data.chapter_comments.length) > 0">
                                    <Icon name="mdi:comments" class="w-3 h-3" /> {{
                                        formatNumber(Number(item.data.chapter_comments.length)) }} commentaire{{
                                        Number(item.data.chapter_comments.length) > 1 ? 's' : '' }}
                                </p>
                            </div>
                            <nuxt-link :to="`/books/${item.data.book.uuid}`"
                                class="font-medium underline text-xs mt-1">Tiré du livre : {{ item.data.book.title
                                }}</nuxt-link>
                            <button @click.stop="goToChapter(item.data.book.uuid, item.data.uuid)"
                                class="mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-lg w-[78%] md:w-auto md:px-12 bg-primary lg:bg-orange-900 font-semibold hover:bg-orange-800 transition">
                                <Icon name="mdi:book-open-page-variant" class="w-5 h-5" /> Lire la suite
                            </button>
                        </div>

                        <!-- 📚 BOOK -->
                        <div v-if="item.type === 'book'">
                            <h2 class="text-2xl md:text-4xl font-bold">
                                {{ item.data.title }}
                            </h2>
                            <p class="text-gray-300 text-sm line-clamp-6" v-html="item.data.description.length > 1000
                                ? item.data.description.slice(0, 600) + '...'
                                : item.data.description">
                            </p>
                            <div class="flex items-center gap-2 mt-2">
                                <p class="text-amber-500 text-xs font-medium"
                                    v-if="Number(item.data.book_reactions.length) > 0">{{
                                        item.data.book_reactions[0].emoji
                                    }}{{ item.data.book_reactions.length > 1 ?
                                        item.data.book_reactions[item.data.book_reactions.length - 1].emoji : '' }}
                                    {{ formatNumber(Number(item.data.book_reactions.length)) }}
                                </p>

                                <p class="text-xs font-medium flex items-center gap-1.5"
                                    v-if="Number(item.data.book_comments.length) > 0">
                                    <Icon name="mdi:comments" class="w-3 h-3" /> {{
                                        formatNumber(Number(item.data.book_comments.length)) }} commentaire{{
                                        Number(item.data.book_comments.length) > 1 ? 's' : '' }}
                                </p>
                            </div>

                            <button @click.stop="goToBook(item.data.uuid)"
                                class="mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-lg w-[78%] md:w-auto md:px-12 bg-primary lg:bg-orange-900 font-semibold hover:bg-orange-800 transition">
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

                            <p class="text-gray-400 text-sm line-clamp-6"
                                v-html="DOMPurify.sanitize(item.data.bibliography || '') || 'Auteur Afric Storyline'">
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
                            <div v-if="item.data.followers.length > 0" class="mt-1">
                                <div class="flex items-center gap-1">
                                    <img v-if="item.data.followers[item.data.followers.length - 1]?.photo"
                                        :src="item.data.followers[item.data.followers.length - 1].photo.includes('https') ? item.data.followers[item.data.followers.length - 1].photo : `${$config.public.apiBackendUrl}/uploads/users/${item.data.followers[item.data.followers.length - 1].photo}`"
                                        alt="Profil" class="w-5 h-5 rounded-full flex-shrink-0" />
                                    <span v-else
                                        class="p-2.5 text-[7px] flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                                        :style="`background-color: ${item.data.followers[item.data.followers.length - 1]?.code_color}`">
                                        {{ getInitials(item.data.followers[item.data.followers.length - 1]?.name) }}
                                    </span>
                                    <span class="text-xs">{{ item.data.followers[item.data.followers.length - 1]?.name
                                    }} le suit</span>
                                </div>
                            </div>

                            <button @click.stop="goToAuthor(item.data.uuid)"
                                class="mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-lg w-full md:w-auto md:px-12 bg-primary font-semibold lg:bg-orange-900 hover:bg-orange-800 transition">
                                <Icon name="mdi:user" class="w-5 h-5" /> Voir profil
                            </button>
                        </div>
                    </div>

                    <!-- ❤️ LIKE -->
                    <div class="absolute right-4 bottom-5 lg:bottom-10 lg:right-6 flex items-center gap-2 z-20"
                        v-if="['book', 'chapter'].includes(item.type)">
                        <button @click.stop="like(item, $event)" class="text-3xl"
                            :class="!likedItems.has(`${item.type}-${item.data.uuid}`) ? 'animate-bounce' : 'animate-pulse'">
                            <Icon
                                :name="!likedItems.has(`${item.type}-${item.data.uuid}`) ? 'solar:heart-outline' : 'solar:heart-bold'"
                                class="w-7 h-7 transition"
                                :class="likedItems.has(`${item.type}-${item.data.uuid}`) ? 'text-red-500' : 'text-white'" />
                        </button>
                        <button @click.stop="comments(item, $event)" v-if="item.type === 'book'" class="text-3xl">
                            <Icon name="mdi:comment" class="w-7 h-7 transition" />
                        </button>
                    </div>
                </div>
            </TransitionGroup>

            <!-- EMPTY STATE -->
            <div v-if="loading && feed.length < 2"
                class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">

                <div class="flex flex-col items-center gap-4">

                    <!-- ICON -->
                    <div class="bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg animate-pulse">
                        <Icon name="mdi:book-open-page-variant-outline" class="w-14 h-14 text-white" />
                    </div>

                    <!-- TITLE -->
                    <h2 class="text-xl md:text-2xl font-bold text-white">
                        Aucune histoire pour le moment
                    </h2>

                    <!-- DESCRIPTION -->
                    <p class="text-gray-300 text-sm max-w-md">
                        Les auteurs sont en train de préparer des récits incroyables ✍️🔥
                        Reviens très bientôt pour découvrir des histoires africaines uniques.
                    </p>

                    <!-- ACTION -->
                    <button @click="fetchFeed"
                        class="mt-4 px-6 py-3 bg-primary rounded-full font-semibold hover:bg-orange-800 transition flex items-center gap-2">
                        <Icon name="mdi:reload" class="w-5 h-5" />
                        Rafraîchir
                    </button>

                </div>
            </div>

            <!-- 🖥️ NAV -->
            <div class="hidden md:flex absolute right-4 top-1/2 flex-col gap-3 z-20" v-if="loading && feed.length > 2">
                <button @click="prev" :class="prevClass ? 'bg-white text-slate-900' : 'bg-white/50'" class="nav-btn" v-if="currentIndex > 0">
                    <Icon name="mdi:arrow-top" class="w-5 h-5" />
                </button>
                <button @click="next" :class="nextClass ? 'bg-white text-slate-900' : 'bg-white/50'" class="nav-btn"
                    v-if="currentIndex !== feed.length - 1">
                    <Icon name="mdi:arrow-bottom" class="w-5 h-5" />
                </button>
            </div>

            <div v-if="!loading" class="absolute inset-0 flex items-center justify-center">

                <div role="status">
                    <svg aria-hidden="true" class="w-12 h-12 animate-spin fill-orange-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>

            </div>
        </div>

        <!-- STATS MODAL -->
        <StatsModal :show="showStatsModal" @close="closeStats">
            <div class="flex flex-col h-full w-full">
                <hr class="w-14 border-2 mx-auto">

                <!-- CONTENT -->
                <div ref="commentsWrapper" @scroll="handleScroll" class="flex-1 overflow-y-auto py-4 space-y-6">

                    <!-- COMMENT LOOP -->
                    <div v-for="commentItem in commentsState.list" :key="commentItem.id"
                        v-if="commentsState.list.length > 0">

                        <!-- MAIN COMMENT -->
                        <div class="flex gap-2">

                            <!-- Avatar -->
                            <img v-if="commentItem.user.photo"
                                :src="commentItem.user.photo.includes('https') ? commentItem.user.photo : `${$config.public.apiBackendUrl}/uploads/users/${commentItem.user.photo}`"
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
                                        v-html="DOMPurify.sanitize(commentItem.content || '')"></p>
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

                        <!-- REPLIES -->
                        <div v-if="commentsState.replies[commentItem.id]" class="ml-11 mt-3 space-y-3">
                            <div v-for="reply in commentsState.replies[commentItem.id]" :key="reply.id"
                                class="flex gap-2">
                                <img v-if="reply.user.photo"
                                    :src="reply.user.photo.includes('https') ? reply.user.photo : `${$config.public.apiBackendUrl}/uploads/users/${reply.user.photo}`"
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
                                            v-html="DOMPurify.sanitize(reply.content || '')">
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
                <div class="border-t border-slate-200 pt-4 text-xs">
                    <div v-if="user" class="flex items-end gap-2">
                        <img v-if="user.photo" :src="user.photo.includes('https') ? user.photo : `${$config.public.apiBackendUrl}/uploads/users/${user.photo}`"
                            class="w-8 h-8 rounded-full" />
                        <div v-else class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            :style="`background-color: ${user.code_color}`">
                            {{ user.name.charAt(0).toUpperCase() }}
                        </div>

                        <textarea ref="textarea" v-show="comment || commentId === 0" v-model="comment"
                            @input="autoResize" rows="1" id="message"
                            class="flex-1 border border-slate-200 dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl px-4 py-2 resize-none outline-none"
                            :placeholder="`Commenter en tant que ${user?.name}`"></textarea>

                        <textarea ref="textareaRef" v-show="comment.trim() === '' && commentId !== 0"
                            v-model="replyContent" id="replyInput" @input="autoResizeReply" rows="1" autofocus
                            class="flex-1 border border-slate-200 dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl px-4 py-2 resize-none outline-none"
                            placeholder="Répondre à ce commentaire"></textarea>

                        <button v-if="!commentUuid && comment.trim().length > 0" @click="submitComment()"
                            class="bg-orange-600 text-white px-4 py-2 rounded-xl">
                            <Icon name="mdi:send" class="w-4 h-4" />
                        </button>

                        <button v-if="commentUuid && comment.trim().length > 0" @click="updateCommentLocal()"
                            class="bg-orange-600 text-white px-4 py-2 rounded-xl">
                            <Icon name="mdi:send" class="w-4 h-4" />
                        </button>

                        <button v-if="commentId !== 0 && replyContent.trim().length > 0"
                            @click="submitComment(commentId)" class="bg-orange-600 text-white px-4 py-2 rounded-xl">
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
            </div>
        </StatsModal>
    </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'
const config = useRuntimeConfig();

useSeoMeta({
    title: 'Découvrir notre fil d\'actualité',
    description: 'Explorez des histoires africaines originales écrites par des auteurs émergents et passionnés sur Afric Storyline.',

    ogTitle: 'Découvrir notre fil d\'actualité',
    ogDescription: 'Plongez dans des récits africains captivants publiés par une nouvelle génération d’auteurs talentueux.',
    ogImage: `${config.public.frontUrl}/afric.png`,
    ogUrl: `${config.public.frontUrl}`,
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'Découvrir notre fil d\'actualité',
    twitterDescription: 'Découvrez des récits africains uniques écrits par des auteurs émergents.',
    twitterImage: `${config.public.frontUrl}/afric.png`
});

definePageMeta({ layout: "not-layout" });

const { getFeed } = feedData();
const { getProfile } = usersData();
const { saveRead } = useChapterReads();
const { createDefaultReaction } = useBookReactions();
const { createDefaultReaction: createDefaultReactionChapter } = useChapterReactions();
const { getCommentsByBook, getReplies, createComment, updateComment, deleteComment } = useBookComments();
// ---------- STATE ----------
const showStatsModal = ref<boolean>(false);
const comment = ref<string>('');
const commentUuid = ref<string>('');
const commentId = ref<number>(0);
const book = ref<any>(null);
const commentReplyId = ref<number | null>(0);
const textarea = ref<HTMLTextAreaElement | null>(null);
const replyFormId = ref<number | null>(null);
const replyContent = ref<string>('');

// ---------- COMMENTS ----------
const commentsState = reactive({
    list: [] as any[],
    replies: {} as Record<number, any[]>,
    page: 1,
    total: 0,
    loading: false,
});

const router = useRouter();
const feed = ref<any[]>([]);
const user = ref<User | null>(null);
const page = ref(1);
const currentIndex = ref(0);
const showTimeHeart = ref<boolean>(false);
const prevClass = ref<boolean>(false);
const nextClass = ref<boolean>(false);
const loading = ref<boolean>(false);
const bg = ref<any>(["bg-purple-500", "bg-pink-500", "bg-sky-500", "bg-yellow-500", "bg-cyan-500", "bg-[#f50]", "bg-slate-500", "bg-teal-500", "bg-green-500", "bg-red-500"]);
let startY = 0;
let startX = 0;
const SWIPE_THRESHOLD = 60;
const viewStartTime = ref<number>(Date.now());
const watchTime = ref<Record<string, number>>({});
const likedItems = ref<Set<string>>(new Set());
const loadedIds = ref<Set<string>>(new Set());

const closeStats = () => {
    showStatsModal.value = false;
    commentId.value = 0;
    commentUuid.value = "";
    comment.value = "";
    replyContent.value = "";
    commentsState.page = 1;
    commentsState.list = [];
    commentsState.replies = {};
    commentsState.total = 0;
    commentsState.loading = false;
};

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
const toggleReplies = async (cId: number) => {
    commentId.value = cId; // ✅ d'abord on affiche
    await nextTick();      // ✅ on attend le DOM
    document.getElementById('replyInput')?.focus()
    replyFormId.value = replyFormId.value === cId ? null : cId;

    if (!commentsState.replies[cId]) {
        await loadReplies(cId);
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
    await nextTick();
    document.getElementById("message")?.focus();
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

    if (!res) return;

    const filtered: any[] = [];

    res.forEach((item: any) => {
        // 🔥 clé unique SAFE
        const key =
            item.type === 'category'
                ? `category-${item.data.map((c: any) => c.uuid).join('-')}`
                : `${item.type}-${item.data.uuid}`;

        // ❌ skip si déjà vu
        if (loadedIds.value.has(key)) return;

        loadedIds.value.add(key);
        filtered.push(item);

        // preload image
        let url = null;

        if (item.type === 'book' && item.data.image) {
            url = `${useRuntimeConfig().public.apiBackendUrl}/uploads/books/${item.data.image}`;
        }

        if (item.type === 'author' && item.data.photo) {
            url = item.data.photo.includes('https') ? item.data.photo : `${useRuntimeConfig().public.apiBackendUrl}/uploads/users/${item.data.photo}`;
        }

        if (item.type === 'category') {
            item.data.forEach((cat: any) => {
                if (cat.image) {
                    preloadImage(`${useRuntimeConfig().public.apiBackendUrl}/uploads/categories/${cat.image}`);
                }
            });
        }

        if (url) preloadImage(url);
    });

    hydrateLikes(filtered);

    // 🔥 IMPORTANT
    if (filtered.length > 0) {
        feed.value.push(...filtered);
        page.value++;
    }
    loading.value = true;
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

onMounted(async () => {
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

// 
const comments = async (item: any, e: MouseEvent) => {
    book.value = item.data;
    showStatsModal.value = true;
    await loadComments();
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
    prevClass.value = false;
    nextClass.value = true;

    // 🔥 PRELOAD avant fin
    if (currentIndex.value >= feed.value.length - 3) {
        fetchFeed(); // ⚡ pas await pour fluidité
    }

    if (currentIndex.value < feed.value.length - 1) {
        currentIndex.value++;
    }

    viewStartTime.value = Date.now();
};

const prev = async () => {
    prevClass.value = true;
    nextClass.value = false;
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
    @apply p-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/70 transition;
}

.animate-float {
    animation: floatUp 0.9s ease-out forwards;
}

.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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