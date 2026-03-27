<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b pt-12 pb-12" v-if="profil && user">
        <section class="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-100 lg:gap-10">
            <div class="flex flex-col gap-4">
                <div
                    class="flex flex-col gap-4 lg:gap-1 md:items-center md:justify-between bg-slate-50 dark:bg-slate-800 border dark:border-slate-400 px-3 py-4 lg:p-3 rounded-lg">
                    <div class="flex flex-col gap-1 items-start md:w-full">
                        <button @click="back"
                            class="p-1 border rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                            <Icon name="mdi:arrow-left" class="w-5 h-5" />
                        </button>
                        <p class="text-[14px] text-slate-500 dark:text-slate-200">
                            Par défaut, toute histoire créée a pour statut
                            <span class="font-medium text-orange-600 dark:text-orange-500">Brouillon</span>
                            et n'est pas accessible aux lecteurs en ligne.
                        </p>
                    </div>
                    <div class="w-full lg:flex lg:justify-end">
                        <nuxt-link to="/my-stories/create_book"
                            class="flex items-center gap-2 bg-primary text-white dark:border hover:bg-slate-700 hover:ease-in-out hover:duration-300 rounded-lg py-3 text-[13px] justify-center border-slate-200 border md:px-6 md:py-2.5">
                            <Icon name="mdi:plus" class="w-5 h-5" />
                            Ajouter une histoire
                        </nuxt-link>
                    </div>
                </div>

                <div
                    class="flex flex-col gap-4 bg-slate-50 dark:bg-slate-800 border dark:border-slate-400 px-3 py-4 lg:p-4 rounded-lg">
                    <div class="flex flex-col gap-1">
                        <h3
                            class="text-lg font-semibold text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                            Objectifs & Certifications <span v-if="profil && profil?.rank" :class="[
                                'text-[11px] w-fit px-2 rounded-md flex items-center gap-1',
                                profil?.rank === 'certifié'
                                    ? 'bg-orange-50 text-orange-700 border border-orange-100'
                                    : profil?.rank === 'best'
                                        ? 'bg-purple-50 text-purple-700 border border-purple-100'
                                        : profil?.rank === 'top'
                                            ? 'bg-green-50 text-green-700 border border-green-100'
                                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                            ]">
                                <Icon name="mdi:star-outline" size="14" />
                                {{ profil?.rank }}
                            </span>
                        </h3>
                        <p class="text-[14px] text-slate-500 dark:text-slate-300">
                            Débloquez des fonctionnalités et gagnez en visibilité en atteignant certains paliers. <br />
                            Vos
                            statistiques sont basées uniquement sur les histoires dont le statut est soit en cours, en
                            pause ou terminé.
                        </p>
                    </div>
                    <!-- TOGGLE ITEM -->
                    <details class="group border rounded-lg p-3 cursor-pointer bg-white dark:bg-transparent">
                        <summary class="flex justify-between items-center font-medium text-slate-800 dark:text-white">
                            🎬 Mini-vidéos par chapitre
                            <span class="group-open:rotate-180 transition">
                                <Icon name="mdi:arrow-bottom" class="w-4 h-4 text-slate-700 dark:text-slate-200" />
                            </span>
                        </summary>
                        <div class="mt-3 text-[14px] text-slate-600 dark:text-slate-300 space-y-2">
                            <p>
                                Dès qu’un chapitre atteint <span class="font-semibold text-orange-600">1 000
                                    vues</span>,
                                vous pouvez ajouter une mini-vidéo immersive (30 à 40 secondes).
                            </p>
                            <p>
                                Cela permet d’augmenter l’engagement et de donner vie à vos histoires.
                            </p>
                        </div>
                    </details>
                    <!-- CERTIFICATIONS -->
                    <details class="group border rounded-lg p-3 cursor-pointer bg-white dark:bg-transparent">
                        <summary class="flex justify-between items-center font-medium text-slate-800 dark:text-white">
                            🏅 Système de certification
                            <span class="group-open:rotate-180 transition">
                                <Icon name="mdi:arrow-bottom" class="w-4 h-4 text-slate-700 dark:text-slate-200" />
                            </span>
                        </summary>
                        <div
                            class="mt-3 space-y-4 md:space-y-0 text-[14px] md:grid md:grid-cols-2 md:gap-4 text-slate-600 dark:text-slate-300">
                            <div>
                                <p class="font-semibold text-slate-900 dark:text-white">🔰 Standard</p>
                                <ul class="list-disc ml-5">
                                    <li>Statut par défaut</li>
                                    <li>Accès aux fonctionnalités de base</li>
                                </ul>
                            </div>
                            <div>
                                <p class="font-semibold text-green-600">🔥 Top</p>
                                <ul class="list-disc ml-5">
                                    <li>50 000 vues cumulées sur une ou plusieurs histoires</li>
                                    <li>+200 réactions (likes)</li>
                                    <li>+50 commentaires</li>
                                </ul>
                            </div>
                            <div>
                                <p class="font-semibold text-purple-600">💎 Best</p>
                                <ul class="list-disc ml-5">
                                    <li>350 000 vues cumulées</li>
                                    <li>+800 réactions</li>
                                    <li>+200 commentaires</li>
                                </ul>
                            </div>
                            <div>
                                <p class="font-semibold text-orange-600">👑 Certifié</p>
                                <ul class="list-disc ml-5">
                                    <li>1 000 000 vues cumulées</li>
                                    <li>+2500 réactions</li>
                                    <li>+800 commentaires</li>
                                </ul>
                            </div>
                        </div>
                    </details>
                    <!-- AVANTAGES -->
                    <details class="group border rounded-lg p-3 cursor-pointer bg-white dark:bg-transparent">
                        <summary class="flex justify-between items-center font-medium text-slate-800 dark:text-white">
                            🚀 Avantages des paliers
                            <span class="group-open:rotate-180 transition">
                                <Icon name="mdi:arrow-bottom" class="w-4 h-4 text-slate-700 dark:text-slate-200" />
                            </span>
                        </summary>
                        <div class="mt-3 text-[14px] text-slate-600 dark:text-slate-300 space-y-2">
                            <ul class="list-disc ml-5">
                                <li>Plus de visibilité sur la plateforme</li>
                                <li>Mise en avant dans les recommandations</li>
                                <li>Accès anticipé à certaines fonctionnalités</li>
                                <li>Badge de reconnaissance auprès des lecteurs</li>
                            </ul>
                        </div>
                    </details>
                    <p class="text-xs text-slate-400">
                        D'autres fonctionnalités exclusives seront débloquées avec les prochaines évolutions de la
                        plateforme.
                    </p>
                </div>

                <div class="bg-slate-50 dark:bg-slate-800 border dark:border-slate-600 rounded-xl p-4 flex flex-col gap-4"
                    v-if="progressData">
                    <!-- HEADER -->
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-sm text-slate-500 dark:text-slate-300">Votre progression</p>
                            <h3 class="text-lg font-semibold capitalize text-slate-900 dark:text-white">
                                🔥 Niveau {{ progressData.progression.currentRank }}
                            </h3>
                        </div>

                        <div class="text-right">
                            <p class="text-xs text-slate-400">Prochain objectif</p>
                            <p class="text-sm font-medium capitalize" :class="{
                                'text-green-500': progressData.progression.nextRank === 'top',
                                'text-purple-500': progressData.progression.nextRank == 'best',
                                'text-orange-500': progressData.progression.nextRank === 'certifié',
                            }">
                                {{ progressData.progression.nextRank }}
                            </p>
                        </div>
                    </div>

                    <!-- BAR -->
                    <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div class="h-full transition-all duration-500" :class="{
                            'bg-green-500': progressData.progression.nextRank === 'top',
                            'bg-purple-500': progressData.progression.nextRank == 'best',
                            'bg-orange-500': progressData.progression.nextRank === 'certifié',
                        }" :style="{ width: progressData.progression.progress + '%' }">
                        </div>
                    </div>

                    <!-- DETAILS -->
                    <div class="grid grid-cols-3 gap-2 text-center text-xs">

                        <div>
                            <p class="text-slate-400">Vues</p>
                            <p class="font-semibold text-slate-900 dark:text-white">
                                {{ progressData.stats.totalViews }} / {{ progressData.progression.target.views }}
                            </p>
                        </div>

                        <div>
                            <p class="text-slate-400">Réactions</p>
                            <p class="font-semibold text-slate-900 dark:text-white">
                                {{ progressData.stats.totalReactions }} / {{ progressData.progression.target.reactions
                                }}
                            </p>
                        </div>

                        <div>
                            <p class="text-slate-400">Commentaires</p>
                            <p class="font-semibold text-slate-900 dark:text-white">
                                {{ progressData.stats.totalComments }} / {{ progressData.progression.target.comments }}
                            </p>
                        </div>

                    </div>

                    <!-- MESSAGE -->
                    <p class="text-xs text-slate-500 dark:text-slate-400 text-center">
                        🔥 Tu es à {{ progress }}% du niveau {{ progressData.progression.nextRank }}
                    </p>

                </div>
            </div>

            <div class="border-t border-slate-200 mt-8 lg:mt-7 pt-6 lg:pt-5">
                <h3
                    class="font-display text-xl font-medium text-slate-900 dark:text-white flex items-center gap-1 mb-4">
                    <Icon name="mdi:book-multiple-outline" class="w-5 h-5" /> Mes histoires
                </h3>
                <div
                    class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-400 shadow-sm mb-4">
                    <!-- Tabs -->
                    <div class="flex bg-slate-100 dark:bg-transparent p-1 rounded-lg overflow-x-auto max-w-full custom">
                        <button v-for="tab in ['all', 'draft', 'completed', 'ongoing', 'paused', 'inactive']" :key="tab"
                            @click="setStatusFilter(tab)" :class="[
                                'px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all',
                                selectedStatus === tab
                                    ? 'bg-white dark:bg-slate-50 text-slate-900 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-200'
                            ]">
                            {{ tab === 'all' ? 'Tous' : status(tab) }}
                        </button>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <div class="relative flex-1 md:flex-none">
                            <Icon name="solar:magnifer-linear"
                                class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input type="search" v-model="searchQuery" @keydown.enter="onSearchEnter"
                                placeholder="Rechercher une histoire..."
                                class="h-8 pl-8 pr-3 dark:bg-transparent w-full md:w-48 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors">
                        </div>
                        <button @click="toggleSort('title')"
                            class="h-8 px-3 rounded-lg border border-slate-200 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors">
                            <Icon :name="sortKey === 'title'
                                ? sortDirection === 'asc'
                                    ? 'solar:arrow-up-linear'
                                    : 'solar:arrow-down-linear'
                                : 'solar:sort-vertical-linear'
                                " class="w-5 h-5 dark:text-slate-200" />
                            <span class="text-xs font-medium hidden sm:inline">Trier</span>
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    <!-- Skeleton -->
                    <template v-if="loadingSkeleton">
                        <MyStoryCardSkeleton v-for="i in 4" :key="i" />
                    </template>
                    <template v-else>
                        <div class="flex flex-col justify-between gap-1 rounded shadow-sm hover:shadow-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-400 hover:border-slate-300 transition-all group-hover:scale-105 hover:shadow-sm"
                            v-for="(book, index) in sortedBooks" ref="bookRefs">
                            <nuxt-link :key="index" :to="`/books/${book.uuid}`" class="group flex flex-col">
                                <img :src="`${config.public.apiBackendUrl}/uploads/books/${book?.image}`"
                                    class="w-full h-40 md:h-36 lg:h-40 rounded-t object-cover transition-transform duration-500"
                                    :alt="book.title">
                                <div class="px-2.5 pt-2 flex flex-col gap-1">
                                    <p
                                        class="font-medium text-slate-900 dark:text-white group-hover:text-orange-600 flex transition-colors">
                                        <span class="truncate">{{ book.title }}</span>
                                    </p>
                                    <p class="line-clamp-2 text-xs text-slate-600 dark:text-slate-300 mb-2"
                                        v-html="book.description"></p>
                                    <p
                                        class="flex flex-wrap items-center gap-1 text-[10px] font-medium text-orange-600">
                                        <span v-for="category in book.book_categories"
                                            class="bg-orange-50 border border-orange-100/50 text-orange-600 font-medium animate-fade-in-up px-2 py-1 rounded">{{
                                                category.name }}</span>
                                    </p>
                                    <p
                                        class="flex flex-wrap items-center gap-3 my-1 text-[10px] font-medium text-orange-600">
                                        <span
                                            :class="`${book.status === 'inactive' ? 'text-red-600 bg-red-50 dark:text-red-600' : (book.status === 'completed' ? 'text-green-600 dark:text-green-500 bg-green-50' : (book.status === 'ongoing' ? 'text-blue-600 dark:text-blue-500 bg-blue-50' : 'bg-slate-100 text-slate-500'))} px-2 py-1 rounded`">{{
                                                status(book.status)
                                            }}</span>
                                    </p>
                                </div>
                            </nuxt-link>
                            <div
                                class="flex justify-between items-center gap-2 px-2.5 py-2 w-full text-[11px] border-t-[1px] dark:text-slate-200 border-slate-200 dark:border-slate-500">
                                <nuxt-link :to="`/my-stories/${book.uuid}/edit_book`"
                                    class="flex items-center gap-1 justify-center gap-1 group-hover:translate-x-1 transition-transform">
                                    <Icon name="mdi:pencil" class="w-3 h-3" />
                                    Modifier
                                </nuxt-link>
                                <nuxt-link :to="`/my-stories/${book.uuid}`"
                                    class="flex items-center gap-1 justify-center gap-1 group-hover:translate-x-1 transition-transform">
                                    <Icon name="mdi:book-open-variant-outline" class="w-3 h-3" />
                                    Chapitres
                                </nuxt-link>
                                <button @click="openStats(book, 'comments')"
                                    class="flex items-center gap-1 justify-center gap-1 group-hover:translate-x-1 transition-transform">
                                    <Icon name="mdi:graph" class="w-3 h-3" />
                                    Stats
                                </button>
                                <button @click="toggleDeleteModal(book)"
                                    class="flex items-center gap-1 justify-center text-red-500 gap-1 group-hover:translate-x-1 transition-transform">
                                    <Icon name="mdi:delete" class="w-3 h-3" />
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- Message vide -->
                <div v-if="!loading && !loadingSkeleton && sortedBooks.length === 0"
                    class="flex flex-col items-center justify-center py-16 text-center">
                    <Icon name="mdi:book-off-outline" class="w-12 h-12 text-slate-300 mb-3" />

                    <p class="text-slate-500 text-sm font-medium">
                        Aucun livre trouvé
                    </p>

                    <p class="text-xs text-slate-400 mt-1">
                        Essayez de modifier votre recherche ou vos filtres.
                    </p>
                </div>
                <LoadersFirst v-if="loading && books.length > 0" />
            </div>
        </section>

        <MyStoryDeleteBook @close-delete-modal="showDeleteModal = false" @close-and-load="closeDeleteModal" :book="book"
            :showDeleteModal="showDeleteModal" v-if="showDeleteModal && book" />

        <!-- STATS MODAL -->
        <StatsModal :show="showStatsModal" @close="closeStats" v-if="book">
            <div class="flex flex-col h-full w-full">

                <!-- HEADER -->
                <div
                    class="flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800 z-10 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <h3 class="text-lg font-medium text-slate-900 dark:text-white truncate">
                        {{ book?.title }}
                    </h3>

                    <div class="text-xs flex items-center gap-4 dark:text-white">
                        <button @click="openStats(book, 'comments')"
                            :class="step === 'comments' ? 'border-orange-600' : 'border-transparent'"
                            class="border-b-2 pb-1 flex items-center gap-2">
                            <Icon name="mdi:comment-multiple" class="w-4 h-4" />
                            {{ book.book_comments }}
                        </button>

                        <button @click="openStats(book, 'likes')"
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
                                class="w-full border border-slate-200 dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-lg p-2 resize-none outline-none"
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
                            class="flex-1 border border-slate-200 dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl px-4 py-2 resize-none outline-none"
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
</template>

<style>
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
useSeoMeta({
    title: `Mes créations`,
});
const config = useRuntimeConfig();
const { findAllPaginatedAuthor } = booksData();
const { toConnectUser } = authenticate();
const { getProfile, getAuthorRankProgress } = usersData();
const { getCommentsByBook, getReplies, createComment, updateComment, deleteComment } = useBookComments();
const { getReactionsByBook } = useBookReactions();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const books = ref<BookData[]>([]);
const book = ref<BookData | null>(null);
const progressData = ref<Progression | null>(null);
const page = ref(1);
const limit = ref(25); // 25 livres par page
const totalPages = ref<number>(1); // nombre total de pages
const loading = ref(false); // pour éviter les doubles requêtes
const loadingSkeleton = ref<boolean>(true);
const lastBook = ref<HTMLElement | null>(null)
const showDeleteModal = ref(false);
const router = useRouter();
const bookRefs = ref<HTMLElement[]>([]);
const observer = ref<IntersectionObserver | null>(null);
const selectedStatus = ref<string>('all'); // Tous par défaut
const searchQuery = ref(''); // ce que l'utilisateur tape
const searchTerm = ref('');  // utilisé pour filtrer
type SortDirection = 'asc' | 'desc' | null;
const sortKey = ref<keyof BookData | null>(null);
const sortDirection = ref<SortDirection>(null);
const showStatsModal = ref(false)
const currentBookStats = ref<BookData | null>(null)
const step = ref<'comments' | 'likes'>('comments');
const comment = ref<string>('');
const commentUuid = ref<string>('');
const commentId = ref<number>(0);
const commentReplyId = ref<number | null>(0);
const textarea = ref<HTMLTextAreaElement | null>(null);
const reactionWrapper = ref<HTMLElement | null>(null)
const replyFormId = ref<number | null>(null);
const replyContent = ref<string>('');
const counterReaction = ref<number>(0);

const progress = computed(() => {
    if (!progressData.value) return 100

    const v = Math.min(progressData.value.stats.totalViews / progressData.value.progression.target.views, 1)
    const r = Math.min(progressData.value.stats.totalReactions / progressData.value.progression.target.reactions, 1)
    const c = Math.min(progressData.value.stats.totalComments / progressData.value.progression.target.comments, 1)

    return Math.round(((v + r + c) / 3) * 100)
})

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

const openStats = async (b: BookData, show: 'comments' | 'likes') => {
    step.value = show;
    currentBookStats.value = b
    book.value = b;
    showStatsModal.value = true
    counterReaction.value = Number(book.value.book_reactions);
    if (show === "comments") {
        commentsState.list = [];
        commentsState.page = 1;
        commentsState.total = 0;
        commentsState.loading = false;
        commentsState.replies = {};
        await loadComments();
    } else {
        reactionsState.list = [];
        reactionsState.page = 1;
        reactionsState.total = 0;
        reactionsState.loading = false;
        await loadReactions();
    }
}

const closeStats = () => {
    showStatsModal.value = false
    currentBookStats.value = null
}

// Détecter Enter
const onSearchEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        searchTerm.value = searchQuery.value;
    }
};

const toggleSort = (key: keyof BookData) => {
    if (sortKey.value === key) {
        sortDirection.value =
            sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortDirection.value = 'asc';
    }
};

const sortedBooks = computed(() => {
    if (!sortKey.value || !sortDirection.value) {
        return filteredBooks.value;
    }

    return [...filteredBooks.value].sort((a, b) => {
        const valA = a[sortKey.value!];
        const valB = b[sortKey.value!];

        if (valA == null) return 1;
        if (valB == null) return -1;

        // 🔥 Gestion des dates
        if (valA instanceof Date && valB instanceof Date) {
            return sortDirection.value === 'asc'
                ? valA.getTime() - valB.getTime()
                : valB.getTime() - valA.getTime();
        }

        // 🔢 Numbers
        if (typeof valA === 'number' && typeof valB === 'number') {
            return sortDirection.value === 'asc'
                ? valA - valB
                : valB - valA;
        }

        // 🔤 Strings
        return sortDirection.value === 'asc'
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });
});


// Watch pour vider le champ
watch(searchQuery, (newVal) => {
    if (newVal === '') {
        searchTerm.value = ''; // déclenche le filtrage complet
    }
});

// Filtrage combiné avec statut + recherche
const filteredBooks = computed(() => {
    return books.value.filter((book) => {
        const matchesStatus =
            selectedStatus.value === 'all' ||
            book.status.toLowerCase() === selectedStatus.value.toLowerCase();

        const matchesSearch =
            !searchTerm.value ||
            book.title.toLowerCase().includes(searchTerm.value.toLowerCase());

        return matchesStatus && matchesSearch;
    });
});

// Fonction pour changer le filtre de statut
const setStatusFilter = (status: string) => {
    selectedStatus.value = status;
};

const status = (status: string) => {
    switch (status.toLocaleLowerCase()) {
        case "ongoing":
            return "En cours"
        case "completed":
            return "Terminée"
        case "paused":
            return "Pause"
        case "draft":
            return "Brouillon"
        case "inactive":
            return "Inactive"
        default:
            return "Brouillon"
    }
}

const toggleDeleteModal = (b: BookData) => {
    book.value = b;
    showDeleteModal.value = !showDeleteModal.value
}

const closeDeleteModal = async () => {
    if (user.value) {
        const { data, totalPages: tp } = await findAllPaginatedAuthor(page.value, limit.value, user.value?.id);
        books.value = data;
        totalPages.value = tp;
    }
}

const back = () => {
    router.back();
}

const onLoad = async () => {
    loadingSkeleton.value = true;
    user.value = await toConnectUser();
    profil.value = await getProfile();
    if (user.value && profil.value) {
        progressData.value = await getAuthorRankProgress(`${profil.value.uuid}`);
        if (profil.value && profil.value.status === 'inactif') {
            router.push("/authorization");
        }
        if (authorizeRoleUser(`${profil.value.role.toLocaleLowerCase()}`)) {
            const { data, totalPages: tp } = await findAllPaginatedAuthor(page.value, limit.value, user.value?.id);
            books.value = data;
            totalPages.value = tp;
            loadingSkeleton.value = false;
        } else {
            router.push("/");
        }
    } else {
        router.push("/login");
    }
}

const loadNextPage = async () => {
    if (loading.value) return; // déjà en cours
    if (page.value > totalPages.value) return; // pas de page suivante

    loading.value = true;
    try {
        page.value++;
        if (user.value) {
            const { data, totalPages: tp } = await findAllPaginatedAuthor(page.value, limit.value, user.value?.id);
            books.value.push(...data); // ajouter à la liste existante
            totalPages.value = tp;
        }
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const createObserver = () => {
    if (!lastBook.value) return

    // On détruit l'ancien observer si déjà créé
    if (observer.value) observer.value.disconnect()

    observer.value = new IntersectionObserver(
        (entries) => {
            const entry = entries[0]
            if (entry?.isIntersecting) {
                loadNextPage()
                if (observer.value && entry.target) observer.value.unobserve(entry.target)
            }
        },
        { root: null, rootMargin: '0px', threshold: 1.0 }
    )

    observer.value.observe(lastBook.value)
}

watchEffect(() => {
    // récupérer le dernier élément visible
    const last = bookRefs.value[bookRefs.value.length - 1];
    if (last) lastBook.value = last;
});

watch(
    () => books.value.length,
    async () => {
        await nextTick() // attendre que le DOM se mette à jour
        const last = bookRefs.value[bookRefs.value.length - 1]
        if (last) {
            lastBook.value = last
            createObserver()
        }
    }
)

onMounted(async () => {
    await onLoad();
});

onUnmounted(() => {
    if (observer.value && lastBook.value) {
        observer.value.unobserve(lastBook.value)
    }
});
</script>