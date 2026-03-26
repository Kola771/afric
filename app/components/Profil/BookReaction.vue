<template>
    <section>
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-display font-semibold text-slate-900 tracking-tight dark:text-white">
                Livres récemment appréciés</h2>
        </div>

        <div class="grid gap-4" v-if="bookReactions.length > 0">
            <!-- Continue Reading Card 1 -->
            <div class="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white dark:bg-transparent border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-200 cursor-pointer"
                @click="openTheChapterDetail(`/books/${book.uuid}`)" v-for="(book, index) in bookReactions"
                :key="index">
                <div class="w-full sm:w-24 h-32 sm:h-36 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img :src="`${config.public.apiBackendUrl}/uploads/books/${book.image}`"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        :alt="book.title">
                </div>
                <div class="flex flex-col justify-between py-1 flex-grow">
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <span
                                class="text-[10px] font-bold tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase">{{
                                    book.book_categories[0].name
                                }}</span>
                        </div>
                        <h3
                            class="font-display font-medium text-lg text-slate-900 dark:text-slate-200 dark:group-hover:text-orange-500 group-hover:text-orange-600 transition-colors">
                            {{ book.title }}</h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400 my-1">
                            <span :class="book?.book_reactions[0]?.color" class="p-1 rounded-full">{{ book?.book_reactions[0]?.emoji }}, votre réaction</span>
                        </p>
                        <p class="text-sm text-slate-500 dark:text-slate-400">
                            <strong>{{ formatNumber(Number(book?.total_views) || 0) }}</strong> vue{{
                                Number(book?.total_views) > 1 ? 's' : '' }}, <strong>{{
                                formatNumber(book?.book_comments || 0) }}</strong> commentaire{{
                                    book?.book_comments > 1 ? 's' : '' }}
                        </p>
                    </div>

                    <div class="mt-4 sm:mt-0">
                        <button
                            class="dark:border-slate-300 dark:border-[1px] mt-3 w-full sm:w-auto px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                            Plus de détails
                            <span
                                class="border-white flex items-center justify-center md:border md:p-0.5 rounded-full md:w-4 md:h-4">
                                <Icon name="mdi:arrow-right" class="w-5 h-5 md:w-4 md:h-4 text-white" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-6 py-4 flex flex-col items-center gap-2 mb-10" v-else>
            <Icon name="mdi:book-variant" class="w-12 h-12 text-slate-300 mb-3" />
            <p class="text-slate-500 dark:text-slate-200">Vous n'avez pas réagi à aucun livre pour le moment.</p>
        </div>
    </section>
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
const props = defineProps<{
    bookReactions: BookData[]
}>();
const config = useRuntimeConfig();
const router = useRouter();
const openTheChapterDetail = (url: string) => {
    router.push(url);
}
</script>