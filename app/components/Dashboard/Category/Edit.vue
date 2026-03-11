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
                    <span>Modification d'une catégorie : "<strong class="text-orange-600 dark:text-orange-500"
                            v-if="category">{{ category?.name }}</strong>"</span>
                </h2>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Modifiez une catégorie pour organiser votre
                    contenu.</p>
            </div>
        </div>
        <form class="flex flex-col gap-2.5" @submit.prevent="updateCategory">
            <div class="flex flex-col gap-1">
                <p class="text-sm text-slate-900 font-medium dark:text-white">Image actuelle :</p>
                <div class="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg"><img
                        :src="`${config.public.apiBackendUrl}/uploads/categories/${category?.image}`" v-if="category"
                        alt="Image actuelle"
                        class="max-h-[200px] dark:border object-cover lg:object-contain lg:max-h-[220px] rounded-lg" />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <label for="name_category" class="text-sm text-slate-900 font-medium dark:text-white">Nom de la
                    catégorie :</label>
                <input type="text" id="name_category" name="name_category" v-model="name_category" required
                    class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
            </div>
            <div class="flex flex-col gap-1">
                <label for="file" class="text-sm text-slate-900 font-medium dark:text-white">Image de la catégorie
                    :</label>
                <input type="file" id="file" name="file" ref="file" accept="image/jpeg, image/jpg, image/png, image/jfif, image/avif"
                    class="bg-white block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all"
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
                <textarea id="description" name="description" rows="3" v-model="description" required
                    class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3 resize-none"
                    placeholder="Description de la catégorie..."></textarea>
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
<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const { getCategoryByUuid, updateData, updateImg } = categoriesData();
const category = ref<Category | null>(null);
const name_category = ref<string>('')
const image = ref<any>(null)
const description = ref<string>('')
const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);

onMounted(async () => {
    category.value = await getCategoryByUuid(`${route.params.uuid_edit}`);
    if (category.value) {
        name_category.value = category.value.name || '';
        description.value = category.value.description || '';
    }
});

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

const updateCategory = async () => {
    error.value = null;
    message.value = null;
    if (name_category.value.trim() !== "" && description.value.trim() !== "") {
        let res;
        res = await updateData(`${route.params.uuid_edit}`, { name: name_category.value, description: description.value })
        if (image.value) {
            const formData = new FormData()
            formData.append('image', image.value)
            res = await updateImg(`${route.params.uuid_edit}`, formData)
        }
        if (res?.success) {
            message.value = res.msg;
            setTimeout(() => {
                router.push("/dashboard/categories")
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