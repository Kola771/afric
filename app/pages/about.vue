<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-8">

        <!-- HERO SECTION -->
        <section
            class="relative min-h-[70vh] lg:min-h-[75vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-orange-100 to-white dark:from-slate-900 dark:to-slate-800">
            <!-- Background Image -->
            <img class="absolute z-0 inset-0 h-full w-full object-cover opacity-90 md:opacity-80 mix-blend-overlay"
                src="/assets/tree.jpg" alt="African Pattern Background">
            <div class="z-10 flex flex-col justify-center items-center text-center">
                <h2 class="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                    Afric Storyline
                </h2>
                <p class="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                    L'Afrique a toujours raconté des histoires.
                    Aujourd’hui, ces histoires méritent d’être vues, entendues et célébrées à l’échelle du monde.
                </p>
                <div class="mt-8 flex flex-col md:flex-row gap-4">
                    <nuxt-link to="/stories"
                        class="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition">
                        Explorer les histoires
                    </nuxt-link>
                    <nuxt-link to="/register" v-if="!user"
                        class="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                        Rejoindre la communauté
                    </nuxt-link>
                </div>
            </div>
        </section>

        <div class="bg-gray-50 dark:bg-transparent lg:pb-16">
            <!-- STORY SECTION -->
            <section class="max-w-7xl mx-auto px-6 lg:px-0 py-20">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="flex flex-col gap-6">
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">
                            Notre histoire
                        </h2>
                        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Afric Storyline est née d’un constat simple mais puissant :
                            les histoires africaines sont riches, profondes, uniques… mais encore trop peu visibles.
                        </p>
                        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Trop de talents restent dans l’ombre.
                            Trop d’histoires ne traversent jamais les frontières.
                        </p>
                        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Nous avons donc décidé de créer bien plus qu’une simple plateforme.
                            Un espace. Une voix. Un mouvement.
                        </p>
                    </div>
                    <div>
                        <img src="/assets/afric.png"
                            class="rounded-2xl shadow-lg hover:scale-105 transition duration-300" />
                    </div>
                </div>
            </section>
            <!-- MISSION CARDS -->
            <section class="bg-slate-100 dark:bg-slate-800 py-20 px-6 lg:px-0">
                <div class="max-w-7xl mx-auto">
                    <h2 class="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
                        Notre mission
                    </h2>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="p-6 rounded-2xl bg-white dark:bg-slate-700 shadow hover:shadow-lg transition">
                            <h3 class="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                                Révéler les talents
                            </h3>
                            <p class="text-slate-600 dark:text-slate-300">
                                Mettre en lumière les auteurs africains, connus ou émergents, et leur donner une
                                visibilité
                                mondiale.
                            </p>
                        </div>
                        <div class="p-6 rounded-2xl bg-white dark:bg-slate-700 shadow hover:shadow-lg transition">
                            <h3 class="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                                Expérience immersive
                            </h3>
                            <p class="text-slate-600 dark:text-slate-300">
                                Offrir une plateforme moderne, fluide et agréable pour lire et vivre chaque histoire.
                            </p>
                        </div>
                        <div class="p-6 rounded-2xl bg-white dark:bg-slate-700 shadow hover:shadow-lg transition">
                            <h3 class="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                                Construire un pont
                            </h3>
                            <p class="text-slate-600 dark:text-slate-300">
                                Connecter les auteurs africains avec des lecteurs du monde entier.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <!-- DIVERSITY SECTION -->
            <section class="max-w-7xl mx-auto px-6 lg:px-0 py-20">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="/assets/storyline.png"
                            class="rounded-2xl shadow-lg hover:scale-105 transition duration-300" />
                    </div>
                    <div class="flex flex-col gap-6">
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">
                            Une diversité unique
                        </h2>
                        <p class="text-slate-600 dark:text-slate-300">
                            L’Afrique n’est pas une seule histoire. C’est une infinité de voix.
                        </p>
                        <ul class="space-y-3 text-slate-600 dark:text-slate-300">
                            <li>• Romance</li>
                            <li>• Thriller</li>
                            <li>• Historique</li>
                            <li>• Fantastique inspiré des mythologies africaines</li>
                        </ul>
                        <p class="text-slate-600 dark:text-slate-300">
                            Chaque culture apporte sa couleur, son rythme et sa vérité.
                        </p>
                    </div>
                </div>
            </section>

            <!-- VISION SECTION -->
            <section
                class="bg-slate-900 dark:bg-slate-800 dark:lg:border max-w-7xl mx-auto lg:rounded-xl text-white py-20 px-6">
                <div class="max-w-5xl mx-auto text-center flex flex-col gap-6">
                    <h2 class="text-3xl md:text-4xl font-bold">
                        Notre vision
                    </h2>
                    <p class="text-slate-300 text-lg">
                        Et ce n’est que le début.
                    </p>
                    <p class="text-slate-300">
                        Afric Storyline ambitionne de transformer les meilleures histoires africaines en :
                    </p>
                    <ul class="space-y-2 text-slate-300">
                        <li>🎬 Films</li>
                        <li>🎌 Animés</li>
                        <li>📖 Mangas africains</li>
                    </ul>
                    <p class="text-slate-300">
                        Nous construisons un écosystème où les créateurs africains peuvent vivre de leur art.
                    </p>
                </div>
            </section>
        </div>

        <div class="relative overflow-hidden bg-lightOrange dark:bg-slate-800 px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div class="flex flex-col gap-8 md:gap-6 items-center">
                <div class="flex flex-col items-center">
                    <h2
                        class="text-3xl font-display font-medium dark:text-white text-center text-slate-900 tracking-tight">
                        Rejoignez notre communauté</h2>
                    <p class="text-slate-500 mt-1 dark:text-slate-200"> Plus on est de fous, plus on rit.
                    </p>
                </div>

                <div :class="`grid ${user ? 'grid-cols-2' : 'md:grid-cols-3'} gap-4 w-full md:w-auto`">
                    <nuxt-link target="_blank" to="https://chat.whatsapp.com/DvG5yaAyf7k4zbj2nbJtkH"
                        class="flex justify-center items-center gap-1 text-sm text-slate-900 hover:bg-green-600 transition-colors dark:text-slate-200 bg-green-500 rounded-lg p-2 md:px-4 lg:px-6 text-white">
                        <Icon name="mdi:whatsapp" class="w-7 h-7 lg:w-6 lg:h-6" />
                        <span class="">WhatsApp</span>
                    </nuxt-link>
                    <nuxt-link target="_blank" to="https://www.facebook.com/kola.aboudou.2025"
                        class="flex justify-center items-center gap-1 text-sm text-slate-900 hover:bg-blue-600 transition-colors dark:text-slate-200 bg-blue-500 rounded-lg p-2 md:px-4 lg:px-6 text-white">
                        <Icon name="mdi:facebook" class="w-7 h-7 lg:w-6 lg:h-6" />
                        <span class="">Facebook</span>
                    </nuxt-link>
                    <nuxt-link to="/register" v-if="!user"
                        class="col-span-2 md:col-span-1 flex justify-center items-center gap-1 text-sm text-slate-900 hover:bg-orange-600 transition-colors dark:text-slate-200 bg-orange-500 rounded-lg p-2 md:px-4 lg:px-6 text-white">
                        <Icon name="mdi:register" class="w-7 h-7 lg:w-6 lg:h-6" />
                        <span class="">S'inscrire</span>
                    </nuxt-link>
                </div>
            </div>
            <div
                class="absolute -bottom-6 -right-6 bg-orange-300 dark:bg-slate-700 w-16 h-16 md:w-24 md:h-24 rounded-full">
            </div>
            <div
                class="absolute -top-6 lg:-top-7 -left-8 bg-orange-300 dark:bg-slate-700 w-16 h-16 md:w-24 md:h-24 rounded-full">
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
useSeoMeta({
    title: 'À propos',
    description: 'Découvrez notre histoire et notre passion pour les histoires africaines.',

    ogTitle: 'À propos',
    ogDescription: 'Découvrez notre histoire et notre passion pour les histoires africaines.',
    ogImage: `${config.public.frontUrl}/afric.png`,
    ogUrl: `${config.public.frontUrl}`,
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'À propos',
    twitterDescription: 'Découvrez notre histoire et notre passion pour les histoires africaines.',
    twitterImage: `${config.public.frontUrl}/afric.png`
});

const { toConnectUser } = authenticate();
const user = ref<User | null>(null);

onMounted(async () => {
    user.value = await toConnectUser();
})
</script>
