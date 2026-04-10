<template>
    <div class="max-w-6xl mx-auto space-y-8" v-if="user">

        <!-- Welcome Section -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
                <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Bonjour, {{
                    user?.name || 'Utilisateur' }} 👋</h2>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Faîtes une mise à jour de vos informations
                    personnelles !</p>
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
                <div class="flex flex-col gap-1 lg:order-2"
                    :class="profil && !profil.photo ? 'lg:col-span-3' : 'lg:col-span-4'">
                    <label for="email" class="text-sm text-slate-900 font-medium dark:text-white">Adresse
                        électronique :</label>
                    <input type="email" id="email" v-model="email"
                        class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                </div>
                <div class="flex flex-col gap-1" v-if="profil && !profil.photo">
                    <label for="color" class="text-sm text-slate-900 font-medium dark:text-white">Couleur
                        :</label>
                    <input type="color" id="color" v-model="code_color"
                        class="block w-full h-14 lg:h-10 rounded-lg border-0 p-2.5 lg:p-1.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <label for="bio"
                    class="text-sm text-slate-900 font-medium dark:text-white flex items-center justify-between">Bibliographie
                    : <span class="font-normal text-slate-500 dark:text-slate-200 text-xs">(Optionnel)</span></label>
                <textarea id="bio" name="bio" rows="3" v-model="bibliography"
                    class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200 pl-3 resize-none"
                    placeholder="Ma bibliographie..."></textarea>
            </div>

            <div class="flex flex-col gap-1">
                <label for="pays"
                    class="text-sm text-slate-900 font-medium dark:text-white flex items-center justify-between">
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
                        <input type="checkbox" class="peer sr-only" :value="category.id" v-model="selectedCategories">

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
                <p class="text-sm font-medium text-slate-700 dark:text-slate-200">Publiez-vous également sur d’autres
                    réseaux sociaux ?
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

    </div>
</template>
<script lang="ts" setup>
const { allCountrieActifs } = countriesData();
const { allCategorieActifs } = categoriesData();
const { changePersonalData } = authForm();
const { toConnectUser } = authenticate();
const { getProfile } = usersData();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const countries = ref<Country[]>([]);
const categories = ref<Category[]>([]);
const selectedCategories = ref<number[]>([]);
const name = ref<string>("");
const pseudonym = ref<string>("");
const bibliography = ref<string>("");
const email = ref<string>("");
const whatsapp = ref<string>("");
const facebook = ref<string>("");
const other = ref<string>("");
const code_color = ref<string>("");
const country = ref<number>(0);
const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);

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

const changeData = async () => {
    error.value = null;
    message.value = null;
    if (name.value.trim() !== "" && pseudonym.value.trim() !== "" && country.value > 0) {
        const payload = {
            name: name.value,
            pseudonym: pseudonym.value,
            bibliography: bibliography.value.replaceAll('\n', '<br />'),
            email: email.value,
            code_color: code_color.value || "",
            country: country.value,
            categories: selectedCategories.value
        }
        const res = await changePersonalData(`${user.value?.uuid}`, payload);
        if (res.success) {
            message.value = res.msg;
            setTimeout(() => {
                window.location.href = "/dashboard/account";
            }, 1500);
        } else {
            error.value = res.error;
        }
    } else {
        error.value = "Veuillez remplir tous les champs";
    }
}

onMounted(async () => {
    user.value = await toConnectUser();
    profil.value = await getProfile();
    countries.value = await allCountrieActifs();
    categories.value = await allCategorieActifs();
    if (user.value) {
        name.value = user.value.name;
        whatsapp.value = user.value?.whatsapp_link || '';
        facebook.value = user.value?.facebook_link || '';
        other.value = user.value?.other_link || '';
        pseudonym.value = user.value.pseudonym;
        bibliography.value = user.value.bibliography ? user.value.bibliography.replaceAll('<br />', '\n') : "";
        email.value = user.value.email;
        code_color.value = user.value.code_color;
        country.value = user.value.id_country;
        countrySearch.value = user.value.country;
        if (user.value?.preferences) {
            selectedCategories.value = user.value.preferences.map(c => c.id);
        }
    }
});
</script>