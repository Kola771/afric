<template>
    <article class="group cursor-pointer" @click="openTheBook(props.book.uuid)">
        <div
            class="relative aspect-[2/3] overflow-hidden rounded-lg bg-slate-100 mb-3 shadow-subtle group-hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5">
            <img :src="`${config.public.apiBackendUrl}/uploads/books/${props.book?.image}`"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                :alt="props.book.title">
            <div class="absolute top-2 left-2 bg-slate-900/90 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">{{
                props.book.id }}</div>
        </div>
        <div class="space-y-1">
            <h3
                class="font-display font-medium text-slate-900 dark:text-slate-200 text-base leading-snug group-hover:text-orange-600 transition-colors flex">
                <span class="truncate">{{ props.book.title }}</span></h3>
            <!-- <p class="text-xs text-slate-500 dark:text-slate-400">{{ props.book.author }}</p> -->
            <div class="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-300 font-medium pt-1">
                <span class="flex items-center gap-0.5">
                    <Icon name="mdi:heart" class="text-red-600 dark:text-red-500" />
                    {{ 0 }} k
                </span>
                <!-- <span v-if="props.book.category">• {{ props.book.category }}</span> -->
                <span v-if="props.book.status"
                    class="bg-white text-stone-600 py-1 px-2 rounded-xl dark:bg-transparent dark:text-slate-200 dark:border dark:border-slate-200">•
                    {{ status(props.book.status) }}</span>
            </div>
        </div>
    </article>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
const router = useRouter();
const props = defineProps<{
    book: BookData
}>();

const status = (status: string) => {
    switch (status.toLocaleLowerCase()) {
        case "ongoing":
            return "En cours"
        case "completed":
            return "Terminé"
        case "paused":
            return "Pause"
        case "draft":
            return "Brouillon"
        case "inactive":
            return "Inactif"
        default:
            return "Brouillon"
    }
}

const openTheBook = (url: string) => {
    router.push(`/books/${url}`);
}
</script>