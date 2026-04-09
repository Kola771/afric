<template>
    <div>
        <section class="bg-white dark:bg-dark py-14 md:pt-12 lg:pt-6 md:pb-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-10 text-center max-w-2xl mx-auto">
                    <h2 class="text-3xl font-display font-medium text-slate-900 dark:text-white tracking-tight">
                        Collections Curatées</h2>
                    <p class="text-slate-500 mt-2 dark:text-slate-200">Des sélections faites main par nos éditeurs pour
                        chaque humeur.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] md:h-[500px]"
                    v-if="categories.length > 0">
                    <!-- Large item -->
                    <div class="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200"
                        @click="openPageCategory(`${categories[0]?.uuid}`)">
                        <img :src="categories[0]?.image?.includes('https')
                            ? categories[0]?.image
                            : `${config.public.apiBackendUrl}/uploads/categories/${categories[0]?.image}`"
                            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-8">
                            <h3 class="text-white font-display font-medium text-3xl mb-2">{{ categories[0]?.name }}
                                <span class="flex items-center gap-1">
                                    <Icon name="mdi:eye" />
                                    {{ formatNumber(categories[0]?.total_views || 0) }}
                                </span>
                            </h3>
                            <p class="text-slate-300 text-sm max-w-xs mb-4 line-clamp-3"
                                v-html="DOMPurify.sanitize(categories[0]?.description || '')"></p>
                            <span
                                class="inline-flex items-center text-white text-sm font-medium gap-1 group-hover:gap-2 transition-all">Explorer
                                <Icon name="mdi:arrow-right" class="w-5 h-5" />
                            </span>
                        </div>
                    </div>

                    <!-- Top right -->
                    <div class="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200"
                        @click="openPageCategory(`${categories[1]?.uuid}`)">
                        <img :src="categories[1]?.image?.includes('https')
                            ? categories[1]?.image
                            : `${config.public.apiBackendUrl}/uploads/categories/${categories[1]?.image}`"
                            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <h3 class="text-white font-display font-medium text-2xl tracking-tight">{{
                                categories[1]?.name }}
                                <span class="flex items-center justify-center gap-1">
                                    <Icon name="mdi:eye" />
                                    {{ formatNumber(categories[0]?.total_views || 0) }}
                                </span>
                            </h3>
                        </div>
                    </div>

                    <!-- Bottom mid -->
                    <div class="hidden md:block relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 bg-slate-100"
                        @click="openPageCategory(`${categories[2]?.uuid}`)">
                        <div
                            class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center group-hover:bg-slate-50 transition-colors">
                            <div
                                class="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                                <Icon name="mdi:heart" class="w-6 h-6" />
                            </div>
                            <h3 class="text-slate-900 font-display font-medium text-lg">{{ categories[2]?.name }}</h3>
                            <p class="text-slate-500 text-xs mt-1">{{ formatNumber(categories[2]?.booksCount || 0)
                            }}{{ (categories[2]?.booksCount || 0) > 1 ? '+ Histoires' : ' Histoire' }} </p>
                        </div>
                    </div>

                    <!-- Bottom right -->
                    <div class="hidden md:block relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 bg-slate-900 text-white"
                        @click="openPageCategory(`${categories[3]?.uuid}`)">
                        <div
                            class="absolute top-0 right-0 p-32 bg-orange-500/20 blur-3xl rounded-full pointer-events-none">
                        </div>
                        <div class="absolute inset-0 flex flex-col justify-between p-6">
                            <Icon name="mdi:trophy-outline" class="w-6 h-6 text-orange-400" />
                            <div>
                                <h3 class="font-display font-medium text-lg mb-1">{{ categories[3]?.name }}</h3>
                                <p class="text-slate-400 text-xs truncate" v-html="DOMPurify.sanitize(categories[0]?.description || '')"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] md:h-[500px]" v-else>
                    <!-- Large item -->
                    <div
                        class="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700">
                    </div>

                    <!-- Top right -->
                    <div
                        class="md:col-span-2 relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700">
                    </div>

                    <!-- Bottom mid -->
                    <div
                        class="hidden md:block relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700">
                    </div>

                    <!-- Bottom right -->
                    <div
                        class="hidden md:block relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-300 dark:from-gray-500 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] dark:bg-slate-700">
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import DOMPurify from 'dompurify'
const config = useRuntimeConfig();
const { bestCategories } = categoriesData();
const router = useRouter();
const loading = ref<boolean>(true);
const categories = ref<Category[]>([]);

const openPageCategory = (uuid: string) => {
    router.push(`/categories/${uuid}`);
}

onMounted(async () => {
    categories.value = await bestCategories();
    loading.value = false;
})
</script>