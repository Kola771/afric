<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b">
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
                            Modification du livre : "<strong class="text-orange-600 dark:text-orange-500">{{ book.title
                            }}</strong>"</h2>
                    </div>
                    <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">
                        Vous pouvez modifier les informations de votre livre à tout moment.
                        Veillez à maintenir des données exactes et cohérentes avec son contenu.
                    </p>
                </div>
            </div>
            <form class="flex flex-col gap-4" @submit.prevent="updateBook">
                <div class="flex flex-col gap-1">
                    <p class="text-sm text-slate-900 font-medium dark:text-white">Image actuelle :</p>
                    <div class="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg"><img
                            :src="`${config.public.apiBackendUrl}/uploads/books/${book?.image}`" alt="Image actuelle"
                            class="max-h-[200px] dark:border object-cover lg:object-contain lg:max-h-[220px] rounded-lg" />
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="title" class="text-sm text-slate-900 font-medium dark:text-white">Titre du livre
                        :</label>
                    <input type="text" id="title" v-model="title"
                        class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="image" class="text-sm text-slate-900 font-medium dark:text-white">Image de couverture
                        :</label>
                    <input type="file" accept="image/jpeg, image/jpg, image/png, image/jfif" name="image" id="image"
                        ref="imageRef"
                        class="w-full text-sm outline-none border border-slate-300 dark:border-slate-200 bg-slate-50 rounded-md p-2 bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200"
                        @change="onFileChange">
                </div>
                <div class="flex flex-col gap-1" v-if="preview">
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-slate-900 font-medium dark:text-white">Aperçu de l'image :</p>
                        <span @click="removeImage"
                            class="text-red-600 dark:text-red-700 flex items-center justify-center gap-1 font-bold text-xs cursor-pointer">
                            <Icon name="mdi:close" class="w-4 h-4" />
                            Annuler
                        </span>
                    </div>
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
                        class="w-full flex-shrink-0 h-24 lg:h-28 xl:h-32 resize-none text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2 dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200"></textarea>
                    <div class="flex justify-between text-xs mt-1">
                        <span
                            :class="isDescriptionValid ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'">
                            {{ descriptionLength }} / {{ minDescriptionLength }} caractères
                        </span>

                        <span v-if="!isDescriptionValid" class="text-red-500 dark:text-red-400">
                            Minimum 150 caractères requis
                        </span>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-1">
                        À quelle(s) catégorie(s) appartient ce livre ?
                    </label>

                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                        <label v-for="category in categories" :key="category.id"
                            class="cursor-pointer group relative h-24">
                            <input type="checkbox" class="peer sr-only" :value="category.id"
                                v-model="selectedCategories">
                            <div class="rounded-md h-24 text-xs font-medium border border-slate-200 text-slate-600 shadow-sm transition-all 
                                peer-checked:border-orange-500 
                                peer-checked:text-orange-600 
                                peer-checked:bg-orange-50 
                                bg-slate-50 dark:bg-transparent dark:text-slate-200">
                                <img :src="category.image?.includes('https') ? category.image : `${$config.public.apiBackendUrl}/uploads/categories/${category.image}`"
                                    :alt="category.name" class="w-full h-full rounded">
                            </div>
                            <div class="absolute inset-0 h-24 bg-black/60 rounded-md font-bold flex items-center justify-center text-xs text-white px-4">{{ category.name }}</div>

                            <div
                                class="absolute bottom-2 z-10 right-2 bg-orange-500/90 dark:bg-orange-700/90 text-white px-1.5 py-0.5 rounded text-[10px] flex items-center gap-2 font-bold">
                                <Icon name="mdi:book-open-variant" class="w-4 h-4" />
                                {{ formatNumber(category.booksCount || 0) }}
                            </div>
                        </label>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2">
                    <label for="step" class="text-sm text-slate-900 font-medium dark:text-white">Âge autorisé
                        :</label>
                    <select required id="step"
                        class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2.5 bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-400"
                        v-model="rating_age">
                        <option value="" disabled selected>Âge autorisé'age</option>
                        <option value="12+">12ans+</option>
                        <option value="16+">16ans+</option>
                        <option value="18+">18ans+</option>
                    </select>
                </div>
                <div class="flex flex-wrap gap-2" v-if="!['completed', 'inactive'].includes(book.status)">
                    <label for="step" class="text-sm text-slate-900 font-medium dark:text-white">État de l'histoire
                        :</label>
                    <select required id="step"
                        class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2.5 bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-400"
                        v-model="status">
                        <option value="" disabled selected>Statut de l'histoire</option>
                        <option value="draft">Brouillon</option>
                        <option value="ongoing">En cours</option>
                        <option value="paused">En pause</option>
                        <option value="completed">Terminée</option>
                    </select>
                </div>

                <!-- Message dynamique selon le statut -->
                <p v-if="status === 'completed'"
                    class="bg-red-50 font-medium p-2 rounded-lg text-[11px] md:text-xs md:p-3 md:leading-6 text-justify text-red-600 dark:text-red-400 mt-1">
                    ⚠️ Une fois l'histoire marquée comme "Terminée", vous ne pourrez plus modifier ni sa description ni
                    ses chapitres, mais son image de couverture reste modifiable.
                    Pourquoi ? Si vous changez le contenu, les lecteurs ayant déjà lu l’ancienne version pourraient être
                    perturbés.
                </p>

                <p v-if="status === 'inactive'"
                    class="bg-red-50 font-medium p-2 rounded-lg text-[11px] md:text-xs md:p-3 md:leading-6 text-red-600 dark:text-red-400 mt-1">
                    ⚠️ Cette histoire est actuellement marquée comme « Inactive ». Vous avez <strong>{{
                        getDaysFromToday(book.deadline).days }}</strong> jours pour corriger tout contenu
                    potentiellement
                    problématique.
                    Veuillez notifier vos corrections aux administrateurs via cet e-mail :
                    <strong><a href="mailto:africstoryline@gmail.com">africstoryline@gmail.com</a></strong>.
                    Passé ce délai, l'histoire pourra être supprimée de la plateforme.
                </p>

                <div class="flex flex-col gap-4"
                    :class="!book?.pdf_validated ? 'opacity-60 pointer-events-none cursor-not-allowed' : ''">
                    <div
                        class="bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 rounded-lg p-3">
                        <p
                            class="text-sm font-semibold text-orange-700 dark:text-orange-400 mb-2 flex items-center gap-2">
                            📕 Vente du livre (PDF complet)
                        </p>

                        <ul class="text-xs text-slate-700 dark:text-slate-200 space-y-1">
                            <li class="flex items-start gap-2">
                                <span>•</span>
                                <span>Accessible à partir de <strong>3 000 vues cumulées</strong></span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span>•</span>
                                <span>Minimum <strong>10 chapitres</strong></span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span>•</span>
                                <span>Le livre doit être <strong>terminé</strong></span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span>•</span>
                                <span>Les lecteurs pourront télécharger le <strong>PDF complet après
                                        achat</strong></span>
                            </li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="pdf" class="text-sm text-slate-900 font-medium dark:text-white">Version du livre
                            :</label>

                        <input type="file" accept="application/pdf" name="pdf" id="pdf" ref="pdfRef"
                            :disabled="!book?.pdf_validated"
                            class="w-full text-sm outline-none border border-slate-300 dark:border-slate-200 bg-slate-50 rounded-md p-2 bg-white dark:bg-transparent dark:text-slate-200"
                            @change="onFileChangePdf" />
                    </div>
                    <div v-if="bookPdf" class="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg p-3">
                        <div class="flex items-center justify-between">
                            <p class="text-sm text-slate-900 dark:text-white">
                                Aperçu du PDF
                            </p>

                            <div class="flex items-center gap-2">
                                <span @click="showPdfModal = true"
                                    class="bg-orange-600 text-white dark:bg-orange-700 p-2 rounded-lg text-sm cursor-pointer">
                                    📄 Agrandir
                                </span>

                                <span @click="removePdf"
                                    class="bg-red-600 dark:bg-red-700 flex items-center justify-center gap-1 text-white p-2 rounded-lg text-sm cursor-pointer">
                                    <Icon name="mdi:close" class="w-4 h-4" />
                                    Annuler
                                </span>
                            </div>
                        </div>

                        <iframe :src="bookPdf"
                            class="w-full h-[250px] rounded-md border mt-2 pointer-events-none"></iframe>
                    </div>
                    <p class="text-xs text-red-500 dark:text-red-400" v-if="!book.pdf_validated">
                        🔒 Vous ne pouvez pas uploader ce PDF pour le moment.
                        Vous devez atteindre <strong>3 000 vues</strong> pour débloquer cette fonctionnalité.
                        Vous en avez actuellement <strong>{{ book.total_views ?? 0 }}</strong>.
                    </p>
                </div>

                <div v-if="error" class="text-xs text-center font-medium text-red-500 mt-2">{{ error }}</div>
                <div v-if="message" class="text-xs text-center font-medium text-green-500 mt-2">{{ message }}</div>

                <div v-if="book?.book_pdf" class="flex flex-col gap-2">
                    <p class="text-sm text-slate-900 dark:text-white font-medium">
                        PDF actuel :
                    </p>

                    <div class="flex items-center gap-3">
                        <span @click="downloadPdf"
                            class="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-2 rounded-md cursor-pointer">
                            📥 Télécharger
                        </span>

                        <span class="text-xs text-slate-500 dark:text-slate-300">
                            Fichier disponible pour lecture et téléchargement
                        </span>
                    </div>
                </div>

                <div class="mt-2 flex flex-col md:flex-row md:justify-end" v-if="book.status !== 'completed'">
                    <button :disabled="loading || !isDescriptionValid"
                        :class="loading || !isDescriptionValid ? 'cursor-not-allowed' : 'cursor-pointer'"
                        class="px-4 py-2.5 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors">Enregistrer
                        les modifications</button>
                </div>
            </form>
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

        <div v-if="showPdfModal" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            @click.self="showPdfModal = false">
            <div class="w-full max-w-5xl h-[90vh] bg-white dark:bg-slate-900 rounded-lg overflow-hidden relative">

                <!-- Close button -->
                <button @click="showPdfModal = false"
                    class="absolute top-4 right-3 flex items-center justify-center text-white bg-red-500 hover:bg-red-600 w-6 h-6 rounded-full">
                    <Icon name="mdi:close" class="w-4 h-4" />
                </button>

                <iframe :src="bookPdf" class="w-full h-full"></iframe>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
const { allCategorieActifs } = categoriesData();
const { getActiveBookByUuid, updateData, updateImg, updatePdf } = booksData();
const { toConnectUser } = authenticate();
const { getProfile } = usersData();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const book = ref<BookData | null>(null);
const title = ref<string>("");
const status = ref<string>("");
const description = ref<string>("");
const rating_age = ref<string>("");
const categories = ref<Category[]>([]);
const selectedCategories = ref<number[]>([]);
const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);
const image = ref<any>(null)
const pdf = ref<any>(null)
const bookPdf = ref<any>(null)
const loading = ref(false);
const router = useRouter();
const uuid = useRoute().params.uuid;
const preview = ref<any>(null)
const showPdfModal = ref<boolean>(false)
const pdfRef = ref<HTMLInputElement | null>(null)
const imageRef = ref<HTMLInputElement | null>(null)

const minDescriptionLength = 150

const descriptionLength = computed(() => {
    return description.value.trim().length
})

const isDescriptionValid = computed(() => {
    return descriptionLength.value >= minDescriptionLength
})

const removeImage = () => {
    image.value = null
    preview.value = null

    if (imageRef.value) {
        imageRef.value.value = ""
    }
}

const removePdf = () => {
    pdf.value = null
    bookPdf.value = null

    if (pdfRef.value) {
        pdfRef.value.value = ""
    }
}

const downloadPdf = async () => {
    if (!book.value) return
    const url = `${config.public.apiBackendUrl}/uploads/books/pdf/${book.value.book_pdf}`

    const response = await fetch(url)
    const blob = await response.blob()

    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = book.value.book_pdf || "book.pdf"
    link.click()
}

const onFileChange = (event: any) => {
    const target = event.target as HTMLInputElement
    if (!target.files?.length) return
    image.value = target.files[0]
    const file = target.files[0]
    preview.value = URL.createObjectURL(file!)
}

const onFileChangePdf = (event: any) => {
    const file = event.target.files[0]
    if (!file) return

    const maxSize = 15 * 1024 * 1024 // 15MB

    if (file.size > maxSize) {
        error.value = "Le PDF ne doit pas dépasser 15 Mo"
        return
    }

    if (
        !book.value ||
        Number(book.value.total_views ?? 0) < 3000 ||
        !book.value.pdf_validated ||
        book.value.status !== "completed"
    ) {
        error.value = "🔒 Vous devez avoir au minimum 3 000 vues et un livre terminé pour uploader le PDF."
        return
    }

    pdf.value = file
    bookPdf.value = URL.createObjectURL(file)
}

const back = () => {
    router.back();
}

const updateBook = async () => {
    error.value = null;
    message.value = null;
    if (title.value.trim() !== "" && description.value.trim() !== "" && status.value.trim() !== "" && rating_age.value.trim() !== "" && selectedCategories.value.length > 0) {
        if (!isDescriptionValid.value) {
            error.value = "La description doit contenir au moins 150 caractères"
            return
        }
        const payload = {
            title: title.value,
            description: description.value.replaceAll('\n', '<br>'),
            status: status.value,
            id_user: user.value?.id,
            rating_age: rating_age.value,
            categories: selectedCategories.value,
        }
        let res;
        res = await updateData(`${uuid}`, payload)
        if (image.value) {
            const formData = new FormData();
            formData.append("image", image.value);
            res = await updateImg(`${uuid}`, formData)
        }
        if (pdf.value && book.value?.pdf_validated && Number(book.value.total_views) >= 3000 && book.value.status === "completed") {
            const formData = new FormData();
            formData.append("pdf", pdf.value);
            res = await updatePdf(`${uuid}`, formData);
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
    profil.value = await getProfile();
    book.value = await getActiveBookByUuid(`${uuid}`);
    if (book.value) {
        if (!user.value) {
            router.push("/login");
        }
        if ((user.value && profil.value) && authorizeRoleUser(`${profil.value.role.toLocaleLowerCase()}`) && Number(profil.value.id) === Number(book.value.id_user)) {
            useSeoMeta({
                title: `Modification du livre : ${book.value?.title}`,
            });
        } else {
            router.back();
        }
        if (profil.value && profil.value.status === 'inactif') {
            router.push("/authorization");
        }
        title.value = book.value.title;
        description.value = book.value.description.replaceAll('<br>', '\n');
        status.value = book.value.status;
        rating_age.value = book.value.rating_age;
        selectedCategories.value = book.value.book_categories.map((category: Category) => category.id);
    }
})
</script>