<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b pt-12 pb-12" v-if="profil && user">
        <section class="max-w-7xl mx-auto px-6 pt-10 md:pt-12 border-t border-slate-100 lg:gap-10">
            <div class="flex flex-col gap-4">
                <div class="">
                    <button @click="back"
                        class="p-1 lg:p-2 border rounded-lg flex items-center justify-center gap-1 text-xs hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <Icon name="mdi:arrow-left" class="w-5 h-5 lg:w-4 lg:h-4" /> Retour
                    </button>
                </div>
                <div
                    class="flex flex-col gap-4 lg:gap-1 bg-slate-50 dark:bg-slate-800 border dark:border-slate-400 px-3 py-4 lg:p-3 rounded-lg">
                    <p class="text-[14px] text-slate-500 dark:text-slate-200">
                        Par défaut, toute histoire créée a pour statut
                        <span class="font-medium text-orange-600 dark:text-orange-500">Brouillon</span>
                        et n'est pas accessible aux lecteurs en ligne.
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div class="flex flex-col gap-4 bg-slate-50 dark:bg-slate-800 border dark:border-slate-400 px-3 py-4 lg:p-4 rounded-lg cursor-pointer"
                        @click="$router.push('/settings/goals')">
                        <div class="flex items-center justify-between gap-1">
                            <h3
                                class="text-[16px] font-semibold text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                                <Icon name="mdi:target" class="w-4 h-4" /> Objectifs & Certifications <span
                                    v-if="profil && profil?.rank" :class="[
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
                            <span class="flex items-center gap-2 dark:text-slate-200">
                                <span class="hidden md:block font-medium text-[13px]">Accéder</span>
                                <Icon name="mdi:arrow-right" size="20" />
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4 bg-slate-50 dark:bg-slate-800 border dark:border-slate-400 px-3 py-4 lg:p-4 rounded-lg cursor-pointer"
                        @click="$router.push('/my-stories/books-pricing')">
                        <div class="flex items-center justify-between gap-1">
                            <h3
                                class="text-[16px] font-semibold text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                                <Icon name="mdi:money" class="w-4 h-4 text-yellow-600 dark:text-yellow-400" /> Abonnements et prix des livres
                            </h3>
                            <span class="flex items-center gap-2 dark:text-slate-200">
                                <span class="hidden md:block font-medium text-[13px]">Accéder</span>
                                <Icon name="mdi:arrow-right" size="20" />
                            </span>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-50 dark:bg-slate-800 border dark:border-slate-600 rounded-xl p-4 flex flex-col gap-3"
                    v-if="progressData">
                    <!-- HEADER -->
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-[16px] font-semibold capitalize text-slate-900 dark:text-white">
                                🔥 Niveau {{ progressData.progression.currentRank }} <span
                                    class="text-orange-600 dark:text-orange-700">{{ progressData.progression.progress
                                    }}%</span>
                            </h3>
                        </div>

                        <div class="text-right">
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
                    <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1 overflow-hidden">
                        <div class="h-full transition-all duration-500" :class="{
                            'bg-green-500': progressData.progression.nextRank === 'top',
                            'bg-purple-500': progressData.progression.nextRank == 'best',
                            'bg-orange-500': progressData.progression.nextRank === 'certifié',
                        }" :style="{ width: progressData.progression.progress + '%' }">
                        </div>
                    </div>

                    <!-- DETAILS -->
                    <div class="flex items-center gap-2 text-center text-xs">

                        <div class="flex items-center gap-1">
                            <Icon name="mdi:eye" class="w-4 h-4 dark:text-white" />
                            <p class="font-semibold text-slate-900 dark:text-white">
                                {{ progressData.stats.totalViews }} / {{ progressData.progression.target.views }}
                            </p>
                        </div>

                        <div class="flex items-center gap-1">
                            <Icon name="mdi:heart" class="w-4 h-4 dark:text-white" />
                            <p class="font-semibold text-slate-900 dark:text-white">
                                {{ progressData.stats.totalReactions }} / {{ progressData.progression.target.reactions
                                }}
                            </p>
                        </div>

                        <div class="flex items-center gap-1">
                            <Icon name="mdi:comment" class="w-4 h-4 dark:text-white" />
                            <p class="font-semibold text-slate-900 dark:text-white">
                                {{ progressData.stats.totalComments }} / {{ progressData.progression.target.comments }}
                            </p>
                        </div>

                    </div>

                </div>
            </div>

            <div class="border-t border-slate-200 mt-8 lg:mt-7 pt-6 lg:pt-5">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-display text-xl font-medium text-slate-900 dark:text-white flex items-center gap-1">
                        <Icon name="mdi:book-multiple-outline" class="w-5 h-5" /> Mes histoires
                    </h3>
                    <nuxt-link to="/my-stories/create_book"
                        class="flex items-center gap-2 bg-primary text-white dark:border hover:bg-slate-700 hover:ease-in-out hover:duration-300 rounded-lg py-2 text-[13px] justify-center border-slate-200 border px-4 md:px-6 md:py-2.5">
                        <Icon name="mdi:plus" class="w-5 h-5" />
                        <span class="hidden md:block">Ajouter une histoire</span>
                    </nuxt-link>
                </div>
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

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 lg:hidden">
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
                                        v-html="DOMPurify.sanitize(book.description || '')"></p>
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
                                    <p v-if="book.status === 'inactive'"
                                        class="text-xs text-center text-red-600 font-medium bg-red-50 p-1 rounded">Ce
                                        livre sera supprimé dans quelques jours...(<strong>{{
                                            getDaysFromToday(`${book.deadline}`)?.days }}</strong>jrs).</p>
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
                                <button @click="toggleDeleteModal(book)" v-if="book.status !== 'inactive'"
                                    class="flex items-center gap-1 justify-center text-red-500 gap-1 group-hover:translate-x-1 transition-transform">
                                    <Icon name="mdi:delete" class="w-3 h-3" />
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </template>
                </div>

                <div
                    class="hidden lg:block bg-white dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div class="overflow-y-auto overflow-x-auto custom max-h-[500px]">
                        <table class="w-full text-left border-collapse">
                            <thead class="sticky top-0 z-10 bg-slate-50">
                                <tr
                                    class="text-xs text-slate-400 dark:text-slate-300 border-b border-slate-100 bg-slate-50/50 dark:bg-slate-800">
                                    <th class="font-semibold py-3 px-6 whitespace-nowrap">Titre de l'histoire</th>
                                    <th class="font-semibold py-3 px-6 whitespace-nowrap">Catégorie</th>
                                    <th class="font-semibold py-3 px-6 whitespace-nowrap">Performance</th>
                                    <th class="font-semibold py-3 px-6 whitespace-nowrap">Statut</th>
                                    <th class="font-semibold py-3 px-6 whitespace-nowrap">Deadline</th>
                                    <th class="font-semibold py-3 px-6 whitespace-nowrap">Âge autorisé</th>
                                    <th class="font-semibold py-3 px-6 whitespace-nowrap text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="sortedBookArrays.length === 0 && !loading" class="text-xs">
                                <tr class="border-b border-slate-50 whitespace-nowrap">

                                    <!-- Book -->
                                    <td class="py-3 px-6" v-for="i in 7" :key="i">
                                        Pas de données
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-if="loading" class="text-sm">
                                <tr v-for="i in 5" :key="i" class="border-b border-slate-50">

                                    <!-- Book -->
                                    <td class="py-3 px-6">
                                        <div class="flex items-center gap-3 animate-pulse">
                                            <div class="w-8 h-10 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                            <div class="h-3 w-32 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                        </div>
                                    </td>

                                    <!-- Author -->
                                    <td class="py-3 px-6">
                                        <div class="h-3 w-24 bg-slate-200 dark:bg-slate-300 rounded animate-pulse">
                                        </div>
                                    </td>

                                    <!-- Categories -->
                                    <td class="py-3 px-6 space-x-2">
                                        <div class="flex gap-2 animate-pulse">
                                            <div class="h-4 w-16 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                            <div class="h-4 w-12 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                        </div>
                                    </td>

                                    <!-- Stats -->
                                    <td class="py-3 px-6">
                                        <div class="flex items-center gap-4 animate-pulse">
                                            <div class="h-3 w-10 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                            <div class="w-px h-3 bg-slate-200 dark:bg-slate-300"></div>
                                            <div class="h-3 w-10 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                            <div class="w-px h-3 bg-slate-200 dark:bg-slate-300"></div>
                                            <div class="h-3 w-10 bg-slate-200 dark:bg-slate-300 rounded"></div>
                                        </div>
                                    </td>

                                    <!-- Status -->
                                    <td class="py-3 px-6">
                                        <div class="h-5 w-16 bg-slate-200 dark:bg-slate-300 rounded-full animate-pulse">
                                        </div>
                                    </td>

                                    <td class="py-3 px-6">
                                        <div class="h-5 w-16 bg-slate-200 dark:bg-slate-300 rounded-full animate-pulse">
                                        </div>
                                    </td>

                                    <!-- Status -->
                                    <td class="py-3 px-6">
                                        <div class="h-5 w-16 bg-slate-200 dark:bg-slate-300 rounded-full animate-pulse">
                                        </div>
                                    </td>

                                </tr>
                            </tbody>

                            <tbody v-if="!loading && sortedBookArrays.length !== 0" class="text-sm">
                                <tr class="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 text-xs"
                                    v-for="(book, index) in sortedBookArrays" :key="index">
                                    <td class="py-3 px-6">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-8 h-10 lg:h-8 flex-shrink-0 bg-slate-200 rounded object-cover overflow-hidden">
                                                <img :src="`${config.public.apiBackendUrl}/uploads/books/${book?.image}`"
                                                    class="w-full h-full object-cover opacity-80" :alt="book.title">
                                            </div>
                                            <nuxt-link
                                                :to="!['inactive', 'draft'].includes(book.status) ? `/books/${book.uuid}` : ''"
                                                :target="!['inactive', 'draft'].includes(book.status) ? `_blank` : ''"
                                                class="font-medium text-slate-900 dark:text-slate-200 group-hover:text-orange-600 transition-colors underline whitespace-nowrap">{{
                                                    book.title }}</nuxt-link>
                                        </div>
                                    </td>
                                    <td class="py-3 px-6 space-x-1 whitespace-nowrap dark:text-slate-300">
                                        <span
                                            class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                                            v-for="(category, i) in book.book_categories">
                                            {{ category?.name }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-6 whitespace-nowrap">
                                        <div class="flex items-center gap-4">
                                            <div class="text-xs">
                                                <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                                    formatNumber(book?.book_reactions)
                                                    }}</span> <span class="text-slate-400 text-[10px]">réactions
                                                </span>
                                            </div>
                                            <div class="text-xs">
                                                <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                                    formatNumber(Number(book?.total_views))
                                                    }}</span> <span class="text-slate-400 text-[10px]">vues
                                                </span>
                                            </div>
                                            <div class="w-px h-3 bg-slate-200"></div>
                                            <div class="text-xs">
                                                <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                                    formatNumber(book?.book_comments)
                                                    }}</span> <span class="text-slate-400 text-[10px]">commentaires
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-3 px-6 whitespace-nowrap">
                                        <span
                                            :class="`${book.status === 'inactive' ? 'text-red-600 bg-red-50 dark:text-red-600' : (book.status === 'completed' ? 'text-green-600 dark:text-green-500 bg-green-50' : (book.status === 'ongoing' ? 'text-blue-600 dark:text-blue-500 bg-blue-50' : 'bg-slate-100 text-slate-500'))} inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium`">
                                            <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                                            {{ status(book.status) }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-6 text-center whitespace-nowrap">
                                        <span
                                            :class="`inline-flex items-center gap-1.5 text-[10px] font-medium text-red-700 dark:text-red-500`"
                                            v-if="book.status === 'inactive'">
                                            <span :class="`w-1 h-1 rounded-full bg-red-600`"></span>
                                            {{ formatLocalDate(book.deadline || '') }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-6 text-center whitespace-nowrap dark:text-slate-300">
                                        {{ book.rating_age }}
                                    </td>
                                    <td
                                        class="py-3 px-6 text-right whitespace-nowrap flex items-center justify-end gap-2">
                                        <nuxt-link :to="`/my-stories/${book.uuid}/edit_book`"
                                            class="text-blue-600 dark:text-blue-500 hover:text-blue-700 flex items-center gap-1 justify-center transition-colors text-xs underline">
                                            <Icon name="mdi:edit" class="w-3 h-3" />
                                            Modifier</nuxt-link>
                                        <nuxt-link :to="`/my-stories/${book.uuid}`"
                                            class="flex items-center gap-1 justify-center transition-transform">
                                            <Icon name="mdi:book-open-variant-outline" class="w-3 h-3" />
                                            Chapitres
                                        </nuxt-link>
                                        <button @click="openStats(book, 'comments')"
                                            class="flex items-center gap-1 justify-center transition-transform">
                                            <Icon name="mdi:graph" class="w-3 h-3" />
                                            Stats
                                        </button>
                                        <nuxt-link :to="`/books/${book.uuid}`" target="_blank"
                                            v-if="!['draft', 'inactive'].includes(book.status)"
                                            class="text-amber-600 dark:text-amber-500 hover:text-amber-700 flex items-center gap-1 justify-center transition-colors text-xs underline">
                                            <Icon name="mdi:eye" class="w-3 h-3" />
                                            Rendu
                                            en ligne</nuxt-link>
                                        <button @click="toggleDeleteModal(book)" v-if="book.status !== 'inactive'"
                                            class="p-1 rounded-md hover:bg-slate-100 text-red-600 hover:text-red-700 transition-colors">
                                            <Icon name="mdi:trash" width="16" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="flex items-center justify-between p-4 border-t border-slate-100">
                        <span class="text-xs text-slate-500 dark:text-slate-300">{{ sortedBookArrays.length }}
                            données</span>
                        <div class="flex gap-2">
                            <button @click="prevPage" :disabled="page === 1"
                                class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                                Précédent
                            </button>
                            <button @click="nextPage" :disabled="page === totalPages"
                                class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                                Suivant
                            </button>
                        </div>
                    </div>
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
                            {{ book.book_comments }} Commentaire(s)
                        </button>

                        <button @click="openStats(book, 'likes')"
                            :class="step === 'likes' ? 'border-orange-600' : 'border-transparent'"
                            class="border-b-2 pb-1 flex items-center gap-2">
                            <Icon name="mdi:heart" class="w-4 h-4" />
                            {{ counterReaction }} Réaction(s)
                        </button>
                    </div>
                </div>

                <!-- CONTENT -->
                <div v-if="step === 'comments'" ref="commentsWrapper" @scroll="handleScroll"
                    class="flex-1 overflow-y-auto pt-4 space-y-6">

                    <!-- COMMENT LOOP -->
                    <div v-for="commentItem in commentsState.list" :key="commentItem.id"
                        v-if="commentsState.list.length > 0">

                        <!-- MAIN COMMENT -->
                        <div class="flex gap-2">

                            <!-- Avatar -->
                            <img v-if="commentItem.user.photo"
                                :src="commentItem.user.photo.includes('https') ? commentItem.user.photo : `${config.public.apiBackendUrl}/uploads/users/${commentItem.user.photo}`"
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
                                    class="mt-2">
                                    <button class="text-xs text-slate-500 dark:text-slate-200 hover:underline"
                                        @click="loadReplies(commentItem.id)">
                                        Voir {{ commentItem.replies_count }} réponses
                                    </button>
                                </div>

                            </div>
                        </div>

                        <!-- REPLIES -->
                        <div v-if="commentsState.replies[commentItem.id]" class="ml-11 mt-3 space-y-3">
                            <div v-for="reply in commentsState.replies[commentItem.id]" :key="reply.id"
                                class="flex gap-2">
                                <img v-if="reply.user.photo"
                                    :src="reply.user.photo.includes('https') ? reply.user.photo : `${config.public.apiBackendUrl}/uploads/users/${reply.user.photo}`"
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
                <div v-if="step === 'comments'" class="border-t border-slate-200 pt-4 text-xs">
                    <div v-if="user" class="flex items-end gap-2">
                        <img v-if="user.photo"
                            :src="user.photo.includes('https') ? user.photo : `${config.public.apiBackendUrl}/uploads/users/${user.photo}`"
                            class="w-8 h-8 rounded-full" />
                        <div v-else class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            :style="`background-color: ${user.code_color}`">
                            {{ user.name.charAt(0).toUpperCase() }}
                        </div>

                        <textarea ref="textarea" v-show="comment || commentId === 0" v-model="comment"
                            @input="autoResize" rows="1" id="message"
                            class="flex-1 border border-slate-200 dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200 rounded-xl px-4 py-2 resize-none outline-none"
                            :placeholder="`Commenter en tant que ${user?.pseudonym}`"></textarea>

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

                <div v-if="step === 'likes'" ref="reactionsWrapper" @scroll="handleScrollReactions"
                    class="flex-1 overflow-y-auto p-4 space-y-6">
                    <div class="flex gap-2" v-for="(reaction, index) in reactionsState.list" :key="index"
                        v-if="reactionsState.list.length > 0">
                        <div class="relative">
                            <img v-if="reaction.user.photo"
                                :src="reaction.user.photo.includes('https') ? reaction.user.photo : `${config.public.apiBackendUrl}/uploads/users/${reaction.user.photo}`"
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
    <div v-else
        class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b h-96 flex items-center justify-center">

        <div role="status">
            <svg aria-hidden="true" class="w-12 h-12 animate-spin fill-orange-600" viewBox="0 0 100 101" fill="none"
                xmlns="http://www.w3.org/2000/svg">
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
import DOMPurify from 'dompurify'
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
const booksArray = ref<BookData[]>([]);
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

const sortedBookArrays = computed(() => {
    if (!sortKey.value || !sortDirection.value) {
        return filteredBooksArray.value;
    }

    return [...filteredBooksArray.value].sort((a, b) => {
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

// Filtrage combiné avec statut + recherche
const filteredBooksArray = computed(() => {
    return booksArray.value.filter((book) => {
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
        const { data, totalPages: tp } = await findAllPaginatedAuthor(1, limit.value, user.value?.id);
        page.value = 1;
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
            booksArray.value = data;
            books.value.push(...data);
            totalPages.value = tp;
            loadingSkeleton.value = false;
        } else {
            router.push("/");
        }
    } else {
        router.push("/login");
    }
}

const nextPage = async () => {
    if (page.value >= totalPages.value) return
    page.value++
    await onLoad()
}

const prevPage = async () => {
    if (page.value <= 1) return
    page.value--
    await onLoad()
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