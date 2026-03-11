<template>
    <div>
        <section class="mb-2 fade-in" v-if="book && !loading">
            <div class="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div class="max-w-2xl">
                    <div
                        class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-gray-200 shadow-subtle mb-8">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span class="text-[11px] font-medium text-gray-600 tracking-tight">Catégorie : {{
                            book.book_categories[0]?.name }}</span>
                    </div>
                    <h2
                        class="text-5xl sm:text-6xl font-semibold tracking-tighter text-gray-950 dark:text-white leading-[1.1] mb-6">
                        {{ book.title }}
                    </h2>
                    <p class="text-md text-gray-500 dark:text-slate-300 leading-relaxed max-w-md mb-4 line-clamp-4 lg:line-clamp-3 tracking-tight"
                        v-html="book.description"></p>
                    <div class="flex items-center gap-2 text-sm mb-4">
                        <img v-if="book.user?.photo"
                            :src="`${config.public.apiBackendUrl}/uploads/users/${book.user?.photo}`" alt="Profil"
                            class="w-6 h-6 border-orange-600 border-2 dark:border-orange-500 rounded-full" />
                        <span v-if="!book.user?.photo"
                            class="p-1 text-[8px] flex items-center justify-center w-6 h-6 rounded-full font-medium"
                            :style="`background-color: ${book.user?.code_color}`">
                            {{ book.user?.name.split(" ").length > 1 ?
                                `${book.user?.name.charAt(0).toUpperCase() +
                                book.user?.name.split(" ")[1]?.charAt(0).toUpperCase()}` :
                                book.user?.name.charAt(0).toUpperCase() }}
                        </span>
                        <nuxt-link :to="`/authors/${book.user.uuid}`" class="flex hover:underline dark:text-slate-200">
                            <span class="truncate">{{
                                book.user?.name
                            }}</span>
                        </nuxt-link>
                    </div>
                    <div class="flex items-center gap-3 text-xs lg:text-sm">
                        <nuxt-link :to="`/books/${book.uuid}/chapter/${book.chapters[0].uuid}`"
                            class="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 dark:shadow-slate-800 dark:border-[1px] dark:border-gray-600">
                            <span class="md:hidden">Commencer</span>
                            <span class="hidden md:block">Commencer la lecture</span>
                            <Icon name="mdi:arrow-right" class="w-4 h-4" />
                        </nuxt-link>
                        <nuxt-link :to="`/books/${book.uuid}`"
                            class="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-all">
                            <Icon name="mdi:book-multiple" class="w-4 h-4" />
                            <span class="lg:hidden">Les chapitres</span>
                            <span class="hidden lg:block">Voir tous les chapitres</span>
                        </nuxt-link>
                    </div>
                </div>

                <!-- Hero Visual -->
                <div
                    class="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-card">
                    <div class="absolute inset-0 bg-gradient-to-tr from-gray-900/10 to-transparent z-10"></div>
                    <img :src="`${config.public.apiBackendUrl}/uploads/books/${book?.image}`"
                        class="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
                        alt="Hero">
                    <div class="absolute bottom-2 md:bottom-6 left-2 md:left-6 z-10">
                        <div
                            class="bg-white/90 backdrop-blur border border-white/20 p-4 rounded-lg shadow-lg max-w-xs md:max-w-full">
                            <p class="text-xs text-gray-500">{{ (book.chapters[0].title.toLowerCase()).includes("chapitre") ? '' : 'Chapitre :' }} <strong
                                    class="animate-pulse text-orange-600 dark:text-orange-500">{{ book.chapters[0].title
                                    }}</strong> • Lu par {{ formatNumber(book.chapters[0].readsCount) }} personnes</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section v-if="loading" class="mb-2 animate-pulse">
            <div class="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div class="max-w-2xl space-y-6">
                    <div
                        class="h-6 w-40 bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700 rounded-full">
                    </div>
                    <div class="space-y-3">
                        <div
                            class="h-12 bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700 rounded w-3/4">
                        </div>
                        <div
                            class="h-12 bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700 rounded w-1/2">
                        </div>
                    </div>
                    <div class="space-y-2">
                        <div
                            class="h-4 bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700 rounded w-full">
                        </div>
                        <div
                            class="h-4 bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700 rounded w-5/6">
                        </div>
                        <div
                            class="h-4 bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700 rounded w-4/6">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 pt-4">
                        <div
                            class="h-12 bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700 rounded-xl">
                        </div>
                        <div
                            class="h-12 bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700 rounded-xl">
                        </div>
                    </div>
                </div>
                <div
                    class="aspect-[4/3] lg:h-[500px] bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700 rounded-xl">
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const { findRandom } = booksData();
const loading = ref<boolean>(true);
const book = ref<BookData | null>(null);

const onLoad = async () => {
    book.value = await findRandom();
    loading.value = false
}

onMounted(async () => {
    await onLoad();
})
</script>