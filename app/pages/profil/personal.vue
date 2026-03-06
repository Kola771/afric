<template>
    <div class="bg-[#fffcfccc] dark:bg-dark">
        <div class="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 pt-24 pb-12" v-if="user">
            <!-- Welcome Section -->
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div class="flex items-center gap-2">
                        <button @click="back" class="py-2 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Icon name="mdi:arrow-left" class="w-4 h-4" />
                        </button>
                        <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Bonjour, {{ user?.name || 'Utilisateur' }} 👋</h2>
                    </div>
                    <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Faîtes une mise à jour de vos informations personnelles !</p>
                </div>
            </div>
            <form class="flex flex-col gap-4" @submit.prevent="changeData">
                <div class="flex flex-col gap-1">
                    <label for="fullname" class="text-sm text-slate-900 font-medium dark:text-white">Nom complet :</label>
                    <input type="text" id="fullname" v-model="name" class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="username" class="text-sm text-slate-900 font-medium dark:text-white">Pseudonyme :</label>
                    <input type="text" id="username" v-model="pseudonym" class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="email" class="text-sm text-slate-900 font-medium dark:text-white">Adresse électronique :</label>
                    <input type="email" id="email" v-model="email" class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="color" class="text-sm text-slate-900 font-medium dark:text-white">Couleur :</label>
                    <input type="color" id="color" v-model="code_color" class="block w-full h-16 rounded-lg border-0 p-2.5 lg:p-1.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="bio" class="text-sm text-slate-900 font-medium dark:text-white flex items-center justify-between">Bibliographie : <span class="font-normal text-slate-500 dark:text-slate-200 text-xs">(Optionnel)</span></label>
                    <textarea id="bio" name="bio" rows="3" v-model="bibliography"
                        class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3 resize-none"
                        placeholder="Ma bibliographie..."></textarea>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="country" class="text-sm text-slate-900 font-medium dark:text-white">Pays d'origine :</label>
                    <select required id="country" name="country" v-model="country" class="mt-1 block w-full rounded-lg border-0 py-2.5 lg:p-3 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all">
                        <option value="" disabled selected>Pays d'origine</option>
                        <option v-for="(country, index) in countries" :key="index" :value="country.id">{{ country.name }}</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-1">
                        Vos préférences :
                    </label>

                    <div class="flex flex-wrap gap-2">
                        <label
                        v-for="category in categories"
                        :key="category.id"
                        class="cursor-pointer group"
                        >
                        <input
                            type="checkbox"
                            class="peer sr-only"
                            :value="category.id"
                            v-model="selectedCategories"
                        >

                        <div
                            class="rounded-md px-3 py-2.5 lg:py-2 lg:px-5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all 
                            peer-checked:border-orange-500 
                            peer-checked:text-orange-600 
                            peer-checked:bg-orange-50 
                            hover:bg-slate-50 flex items-center gap-1.5"
                        >
                            <span>{{ category.name }}</span>
                        </div>
                        </label>
                    </div>
                </div>

                <div v-if="error" class="text-xs text-center font-medium text-red-500 mt-2">{{ error }}</div>
                <div v-if="message" class="text-xs text-center font-medium text-green-500 mt-2">{{ message }}</div>

                <div class="mt-2 flex flex-col md:flex-row md:justify-end">
                    <button class="px-4 py-2.5 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors">Enregistrer les modifications</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { allCountrieActifs } = countriesData();
const { allCategorieActifs } = categoriesData();
const { changePersonalData } = authForm();
const { toConnectUser } = authenticate();
const user = ref<User | null>(null);
const name = ref<string>("");
const pseudonym = ref<string>("");
const bibliography = ref<string>("");
const email = ref<string>("");
const code_color = ref<string>("");
const country = ref<number>(0);
const countries = ref<Country[]>([]);
const categories = ref<Category[]>([]);
const selectedCategories = ref<number[]>([]);
const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);
const router = useRouter();

const back = () => {
    router.back();
}

const changeData = async () => {
    error.value = null;
    message.value = null;
    if(name.value.trim() !== "" && pseudonym.value.trim() !== "" && code_color.value.trim() !== "" && country.value > 0) {
        const payload = {
            name: name.value,
            pseudonym: pseudonym.value,
            bibliography: bibliography.value.trim().replace('\n', '<br />'),
            email: email.value,
            code_color: code_color.value,
            country: country.value,
            categories: selectedCategories.value
        }
        const res = await changePersonalData(`${user.value?.uuid}`, payload);
        if(res.success) {
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
    if(!user.value) {
        router.push("/login");
    } else {
        useSeoMeta({
            title: `Mes informations personnelles - ${user.value.name}`,
        });
        name.value = user.value.name;
        pseudonym.value = user.value.pseudonym;
        bibliography.value = user.value.bibliography.replace('<br />', '\n');
        email.value = user.value.email;
        code_color.value = user.value.code_color;
        country.value = user.value.id_country;
        if (user.value?.preferences) {
            selectedCategories.value = user.value.preferences.map(c => c.id);
        }
    }
})
</script>