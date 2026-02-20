<template>
    <div class="max-w-6xl mx-auto space-y-6 mb-4">
                
        <!-- Page Header -->
        <div class="flex flex-col items-start">
                <button @click="back" class="hover:bg-slate-200 hover:duration-300 hover:ease-in-out dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-lg border-slate-400 border-[1px] flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Icon name="mdi:arrow-left" class="w-4 h-4" />
                </button>
                <div class="w-full h-72 mt-2 relative">
                    <img src="/assets/img2.jpg" class="w-full h-full object-cover grayscale-[20%] rounded-lg transition-transform duration-700" alt="Image de couverture de l'histoire">
                    <nuxt-link to="/dashboard/stories/story-uuid-14/detail-like-comment" class="hidden lg:flex items-center gap-4 absolute bottom-4 right-4 bg-white p-2 rounded-lg">
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-slate-800">42</span> <span class="text-slate-400 dark:text-slate-700"><Icon name="mdi:heart" class="w-4 h-4" /></span>
                        </span>
                        <span class="w-px h-3 bg-slate-200"></span>
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-slate-800">12k</span> <span class="text-slate-400 dark:text-slate-700"><Icon name="mdi:eye" class="w-4 h-4" /></span>
                        </span>
                        <span class="w-px h-3 bg-slate-200"></span>
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-slate-800">1.1k</span> <span class="text-slate-400 dark:text-slate-700"><Icon name="mdi:comments" class="w-4 h-4" /></span>
                        </span>
                    </nuxt-link>
                </div>
                <div class="mt-3 flex flex-col gap-2">
                    <div class="flex items-center gap-3 uppercase text-xs font-medium text-orange-600">
                        <span class="bg-orange-50 border border-orange-100/50 text-orange-600 text-xs font-medium animate-fade-in-up px-2 py-1 rounded">Roman</span>
                        <span class="bg-orange-50 border border-orange-100/50 text-orange-600 text-xs font-medium animate-fade-in-up px-2 py-1 rounded">Thriller</span>
                        <span class="bg-slate-100 text-slate-500 px-2 py-1 rounded">Terminée</span>
                    </div>
                    <nuxt-link to="/dashboard/stories/story-uuid-14/detail-like-comment" class="lg:hidden flex items-center gap-4">
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-white">42</span> <span class="text-slate-400"><Icon name="mdi:heart" class="w-4 h-4" /></span>
                        </span>
                        <span class="w-px h-3 bg-slate-200"></span>
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-white">12k</span> <span class="text-slate-400"><Icon name="mdi:eye" class="w-4 h-4" /></span>
                        </span>
                        <span class="w-px h-3 bg-slate-200"></span>
                        <span class="text-xs">
                            <span class="font-semibold text-slate-900 dark:text-white">1.1k</span> <span class="text-slate-400"><Icon name="mdi:comments" class="w-4 h-4" /></span>
                        </span>
                    </nuxt-link>
                </div>
                <div class="py-4 border-b border-slate-200">
                    <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Les Larmes du Soleil</h2>
                    <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ea ducimus distinctio libero, quae quasi laboriosam autem delectus! Perferendis neque et necessitatibus officia assumenda? Ratione!</p>
                </div>
                <div class="flex flex-col lg:flex-row lg:gap-4 lg:justify-between w-full pt-4">
                    <select
                        v-model="selectedChapterId"
                        class="lg:hidden mt-1 block w-full rounded-lg border-0 py-2.5 text-slate-900 text-sm dark:bg-slate-800 dark:border dark:text-white shadow-sm border-slate-300 border-[1px]"
                        >
                        <option :value="null" disabled>Sélectionnez un chapitre</option>
                        <option
                            v-for="chapter in chapters"
                            :key="chapter.id"
                            :value="chapter.id"
                        >
                            {{ chapter.title }}
                        </option>
                    </select>

                    <div class="hidden lg:block lg:w-1/4 space-y-2 max-h-[50vh] overflow-y-auto">
                        <button
                            v-for="chap in chapters"
                            :key="chap.id"
                            @click="() => { attemptSwitchChapter(chap.id); }"
                            :class="['text-sm w-full text-left p-2 rounded transition', chap.id === selectedChapterId ? 'bg-slate-100 border border-slate-200' : 'dark:hover:bg-slate-100 border-slate-400 dark:border-slate-200 border hover:bg-slate-50']"
                        >

                            <div class="min-w-0 flex-1">
                                <div class="flex justify-between items-center mb-0.5">
                                    <span :class="['text-xs font-medium truncate', chap.id === selectedChapterId ? 'text-slate-900' : 'dark:text-slate-500 text-slate-700 group-hover:text-slate-900']">{{ chap.title }}</span>
                                    <span :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded border', chap.status === 'Publié' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200']">{{ chap.status }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <p :class="['text-xs truncate font-serif', chap.id === selectedChapterId ? 'text-slate-500' : 'text-slate-400']">{{ chap.subtitle }}</p>
                                    <div class="flex items-center gap-1">
                                        <div class="text-xs">
                                            <span class="font-semibold text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-700">{{ chap.like || 0 }}</span> <span class="text-slate-400 dark:text-slate-600"><Icon name="mdi:heart" class="w-4 h-4" /></span>
                                        </div>
                                        <div class="text-xs">
                                            <span class="font-semibold text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-700">{{ chap.view || 0 }}</span> <span class="text-slate-400 dark:text-slate-600"><Icon name="mdi:eye" class="w-4 h-4" /></span>
                                        </div>
                                        <div class="w-px h-3 bg-slate-200"></div>
                                        <div class="text-xs">
                                            <span class="font-semibold text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-700">{{ chap.comment || 0 }}</span> <span class="text-slate-400 dark:text-slate-600"><Icon name="mdi:comments" class="w-4 h-4" /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div v-if="selectedChapter" class="mt-4 lg:flex-1 lg:mt-0 bg-white lg:bg-slate-100 rounded-lg">
                        <div class="p-2 text-[13px] lg:text-xs flex flex-wrap items-center gap-x-1 gap-y-2.5">
                            <button @click="showChapter" :class="step === 'chapter' ? 'bg-slate-50 dark:bg-slate-200 dark:hover:bg-slate-300' : 'bg-white dark:hover:bg-slate-50'" class="px-4 py-2 rounded dark:border-slate-400 dark:border flex items-center gap-2 transition-all duration-300">
                                <Icon name="mdi:book-open" class="w-4 h-4" />
                                Aperçu</button>
                            <button @click="showLikes" :class="step === 'likes' ? 'bg-slate-50 dark:bg-slate-200 dark:hover:bg-slate-300' : 'bg-white dark:hover:bg-slate-50'" class="ml-1 px-4 py-2 rounded dark:border-slate-400 dark:border flex items-center gap-2 transition-all duration-300">
                                <Icon name="mdi:heart" class="w-4 h-4" />
                                {{ selectedChapter.like || 0 }} J'aime</button>
                            <button @click="showComments" :class="step === 'comments' ? 'bg-slate-50 dark:bg-slate-200 dark:hover:bg-slate-300' : 'bg-white dark:hover:bg-slate-50'" class="ml-1 px-4 py-2 rounded dark:border-slate-400 dark:border flex items-center gap-2 transition-all duration-300">
                                <Icon name="mdi:comment-multiple" class="w-4 h-4" />
                                {{ selectedChapter.comment || 0 }} Commentaires</button>
                        </div>
                        <div class="p-4" v-if="step === 'chapter'">
                            <h4 class="text-sm font-medium text-slate-900">
                                {{ selectedChapter.title }}
                            </h4>
                            <p class="text-sm text-slate-500 mt-2">
                                {{ selectedChapter.subtitle }}
                            </p>
                            <div class="text-sm text-slate-700 mt-4" v-html="selectedChapter.content"></div>
                        </div>
                        
                        <div class="p-4" v-if="step === 'likes'">
                            <h4 class="text-sm font-medium text-slate-900">
                                J'aime
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mt-4 max-h-96 overflow-y-auto">
                                <div class="flex gap-4" v-for="index in 24" :key="index">
                                    <div class="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 dark:bg-orange-600 dark:text-white">A</div>
                                    <div>
                                        <div class="flex items-center gap-3">
                                            <div class="flex items-baseline gap-2">
                                                <span class="text-[13px] font-semibold text-slate-900 dark:text-slate-700">John Days</span>
                                                <span class="text-xs text-slate-400 dark:text-slate-500">il y a 2h</span>
                                            </div>
                                            <span class="px-3 py-0.5 rounded-full bg-orange-50 border border-orange-100/50 text-orange-800 text-[10px] font-medium">Lecteur</span>
                                        </div>
                                        <p class="text-xs lg:text-xs text-slate-600 dark:text-slate-700">@j_day</p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 flex flex-col md:flex-row md:justify-end">
                                <button class="text-[13px] lg:text-xs bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-4 py-2 lg:py-2.5 rounded-lg duration-300 transition-all">Afficher plus</button>
                            </div>
                        </div>

                        <div class="p-4" v-if="step === 'comments'">
                            <h4 class="text-sm font-medium text-slate-900">
                                Commentaires
                            </h4>
                            <div class="space-y-6 mt-4 max-h-96 overflow-y-auto">
                                <div class="flex gap-4" v-for="index in 24" :key="index">
                                    <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 dark:bg-orange-600 dark:text-white">A</div>
                                    <div>
                                        <div class="flex items-baseline gap-2">
                                            <span class="text-[13px] font-semibold text-slate-900 dark:text-slate-700">Arnaud</span>
                                            <span class="text-xs text-slate-400 dark:text-slate-500">il y a 5h</span>
                                        </div>
                                        <p class="text-xs text-slate-600 dark:text-slate-700 mt-1">Très intéressant !</p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 flex flex-col md:flex-row md:justify-end">
                                <button class="text-[13px] lg:text-xs bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-4 py-2 lg:py-2.5 rounded-lg duration-300 transition-all">Afficher plus</button>
                            </div>
                        </div>
                    </div>

                </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const selectedChapterId = ref<number | null>(null)
const step = ref<string>("chapter");

const chapters = ref([
  { id: 1, title: 'Chapitre 1', like: "280", view: "1k", comment: "150", subtitle: 'Le retour au village natal...', status: 'Publié', content: 'Contenu du chapitre 1...' },
  { id: 2, title: 'Chapitre 2', like: "700", view: "1,4k", comment: "200", subtitle: 'La rencontre avec le sage...', status: 'Brouillon', content: 'Contenu du chapitre 2...' },
  { id: 3, title: 'Chapitre 3', like: "500", view: "4,1k", comment: "240", subtitle: 'Sans titre', status: 'Brouillon', content: 'Contenu du chapitre 3...' }
])

const selectedChapter = computed(() =>
  chapters.value.find(ch => ch.id === selectedChapterId.value)
)

watch(selectedChapterId, () => {
  step.value = "chapter"
})

function attemptSwitchChapter(id: number) {
step.value = "chapter";
  if (id === selectedChapterId.value) return
  selectedChapterId.value = id
}

const showChapter = () => {
  step.value = "chapter";
}

const showLikes = () => {
  step.value = "likes";
}

const showComments = () => {
  step.value = "comments";
}

const back = () => {
    window.history.back()
}
</script>