<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b">
        <section class="max-w-7xl mx-auto pt-12 border-t border-slate-100">
            <div class="p-4 md:p-10 lg:p-12">
                <div class="grid md:grid-cols-12 gap-10">
                <!-- Left: Cover -->
                <div class="md:col-span-4 lg:col-span-3">
                    <div class="rounded-xl overflow-hidden shadow-2xl border border-slate-200 rotate-1 hover:rotate-0 transition-transform duration-500">
                        <img src="/assets/img.jpg" class="w-full object-cover aspect-[3/4]" alt="Cover Large">
                    </div>
                    <div class="mt-6 flex flex-col gap-3">
                        <button class="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 dark:shadow-slate-800 dark:border-[1px] dark:border-gray-600 transition-colors flex items-center justify-center gap-2">
                            <Icon name="mdi:book-open-page-variant" class="w-5 h-5" />
                            Lire le Chapitre 1
                        </button>
                        <button class="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800 transition-colors flex items-center justify-center gap-2">
                            <Icon name="mdi:heart" class="w-5 h-5" />
                           140 J'aime cette histoire
                        </button>
                    </div>
                </div>
                <!-- Right: Info & Chapters -->
                <div class="md:col-span-8 lg:col-span-9 space-y-8">
                    <div>
                        <div class="flex items-center gap-3 text-xs font-medium text-orange-600 mb-4">
                            <span class="bg-orange-50 border border-orange-100/50 text-orange-600 text-xs font-medium animate-fade-in-up px-2 py-1 rounded">FANTASTIQUE</span>
                            <span class="bg-slate-100 text-slate-500 px-2 py-1 rounded">EN COURS</span>
                        </div>
                        <h2 class="text-3xl md:text-5xl font-display font-semibold text-slate-900 dark:text-white tracking-tight mb-4">Le Masque d'Or</h2>
                        <div class="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-200">
                            <nuxt-link to="/authors/alain_mabanckou" class="flex items-center gap-2 hover:underline hover:ease-in-out hover:duration-300">
                                <img src="/assets/alain_mabanckou.jpg" class="w-6 h-6 rounded-full" alt="Author">
                                <span class="text-slate-900 font-medium dark:text-white truncate">Alain Mabanckou </span>
                            </nuxt-link>
                            <div class="flex items-center gap-1 truncate">
                                <Icon name="mdi:book-multiple" class="w-5 h-5" />
                                <span>45 Chapitres</span>
                            </div>
                            <div class="flex items-center gap-1 truncate">
                                <Icon name="mdi:eye" class="w-5 h-5" />
                                <span>125k Vues</span>
                            </div>
                        </div>
                    </div>
                    <div class="prose prose-slate prose-sm max-w-none text-slate-600 dark:text-slate-200">
                        <p>Dans un Dakar futuriste où la technologie se mêle à la magie ancestrale, Malik découvre un masque ancien dans les archives du musée des Civilisations Noires. Ce simple artefact va bouleverser sa vie et réveiller des esprits oubliés depuis des siècles. Traqué par une société secrète, il doit comprendre ses origines avant que l'ombre ne recouvre la ville lumière.</p>
                    </div>
                    <!-- Chapters List -->
                    <div class="border-t border-slate-200 pt-6">
                        <h3 class="font-display font-medium text-slate-900 dark:text-white mb-4">Chapitres</h3>
                        <div class="space-y-2 md:max-h-96 md:overflow-y-auto">
                            <nuxt-link
                                v-for="chapter in chapters"
                                :key="chapter.id"
                                :to="`/books/book-uuid-${chapter.id}/chapter/chapter-uuid-${chapter.id}`"
                                class="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 hover:border-slate-300 transition-all hover:shadow-sm"
                                >
                                <span class="flex items-center gap-4">
                                    <span class="text-slate-500 dark:text-slate-200 font-display font-bold text-xl w-8">
                                    {{ chapter.number }}
                                    </span>

                                    <span>
                                    <p class="font-medium text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                                        {{ chapter.title }}
                                    </p>
                                    <p class="text-xs text-slate-400 dark:text-slate-200">
                                        Publié le {{ chapter.publishedAt }}
                                    </p>
                                    </span>
                                </span>

                                <span class="text-slate-500 dark:text-slate-200 group-hover:translate-x-1 transition-transform">
                                    <Icon name="mdi:arrow-right" class="w-5 h-5" />
                                </span>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="mt-12">
                        <h4 class="font-display font-medium text-slate-900 dark:text-white mb-6">Commentaires</h4>
                        <div class="flex flex-col gap-4">
                            <!-- Comment Item -->
                            <div :class="`flex gap-4 ${index % 2 == 0 ? 'border-y py-3 border-slate-200' : ''}`" v-for="index in 3" :key="index">
                                <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 dark:bg-orange-600 dark:text-white">A</div>
                                <div>
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-[13px] font-semibold text-slate-900 dark:text-white">Arnaud</span>
                                        <span class="text-xs text-slate-400 dark:text-slate-200">il y a 5h</span>
                                    </div>
                                    <p class="text-[13px] text-slate-600 dark:text-slate-200 mt-1">Très intéressant !</p>
                                </div>
                            </div>
                            <!-- Comment Input -->
                            <div class="relative mt-6">
                                <textarea class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-slate-400 focus:ring-0 resize-none h-24 dark:bg-dark dark:border-slate-200" placeholder="Écrire un commentaire..."></textarea>
                                <button class="absolute bottom-4 right-3 bg-white border border-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100">Publier</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const chapters = ref<Chapter[]>([
  {
    id: 0,
    number: "#",
    title: "Prologue",
    publishedAt: "11 Oct 2023"
  },
  {
    id: 1,
    number: "01",
    title: "L'éveil des ombres",
    publishedAt: "12 Oct 2023"
  },
  {
    id: 2,
    number: "02",
    title: "La fuite dans la Médina",
    publishedAt: "19 Oct 2023"
  },
  {
    id: 3,
    number: "03",
    title: "L'Alliance",
    publishedAt: "26 Oct 2023"
  }
])
</script>