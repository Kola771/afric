<template>
    <div>
        <div class="flex h-full">
        
            <div class="flex dark:lg:border flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-dark z-10 relative overflow-y-auto min-h-screen scrollbar-hide">
                <div class="mx-auto w-full max-w-sm lg:w-[420px] py-8">
                    
                    <!-- Logo -->
                    <div class="mb-8">
                        <nuxt-link to="/" class="flex items-center gap-2 group w-fit">
                            <div class="w-8 h-8 dark:border dark:border-slate-300 dark:bg-slate-800 bg-slate-900 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-95">
                                <Icon name="solar:book-2-bold" class="w-5 h-5" />
                            </div>
                            <span class="font-display font-medium text-slate-900 tracking-tight text-sm dark:text-white">Afric <span class="text-orange-600 dark:text-orange-500">Storyline</span></span>
                        </nuxt-link>
                    </div>

                    <!-- Header -->
                    <div>
                        <h2 class="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">Créer un compte auteur</h2>
                        <p class="mt-2 text-sm text-slate-500 dark:text-slate-200">
                            Déjà membre ? 
                            <nuxt-link to="/login" class="font-medium text-orange-600 dark:text-orange-500 hover:text-orange-500 transition-colors hover:underline">Se connecter</nuxt-link>
                        </p>
                    </div>

                    <!-- Form Section -->
                    <div class="mt-8">
                        <form @submit.prevent="registerFunction" class="space-y-5" id="registerForm">
                            
                            <!-- Grid for Name & Pseudo -->
                            <div class="grid grid-cols-2 gap-4">
                                <!-- Nom (New) -->
                                <div class="col-span-1">
                                    <label for="fullname" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Nom complet</label>
                                    <div class="mt-1 relative">
                                        <input id="fullname" name="fullname" type="text" v-model="full_name" required 
                                            class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3"
                                            placeholder="Votre nom">
                                    </div>
                                </div>

                                <!-- Pseudonyme -->
                                <div class="col-span-1">
                                    <label for="pseudo" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Pseudonyme</label>
                                    <div class="mt-1 relative">
                                        <input id="pseudo" name="pseudo" type="text" v-model="pseudonym" required 
                                            class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-9"
                                            placeholder="@lack_s">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Icon name="mdi:user-outline" class="w-6 h-6 lg:w-5 lg:h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label for="pays" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Pays d'origine</label>
                                <select required id="pays" name="pays" v-model="country" class="mt-1 block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all p-3">
                                    <option :value="0" disabled selected>Pays d'origine</option>
                                    <option :value="country.id" v-for="(country, index) in countries" :key="index">{{ country.name }}</option>
                                </select>
                            </div>
                            <!-- Email -->
                            <div v-if="showEmailInput">
                                <label for="email" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Adresse email</label>
                                <div class="mt-1 relative">
                                    <input id="email" name="email" type="email" autocomplete="email" v-model="email" required 
                                        class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3"
                                        placeholder="exemple@email.com">
                                </div>
                            </div>

                            <!-- Mot de passe -->
                            <div class="grid grid-cols-2 gap-4">
                                <div class="col-span-2 sm:col-span-1">
                                    <label for="password" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Mot de passe</label>
                                    <div class="mt-1 relative">
                                        <input v-model="password" id="password" name="password" type="password" placeholder="**********" required 
                                            class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3 pr-10">
                                    </div>
                                </div>

                                <div class="col-span-2 sm:col-span-1">
                                    <label for="confirm_password" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Confirmation</label>
                                    <div class="mt-1 relative">
                                        <input v-model="confirmPassword" id="confirm_password" name="confirm_password" type="password" placeholder="**********" required 
                                            class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3 pr-10">
                                        
                                        <!-- Status Icon -->
                                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <Icon id="status-icon" name="solar:check-circle-linear" width="20" class="hidden" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Password Strength & Match Feedback -->
                            <div class="space-y-2">
                                <!-- Strength meter -->
                                <div class="flex gap-1 h-1 w-full">
                                    <div v-for="(bar, i) in strengthClasses"
                                        :key="i"
                                        class="flex-1 rounded-full transition-colors duration-300"
                                        :class="bar">
                                    </div>
                                </div>

                                <!-- Match Text -->
                                <p v-if="password && !hasTrimmedPassword"
                                class="text-xs font-medium text-red-600 dark:text-red-500 mt-1">
                                    Pas de vide
                                </p>

                                <p v-if="password && !hasMinLength && hasTrimmedPassword"
                                class="text-xs font-medium text-red-600 dark:text-red-500 mt-1">
                                    Votre mot de passe doit contenir au moins 8 caractères
                                </p>

                                <p v-if="password && !hasUppercase && hasTrimmedPassword"
                                class="text-xs font-medium text-red-600 dark:text-red-500 mt-1">
                                    Votre mot de passe doit contenir au moins une majuscule
                                </p>

                                <p v-if="isPasswordValid && isMatch === true"
                                class="text-xs font-medium text-green-600 dark:text-green-500 mt-1">
                                    Les mots de passe correspondent
                                </p>

                                <p v-else-if="isPasswordValid && isMatch === false"
                                class="text-xs font-medium text-red-600 dark:text-red-500 mt-1">
                                    Les mots de passe ne correspondent pas
                                </p>
                            </div>

                            <!-- Bibliographie -->
                            <div v-if="author">
                                <div class="flex justify-between items-center">
                                    <label for="bio" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Bibliographie</label>
                                    <span class="text-xs scale-90 origin-right text-slate-400 dark:text-slate-200">Optionnel</span>
                                </div>
                                <div class="mt-1 relative">
                                    <textarea id="bio" name="bio" rows="3" v-model="bibliography"
                                        class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3 resize-none"
                                        placeholder="Votre bibliographie..."></textarea>
                                </div>
                            </div>

                            <!-- Checkbox Legal -->
                            <div class="flex items-start">
                                <div class="flex h-5 items-center">
                                    <input id="terms" name="terms" type="checkbox" v-model="accept" required
                                        class="h-4 w-4 rounded border-slate-300 text-orange-600 dark:focus:ring-orange-500 focus:ring-orange-600 accent-orange-600">
                                </div>
                                <div class="ml-3 text-xs leading-5">
                                    <label for="terms" class="text-slate-600 dark:text-white">J'accepte les <nuxt-link to="/conditions" class="font-medium text-orange-600 hover:text-orange-500 hover:underline dark:text-orange-500">Conditions</nuxt-link> et la <nuxt-link to="/privacy-policy" class="font-medium text-orange-600 hover:text-orange-500 hover:underline dark:text-orange-500">Politique</nuxt-link>.</label>
                                </div>
                            </div>

                            <p v-if="error" class="text-xs text-center font-medium text-red-600 dark:text-red-500 mt-1">{{ error }}</p>

                            <div>
                                <button :disabled="submitDisabled" type="submit" id="submitBtn" :class="`dark:border flex w-full justify-center rounded-lg px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed ${loading === 'end' ? 'bg-orange-600 dark:bg-orange-500' : 'hover:bg-slate-800 bg-slate-900'}`">
                                    <span class="flex justify-center items-center gap-2" v-if="loading === ''">
                                        <Icon name="mdi:loading" class="w-5 h-5 animate-spin" />
                                        Inscription en cours
                                    </span>
                                    <span class="flex justify-center items-center gap-2" v-else-if="loading === 'end'">
                                        <Icon name="mdi:check" class="w-5 h-5" />
                                        Inscription terminée
                                    </span>
                                    <span class="flex justify-center items-center gap-2" v-else>
                                        Créer mon compte
                                        <Icon name="mdi:arrow-right" class="w-5 h-5" />
                                    </span>
                                </button>
                            </div>
                        </form>

                        <!-- Divider -->
                        <!-- <div class="relative mt-8">
                            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                <div class="w-full border-t border-slate-100"></div>
                            </div>
                            <div class="relative flex justify-center text-xs font-medium leading-6">
                                <span class="bg-white dark:bg-dark px-4 text-slate-400">Ou s'inscrire avec</span>
                            </div>
                        </div>

                        <div class="mt-6 grid grid-cols-2 gap-3">
                            <button class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all">
                                <img src="/assets/google.svg" alt="Google" class="w-6 h-6 lg:w-5 lg:h-5" />
                                <span class="hidden sm:inline">Google</span>
                            </button>
                            <button class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all">
                                <Icon name="mdi:apple" class="w-6 h-6 lg:w-5 lg:h-5" />
                                <span class="hidden sm:inline">Apple</span>
                            </button>
                        </div> -->
                    </div>
                </div>
            </div>

            <div class="relative hidden w-0 flex-1 lg:block bg-slate-900">
                <!-- Background Image -->
                <img class="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay" src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop" alt="African Pattern Background">
            
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/10"></div>
                <!-- Content overlay -->
                <div class="absolute inset-0 flex flex-col justify-between p-12 text-white h-screen">
                    <div class="flex justify-end">
                        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide flex items-center gap-2">
                            <Icon name="mdi:users" class="w-5 h-5 text-orange-600 dark:text-orange-500" />
                            +20 auteurs
                        </div>
                    </div>
            
                    <div class="max-w-md">
                    <Icon name="solar:pen-new-square-linear" class="w-8 h-8 text-orange-500 mb-6 opacity-80"></Icon>
                    <blockquote class="text-2xl font-serif leading-snug text-slate-100 mb-6">
                        "L'écriture est une torche qui éclaire le chemin de la mémoire vers l'avenir."
                    </blockquote>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "not-layout",
})

useSeoMeta({
    title: 'Inscription',
    description: 'Inscrivez-vous sur Afric Storyline pour accéder à vos histoires préférées et bien plus.',

    ogTitle: 'Inscription',
    ogDescription: 'Inscrivez-vous sur Afric Storyline pour accéder à vos histoires préférées et bien plus.',
    ogImage: 'https://africstoryline.com/afric.png',
    ogUrl: 'https://africstoryline.com/',
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'Inscription',
    twitterDescription: 'Inscrivez-vous sur Afric Storyline pour accéder à vos histoires préférées et bien plus.',
    twitterImage: 'https://africstoryline.com/afric.png'
});

const { full_name, pseudonym, bibliography, country, email, password, role, register } = registerForm();
const { allCountrieActifs } = countriesData();
const { authorizePage } = authenticate();
const router = useRouter();

const confirmPassword = ref('')
const submitDisabled = ref(true)
const hasTrimmedPassword = computed(() => password.value.trim() !== "")
const hasMinLength = computed(() => password.value.length >= 8)
const hasUppercase = computed(() => /[A-Z]/.test(password.value));
const author = ref<boolean>(false);
const accept = ref<boolean>(false);
const countries = ref<Country[]>([]);
const error = ref<string>("");
const showEmailInput = ref<boolean>(false);
const loading = ref<'start' | '' | 'end' | 'error'>('start');

const isPasswordValid = computed(() => {
  return hasTrimmedPassword.value && hasMinLength.value && hasUppercase.value
})

// ===== Password Strength =====
const strength = computed(() => {
  let score = 0

  if (hasMinLength.value) score++
  if (hasUppercase.value) score++
  if (/[0-9]/.test(password.value)) score++
  if (/[^A-Za-z0-9]/.test(password.value)) score++

  return score
})

const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
)

const isFormValid = computed(() => {
  return (
    full_name.value.trim() &&
    pseudonym.value.trim() &&
    pseudonym.value.trim().length >= 3 &&
    country.value &&
    (showEmailInput.value === true ? isEmailValid.value : true) &&
    isPasswordValid.value &&
    isMatch.value === true &&
    accept.value === true
     )
})

const registerFunction = async () => {
    loading.value = "";
    error.value = "";
    const res = await register();
    if(res.success) {
        setTimeout(() => {
            loading.value = "end";
        }, 2000);
        setTimeout(() => {
            router.push("/")
        }, 1500);
    } else {
        loading.value = "error";
        error.value = res.error;
    }
}

const strengthClasses = computed(() => {
  if (strength.value === 0) return ['bg-slate-100','bg-slate-100','bg-slate-100','bg-slate-100']
  if (strength.value === 1) return ['bg-red-500','bg-slate-100','bg-slate-100','bg-slate-100']
  if (strength.value === 2) return ['bg-orange-500','bg-orange-500','bg-slate-100','bg-slate-100']
  if (strength.value === 3) return ['bg-orange-400','bg-orange-400','bg-orange-400','bg-slate-100']
  return ['bg-green-500','bg-green-500','bg-green-500','bg-green-500']
})

// ===== Password Match =====
const isMatch = computed(() => {
  if (!confirmPassword.value) return null
  return password.value === confirmPassword.value
})

watch(isFormValid, (val) => {
  submitDisabled.value = !val
})

onMounted(async () => {
    if(process.client) {
        await authorizePage();
        const countriesData = await allCountrieActifs();
        countries.value = countriesData;
        author.value = localStorage.getItem('register_author') === 'true';
        role.value = author.value ? 4 : 5;
        email.value = localStorage.getItem('register_email') || '';
        showEmailInput.value = localStorage.getItem('register_email') ? true : (role.value === 4 ? true : false);
    }
})
</script>