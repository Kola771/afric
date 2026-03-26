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
                    Ajout d'un pays
                </h2>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Ajoutez un nouveau pays pour organiser votre
                    contenu.</p>
            </div>
        </div>
        <form class="flex flex-col gap-2.5" @submit.prevent="createCountry">
            <div class="flex flex-col gap-1">
                <label for="name_country" class="text-sm text-slate-900 font-medium dark:text-white">Nom du pays
                    :</label>
                <input type="text" id="name_country" name="name_country" required v-model="name"
                    class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200" />
            </div>
            <div class="flex flex-col gap-1">
                <label for="file" class="text-sm text-slate-900 font-medium dark:text-white">Image du pays :</label>
                <input type="file" id="file" name="file" ref="file" required
                    class="bg-white block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200"
                    @change="onFileChange" />
            </div>
            <div class="flex flex-col gap-1" v-if="preview">
                <p class="text-sm text-slate-900 font-medium dark:text-white">Aperçu de l'image :</p>
                <div class="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg"><img :src="preview" alt="Preview"
                        class="max-h-[200px] dark:border object-cover lg:object-contain lg:max-h-[220px] rounded-lg" />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <label for="code" class="text-sm text-slate-900 font-medium dark:text-white">Code du pays :</label>
                <input type="text" id="code" name="code" v-model="code" required
                    class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200" />
            </div>
            <div class="flex flex-col gap-1">
                <label for="prefix" class="text-sm text-slate-900 font-medium dark:text-white">Préfixe du pays :</label>
                <input type="text" id="prefix" name="prefix" v-model="prefix" required
                    class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200" />
            </div>
            <div class="flex flex-col gap-1">
                <label for="language" class="text-sm text-slate-900 font-medium dark:text-white">Langue la plus utilisée
                    du pays :</label>
                <input type="text" id="language" name="language" v-model="language" required
                    class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all dark:bg-transparent dark:border dark:border-slate-200 dark:text-slate-200" />
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
const { createData } = countriesData()
const router = useRouter();
const name = ref<string>('')
const code = ref<string>('')
const prefix = ref<string>('')
const language = ref<string>('')
const image = ref<any>(null)
const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);

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

const createCountry = async () => {
    error.value = null;
    message.value = null;
    if (name.value.trim() !== "" && code.value.trim() !== "" && prefix.value.trim() !== "" && language.value.trim() !== "" && image.value !== null) {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('code', code.value)
        formData.append('prefix', prefix.value)
        formData.append('language', language.value)
        formData.append('image', image.value)
        const res = await createData(formData)
        if (res.success) {
            message.value = res.msg;
            setTimeout(() => {
                router.push("/dashboard/countries")
            }, 1500);
        } else {
            error.value = res.error;
        }
    } else {
        error.value = "Veuillez remplir tous les champs";
    }
}

onUnmounted(() => {
    if (preview.value) {
        URL.revokeObjectURL(preview.value)
    }
})
</script>