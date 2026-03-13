<template>
    <div class="relative">
        <!-- Cover Image -->
        <div class="h-48 md:h-64 w-full bg-slate-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1548685913-fe6678babe8d?q=80&w=2000&auto=format&fit=crop"
                class="w-full h-full object-cover opacity-80" alt="Cover Pattern">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" v-if="user && profil">
            <div
                class="relative -mt-10 sm:-mt-20 lg:-mt-14 dark:text-white mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <!-- Avatar & Info -->
                <div :class="`flex flex-wrap items-end md:items-end gap-3 lg:gap-6`">
                    <div class="relative group">
                        <div
                            class="w-24 h-24 sm:w-40 sm:h-40 rounded-full border-[4px] border-white shadow-lg overflow-hidden bg-slate-200">
                            <img v-if="user?.photo" :src="`${config.public.apiBackendUrl}/uploads/users/${user.photo}`"
                                class="w-full h-full object-cover" alt="Profile">
                            <span v-if="!user?.photo"
                                class="p-1 text-xl lg:text-3xl font-medium text-slate-600 flex items-center justify-center w-full h-full rounded-full"
                                :style="`background-color: ${user?.code_color}`">
                                {{ user?.name.split(" ").length > 1 ? `${user?.name.charAt(0).toUpperCase() +
                                    user?.name.split(" ")[1]?.charAt(0).toUpperCase()}` :
                                    user?.name.charAt(0).toUpperCase() }}
                            </span>
                        </div>
                        <button
                            class="hidden absolute bottom-2 right-2 bg-slate-900 text-white flex items-center justify-center p-2 rounded-full shadow-md transition-all hover:scale-105">
                            <Icon name="mdi:camera" class="w-5 h-5 text-white" />
                        </button>
                    </div>
                    <div class="mb-2">
                        <h2 class="text-3xl font-display font-semibold tracking-tight">{{ user.name }}</h2>
                        <p class="text-slate-500 text-md font-medium">{{ user.pseudonym }}</p>
                        <p class="hidden lg:block text-sm lg:text-md text-slate-600 mt-2 dark:text-slate-200">
                            <template v-if="user.bibliography && user.bibliography.trim() !== ''">
                                {{ user.bibliography }}
                            </template>
                            <template v-else>Aucune bibliographie disponible !
                            </template>
                        </p>
                    <div class="text-[13px] flex-wrap items-center gap-2 hidden lg:flex" v-if="author">
                        <div>
                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                formatNumber(author.total_followers) }}</span>
                            <span class="text-slate-700 dark:text-slate-400"> follower(s)</span>
                        </div>
                        <div>
                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                formatNumber(author.books.length) }}</span>
                            <span class="text-slate-700 dark:text-slate-400"> livre(s)</span>
                        </div>
                        <div>
                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                formatNumber(countChapters(author.books)) }}</span>
                            <span class="text-slate-700 dark:text-slate-400"> chapitre(s)</span>
                        </div>
                        <div>
                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                formatNumber(countViews(author.books)) }}</span>
                            <span class="text-slate-700 dark:text-slate-400"> vue(s)</span>
                        </div>
                    </div>
                    </div>
                    <p class="lg:hidden text-sm lg:text-md text-slate-600 mt-2 dark:text-slate-200">
                        <template v-if="user.bibliography && user.bibliography.trim() !== ''">
                            {{ user.bibliography }}
                        </template>
                    </p>
                    <div class="text-[11px] flex flex-wrap items-center gap-2 lg:hidden" v-if="author">
                        <div>
                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                formatNumber(author.total_followers) }}</span>
                            <span class="text-slate-700 dark:text-slate-400"> follower(s)</span>
                        </div>
                        <div>
                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                formatNumber(author.books.length) }}</span>
                            <span class="text-slate-700 dark:text-slate-400"> livre(s)</span>
                        </div>
                        <div>
                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                formatNumber(countChapters(author.books)) }}</span>
                            <span class="text-slate-700 dark:text-slate-400"> chapitre(s)</span>
                        </div>
                        <div>
                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                formatNumber(countViews(author.books)) }}</span>
                            <span class="text-slate-700 dark:text-slate-400"> vue(s)</span>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-between gap-3 mb-2 w-full md:w-auto text-xs lg:text-sm">
                    <nuxt-link to="/my-stories" v-if="authorizeRoleUser(`${profil.role.toLocaleLowerCase()}`)"
                        class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary border border-slate-200 rounded-lg font-medium text-white hover:bg-slate-900 hover:border-slate-300 dark:bg-dark dark:hover:bg-primary transition-all shadow-sm">
                        <Icon name="solar:book-2-bold" class="w-5 h-5" />
                        Mes histoires
                    </nuxt-link>
                    <nuxt-link to="/profil/personal"
                        class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-300 transition-all shadow-sm">
                        <Icon name="mdi:edit" class="w-5 h-5 text-slate-700" />
                        Éditer
                    </nuxt-link>
                    <button
                        class="flex items-center justify-center p-2 bg-red-200 border border-red-300 dark:bg-red-300 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                        @click="toggleDeleteModal">
                        <Icon name="mdi:delete-outline" class="w-5 h-5 text-red-600" />
                    </button>
                </div>
            </div>

            <!-- Stats Bar -->
            <div class="flex items-center gap-8 py-6 border-y border-slate-200">
                <div class="flex flex-col">
                    <span class="text-lg font-display font-bold text-slate-900 tracking-tight dark:text-white">{{ formatNumber(user?.preferences?.length || 0) }}</span>
                    <span
                        class="text-xs text-slate-500 uppercase tracking-wide font-medium dark:text-slate-200">Préférences</span>
                </div>
                <div class="h-8 w-px bg-slate-200 mx-2"></div>
                <div
                    class="capitalize flex items-center gap-2 bg-orange-50 text-orange-900 px-3 py-1.5 rounded-full text-xs font-medium border border-orange-100">
                    {{ user.role }}
                </div>
            </div>
        </div>
        <ProfilDeleteUser @close-delete-modal="toggleDeleteModal" :showDeleteModal="showDeleteModal"
            v-if="showDeleteModal" />
    </div>
</template>

<style scoped>
.skeleton-fill {
    display: block;
    height: 12px;
    background-color: #e2e8f0;
    /* slate-200 */
    border-radius: 4px;
    overflow: hidden;
    position: relative;
}

.skeleton-fill::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background-color: #a5a5a580;
    /* gris semi-transparent */
    animation: fillBar 1.5s linear infinite;
    /* animation continue tant que le skeleton existe */
    border-radius: 4px;
}

@keyframes fillBar {
    0% {
        width: 0%;
    }

    50% {
        width: 50%;
    }

    100% {
        width: 100%;
    }
}
</style>

<script setup lang="ts">
const config = useRuntimeConfig();
const { toConnectUser } = authenticate();
const { getProfile, findByUuid } = usersData();
const user = ref<User | null>(null);
const author = ref<Author | null>(null);
const profil = ref<User | null>(null);
const showDeleteModal = ref(false);

const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value
}

const countChapters = (books: BookData[]): number => {
    return books.reduce((total, book) => {
        const validChapters =
            book?.chapters?.filter((chapter: ChapterData) => chapter.status !== 'draft') ?? [];

        return total + validChapters.length;
    }, 0);
};

const countViews = (books: BookData[]): number => {
    return books.reduce((total, book) => total + (Number(book?.total_views) ?? 0), 0);
};

onMounted(async () => {
    user.value = await toConnectUser();
    if (user.value) {
        const { data } = await findByUuid(`${user.value.uuid}`);
        author.value = data;
    }
    profil.value = await getProfile();
})
</script>