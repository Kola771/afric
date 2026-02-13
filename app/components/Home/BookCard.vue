<template>
    <article class="group cursor-pointer" @click="openTheBook(props.book.url)">
        <div class="relative aspect-[2/3] overflow-hidden rounded-lg bg-slate-100 mb-3 shadow-subtle group-hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5">
            <img :src="props.book.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" :alt="props.book.title">
            <div v-if="props.book.isNew" class="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 rounded-bl-lg text-[10px] font-bold">NOUVEAU</div>
            <div class="absolute top-2 left-2 bg-slate-900/90 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">{{ props.book.id }}</div>
            <button class="absolute bottom-3 right-3 p-2 bg-white/95 backdrop-blur rounded-full flex-shrink-0 flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg hover:text-orange-600">
                <Icon name="mdi:heart" class="w-5 h-5" />
            </button>
        </div>
        <div class="space-y-1">
            <h3 class="font-display font-medium text-slate-900 dark:text-slate-200 text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">{{ props.book.title }}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ props.book.author }}</p>
            <div class="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-300 font-medium pt-1">
                <span class="flex items-center gap-0.5">
                    <Icon name="mdi:heart" class="text-red-600 dark:text-red-500" />
                    {{ props.book.rating }} k</span>
                <span v-if="props.book.category">• {{ props.book.category }}</span>
                <span v-if="props.book.state" class="bg-white text-stone-600 py-1 px-2 rounded-xl dark:bg-transparent dark:text-slate-200 dark:border dark:border-slate-200">• {{ props.book.state }}</span>
            </div>
        </div>
    </article>
</template>  
<script lang="ts" setup>
const router = useRouter();
const props = defineProps<{
    book: Book
}>();

const openTheBook = (url: string) => {
    router.push(url);
}
</script>