<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b">
        <div class="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 pt-24 pb-12" v-if="user">
            <!-- Welcome Section -->
            <div class="flex flex-col gap-6">
                <div class="flex items-center gap-2">
                    <button @click="back"
                        class="py-2 flex-shrink-0 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Icon name="mdi:arrow-left" class="w-6 h-4" />
                    </button>
                    <div>
                        <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Ajout
                            d'un livre</h2>
                        <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">
                            Ajoutez un nouveau livre à votre bibliothèque !
                        </p>
                    </div>
                </div>

                <div class="flex flex-col gap-2 bg-white border-slate-300 border-[1px] dark:bg-slate-800 p-4 lg:p-6 rounded-lg">
                    <h4 class="text-sm font-medium text-slate-700 dark:text-slate-200">Merci de respecter les points suivants :</h4>
                    <ul class="text-sm text-slate-500 dark:text-slate-200 mt-2 list-disc pl-5 space-y-1">
                        <li>Sélectionnez avec soin la ou les catégories correspondantes à votre ouvrage.</li>
                        <li>Si vous partagez une histoire réelle du continent africain, assurez-vous de l’exactitude des
                            informations.</li>
                        <li>Vérifiez que vous disposez des droits nécessaires pour publier et retranscrire ce contenu.
                        </li>
                    </ul>
                </div>
            </div>
            <form class="flex flex-col gap-4" @submit.prevent="createBook">
                <div class="flex flex-col gap-1">
                    <label for="title" class="text-sm text-slate-900 font-medium dark:text-white">Titre du livre
                        :</label>
                    <input type="text" id="title" v-model="title" required
                        class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="image" class="text-sm text-slate-900 font-medium dark:text-white">Image de couverture
                        :</label>
                    <input type="file" accept="image/jpeg, image/jpg, image/png, image/jfif" name="image" id="image"
                        ref="file" required
                        class="w-full text-sm outline-none border border-slate-300 dark:border-slate-200 bg-slate-50 rounded-md p-2"
                        @change="onFileChange">
                </div>
                <div class="flex flex-col gap-1" v-if="preview">
                    <p class="text-sm text-slate-900 font-medium dark:text-white">Aperçu de l'image :</p>
                    <div class="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg"><img :src="preview"
                            alt="Preview"
                            class="max-h-[200px] dark:border object-cover lg:object-contain lg:max-h-[220px] rounded-lg" />
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="description" class="text-sm text-slate-900 font-medium dark:text-white">Description du
                        livre :</label>
                    <textarea name="description" id="description" placeholder="Description" v-model="description"
                        required
                        class="w-full flex-shrink-0 h-24 lg:h-28 xl:h-32 resize-none text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-1">
                        À quelle(s) catégorie(s) appartient ce livre ?
                    </label>

                    <div class="flex flex-wrap gap-2">
                        <label v-for="category in categories" :key="category.id" class="cursor-pointer group">
                            <input type="checkbox" class="peer sr-only" :value="category.id"
                                v-model="selectedCategories">

                            <div class="rounded-md px-3 py-2.5 lg:py-2 lg:px-5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all 
                            peer-checked:border-orange-500 
                            peer-checked:text-orange-600 
                            peer-checked:bg-orange-50 
                            hover:bg-slate-50 flex items-center gap-1.5">
                                <span>{{ category.name }}</span>
                            </div>
                        </label>
                    </div>
                </div>
                <div>
                    <label for="step" class="text-sm text-slate-900 font-medium dark:text-white">Âge autorisé
                        :</label>
                    <select required id="step"
                        class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2.5"
                        v-model="rating_age">
                        <option value="" disabled selected>Âge autorisé</option>
                        <option value="12+">12ans+</option>
                        <option value="16+">16ans+</option>
                        <option value="18+">18ans+</option>
                    </select>
                </div>

                <div v-if="error" class="text-xs text-center font-medium text-red-500 mt-2">{{ error }}</div>
                <div v-if="message" class="text-xs text-center font-medium text-green-500 mt-2">{{ message }}</div>

                <div class="mt-2 flex flex-col md:flex-row md:justify-end">
                    <button :disabled="loading"
                        class="px-4 lg:px-8 py-2.5 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors">Valider</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { allCategorieActifs } = categoriesData();
const { existingData, createData } = booksData();
const { getProfile } = usersData();
const { toConnectUser } = authenticate();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const title = ref<string>("");
const description = ref<string>("");
const rating_age = ref<string>("");
const categories = ref<Category[]>([]);
const selectedCategories = ref<number[]>([]);
const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);
const image = ref<any>(null)
const loading = ref(false);
const router = useRouter();

const preview = ref<any>(null)

const onFileChange = (event: any) => {
    const target = event.target as HTMLInputElement
    if (!target.files?.length) return
    image.value = target.files[0]
    const file = target.files[0]
    preview.value = URL.createObjectURL(file)
}

const back = () => {
    router.back();
}

const createBook = async () => {
    error.value = null;
    message.value = null;
    loading.value = true; // ✅ désactivation début
    try {
        if (title.value.trim() !== "" && image.value && description.value.trim() !== "" && rating_age.value.trim() !== "" && selectedCategories.value.length > 0) {
            const existing = await existingData({ title: title.value });
            if (!existing.success) {
                error.value = existing.error;
                return;
            } else {
                const formData = new FormData()
                formData.append('title', title.value)
                formData.append('rating_age', rating_age.value)
                formData.append('description', description.value.replace(/\n/g, '<br>'))
                formData.append('id_user', `${user.value?.id}`)
                formData.append('image', image.value)
                selectedCategories.value.forEach((cat: any) => {
                    formData.append('categories[]', cat);
                });
                const res = await createData(formData)
                if (res.success) {
                    message.value = res.msg;
                    setTimeout(() => {
                        router.push("/my-stories")
                    }, 1500);
                } else {
                    error.value = res.error;
                }
            }
        } else {
            error.value = "Veuillez remplir tous les champs";
        }
    } catch (err) {
        error.value = "Une erreur est survenue";
    } finally {
        loading.value = false; // ✅ réactivation
    }
}

onMounted(async () => {
    categories.value = await allCategorieActifs();
    user.value = await toConnectUser();
    profil.value = await getProfile();
    if (!user.value) {
        router.push("/login");
    } 
    if((user.value && profil.value) && authorizeRoleUser(`${profil.value.role.toLocaleLowerCase()}`)) {
        useSeoMeta({
            title: `Ajout d'un livre`,
        });
    } else {
        router.back();
    }
})
</script>