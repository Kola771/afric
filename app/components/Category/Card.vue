<template>
    <article class="group cursor-pointer bg-white dark:bg-transparent dark:border dark:border-slate-200 px-3 pt-3 rounded-xl shadow-md flex gap-2" @click="openTheBooksOfTheCategory(props.category.url)">
        <div class="relative flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 mb-3 shadow-subtle group-hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5">
            <img :src="props.category.image" class="w-24 h-24 object-cover transition-transform duration-500 group-hover:scale-105" :alt="props.category.title">
            <div v-if="props.category.isNew" class="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 rounded-bl-lg text-[10px] font-bold">NOUVEAU</div>
            <div class="absolute top-2 left-2 bg-slate-900/90 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">{{ props.category.id }}</div>
        </div>
        <div class="space-y-1">
            <h3 class="font-display font-medium text-slate-900 dark:text-slate-200 text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">## {{ props.category.title }}</h3>
            <p class="line-clamp-3 text-sm text-slate-600 dark:text-slate-300" v-if="props.category?.description">{{ props.category?.description }}</p>
        </div>
    </article>
</template>  
<script lang="ts" setup>
const router = useRouter();
const props = defineProps<{
    category: Category
}>();

const openTheBooksOfTheCategory = (url: string) => {
    router.push(url);
}
</script>