<template>
    <article
        class="relative group cursor-pointer bg-white dark:bg-transparent dark:border dark:border-slate-200 rounded-xl shadow-md gap-2 h-24 lg:h-28"
        @click="openTheBooksOfTheCategory(props.category.uuid)">

        <div
            class="relative h-24 lg:h-28 w-full flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 shadow-subtle group-hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5">
            <img :src="props.category.image?.includes('https') ? props.category.image : `${config.public.apiBackendUrl}/uploads/categories/${props.category.image}`"
                class="w-full h-full text-xs object-cover transition-transform duration-500 group-hover:scale-105"
                :alt="props.category.name">

            <div class="absolute top-2 left-2 bg-slate-900/90 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                {{ props.category.id }}
            </div>
        </div>

        <div class="absolute inset-0 flex items-center justify-center">
            <h3
                class="font-display font-bold text-white text-sm px-4 flex leading-snug group-hover:text-orange-600 transition-colors">
                {{ props.category.name }}
            </h3>
        </div>

        <!-- 👇 correction ici -->
        <!-- <div class="space-y-1 flex-1 min-w-0">
        <h3 class="font-display font-medium text-slate-900 dark:text-slate-200 text-base leading-snug group-hover:text-orange-600 transition-colors">
            <span class="truncate block">
                {{ props.category.name }}
            </span>
        </h3>

        <p class="line-clamp-3 text-[13px] text-slate-600 dark:text-slate-300"
           v-if="props.category?.description">
            {{ props.category?.description }}
        </p>
    </div> -->
    </article>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
const router = useRouter();
const props = defineProps<{
    category: Category
}>();

const openTheBooksOfTheCategory = (uuid: string) => {
    router.push(`/categories/${uuid}`);
}
</script>