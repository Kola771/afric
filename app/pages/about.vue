<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-8">
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
            <div class="flex items-center md:items-end justify-between mb-8">
                <div>
                    <h2 class="text-3xl sm:text-4xl font-display font-bold dark:text-white text-slate-900 tracking-tight mb-4">À propos d'Afric Storyline</h2>
                    <p class="text-slate-500 text-md mt-1 dark:text-slate-200">Une plateforme dédiée à la promotion de l'écriture africaine et à la découverte de nouveaux talents littéraires.</p>
                </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <article class="lg:bg-slate-50 lg:p-4 dark:lg:bg-slate-800 lg:rounded-lg prose prose-lg text-slate-500 dark:text-slate-300 dark:prose-invert max-w-none flex items-start gap-4">
                    <span class="bg-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:border flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0">
                        <Icon name="mdi:lightbulb" class="w-6 h-6 text-slate-700 dark:text-white" />
                    </span>
                    <div class="flex flex-col gap-1">
                        <h4 class="lg:text-lg text-xl font-display font-medium dark:text-white text-slate-900">Notre Mission</h4>
                        <p class="text-[15px] leading-7">Afric Storyline est née d'une conviction simple : les histoires africaines méritent une plateforme à la hauteur de leur richesse. Nous offrons un espace moderne et immersif pour découvrir, lire et partager des récits du continent.</p>
                    </div>
                </article>
                <article class="lg:bg-slate-50 lg:p-4 dark:lg:bg-slate-800 lg:rounded-lg prose prose-lg text-slate-500 dark:text-slate-300 dark:prose-invert max-w-none flex items-start gap-4">
                    <span class="bg-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:border flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0">
                        <Icon name="mdi:web" class="w-6 h-6 text-slate-700 dark:text-white" />
                    </span>
                    <div class="flex flex-col gap-1">
                        <h4 class="lg:text-lg text-xl font-display font-medium dark:text-white text-slate-900">Diversité des Voix</h4>
                        <p class="text-[15px] leading-7">Du Sénégal au Rwanda, du Nigeria au Gabon — nos auteurs viennent de tout le continent. Fantastique, romance, thriller, historique : chaque genre est représenté pour refléter la diversité africaine.</p>
                    </div>
                </article>
                <article class="lg:bg-slate-50 lg:p-4 dark:lg:bg-slate-800 lg:rounded-lg prose prose-lg text-slate-500 dark:text-slate-300 dark:prose-invert max-w-none flex items-start gap-4">
                    <span class="bg-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:border flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0">
                        <Icon name="mdi:account-group" class="w-6 h-6 text-slate-700 dark:text-white" />
                    </span>
                    <div class="flex flex-col gap-1">
                        <h4 class="lg:text-lg text-xl font-display font-medium dark:text-white text-slate-900">Communauté</h4>
                        <p class="text-[15px] leading-7">Likez vos chapitres préférés, commentez, et faites partie d'une communauté de lecteurs passionnés. Ensemble, faisons vivre la littérature africaine moderne.</p>
                    </div>
                </article>
            </div>
            <div class="flex flex-col gap-4 mb-8">
                <p class="text-slate-500 text-md mt-1 dark:text-slate-200">Nous croyons au pouvoir des histoires pour connecter les gens, transmettre la culture et inspirer les générations futures.</p>
                <article class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 px-4 py-6 md:p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div class="flex flex-col gap-2">
                        <h4 class="lg:text-lg text-xl font-display font-medium dark:text-white text-slate-900">Pourquoi Afric Storyline ?</h4>
                        <ul class="flex flex-col gap-2 text-[15px] text-slate-500 dark:text-slate-300">
                            <li class="flex items-center gap-2"><Icon name="mdi:check" class="w-5 h-5 text-orange-600 dark:text-orange-400" /> Des histoires authentiques ancrées dans la culture africaine</li>
                            <li class="flex items-center gap-2"><Icon name="mdi:check" class="w-5 h-5 text-orange-600 dark:text-orange-400" /> Une expérience de lecture immersive et confortable</li>
                            <li class="flex items-center gap-2"><Icon name="mdi:check" class="w-5 h-5 text-orange-600 dark:text-orange-400" /> Une communauté passionnée de lecteurs</li>
                            <li class="flex items-center gap-2"><Icon name="mdi:check" class="w-5 h-5 text-orange-600 dark:text-orange-400" /> Du contenu régulièrement mis à jour</li>
                        </ul>
                    </div>
                    <img src="/assets/afric.png" alt="Afric Storyline" class="lg:hover:scale-105 transition-all duration-300 rounded-lg md:h-72 lg:h-52 md:object-contain" />
                </article>
            </div>
            <div class="relative overflow-hidden bg-lightOrange dark:bg-slate-800 px-4 sm:px-6 lg:px-8 py-16 rounded-xl">
                <div class="flex flex-col gap-8 md:gap-6 items-center">
                    <div class="flex flex-col items-center">
                        <h2 class="text-2xl font-display font-medium dark:text-white text-center text-slate-900 tracking-tight">Rejoignez notre communauté</h2>
                        <p class="text-slate-500 text-sm mt-1 dark:text-slate-200"> Plus on est de fous, plus on rit.</p>
                    </div>

                    <div :class="`grid ${user ? 'grid-cols-2' : 'md:grid-cols-3'} gap-4 w-full md:w-auto`">
                        <nuxt-link to="#" class="flex justify-center items-center gap-1 text-sm text-slate-900 hover:bg-green-600 transition-colors dark:text-slate-200 bg-green-500 rounded-lg p-2 md:px-4 lg:px-6 text-white">
                            <Icon name="mdi:whatsapp" class="w-7 h-7 lg:w-6 lg:h-6" />
                            <span class="">WhatsApp</span>
                        </nuxt-link>
                        <nuxt-link to="#" class="flex justify-center items-center gap-1 text-sm text-slate-900 hover:bg-blue-600 transition-colors dark:text-slate-200 bg-blue-500 rounded-lg p-2 md:px-4 lg:px-6 text-white">
                            <Icon name="mdi:facebook" class="w-7 h-7 lg:w-6 lg:h-6" />
                            <span class="">Facebook</span>
                        </nuxt-link>
                        <nuxt-link to="/register" v-if="!user" class="col-span-2 md:col-span-1 flex justify-center items-center gap-1 text-sm text-slate-900 hover:bg-orange-600 transition-colors dark:text-slate-200 bg-orange-500 rounded-lg p-2 md:px-4 lg:px-6 text-white">
                            <Icon name="mdi:register" class="w-7 h-7 lg:w-6 lg:h-6" />
                            <span class="">S'inscrire</span>
                        </nuxt-link>
                    </div>
                </div>
                <div class="absolute -bottom-6 -right-6 bg-orange-300 dark:bg-slate-700 w-16 h-16 md:w-24 md:h-24 rounded-full"></div>
                <div class="absolute -top-6 lg:-top-7 -left-8 bg-orange-300 dark:bg-slate-700 w-16 h-16 md:w-24 md:h-24 rounded-full"></div>
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
  useSeoMeta({
    title: 'À propos',
    description: 'Découvrez notre histoire et notre passion pour les histoires africaines.',
    
    ogTitle: 'À propos',
    ogDescription: 'Découvrez notre histoire et notre passion pour les histoires africaines.',
    ogImage: 'https://africstoryline.com/afric.png',
    ogUrl: 'https://africstoryline.com/',
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'À propos',
    twitterDescription: 'Découvrez notre histoire et notre passion pour les histoires africaines.',
    twitterImage: 'https://africstoryline.com/afric.png'
  });

  const { toConnectUser } = authenticate();
  const user = ref<User | null>(null);
  
  onMounted(async () => {
    user.value = await toConnectUser();
  })
</script>
