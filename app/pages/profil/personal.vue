<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b-[1px]">
        <div class="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12" v-if="user">
            <div class="flex flex-col gap-4 lg:gap-6">
                <div
                    class="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg border-slate-300 border-[1px]">
                    <button @click="back"
                        class="py-2 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Icon name="mdi:arrow-left" class="w-4 h-4" />
                    </button>
                    <h2 class="text-[17px] md:text-lg font-display font-bold text-slate-900 dark:text-white tracking-tight">
                        Paramètres</h2>
                </div>
                <div
                    class="flex flex-col gap-1 bg-white dark:bg-slate-800 p-4 rounded-lg border-slate-300 border-[1px]">
                    <h2
                        class="text-[16px] flex items-center gap-2 font-display font-bold text-slate-900 dark:text-white tracking-tight">
                        <Icon name="mdi:edit" class="w-4 h-4 text-orange-500" /> Modifier vos informations
                    </h2>
                    <div>
                        <h3 class="text-[15px] font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                            Bonjour, {{ user?.name || 'Utilisateur' }} 👋</h3>
                        <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Faîtes une mise à jour de vos
                            informations personnelles !</p>
                    </div>
                </div>
            </div>
            <form class="flex flex-col gap-4" @submit.prevent="changeData">
                <div class="grid grod-cols-1 gap-4 lg:grid-cols-2">
                    <div class="flex flex-col gap-1">
                        <label for="fullname" class="text-sm text-slate-900 font-medium dark:text-white">Nom complet
                            :</label>
                        <input type="text" id="fullname" v-model="name"
                            class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="username" class="text-sm text-slate-900 font-medium dark:text-white">Pseudonyme
                            :</label>
                        <input type="text" id="username" v-model="pseudonym"
                            class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                    </div>
                </div>
                <div class="grid grod-cols-1 gap-4 lg:grid-cols-4">
                    <div class="flex flex-col gap-1 lg:col-span-3 lg:order-2">
                        <label for="email" class="text-sm text-slate-900 font-medium dark:text-white">Adresse
                            électronique :</label>
                        <input type="email" id="email" v-model="email"
                            class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="color" class="text-sm text-slate-900 font-medium dark:text-white">Couleur :</label>
                        <input type="color" id="color" v-model="code_color"
                            class="block w-full h-14 lg:h-10 rounded-lg border-0 p-2.5 lg:p-1.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="bio"
                        class="text-sm text-slate-900 font-medium dark:text-white flex items-center justify-between">Bibliographie
                        : <span
                            class="font-normal text-slate-500 dark:text-slate-200 text-xs">(Optionnel)</span></label>
                    <textarea id="bio" name="bio" rows="3" v-model="bibliography"
                        class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200 pl-3 resize-none"
                        placeholder="Ma bibliographie..."></textarea>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="pays" class="text-sm text-slate-900 font-medium dark:text-white flex items-center justify-between">
                        Pays d'origine
                    </label>

                    <div class="relative">
                        <!-- Input -->
                        <input id="pays" type="text" v-model="countrySearch" @focus="showDropdown = true"
                            @blur="hideDropdown" placeholder="Entrez votre pays"
                            class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200 pl-3" />
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
                </div>
                <div>
                    <label class="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-1">
                        Vos préférences :
                    </label>

                    <div class="flex flex-wrap gap-2">
                        <label v-for="category in categories" :key="category.id" class="cursor-pointer group">
                            <input type="checkbox" class="peer sr-only" :value="category.id"
                                v-model="selectedCategories">

                            <div class="rounded-md px-3 py-2.5 lg:py-2 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all 
                            peer-checked:border-orange-500 
                            peer-checked:text-orange-600 
                            peer-checked:bg-orange-50 
                            hover:bg-slate-50 flex items-center gap-1.5 dark:bg-transparent dark:text-slate-200">
                                <img :src="category.image?.includes('https') ? category.image : `${$config.public.apiBackendUrl}/uploads/categories/${category.image}`"
                                    :alt="category.name" class="w-5 h-5 rounded">
                                <span>{{ category.name }}</span>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="bg-white dark:bg-slate-800 px-4 py-6 rounded-lg border-slate-300 border-[1px] flex flex-col gap-4"
                    v-if="profil && profil.role.toLocaleLowerCase() !== 'lecteur'">
                    <p class="text-sm font-medium text-slate-700 dark:text-slate-200">Publiez-vous également sur
                        d’autres réseaux sociaux ?
                        <br />
                        Si oui, merci de renseigner les liens correspondants dans les champs ci-dessous.
                    </p>
                    <div class="grid grod-cols-1 gap-4 lg:grid-cols-3">
                        <div class="flex flex-col gap-1">
                            <label for="whatsapp" class="text-sm text-slate-900 font-medium dark:text-white">Lien
                                whatsapp :</label>
                            <input type="text" id="whatsapp" v-model="whatsapp" placeholder="https://wa..."
                                class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="facebook" class="text-sm text-slate-900 font-medium dark:text-white">Lien
                                facebook :</label>
                            <input type="text" id="facebook" v-model="facebook" placeholder="https://fa..."
                                class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="other" class="text-sm text-slate-900 font-medium dark:text-white">Autre lien
                                :</label>
                            <input type="text" id="other" v-model="other" placeholder="https://..."
                                class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                        </div>
                    </div>
                </div>

                <div v-if="error" class="text-xs text-center font-medium text-red-500 mt-2">{{ error }}</div>
                <div v-if="message" class="text-xs text-center font-medium text-green-500 mt-2">{{ message }}</div>

                <div class="mt-2 flex flex-col md:flex-row md:justify-end">
                    <button
                        class="px-4 py-2.5 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors">Enregistrer
                        les modifications</button>
                </div>
            </form>
            <div class="flex flex-col gap-1 bg-white dark:bg-slate-800 p-4 rounded-lg border-slate-300 border-[1px]">
                <h2
                    class="text-[17px] md:text-lg flex items-center gap-2 font-display font-bold text-slate-900 dark:text-white tracking-tight">
                    <Icon name="mdi:logout" class="w-4 h-4 text-red-500" /> Se déconnecter
                </h2>

                <div class="tracking-tight text-slate-500 dark:text-slate-200 text-sm">
                    <p>Cliquez sur ce bouton pour vous déconnecter de cette session.</p>
                    <button @click="logout"
                        class="mt-2 bg-red-600 hover:bg-red-700 duration-300 ease-linear text-white px-4 py-2 rounded-md">Déconnexion</button>
                </div>
            </div>
        </div>

        <div v-else class="h-96 flex items-center justify-center">

            <div role="status">
                <svg aria-hidden="true" class="w-12 h-12 animate-spin fill-orange-600" viewBox="0 0 100 101" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>

        </div>
    </div>
</template>
<script lang="ts" setup>
const { allCountrieActifs } = countriesData();
const { allCategorieActifs } = categoriesData();
const { changePersonalData } = authForm();
const { toConnectUser, logout } = authenticate();
const { getProfile, } = usersData();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const name = ref<string>("");
const pseudonym = ref<string>("");
const bibliography = ref<string>("");
const email = ref<string>("");
const whatsapp = ref<string>("");
const facebook = ref<string>("");
const other = ref<string>("");
const code_color = ref<string>("");
const country = ref<number>(0);
const countries = ref<Country[]>([]);
const categories = ref<Category[]>([]);
const selectedCategories = ref<number[]>([]);
const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);
const router = useRouter();

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

const back = () => {
    router.back();
}

const changeData = async () => {
    error.value = null;
    message.value = null;
    if (name.value.trim() !== "" && pseudonym.value.trim() !== "" && code_color.value.trim() !== "" && country.value > 0) {
        const payload = {
            name: name.value,
            pseudonym: pseudonym.value,
            bibliography: bibliography.value.trim().replaceAll('\n', '<br />'),
            email: email.value,
            code_color: code_color.value,
            country: country.value,
            whatsapp_link: whatsapp.value,
            facebook_link: facebook.value,
            other_link: other.value,
            categories: selectedCategories.value
        }
        const res = await changePersonalData(`${user.value?.uuid}`, payload);
        if (res.success) {
            message.value = res.msg;
            setTimeout(() => {
                router.push("/profil")
            }, 1500);
        } else {
            error.value = res.error;
        }
    } else {
        error.value = "Veuillez remplir tous les champs";
    }
}

onMounted(async () => {
    countries.value = await allCountrieActifs();
    categories.value = await allCategorieActifs();
    user.value = await toConnectUser();
    profil.value = await getProfile();
    if (!user.value) {
        router.push("/login");
    } else {
        useSeoMeta({
            title: `Mes informations personnelles - ${user.value.name}`,
        });
        name.value = user.value.name;
        whatsapp.value = user.value?.whatsapp_link || '';
        facebook.value = user.value?.facebook_link || '';
        other.value = user.value?.other_link || '';
        pseudonym.value = user.value.pseudonym;
        bibliography.value = user.value.bibliography.replaceAll('<br />', '\n');
        email.value = user.value.email;
        code_color.value = user.value.code_color;
        country.value = user.value.id_country;
        if (user.value?.preferences) {
            selectedCategories.value = user.value.preferences.map(c => c.id);
        }
    }
})
</script>