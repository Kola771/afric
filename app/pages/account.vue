<template>
    <div
        class="font-sans antialiased text-slate-800 selection:bg-orange-100 flex flex-col justify-center items-center selection:text-orange-900 h-screen">
        <div class="mx-auto w-full px-2 sm:px-0 sm:max-w-sm lg:max-w-lg py-8" v-if="showForm">

            <!-- Logo -->
            <div class="mb-8">
                <div class="flex items-center gap-2 group w-fit">
                    <div
                        class="w-8 h-8 dark:border dark:border-slate-300 dark:bg-slate-800 bg-slate-900 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-95">
                        <Icon name="solar:book-2-bold" class="w-5 h-5" />
                    </div>
                    <span class="font-display font-medium text-slate-900 tracking-tight text-sm dark:text-white">Afric
                        <span class="text-orange-600 dark:text-orange-500">Storyline</span></span>
                </div>
            </div>

            <!-- Header -->
            <div>
                <h2 class="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">Finalisez la création de votre compte</h2>
            </div>
            <form @submit.prevent="finishRegisterFunction" class="space-y-5 mt-4" id="registerForm">
                <!-- Pseudonyme -->
                <div class="col-span-1">
                    <label for="pseudo"
                        class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Pseudonyme</label>
                    <div class="mt-1 relative">
                        <input id="pseudo" name="pseudo" type="text" v-model="pseudonym" required
                            class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200 pl-9"
                            placeholder="@lack_s">
                        <div
                            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon name="mdi:user-outline" class="w-6 h-6 lg:w-5 lg:h-5" />
                        </div>
                    </div>
                </div>

                <!-- Choix du rôle -->
                <div>
                    <label class="block text-xs font-medium text-slate-900 dark:text-white mb-2">
                        Je souhaite utiliser Afric Storyline en tant que :
                    </label>

                    <div class="grid grid-cols-2 gap-3">
                        <!-- Lecteur -->
                        <div @click="selectRole(5)" :class="`cursor-pointer border rounded-lg p-3 text-center text-sm transition-all dark:text-slate-200 
            ${role === 5 ? 'border-orange-600 bg-orange-50 dark:bg-slate-700' : 'border-slate-300 bg-white dark:bg-slate-700'}`">
                            📖 Lecteur
                        </div>

                        <!-- Auteur -->
                        <div @click="selectRole(4)" :class="`cursor-pointer border rounded-lg p-3 text-center text-sm transition-all dark:text-slate-200 
            ${role === 4 ? 'border-orange-600 bg-orange-50 dark:bg-slate-700' : 'border-slate-300 bg-white dark:bg-slate-700'}`">
                            ✍️ Auteur
                        </div>
                    </div>
                </div>

                <!-- Bibliographie -->
                <div v-if="author">
                    <div class="flex justify-between items-center">
                        <label for="bio"
                            class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Bibliographie</label>
                    </div>
                    <div class="mt-1 relative">
                        <textarea id="bio" name="bio" rows="3" v-model="bibliography"
                            class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200 pl-3 resize-none"
                            placeholder="Votre bibliographie..."></textarea>
                    </div>
                </div>

                <div class="relative">
                    <label for="pays" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">
                        Pays d'origine
                    </label>

                    <!-- Input -->
                    <input id="pays" type="text" v-model="countrySearch" @focus="showDropdown = true"
                        @blur="hideDropdown" placeholder="Entrez votre pays"
                        class="mt-1 block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200 pl-3" />

                    <!-- Dropdown -->
                    <ul v-if="showDropdown && filteredCountries.length"
                        class="absolute z-50 w-full bg-white dark:bg-slate-800 border border-slate-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                        <li v-for="(c, index) in filteredCountries" :key="index" @mousedown.prevent="selectCountry(c)"
                            class="px-3 py-2 text-sm cursor-pointer hover:bg-orange-100 dark:hover:bg-slate-700 dark:text-slate-200"
                            :class="index !== filteredCountries.length - 1 ? 'border-b-[1px] border-slate-300' : ''">
                            {{ c.name }}
                        </li>
                    </ul>
                </div>

                <p v-if="error" class="text-xs text-center font-medium text-red-600 dark:text-red-500 mt-1">
                    {{ error }}</p>

                <div>
                    <button :disabled="submitDisabled" type="submit" id="submitBtn"
                        :class="`dark:border flex w-full justify-center rounded-lg px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed ${loading === 'end' ? 'bg-orange-600 dark:bg-orange-500' : 'hover:bg-slate-800 bg-slate-900'}`">
                        <span class="flex justify-center items-center gap-2" v-if="loading === ''">
                            <Icon name="mdi:loading" class="w-5 h-5 animate-spin" />
                            Validation en cours
                        </span>
                        <span class="flex justify-center items-center gap-2" v-else-if="loading === 'end'">
                            <Icon name="mdi:check" class="w-5 h-5" />
                            Validation terminée
                        </span>
                        <span class="flex justify-center items-center gap-2" v-else>
                            Valider mon compte
                            <Icon name="mdi:arrow-right" class="w-5 h-5" />
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    layout: "not-layout",
});

useSeoMeta({
    title: 'Connexion en cours',
});

const { authorizePage, getTokenCookies } = authenticate();
const { allCountrieActifs } = countriesData();
const { finishRegister } = authForm();
const router = useRouter();

const submitDisabled = ref(true)
const showForm = ref<boolean>(false);
const author = ref<boolean>(false);
const countries = ref<Country[]>([]);
const country = ref<number | null>(null);
const pseudonym = ref<string>("");
const bibliography = ref<string>("");
const error = ref<string>("");
const data = ref<any>(null);
const role = ref<number | null>(null);
const loading = ref<'start' | '' | 'end' | 'error'>('start');

const selectRole = (value: number) => {
    role.value = value;
    author.value = value === 4;

    // reset bio si lecteur
    if (value === 5) {
        bibliography.value = "";
    }

    validateForm();
};

const countrySearch = ref('');
const showDropdown = ref(false);

const filteredCountries = computed(() => {
    if (!countrySearch.value) return countries.value;

    return countries.value.filter((c: Country) =>
        c.name?.toLowerCase().includes(countrySearch.value.toLowerCase())
    );
});

const selectCountry = (c: Country) => {
    country.value = c.id; // valeur envoyée au backend
    countrySearch.value = c.name || ''; // affichage
    showDropdown.value = false;
};

const hideDropdown = () => {
    setTimeout(() => {
        showDropdown.value = false;
    }, 200); // permet de cliquer avant fermeture
};

const finishRegisterFunction = async () => {
    try {
        error.value = "";
        loading.value = '';

        // validation finale
        if (!role.value) {
            error.value = "Veuillez choisir un rôle";
            loading.value = 'error';
            return;
        }

        if (!pseudonym.value || pseudonym.value.length < 3) {
            error.value = "Pseudonyme invalide (min 3 caractères)";
            loading.value = 'error';
            return;
        }

        if (!country.value) {
            error.value = "Veuillez choisir un pays";
            loading.value = 'error';
            return;
        }

        if (role.value === 4 && bibliography.value.length < 10) {
            error.value = "Bibliographie trop courte (min 10 caractères)";
            loading.value = 'error';
            return;
        }

        
        const res = await finishRegister(data.value.uuid, { pseudonym: pseudonym.value, country: country.value, role: role.value, bibliography: role.value === 4 ? bibliography.value : null }, data.value.token);
        if (res.success) {
            loading.value = 'end';
            setTimeout(() => {
                router.push('/');
            }, 1500);
        } else {
            error.value = res.error || "";
        }

    } catch (err: any) {
        loading.value = 'error';
        error.value = err?.data?.message || "Une erreur est survenue";
    }
};

const validateForm = () => {
    loading.value = "start";
    error.value = "";
    if (!pseudonym.value || pseudonym.value.length < 3) {
        submitDisabled.value = true;
        return;
    }

    if (!country.value) {
        submitDisabled.value = true;
        return;
    }

    if (!role.value) {
        submitDisabled.value = true;
        return;
    }

    if (role.value === 4 && bibliography.value && bibliography.value.length < 10) {
        error.value = "Bibliographie trop courte (min 10 caractères)";
        loading.value = 'error';
        return;
    }

    submitDisabled.value = false;
};

watch([pseudonym, country, bibliography, role], () => {
    validateForm();
});

onMounted(async () => {
    countries.value = await allCountrieActifs();
    await authorizePage();
    data.value = await getTokenCookies();
    if (!data.value?.role || !data.value?.country) {
        showForm.value = true;
        pseudonym.value = data.value?.pseudonym || "";
    } else {
        localStorage.setItem("user", JSON.stringify(data.value));
        setTimeout(() => {
            router.push('/');
        }, 1500);
    }
})
</script>