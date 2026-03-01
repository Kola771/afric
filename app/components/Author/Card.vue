<template>
    <article
        class="group border border-slate-200 rounded-2xl flex flex-col bg-slate-50 dark:bg-slate-800 w-full mx-auto cursor-pointer">
        <div class="flex flex-col" @click="openTheAuthorDetail(props.author.url)">
            <div class="flex flex-col gap-4 rounded-lg p-2">
                <div
                    class="relative flex-shrink-0 overflow-hidden rounded-lg shadow-subtle group-hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5">
                    <img :src="props.author.image"
                        class="w-full h-24 md:h-36 lg:h-48 group-hover:scale-105 object-cover transition-transform duration-500 group-hover:scale-105"
                        :alt="props.author.name">
                    <div
                        class="absolute top-2 left-2 bg-slate-900/90 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                        {{ props.author.id }}</div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <div>
                        <h3
                            class="font-display font-medium text-slate-900 dark:text-slate-200 text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">
                            {{ props.author.name }}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-200 font-medium">Originaire : {{
                            props.author.country }}</p>
                    </div>
                    <p class="hidden line-clamp-3 text-xs text-slate-600 dark:text-slate-300"
                        v-if="props.author?.bibliography">{{ props.author?.bibliography }}</p>
                </div>
            </div>
            <div class="flex items-center justify-center md:justify-between gap-4 px-2 pb-2">
                <span class="text-[11px] flex">
                    <span class="font-semibold text-slate-900 dark:text-slate-200">42</span> <span class="text-slate-400">
                        <Icon name="mdi:books" class="w-3 h-3" />
                    </span>
                </span>
                <span class="w-px h-3 bg-slate-200"></span>
                <span class="text-[11px] flex">
                    <span class="font-semibold text-slate-900 dark:text-slate-200">12k</span> <span class="text-slate-400">
                        <Icon name="mdi:book-open-page-variant" class="w-3 h-3" />
                    </span>
                </span>
                <span class="w-px h-3 bg-slate-200"></span>
                <span class="text-[11px] flex">
                    <span class="font-semibold text-slate-900 dark:text-slate-200">1.1k</span> <span class="text-slate-400">
                        <Icon name="mdi:eye" class="w-3 h-3" />
                    </span>
                </span>
            </div>
        </div>
        <button class="bg-primary dark:bg-transparent dark:border-t-[1px] dark:border-slate-300 text-white p-2 rounded-b-lg text-xs">Suivre</button>
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