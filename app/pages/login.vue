<template>
    <div class="font-sans antialiased text-slate-800 selection:bg-orange-100 selection:text-orange-900">
        <div class="flex min-h-screen">

            <!-- LEFT COLUMN: Login Form -->
            <div
                class="flex dark:lg:border flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-dark z-10 relative">
                <div class="mx-auto w-full max-w-sm lg:w-96">

                    <!-- Logo -->
                    <div class="mb-10">
                        <nuxt-link to="/" class="flex items-center gap-2 group w-fit">
                            <div
                                class="w-8 h-8 dark:border dark:border-slate-300 dark:bg-slate-800 bg-slate-900 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-95">
                                <Icon name="solar:book-2-bold" class="w-5 h-5" />
                            </div>
                            <span
                                class="font-display font-medium text-slate-900 tracking-tight text-sm dark:text-white">Afric
                                <span class="text-orange-600 dark:text-orange-500">Storyline</span></span>
                        </nuxt-link>
                    </div>
                    <!-- Header -->
                    <div>
                        <h2 class="mt-6 text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                            Bon retour parmi nous</h2>
                        <p class="mt-2 text-sm text-slate-500 dark:text-slate-200">
                            Vous n'avez pas de compte ?
                            <nuxt-link to="/register"
                                class="font-medium text-orange-600 dark:text-orange-500 hover:text-orange-500 transition-colors hover:underline">S'inscrire
                                gratuitement</nuxt-link>
                        </p>
                    </div>
                    <!-- Form Section -->
                    <div class="mt-8">
                        <!-- Social Login -->
                        <!-- <div class="grid grid-cols-2 gap-3">
                            <button class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all">
                                <img src="/assets/google.svg" alt="Google" class="w-6 h-6 lg:w-5 lg:h-5" />
                                <span class="hidden sm:inline">Google</span>
                            </button>
                            <button class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all">
                                <Icon name="mdi:apple" class="w-6 h-6 lg:w-5 lg:h-5" />
                                <span class="hidden sm:inline">Apple</span>
                            </button>
                        </div>
                        <div class="relative mt-6">
                            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                <div class="w-full border-t border-slate-100"></div>
                            </div>
                            <div class="relative flex justify-center text-xs font-medium leading-6">
                                <span class="bg-white dark:bg-dark px-4 text-slate-400">Ou continuer avec l'email</span>
                            </div>
                        </div> -->
                        <!-- Main Form -->
                        <form @submit.prevent="handleLogin" class="mt-6 space-y-5">
                            <!-- Pseudonyme Input -->
                            <div>
                                <label for="pseudonym"
                                    class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Votre
                                    pseudonyme</label>
                                <div class="mt-1.5 relative">
                                    <input id="pseudonym" name="pseudonym" type="text" v-model="pseudonym" required
                                        class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3"
                                        placeholder="@lay_sc45">
                                </div>
                            </div>
                            <!-- Password Input -->
                            <div>
                                <label for="password"
                                    class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Mot de
                                    passe</label>
                                <div class="mt-1.5 relative">
                                    <input id="password" name="password" :type="showPassword ? 'text' : 'password'"
                                        v-model="password" placeholder="**********" required
                                        class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3 pr-10">
                                    <button @click="showPassword = !showPassword" type="button"
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors">
                                        <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <!-- Remember & Forgot -->
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" v-model="accept"
                                        class="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-600 accent-orange-600 dark:border-slate-800 dark:text-orange-600">
                                    <label for="remember-me"
                                        class="ml-2 block text-xs text-slate-600 dark:text-white">Se souvenir de
                                        moi</label>
                                </div>
                                <div class="text-xs">
                                    <nuxt-link to="/forget-password"
                                        class="font-medium text-orange-600 hover:text-orange-500 hover:underline dark:text-orange-500">Mot
                                        de passe oublié ?</nuxt-link>
                                </div>
                            </div>

                            <p v-if="errorMsg" class="text-xs text-center font-medium text-red-600 mt-2">{{ errorMsg }}
                            </p>

                            <div>
                                <button type="submit"
                                    :class="`dark:border flex w-full justify-center rounded-lg px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all items-center gap-2 group ${loadingButton === 'end' ? 'bg-orange-600 dark:bg-orange-500' : 'hover:bg-slate-800 bg-slate-900'}`">
                                    <span class="flex justify-center items-center gap-2" v-if="loadingButton === ''">
                                        <Icon name="mdi:loading" class="w-5 h-5 animate-spin" />
                                        Connexion en cours
                                    </span>
                                    <span class="flex justify-center items-center gap-2"
                                        v-else-if="loadingButton === 'end'">
                                        <Icon name="mdi:check" class="w-5 h-5" />
                                        Connexion terminée
                                    </span>
                                    <span class="flex justify-center items-center gap-2" v-else>
                                        Se connecter
                                        <Icon name="mdi:arrow-right" class="w-5 h-5" />
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <!-- Footer Links -->
                    <div class="mt-10 border-t border-slate-100 pt-6">
                        <div class="flex justify-center gap-6 text-xs text-slate-400">
                            <nuxt-link to="/conditions"
                                class="hover:text-slate-600 transition-colors hover:underline">Conditions</nuxt-link>
                            <nuxt-link to="/privacy-policy"
                                class="hover:text-slate-600 transition-colors hover:underline">Confidentialité</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- RIGHT COLUMN: Image & Branding -->
            <div class="relative hidden w-0 flex-1 lg:block bg-slate-900">
                <!-- Background Image -->
                <img class="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
                    src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop"
                    alt="African Pattern Background">

                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/10"></div>
                <!-- Content overlay -->
                <div class="absolute inset-0 flex flex-col justify-between p-12 text-white">
                    <div class="flex justify-end">
                        <div
                            class="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            Nouveautés disponibles
                        </div>
                    </div>

                    <div class="max-w-md">
                        <blockquote class="text-2xl font-serif leading-snug text-slate-100 mb-6">
                            "La littérature est la preuve la plus éclatante que la vie ne suffit pas."
                        </blockquote>
                        <div class="flex items-center gap-4">
                            <img src="/assets/fernando.webp"
                                class="h-10 w-10 rounded-full border-2 border-orange-500/50" alt="Author">
                            <div>
                                <div class="text-sm font-medium text-white">Fernando Pessoa</div>
                                <div class="text-xs text-slate-400">Auteur & Critique Littéraire</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const router = useRouter();
const { pseudonym, password, login } = authForm();
const { authorizePage } = authenticate();

definePageMeta({
    layout: "not-layout",
});

useSeoMeta({
    title: 'Connexion',
    description: 'Connectez-vous sur Afric Storyline pour accéder à vos histoires préférées et bien plus.',
    ogTitle: 'Connexion',
    ogDescription: 'Connectez-vous sur Afric Storyline pour accéder à vos histoires préférées et bien plus.',
    ogImage: 'https://africstoryline.com/afric.png',
    ogUrl: 'https://africstoryline.com/',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Connexion',
    twitterDescription: 'Connectez-vous sur Afric Storyline pour accéder à vos histoires préférées et bien plus.',
    twitterImage: 'https://africstoryline.com/afric.png'
});

const accept = ref<boolean>(true);
const errorMsg = ref<string>(''); // Message d'erreur pour affichage
const loading = ref(false);       // Indicateur de chargement
const showPassword = ref(false);  // Indicateur pour afficher/masquer le mot de passe
const loadingButton = ref<'start' | '' | 'end' | 'error'>('start');

const handleLogin = async () => {
    errorMsg.value = '';
    loadingButton.value = "";

    // 1️⃣ Vérifier email
    if (!pseudonym.value || pseudonym.value.trim() === "") {
        loadingButton.value = "error";
        errorMsg.value = 'Veuillez entrer votre pseudonyme.';
        return;
    }

    // 2️⃣ Vérifier mot de passe
    if (!password.value || password.value.length < 8) {
        loadingButton.value = "error";
        errorMsg.value = 'Le mot de passe doit contenir au moins 8 caractères.';
        return;
    }

    // 3️⃣ Vérifier "Se souvenir de moi" si nécessaire
    if (!accept.value) {
        loadingButton.value = "error";
        errorMsg.value = 'Veuillez accepter de vous souvenir de vous.';
        return;
    }

    // ✅ Tout est valide, on envoie la requête
    loading.value = true;
    try {
        const res = await login();
        if (res.success) {
            setTimeout(() => {
                loadingButton.value = "end";
            }, 2000);
            setTimeout(() => {
                if (res.data && res.data.status === 'inactif') {
                    router.push("/authorization");
                } else {
                    router.back();
                }
            }, 3000);
        } else {
            loadingButton.value = "error";
            errorMsg.value = res.error;
        }
    } catch (err) {
        console.error(err);
        errorMsg.value = 'Échec de la connexion, vérifiez vos identifiants.';
    } finally {
        loading.value = false;
    }
}

watch(() => accept.value, () => {
    if (accept.value) {
        errorMsg.value = '';
    }
});

onMounted(async () => {
    await authorizePage();
})
</script>