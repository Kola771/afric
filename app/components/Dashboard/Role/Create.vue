<template>
    <div class="max-w-6xl mx-auto space-y-6">
                
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <button @click="back" class="py-2 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Icon name="mdi:arrow-left" class="w-4 h-4" />
                    </button>
                    Ajout d'un rôle
                </h2>
                <p class="text-sm text-slate-500 dark:text-slate-200 mt-1">Ajoutez un nouveau rôle pour organiser votre contenu.</p>
            </div>
        </div>
        <form class="flex flex-col gap-2.5" @submit.prevent="createRole">
            <div class="flex flex-col gap-1">
                <label for="name_role" class="text-sm text-slate-900 font-medium dark:text-white">Nom du rôle :</label>
                <input type="text" id="name_role" name="name_role" v-model="name" required class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
            </div>
            <div class="flex flex-col gap-1">
                <label for="description" class="text-sm text-slate-900 font-medium dark:text-white">Que fait ce rôle ?</label>
                <input type="text" id="description" name="description" v-model="description" required class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all" />
            </div>
            <div v-if="error" class="text-xs text-center font-medium text-red-500 mt-2">{{ error }}</div>
            <div v-if="message" class="text-xs text-center font-medium text-green-500 mt-2">{{ message }}</div>
            <div class="mt-2 flex flex-col md:flex-row md:justify-end">
                <button class="px-4 py-2.5 lg:px-8 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors">Valider</button>
            </div>
        </form>

    </div>
</template>
<script setup lang="ts">
    const {createData} = rolesData();
    const router = useRouter();
    const name = ref<string>('');
    const description = ref<string>('');
    const error = ref<string | null | undefined>(null);
    const message = ref<string | null | undefined>(null);

    const back = () => {
        window.history.back()
    }

    const createRole = async () => {
        error.value = null;
        message.value = null;
        if(name.value.trim() !== "" && description.value.trim() !== ""){
            const res = await createData({name: name.value, description: description.value})
            if(res.success) {
                message.value = res.msg;
                setTimeout(() => {
                    router.push("/dashboard/roles")
                }, 1500);
            } else {
                error.value = res.error;
            }
        } else {
            error.value = "Veuillez remplir tous les champs";
        }
    }
</script>