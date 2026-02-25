<template>
    <div class="bg-[#fffcfccc] dark:bg-dark">
        <div class="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 pt-24 pb-12" v-if="user && book">
            <!-- Welcome Section -->
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div class="flex items-center gap-2">
                        <button @click="back"
                            class="py-2 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Icon name="mdi:arrow-left" class="w-4 h-4" />
                        </button>
                        <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                            Modification du livre : "<strong class="text-orange-600 dark:text-orange-500">{{book.title}}</strong>"</h2>
                    </div>
                    <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Modifiez les informations de votre livre
                        !</p>
                </div>
            </div>
            <form class="flex flex-col gap-4" @submit.prevent="updateBook">
                <div class="flex flex-col gap-1">
                    <p class="text-sm text-slate-900 font-medium dark:text-white">Image actuelle :</p>
                    <div class="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg"><img :src="`${config.public.apiBackendUrl}/uploads/books/${book?.image}`"
                            alt="Image actuelle"
                            class="max-h-[200px] dark:border object-cover lg:object-contain lg:max-h-[220px] rounded-lg" />
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="title" class="text-sm text-slate-900 font-medium dark:text-white">Titre du livre
                        :</label>
                    <input type="text" id="title" v-model="title"
                        class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="image" class="text-sm text-slate-900 font-medium dark:text-white">Image de couverture
                        :</label>
                    <input type="file" name="image" id="image" ref="file"
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
                    <label for="step" class="text-sm text-slate-900 font-medium dark:text-white">État de l'histoire
                        :</label>
                    <select required id="step"
                        class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2.5"
                        v-model="status">
                        <option value="" disabled selected>Statut de l'histoire</option>
                        <option value="draft">Brouillon</option>
                        <option value="ongoing">En cours</option>
                        <option value="paused">En pause</option>
                        <option value="completed">Terminée</option>
                    </select>
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
    </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
const { allCategorieActifs } = categoriesData();
const { getBookByUuid, updateData, updateImg } = booksData();
const { toConnectUser } = authenticate();
const user = ref<User | null>(null);
const book = ref<BookData | null>(null);
const title = ref<string>("");
const status = ref<string>("");
const description = ref<string>("");
const categories = ref<Category[]>([]);
const selectedCategories = ref<number[]>([]);
const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);
const image = ref<any>(null)
const loading = ref(false);
const router = useRouter();
const uuid = useRoute().params.uuid;

const preview = ref<any>(null)

const onFileChange = (event: any) => {
    const target = event.target as HTMLInputElement
    if (!target.files?.length) return
    image.value = target.files[0]
    const file = target.files[0]
    preview.value = URL.createObjectURL(file)
}

const back = () => {
    window.history.back()
}

const updateBook = async () => {
    error.value = null;
    message.value = null;
    if (title.value.trim() !== "" && description.value.trim() !== "" && status.value.trim() !== "" && selectedCategories.value.length > 0) {
        const payload = {
            title: title.value,
            description: description.value.replace('\n', '<br>'),
            status: status.value,
            id_user: user.value?.id,
            categories: selectedCategories.value,
        }
        let res;
        res = await updateData(`${uuid}`, payload)
        if (image.value) {
            const formData = new FormData();
            formData.append("image", image.value);
            res = await updateImg(`${uuid}`, formData)
        }
        if (res.success) {
            message.value = res.msg;
            setTimeout(() => {
                router.push("/my-stories")
            }, 1500);
        } else {
            error.value = res.error;
        }
    } else {
        error.value = "Veuillez remplir tous les champs";
    }
}

onMounted(async () => {
    categories.value = await allCategorieActifs();
    user.value = await toConnectUser();
    book.value = await getBookByUuid(`${uuid}`);
    if(book.value) {
        title.value = book.value.title;
        description.value = book.value.description.replace('<br>', '\n');
        status.value = book.value.status;
        selectedCategories.value = book.value.book_categories.map((category: Category) => category.id);
    }
    if (!user.value) {
        router.push("/login");
    } else {
        useSeoMeta({
            title: `Modification du livre : ${book.value?.title}`,
        });
    }
})
</script>