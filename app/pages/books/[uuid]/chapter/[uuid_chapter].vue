<template>
  <div class="dark:bg-dark bg-white">
    <section class="relative">
        <!-- Reader Container simulating a new page/view -->
        <div class="max-w-7xl mx-auto relative">
            
            <!-- Sticky Reader Header -->
            <div class="sticky top-0 z-40 bg-white/95 dark:bg-dark dark:shadow-white/20 shadow-lg lg:shadow-none backdrop-blur border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <nuxt-link :to="`/books/${uuid}`">
                    <Icon name="mdi:arrow-left" class="w-5 h-5 dark:text-slate-200" />
                  </nuxt-link>
                  <div class="flex flex-col">
                      <span class="text-xs text-slate-600 dark:text-slate-200 uppercase tracking-wider font-semibold truncate">Le Masque d'Or</span>
                      <span class="text-sm font-medium text-slate-900 dark:text-white truncate">Chapitre 1 : L'éveil des ombres</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                    <button @click="toggleTextSize" class="p-2 flex items-center justify-center text-slate-600 hover:text-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
                      <Icon 
                        name="solar:text-square-linear" 
                        :class="['w-5 h-5 transition-transform duration-200', textSizeLevel > 0 ? 'scale-110' : '']" 
                      />
                    </button>
                    <ThemeToggle />
                </div>
            </div>

            <!-- Content Body -->
            <div class="px-6 sm:px-12 py-10 max-w-prose lg:max-w-4xl mx-auto">
                <h2 class="font-display font-semibold text-3xl text-slate-900 dark:text-white mb-8 tracking-tight text-center">L'éveil des ombres</h2>
                
                <div :class="['prose prose-slate font-serif text-slate-800 dark:text-slate-200 leading-loose transition-all duration-300', textSizeClass]"
>
                    <p class="first-letter:text-5xl first-letter:font-bold first-letter:text-slate-900 dark:first-letter:text-slate-200 first-letter:mr-3 first-letter:float-left">
                        La pluie tombait lourdement sur les toits de zinc du quartier Plateau. Il était minuit passé, et Malik n'arrivait toujours pas à trouver le sommeil. L'objet posé sur sa table de chevet semblait vibrer, émettant un bourdonnement imperceptible pour le commun des mortels, mais assourdissant pour lui.
                    </p>
                    <p>
                        Il se leva, ses pieds nus claquant contre le carrelage froid. Dehors, les néons holographiques des publicités flottaient dans la brume nocturne, baignant la chambre d'une lueur bleutée intermittente.
                    </p>
                    <p>
                        — Tu ne devrais pas le toucher, murmura une voix derrière lui.
                    </p>
                    <p>
                        Malik se figea. Il vivait seul. Son cœur commença à battre la chamade contre sa poitrine. Lentement, il se retourna. Dans le coin sombre de la pièce, là où la lumière des néons n'atteignait pas, une silhouette se dessinait.
                    </p>
                    <p>
                        Ce n'était pas un homme. Ce n'était pas une femme. C'était une ombre, dense et mouvante, comme faite de fumée solide. Et elle avait des yeux. Deux orbes dorés, fendus comme ceux d'un félin.
                    </p>
                </div>

                <!-- Interactions -->
                <div class="mt-16 pt-8 border-t border-slate-200 text-slate-500 dark:text-slate-200 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <button class="flex items-center gap-2 hover:text-red-500 transition-colors group">
                            <Icon name="mdi:heart" class="w-5 h-5" />
                            <span class="text-sm font-medium">124 J'aime</span>
                        </button>
                        <button class="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <Icon name="mdi:message-text-outline" class="w-5 h-5" />
                            <span class="text-sm font-medium">45 Com.</span>
                        </button>
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <button class="px-6 py-4 rounded-xl border border-slate-200 text-slate-500 font-medium hover:border-slate-300 hover:bg-slate-50 text-sm flex items-center justify-center gap-2 transition-all opacity-50 cursor-not-allowed dark:bg-slate-800 dark:border-none">
                        <Icon name="mdi:arrow-left" class="w-5 h-5" />
                        Précédent
                    </button>
                    <button class="px-6 py-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl dark:bg-white dark:text-primary dark:hover:bg-slate-100 dark:hover:duration-300 dark:hover:ease-in-out">
                        Suivant
                        <Icon name="mdi:arrow-right" class="w-5 h-5" />
                    </button>
                </div>
                
                <!-- Comment Section Preview -->
                <div class="mt-12">
                    <h4 class="font-display font-medium text-slate-900 dark:text-white mb-6">Commentaires</h4>
                    <div class="space-y-6">
                        <!-- Comment Item -->
                        <div class="flex gap-4">
                            <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 dark:bg-orange-600 dark:text-white">JD</div>
                            <div>
                                <div class="flex items-baseline gap-2">
                                    <span class="text-sm font-semibold text-slate-900 dark:text-white">Jean Diallo</span>
                                    <span class="text-xs text-slate-400 dark:text-slate-200">il y a 2h</span>
                                </div>
                                <p class="text-sm text-slate-600 dark:text-slate-200 mt-1">L'ambiance est incroyable ! J'adore le mélange futuriste et traditionnel. Hâte de lire la suite 🔥</p>
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
        
        <!-- Floating Label for the Presentation -->
        <div class="absolute top-0 left-0 w-full flex justify-center -mt-6">
            <span class="bg-slate-900 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium tracking-wide uppercase">Interface de Lecture</span>
        </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const uuid = useRoute().params.uuid
definePageMeta({
  layout: "not-layout",
});

const textSizeLevel = ref(0)
// 0 = normal
// 1 = grand
// 2 = très grand

const toggleTextSize = () => {
  textSizeLevel.value = (textSizeLevel.value + 1) % 3
}

const textSizeClass = computed(() => {
  switch (textSizeLevel.value) {
    case 1:
      return "text-lg"
    case 2:
      return "text-xl"
    default:
      return "text-base"
  }
})


</script>
