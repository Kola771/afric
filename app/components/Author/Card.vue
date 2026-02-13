<template>
    <article @click="openTheAuthorDetail(props.author.url)" class="border border-slate-200 rounded-2xl flex flex-col gap-2 p-3 bg-white dark:bg-slate-800 w-full mx-auto cursor-pointer">
        <div class="flex gap-4 bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
            <div class="relative flex-shrink-0 overflow-hidden rounded-lg shadow-subtle group-hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5">
                <img :src="props.author.image" class="w-24 h-24 object-cover transition-transform duration-500 group-hover:scale-105" :alt="props.author.name">
                <div v-if="props.author.isNew" class="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 rounded-bl-lg text-[8px] font-bold">NOUVEAU</div>
                <div class="absolute top-2 left-2 bg-slate-900/90 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">{{ props.author.id }}</div>
            </div>
            <div class="flex flex-col gap-1.5">
                <div>
                    <h3 class="font-display font-medium text-slate-900 dark:text-slate-200 text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">{{ props.author.name }}</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-200 font-medium">Originaire : {{ props.author.country }}</p>
                </div>
                <p class="line-clamp-3 text-xs text-slate-600 dark:text-slate-300" v-if="props.author?.bibliography">{{ props.author?.bibliography }}</p>
            </div>
        </div>        
        <div class="grid grid-cols-3 gap-2 text-slate-500 dark:text-slate-200">
            <div class="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-center">
                <div class="text-xl font-bold text-slate-900 dark:text-white">{{ props.author.storyCount }}</div>
                <div class="text-[10px] uppercase tracking-wide font-medium">Histoires</div>
            </div>
            <div class="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-center">
                <div class="text-xl font-bold text-slate-900 dark:text-white">{{ props.author.chapterCount }}</div>
                <div class="text-[10px] uppercase tracking-wide font-medium">Chapitres</div>
            </div>
            <div class="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-center">
                <div class="text-xl font-bold text-slate-900 dark:text-white">{{ props.author.viewCount }}</div>
                <div class="text-[10px] uppercase tracking-wide font-medium">Vues</div>
            </div>
        </div>
    </article>
</template>  
<script lang="ts" setup>
const router = useRouter();
const props = defineProps<{
    author: Author
}>();

const openTheAuthorDetail = (url: string) => {
    router.push(url);
}
</script>