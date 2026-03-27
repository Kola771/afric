<template>
    <div class="max-w-6xl mx-auto space-y-6">

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h2
                    class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <button @click="back"
                        class="py-2 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Icon name="mdi:arrow-left" class="w-4 h-4" />
                    </button>
                    Création d'une catégorie
                </h2>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Créez une nouvelle catégorie pour organiser
                    votre contenu.</p>
            </div>
        </div>
        <form class="flex flex-col gap-2.5" @submit.prevent="createCategory">
            <div class="flex flex-col gap-1">
                <label for="name_category" class="text-sm text-slate-900 font-medium dark:text-white">Nom de la
                    catégorie :</label>
                <input type="text" id="name_category" v-model="name_category" required name="name_category"
                    class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
            </div>
            <div class="flex flex-col gap-1">
                <label for="file" class="text-sm text-slate-900 font-medium dark:text-white">Image de la catégorie
                    :</label>
                <input type="file" id="file" ref="file" name="file"
                    accept="image/jpeg, image/jpg, image/png, image/jfif, image/avif" required
                    class="bg-white block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200"
                    @change="onFileChange" />
            </div>
            <div class="flex flex-col gap-1" v-if="preview">
                <p class="text-sm text-slate-900 font-medium dark:text-white">Aperçu de l'image :</p>
                <div class="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg"><img :src="preview" alt="Preview"
                        class="max-h-[200px] dark:border object-cover lg:object-contain lg:max-h-[220px] rounded-lg" />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <label for="description" class="text-sm text-slate-900 font-medium dark:text-white">Description
                    :</label>
                <textarea id="description" v-model="description" name="description" rows="3" required
                    class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200 pl-3 resize-none"
                    placeholder="Description de la catégorie..."></textarea>
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
            <div v-if="error" class="text-xs text-center font-medium text-red-500 mt-2">{{ error }}</div>
            <div v-if="message" class="text-xs text-center font-medium text-green-500 mt-2">{{ message }}</div>
            <div class="mt-2 flex flex-col md:flex-row md:justify-end">
                <button
                    class="px-4 py-2.5 lg:px-8 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors">Valider</button>
            </div>
        </form>

    </div>
</template>
<script setup lang="ts">
const { createData } = categoriesData()
const router = useRouter();
const name_category = ref<string>('')
const image = ref<any>(null)
const description = ref<string>('')
const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);

const minDescriptionLength = 150

const descriptionLength = computed(() => {
    return description.value.trim().length
})

const isDescriptionValid = computed(() => {
    return descriptionLength.value >= minDescriptionLength
})

const back = () => {
    router.back();
}

const preview = ref<any>(null)

const onFileChange = (event: any) => {
    const target = event.target as HTMLInputElement
    if (!target.files?.length) return
    image.value = target.files[0]
    const file = target.files[0]
    preview.value = URL.createObjectURL(file)
}

const createCategory = async () => {
    error.value = null;
    message.value = null;
    if (name_category.value.trim() !== "" && description.value.trim() !== "" && image.value !== null) {
        if (!isDescriptionValid.value) {
            error.value = "La description doit contenir au moins 150 caractères"
            return
        }
        const formData = new FormData()
        formData.append('name', name_category.value)
        formData.append('description', description.value)
        formData.append('image', image.value)
        const res = await createData(formData)
        if (res.success) {
            message.value = res.msg;
            setTimeout(() => {
                router.push("/dashboard/categories")
            }, 1500);
        } else {
            error.value = res.error;
            return;
        }
    } else {
        error.value = "Veuillez remplir tous les champs";
        return;
    }
}

onUnmounted(() => {
    if (preview.value) {
        URL.revokeObjectURL(preview.value)
    }
})
</script>