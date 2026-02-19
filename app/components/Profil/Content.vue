<template>
   <div class="max-w-7xl z-10 mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- LEFT COLUMN (Main Content) -->
            <div class="lg:col-span-8 space-y-12">
                
                <!-- Tabs -->
                <div class="flex items-center gap-8 border-b border-slate-200 pb-px overflow-x-auto hide-scroll">
                    <button class="pb-3 border-b-2 border-slate-900 dark:border-orange-200 text-slate-900 dark:text-slate-200 font-medium text-sm whitespace-nowrap">Lectures récentes</button>
                    <button class="pb-3 border-b-2 border-transparent hover:border-slate-200 text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors whitespace-nowrap">Histoires lues</button>
                    <button class="pb-3 border-b-2 border-transparent hover:border-slate-200 text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors whitespace-nowrap">Histoires appréciées</button>
                </div>

                <!-- Section: Continue Reading -->
                <section>
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-lg font-display font-semibold text-slate-900 tracking-tight dark:text-white">Reprendre la lecture</h2>
                    </div>
                    
                    <div class="grid gap-4">
                        <!-- Continue Reading Card 1 -->
                        <div class="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white dark:bg-slate-300 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-200" @click="openTheChapterDetail('/books/book-uuid-1/chapter/chapter-uuid-1')">
                            <div class="w-full sm:w-24 h-32 sm:h-36 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Cover">
                            </div>
                            <div class="flex flex-col justify-between py-1 flex-grow">
                                <div>
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-[10px] font-bold tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase">Fantastique</span>
                                        <span class="text-xs text-slate-400">Il y a 2h</span>
                                    </div>
                                    <h3 class="font-display font-medium text-lg text-slate-900 group-hover:text-orange-600 transition-colors">Le Masque d'Or</h3>
                                    <p class="text-sm text-slate-500">Chapitre 4: Les secrets du musée</p>
                                </div>
                                
                                <div class="mt-4 sm:mt-0">
                                    <button class="mt-3 w-full sm:w-auto px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                        Continuer
                                        <span class="border-white flex items-center justify-center md:border md:p-0.5 rounded-full md:w-4 md:h-4">
                                            <Icon name="mdi:play-outline" class="w-5 h-5 md:w-4 md:h-4 text-white" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Continue Reading Card 2 -->
                        <div class="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-200 opacity-75 hover:opacity-100" @click="openTheChapterDetail('/books/book-uuid-4/chapter/chapter-uuid-1')">
                            <div class="w-full sm:w-24 h-32 sm:h-36 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0" alt="Cover">
                            </div>
                            <div class="flex flex-col justify-between py-1 flex-grow">
                                <div>
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-[10px] font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase">Drame</span>
                                        <span class="text-xs text-slate-400">Hier</span>
                                    </div>
                                    <h3 class="font-display font-medium text-lg text-slate-900 group-hover:text-orange-600 transition-colors">Les Larmes du Fleuve</h3>
                                    <p class="text-sm text-slate-500">Chapitre 12: La séparation</p>
                                </div>
                                
                                <div class="mt-4 sm:mt-0">
                                    <button class="mt-3 w-full sm:w-auto px-4 py-2 bg-slate-900/80 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                        Continuer
                                        <span class="border-white flex items-center justify-center md:border md:p-0.5 rounded-full md:w-4 md:h-4">
                                            <Icon name="mdi:play-outline" class="w-5 h-5 md:w-4 md:h-4 text-white" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section: Saved List -->
                <section>
                        <div class="flex items-center justify-between mb-6">
                        <h2 class="text-lg font-display font-semibold text-slate-900 dark:text-white tracking-tight">À lire plus tard</h2>
                        <nuxt-link to="/stories" class="text-xs font-medium text-slate-500 dark:text-slate-200 hover:text-slate-900 transition-colors">Tout voir</nuxt-link>
                    </div>
                    
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        <!-- Book Item 1 -->
                        <nuxt-link to="#" class="group">
                            <div class="relative aspect-[2/3] bg-slate-100 rounded-xl overflow-hidden mb-3 shadow-sm border border-slate-100">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                            </div>
                            <h4 class="font-display font-medium text-sm text-slate-900 dark:text-white truncate group-hover:text-orange-600">Sous le ciel...</h4>
                            <p class="text-xs text-slate-500 dark:text-slate-200 truncate">Yasmine K.</p>
                        </nuxt-link>
                            <!-- Book Item 2 -->
                        <nuxt-link to="#" class="group">
                            <div class="relative aspect-[2/3] bg-slate-100 rounded-xl overflow-hidden mb-3 shadow-sm border border-slate-100">
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                            </div>
                            <h4 class="font-display font-medium text-sm text-slate-900 dark:text-white truncate group-hover:text-orange-600">Neo-Lagos 2099</h4>
                            <p class="text-xs text-slate-500 dark:text-slate-200 truncate">Malik Z.</p>
                        </nuxt-link>
                        <!-- Book Item 3 -->
                        <nuxt-link to="#" class="group">
                            <div class="relative aspect-[2/3] bg-slate-100 rounded-xl overflow-hidden mb-3 shadow-sm border border-slate-100">
                                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                            </div>
                            <h4 class="font-display font-medium text-sm text-slate-900 dark:text-white truncate group-hover:text-orange-600">Terre Rouge</h4>
                            <p class="text-xs text-slate-500 dark:text-slate-200 truncate">Samba D.</p>
                        </nuxt-link>
                        <!-- Add New -->
                        <nuxt-link to="/stories" class="flex flex-col items-center justify-center aspect-[2/3] bg-slate-50 border border-dashed border-slate-300 rounded-xl hover:bg-slate-100 hover:border-slate-400 transition-all group">
                            <span class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:scale-110 transition-all mb-2">
                                <Icon name="mdi:plus" class="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                            </span>
                            <span class="text-xs font-medium text-slate-500 dark:text-slate-800">Explorer</span>
                        </nuxt-link>
                    </div>
                </section>
            </div>

            <!-- RIGHT COLUMN (Sidebar) -->
            <div class="lg:col-span-4 space-y-8">
                <div>
                    <h3 class="font-display font-semibold text-slate-900 dark:text-white mb-4 text-sm">Auteurs suggérés</h3>
                    <div class="space-y-4">
                        <!-- Item 1 -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <img src="/assets/alain_mabanckou.jpg" class="w-10 h-10 rounded-full border border-slate-100">
                                <div class="flex flex-col">
                                    <span class="text-sm font-medium text-slate-900 dark:text-white">Alain Mabanckou</span>
                                    <span class="text-xs text-slate-500 dark:text-slate-200">Romance, Poésie</span>
                                </div>
                            </div>
                            <nuxt-link to="/authors/alain-mabanckou" class="text-xs font-medium bg-slate-900 dark:bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">Voir</nuxt-link>
                        </div>
                            <!-- Item 2 -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <img src="/assets/camara_laye.webp" class="w-10 h-10 rounded-full border border-slate-100">
                                <div class="flex flex-col">
                                    <span class="text-sm font-medium text-slate-900 dark:text-white">Camara Laye</span>
                                    <span class="text-xs text-slate-500 dark:text-slate-200">Thriller, Policier</span>
                                </div>
                            </div>
                            <nuxt-link to="/authors/camara-laye" class="text-xs font-medium bg-slate-900 dark:bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">Voir</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const router = useRouter();
const openTheChapterDetail = (url: string) => {
    router.push(url);
}
</script>