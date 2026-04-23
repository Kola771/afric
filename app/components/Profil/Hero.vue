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
                <div :class="`flex lg:flex-nowrap items-end md:items-end gap-3 lg:gap-6`">
                    <div class="relative group">
                        <div
                            class="w-24 h-24 sm:w-40 sm:h-40 rounded-full border-[4px] border-white shadow-lg overflow-hidden bg-slate-200">
                            <img v-if="user?.photo"
                                :src="user.photo.includes('https') ? user.photo : `${config.public.apiBackendUrl}/uploads/users/${user.photo}`"
                                class="w-full h-full object-cover" alt="Profile">
                            <span v-if="!user?.photo"
                                class="p-1 text-xl lg:text-3xl font-medium text-slate-600 flex items-center justify-center w-full h-full rounded-full"
                                :style="`background-color: ${user?.code_color}`">
                                {{ user?.name.split(" ").length > 1 ? `${user?.name.charAt(0).toUpperCase() +
                                    user?.name.split(" ")[1]?.charAt(0).toUpperCase()}` :
                                    user?.name.charAt(0).toUpperCase() }}
                            </span>
                        </div>
                        <label for="file"
                            class="dark:border-slate-300 dark:border-[1px] cursor-pointer absolute right-0 bottom-1 lg:bottom-2 lg:right-2 bg-slate-900 text-white flex items-center justify-center p-2 rounded-full shadow-md transition-all hover:scale-105">
                            <Icon name="mdi:camera" class="w-4 h-4 text-white" />
                            <input type="file" accept="image/jpeg, image/jpg, image/png, image/jfif"
                                @change="onFileChange" name="file" id="file" class="hidden" />
                        </label>
                    </div>
                    <div class="mb-2">
                        <h2 class="text-3xl font-display font-semibold tracking-tight">{{ user.name }}</h2>
                        <p class="text-slate-500 text-md font-medium flex flex-wrap items-center gap-2">{{
                            user.pseudonym }}
                            <span v-if="profil && profil.role !== 'lecteur' && profil?.rank" :class="[
                                'text-[11px] w-fit px-2 rounded-md flex items-center gap-1',
                                profil?.rank === 'certifié'
                                    ? 'bg-orange-50 text-orange-700 border border-orange-100'
                                    : profil?.rank === 'best'
                                        ? 'bg-purple-50 text-purple-700 border border-purple-100'
                                        : profil?.rank === 'top'
                                            ? 'bg-green-50 text-green-700 border border-green-100'
                                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                            ]">
                                <Icon name="mdi:star-outline" size="14" />
                                {{ profil?.rank }}
                            </span>
                        </p>
                        <div class="text-[13px] flex-wrap items-center gap-2 hidden lg:flex" v-if="author">
                            <nuxt-link :to="`/authors/${author.uuid}/followers`" class="hover:underline">
                                <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                    formatNumber(author.total_followers) }}</span>
                                <span class="text-slate-700 dark:text-slate-400"> abonné(s)</span>
                            </nuxt-link>
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
                </div>
                <div class="flex flex-col gap-2 md:hidden">
                    <p class="text-sm md:text-md text-slate-600 dark:text-slate-200"
                        v-if="user.bibliography && user.bibliography.trim() !== ''"
                        v-html="DOMPurify.sanitize(user.bibliography || '')">
                    </p>
                    <div class="text-[11px] flex flex-wrap items-center gap-2" v-if="author">
                        <nuxt-link :to="`/authors/${author.uuid}/followers`" class="hover:underline">
                            <span class="font-semibold text-slate-900 dark:text-slate-200">{{
                                formatNumber(author.total_followers) }}</span>
                            <span class="text-slate-700 dark:text-slate-400"> abonné(s)</span>
                        </nuxt-link>
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
                <div class="flex flex-wrap flex-shrink-0 justify-between gap-3 mb-2 w-full md:w-auto text-xs lg:text-sm">
                    <nuxt-link to="/my-stories" v-if="authorizeRoleUser(`${profil.role.toLocaleLowerCase()}`)"
                        class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary border border-slate-200 rounded-lg font-medium text-white hover:bg-slate-900 hover:border-slate-300 dark:bg-dark dark:hover:bg-primary transition-all shadow-sm">
                        <Icon name="solar:book-2-bold" class="w-5 h-5" />
                        Mes histoires
                    </nuxt-link>
                    <nuxt-link to="/profil/wallet" v-if="authorizeRoleUser(`${profil.role.toLocaleLowerCase()}`)"
                        class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 border border-slate-200 rounded-lg font-medium text-white hover:bg-orange-700 hover:border-slate-300 dark:bg-orange-700 dark:hover:bg-orange-800 transition-all shadow-sm">
                        <Icon name="mdi:cash" class="w-5 h-5" />
                        Mon portefeuille
                    </nuxt-link>
                    <nuxt-link to="/settings"
                        class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-300 transition-all shadow-sm">
                        <Icon name="mdi:settings" class="w-5 h-5 text-slate-700" />
                        Paramètres
                    </nuxt-link>
                    <button
                        class="flex items-center justify-center p-2 bg-red-200 border border-red-300 dark:bg-red-300 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                        @click="toggleDeleteModal">
                        <Icon name="mdi:delete-outline" class="w-5 h-5 text-red-600" />
                    </button>
                </div>
            </div>
            <p class="hidden md:block mb-6 text-sm md:text-md text-slate-600 dark:text-slate-200"
                v-if="user.bibliography && user.bibliography.trim() !== ''"
                v-html="DOMPurify.sanitize(user.bibliography || '')">
            </p>

            <!-- Stats Bar -->
            <div class="flex items-center gap-8 py-6 border-y border-slate-200">
                <div class="flex flex-col">
                    <span class="text-lg font-display font-bold text-slate-900 tracking-tight dark:text-white">{{
                        formatNumber(user?.preferences?.length || 0) }}</span>
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

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" v-else>
            <div
                class="relative -mt-10 sm:-mt-20 lg:-mt-14 dark:text-white mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <!-- Avatar & Info -->
                <div :class="`flex flex-wrap lg:flex-nowrap items-end md:items-end gap-3 lg:gap-6`">
                    <div class="relative group">
                        <div
                            class="w-24 h-24 sm:w-40 sm:h-40 rounded-full border-[4px] border-white shadow-lg overflow-hidden bg-slate-200">
                            <span
                                class="p-1 text-xl lg:text-3xl font-medium text-slate-600 flex items-center justify-center w-full h-full rounded-full">
                            </span>
                        </div>
                    </div>
                    <div class="mb-2">
                        <h2 class="text-3xl font-display font-semibold tracking-tight"></h2>
                        <p class="text-slate-500 text-md font-medium flex flex-wrap items-center gap-2">
                        </p>
                        <p class="hidden md:block text-sm md:text-md text-slate-600 mt-2 dark:text-slate-200 clamp-3">
                        </p>
                    </div>
                    <p class="md:hidden text-sm md:text-md text-slate-600 mt-2 dark:text-slate-200 md:clamp-6">
                    </p>
                </div>
            </div>

            <!-- Stats Bar -->
            <div class="flex items-center gap-8 py-6 border-y border-slate-200">
                <div class="flex flex-col">
                    <span class="text-lg font-display font-bold text-slate-900 tracking-tight dark:text-white"></span>
                </div>
                <div class="h-8 w-px bg-slate-200 mx-2"></div>
                <div
                    class="capitalize flex items-center gap-2 bg-orange-50 text-orange-900 px-3 py-1.5 rounded-full text-xs font-medium border border-orange-100">
                </div>
            </div>
        </div>
        <ProfilDeleteUser @close-delete-modal="toggleDeleteModal" :showDeleteModal="showDeleteModal" :profil="profil"
            v-if="showDeleteModal && profil" />
        <ProfilChangePhoto @close-change-modal="toggleChangeModal" :showChangeModal="showChangeModal" :profil="profil"
            :image="image" :preview="preview" v-if="showChangeModal && profil && preview && image" />
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

.clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
import DOMPurify from 'dompurify'
const config = useRuntimeConfig();
const { toConnectUser } = authenticate();
const { getProfile, findByUuid } = usersData();
const user = ref<User | null>(null);
const author = ref<Author | null>(null);
const profil = ref<User | null>(null);
const showDeleteModal = ref<boolean>(false);
const showChangeModal = ref<boolean>(false);
const image = ref<any>(null);
const preview = ref<any>(null);

const onFileChange = (event: any) => {
    const target = event.target as HTMLInputElement
    if (!target.files?.length) return
    image.value = target.files[0]
    const file = target.files[0]
    preview.value = URL.createObjectURL(file!);
    showChangeModal.value = true;
}

const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value
}

const toggleChangeModal = () => {
    showChangeModal.value = !showChangeModal.value
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
    if (user.value && user.value.role.toLocaleLowerCase() !== "lecteur") {
        const { data } = await findByUuid(`${user.value.uuid}`);
        author.value = data;
    }
    profil.value = await getProfile();
})
</script>