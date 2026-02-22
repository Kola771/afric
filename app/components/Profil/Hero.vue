<template>
    <div class="relative">
        <!-- Cover Image -->
        <div class="h-48 md:h-64 w-full bg-slate-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1548685913-fe6678babe8d?q=80&w=2000&auto=format&fit=crop" class="w-full h-full object-cover opacity-80" alt="Cover Pattern">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative -mt-16 sm:-mt-20 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <!-- Avatar & Info -->
                <div class="flex flex-col md:flex-row items-start md:items-end gap-6">
                    <div class="relative group">
                        <div class="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[4px] border-white shadow-lg overflow-hidden bg-slate-200">
                            <img src="https://i.pravatar.cc/300?img=12" class="w-full h-full object-cover" alt="Profile">
                        </div>
                        <button class="absolute bottom-2 right-2 bg-slate-900 text-white flex items-center justify-center p-2 rounded-full shadow-md transition-all hover:scale-105">
                            <Icon name="mdi:camera" class="w-5 h-5 text-white" />
                        </button>
                    </div>
                    <div class="mb-2">
                        <h1 class="text-3xl font-display font-semibold text-slate-900 tracking-tight dark:text-white dark:lg:text-slate-800">Laurian AGOSSOU</h1>
                        <p class="text-slate-500 font-medium dark:text-slate-200 dark:lg:text-slate-700">@laurian_ago</p>
                        <p class="text-md text-slate-600 mt-2 max-w-md dark:text-slate-200">Passionnée de folklore africain et de science-fiction. J'aime lire à mes heures perdues. Toujours à la recherche de la prochaine pépite littéraire. 📚✨</p>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-between gap-3 mb-2 w-full md:w-auto">
                    <nuxt-link to="/my-stories" class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary border border-slate-200 rounded-lg text-sm font-medium text-white hover:bg-slate-900 hover:border-slate-300 dark:bg-dark dark:hover:bg-primary transition-all shadow-sm">
                        <Icon name="solar:book-2-bold" class="w-5 h-5" />
                        Mes histoires
                    </nuxt-link>
                    <button class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-300 transition-all shadow-sm" @click="toggleUpdateModal">
                        <Icon name="mdi:edit" class="w-5 h-5 text-slate-700" />
                        Éditer
                    </button>
                    <button class="flex items-center justify-center p-2 bg-red-200 border border-red-300 dark:bg-red-300 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm" @click="toggleDeleteModal">
                        <Icon name="mdi:delete-outline" class="w-5 h-5 text-red-600" />
                    </button>
                </div>
            </div>

            <!-- Stats Bar -->
            <div class="flex items-center gap-8 py-6 border-y border-slate-200">
                <div class="flex flex-col">
                    <span class="text-lg font-display font-bold text-slate-900 tracking-tight dark:text-white">24</span>
                    <span class="text-xs text-slate-500 uppercase tracking-wide font-medium dark:text-slate-200">Lectures</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-lg font-display font-bold text-slate-900 tracking-tight dark:text-white">84</span>
                    <span class="text-xs text-slate-500 uppercase tracking-wide font-medium dark:text-slate-200">Abonnements</span>
                </div>
                <div class="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                <div class="hidden sm:flex items-center gap-2 bg-orange-50 text-orange-900 px-3 py-1.5 rounded-full text-xs font-medium border border-orange-100">
                    Lecteur Or
                </div>
            </div>
        </div>
        <ProfilUpdateProfil @close-update-modal="toggleUpdateModal" :showUpdateModal="showUpdateModal" v-if="showUpdateModal" />
        <ProfilDeleteUser @close-delete-modal="toggleDeleteModal" :showDeleteModal="showDeleteModal" v-if="showDeleteModal" />
    </div>
</template>

<script setup lang="ts">
const showUpdateModal = ref(false);
const showDeleteModal = ref(false);

const toggleUpdateModal = () => {
    showUpdateModal.value = !showUpdateModal.value
}
const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value
}
</script>