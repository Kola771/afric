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

                <div
                    class="flex flex-col gap-2 bg-white border-slate-300 border-[1px] dark:bg-slate-800 p-4 lg:p-6 rounded-lg">
                    <h4 class="text-sm font-medium text-slate-700 dark:text-slate-200">Merci de respecter les points
                        suivants :</h4>
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
                        class="block rounded-lg w-full border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="image" class="text-sm text-slate-900 font-medium dark:text-white">Image de couverture
                        :</label>
                    <input type="file" accept="image/jpeg, image/jpg, image/png, image/jfif" name="image" id="image"
                        ref="imageRef" required
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
                <div class="flex flex-col gap-1">
                    <label class="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
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
                            <div
                                class="absolute inset-0 h-24 bg-black/60 rounded-md font-bold flex items-center justify-center text-xs text-white px-4">
                                {{ category.name }}</div>

                            <div
                                class="absolute bottom-2 z-10 right-2 bg-orange-500/90 dark:bg-orange-700/90 text-white px-1.5 py-0.5 rounded text-[10px] flex items-center gap-2 font-bold">
                                <Icon name="mdi:book-open-variant" class="w-4 h-4" />
                                {{ formatNumber(category.booksCount || 0) }}
                            </div>
                        </label>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="step" class="text-sm text-slate-900 font-medium dark:text-white">Âge autorisé
                        :</label>
                    <select required id="step"
                        class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2.5 bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-500"
                        v-model="rating_age">
                        <option value="" disabled selected>Âge autorisé</option>
                        <option value="12+">12ans+</option>
                        <option value="16+">16ans+</option>
                        <option value="18+">18ans+</option>
                    </select>
                </div>
                <div>
                    <label for="step" class="text-sm text-slate-900 font-medium dark:text-white">Voulez-vous créer les
                        chapitres en même temps ? (Facultatif)</label>
                    <div class="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="withChapters" v-model="withChapters"
                            class="w-4 h-4 cursor-pointer" />
                        <label for="withChapters" class="text-sm text-slate-600 dark:text-slate-200 cursor-pointer">
                            Oui, importer les chapitres via un PDF
                        </label>
                    </div>
                </div>

                <div v-if="withChapters" class="mt-2 border-t pt-4">
                    <h2 class="text-sm font-semibold mb-2 dark:text-slate-200">
                        Importer un PDF
                    </h2>

                    <div class="overflow-y-auto">
                        <input type="file" accept="application/pdf" @change="handlePdfUpload" :disabled="pdfLoading"
                            class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />

                        <p class="text-[13px] text-slate-600 mt-2 dark:text-slate-200">
                            Nous détectons automatiquement les sections dont les titres sont clairement indiqués,
                            tels que <strong>Préface</strong>, <strong>Résumé</strong>, <strong>Introduction</strong>
                            ou encore <strong>Chapitre 1, Chapitre 2, etc.</strong>
                            Veillez à structurer correctement votre PDF.
                        </p>

                        <div v-if="pdfLoading" class="mt-4 text-xs text-orange-600">
                            Extraction des chapitres en cours...
                        </div>

                        <div v-if="pdfError" class="mt-4 text-xs text-red-500">
                            {{ pdfError }}
                        </div>

                        <div v-if="pdfChapters.length" class="mt-6">
                            <div class="border rounded-xl p-4 bg-slate-50 relative">
                                <div class="flex justify-between items-center mb-2">
                                    <h3 class="text-sm font-semibold">
                                        {{ currentPdfChapter?.title || 'Titre non détecté' }}
                                    </h3>
                                    <span @click="deletePdfChapter(currentPdfIndex)"
                                        class="cursor-pointer text-red-500 text-xs">
                                        Supprimer
                                    </span>
                                </div>

                                <div class="text-xs text-slate-600 whitespace-pre-line max-h-[500px] overflow-y-auto">
                                    {{ currentPdfChapter?.content }}
                                </div>
                            </div>
                            <div class="flex items-center justify-between mt-3 dark:text-slate-200">
                                <span @click="prevPdfChapter" :disabled="currentPdfIndex === 0"
                                    class="cursor-pointer p-2 flex items-center justify-center rounded-lg border hover:bg-slate-100 disabled:opacity-30">
                                    <Icon name="mdi:chevron-left" class="w-5 h-5" />
                                </span>

                                <span class="text-xs">
                                    {{ currentPdfIndex + 1 }} / {{ pdfChapters.length }}
                                </span>

                                <span @click="nextPdfChapter" :disabled="currentPdfIndex === pdfChapters.length - 1"
                                    class="cursor-pointer p-2 flex items-center justify-center rounded-lg border hover:bg-slate-100 disabled:opacity-30">
                                    <Icon name="mdi:chevron-right" class="w-5 h-5" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="error" class="text-xs text-center font-medium text-red-500 mt-2">{{ error }}</div>
                <div v-if="waiting" class="text-xs text-center font-medium text-amber-500 mt-2">Opération en cours...
                </div>
                <div v-if="message" class="text-xs text-center font-medium text-green-500 mt-2">{{ message }}</div>

                <div class="mt-2 flex flex-col md:flex-row md:justify-end">
                    <button :disabled="loading || !isDescriptionValid || pdfLoading"
                        :class="loading || !isDescriptionValid || pdfLoading ? 'cursor-not-allowed' : 'cursor-pointer'"
                        class="px-4 lg:px-8 py-2.5 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors">Valider</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
interface ImportedChapter {
    title: string
    content: string
}
const { allCategorieActifs } = categoriesData();
const { createManyData } = chaptersData();
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
const loading = ref<boolean>(false);
const waiting = ref<boolean>(false);
const router = useRouter();
const preview = ref<any>(null)
const minDescriptionLength = 150
const withChapters = ref(false)
const imageRef = ref<HTMLInputElement | null>(null)

const chapters = ref<ChapterData[]>([]);
const pdfFile = ref<File | null>(null)
const pdfLoading = ref(false)
const pdfError = ref<string | null>(null)
const pdfChapters = ref<any[]>([])
const currentPdfIndex = ref(0)
const STATUS = ref({
    DRAFT: "draft",
    COMPLETED: "completed"
});

const currentPdfChapter = computed(() => {
    return pdfChapters.value[currentPdfIndex.value] || null
})

const removeImage = () => {
    image.value = null
    preview.value = null

    if (imageRef.value) {
        imageRef.value.value = ""
    }
}

// function pour extraire le contenu d'un pdf
async function handlePdfUpload(event: Event): Promise<void> {
    if (process.server) return

    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
        error.value = "La taille du fichier ne doit pas dépasser 5 Mo"
        return
    }

    pdfFile.value = file
    pdfLoading.value = true
    pdfError.value = null
    pdfChapters.value = []

    try {
        // 🔥 Import dynamique côté client
        const pdfjsLib = await import('pdfjs-dist/build/pdf')
        const pdfWorker = await import('pdfjs-dist/build/pdf.worker?url')

        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker.default

        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

        let fullText = ''

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum)
            const content = await page.getTextContent()

            const pageText = content.items
                .map((item: any) => item.str)
                .join(' ')

            fullText += pageText + '\n\n'
        }

        pdfChapters.value = splitChapters(fullText)
        currentPdfIndex.value = 0

        if (!pdfChapters.value.length) {
            pdfError.value = "Aucun chapitre détecté. Vérifiez le format (Chapitre 1, Chapitre 2...)."
        }

    } catch (error) {
        console.error(error)
        pdfError.value = "Erreur lors de l'extraction du PDF."
    } finally {
        pdfLoading.value = false
        input.value = ''
    }
}

// Fonction de base pour l'extraction
function splitChapters(text: string): ImportedChapter[] {
    // Regex qui gère :
    // - préface / preface (avec ou sans accents)
    // - résumé / resume
    // - introduction
    // - chapitre X ou chapitre_X
    const regex = /\b(pr[eé]face|resume|r[eé]sum[eé]|introduction|chapitre[_ ]?(\d+|[IVXLCDM]+))\b/gi;

    const matches = [...text.matchAll(regex)];
    if (!matches.length) return [];

    const extracted: any[] = [];
    let chapterCounter = chapters.value.length + 1; // Compteur pour les chapitres numériques

    for (let i = 0; i < matches.length; i++) {
        const start = matches[i].index!;
        const end = matches[i + 1]?.index ?? text.length;

        // le titre exact tel qu'il apparaît
        let title = matches[i][0].trim();
        let rawContent = text.slice(start, end).trim();
        let content = rawContent.replace(new RegExp(`^${matches[i][0]}`, 'i'), '').trim();

        // normaliser certains titres
        if (/pr[eé]face/i.test(title)) {
            title = "Préface";
        } else if (/resume/i.test(title) || /r[eé]sum[eé]/i.test(title)) {
            title = "Résumé";
        } else if (/introduction/i.test(title)) {
            title = "Introduction";
        } else if (/chapitre[_ ]?\d+/i.test(title)) {
            // renumérotation propre pour les chapitres
            title = `Chapitre ${chapterCounter}`;
            chapterCounter++;
        }
        extracted.push({
            title,
            content,
            status: STATUS.value.DRAFT
        });
    }

    return extracted;
}

const nextPdfChapter = () => {
    if (currentPdfIndex.value < pdfChapters.value.length - 1) {
        currentPdfIndex.value++
    }
}

const prevPdfChapter = () => {
    if (currentPdfIndex.value > 0) {
        currentPdfIndex.value--
    }
}

const deletePdfChapter = (index: number) => {
    pdfChapters.value.splice(index, 1)
    if (currentPdfIndex.value >= pdfChapters.value.length) {
        currentPdfIndex.value = pdfChapters.value.length - 1
    }
}

const descriptionLength = computed(() => {
    return description.value.trim().length
})

const isDescriptionValid = computed(() => {
    return descriptionLength.value >= minDescriptionLength
})

const onFileChange = (event: any) => {
    const file = event.target.files[0]
    if (!file) return

    const maxSize = 5 * 1024 * 1024 // 5MB

    if (file.size > maxSize) {
        error.value = "La taille de l'image ne doit pas dépasser 5 Mo"
        return
    }
    image.value = file;
    preview.value = URL.createObjectURL(file)
}

const back = () => {
    router.back();
}

const createBook = async () => {
    error.value = null;
    message.value = null;
    waiting.value = true;
    loading.value = true; // ✅ désactivation début
    try {
        if (withChapters.value && !pdfChapters.value.length) {
            error.value = "Veuillez importer un fichier PDF valide contenant votre récit, en respectant les instructions fournies.";
            return;
        }
        if (title.value.trim() !== "" && image.value && description.value.trim() !== "" && rating_age.value.trim() !== "" && selectedCategories.value.length > 0) {
            if (!isDescriptionValid.value) {
                error.value = "La description doit contenir au moins 150 caractères"
                return
            }
            const existing = await existingData({ title: title.value });
            if (!existing.success) {
                error.value = existing.error;
                return;
            } else {
                const formData = new FormData()
                formData.append('title', title.value)
                formData.append('rating_age', rating_age.value)
                formData.append('description', description.value.replaceAll(/\n/g, '<br>'))
                formData.append('id_user', `${user.value?.id}`)
                formData.append('image', image.value)
                selectedCategories.value.forEach((cat: any) => {
                    formData.append('categories[]', cat);
                });
                const res = await createData(formData)
                if (res.success) {
                    let returnPage = false;
                    if (withChapters.value && pdfChapters.value.length > 0) {
                        pdfChapters.value = pdfChapters.value.map((c: any) => ({ ...c, id_book: res.book.id }));
                        await createManyData(pdfChapters.value);
                        returnPage = true;
                        message.value = `Livre créé avec ${pdfChapters.value.length} chapitre(s) !`;
                    } else {
                        returnPage = true;
                        message.value = res.msg;
                    }

                    if (returnPage) {
                        setTimeout(() => {
                            router.push("/my-stories")
                        }, 1500);
                    }
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
        waiting.value = false;
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
    if ((user.value && profil.value) && authorizeRoleUser(`${profil.value.role.toLocaleLowerCase()}`)) {
        useSeoMeta({
            title: `Ajout d'un livre`,
        });
    } else {
        router.back();
    }
    if (profil.value && profil.value.status === 'inactif') {
        router.push("/authorization");
    }
})
</script>