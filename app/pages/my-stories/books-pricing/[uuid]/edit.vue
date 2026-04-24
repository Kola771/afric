<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b">
        <div class="max-w-6xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 pt-24 pb-12" v-if="user">
            <!-- Welcome Section -->
            <div class="flex flex-col gap-6">
                <div class="flex items-center gap-2">
                    <button @click="back"
                        class="py-2 flex-shrink-0 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Icon name="mdi:arrow-left" class="w-6 h-4" />
                    </button>
                    <div>
                        <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Modifier
                            d'une configuration</h2>
                    </div>
                </div>
            </div>
            <form class="flex flex-col gap-4" @submit.prevent="updateBookPricing">
                <div>
                    <label for="step" class="text-sm text-slate-900 font-medium dark:text-white">Sélectionnez un livre
                        :</label>
                    <select required id="step"
                        class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2.5 bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-500"
                        v-model="id_book">
                        <option value="" disabled selected>Sélectionnez un livre</option>
                        <option :value="book.id" v-for="(book, i) in books" :key="i">{{ book.title }}</option>
                    </select>
                </div>
                <div>
                    <label for="step" class="text-sm text-slate-900 font-medium dark:text-white">Devise :</label>
                    <select required id="step"
                        class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2.5 bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-500"
                        v-model="currency">
                        <option value="" disabled selected>Sélectionnez une devise</option>
                        <option value="XOF">XOF</option>
                        <option value="XAF">XAF</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="pdf_price" class="text-sm text-slate-900 font-medium dark:text-white">Prix pour l'achat
                        du livre (PDF) :</label>
                    <input type="number" min="100" step="1" id="pdf_price" v-model.number="pdf_price" required
                        @input="pdf_price = Math.floor(pdf_price)"
                        class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="subscription_price_monthly"
                        class="text-sm text-slate-900 font-medium dark:text-white">Prix pour l'abonnement mensuel
                        :</label>
                    <input type="number" min="100" step="1" id="subscription_price_monthly"
                        v-model.number="subscription_price_monthly" required
                        @input="subscription_price_monthly = Math.floor(subscription_price_monthly)"
                        class="block w-full rounded-lg border-0 p-2.5 lg:p-2 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all bg-white dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200" />
                </div>

                <div v-if="error" class="text-xs text-center font-medium text-red-500 mt-2">{{ error }}</div>
                <div v-if="message" class="text-xs text-center font-medium text-green-500 mt-2">{{ message }}</div>

                <div class="mt-2 flex flex-col md:flex-row md:justify-end">
                    <button :disabled="loading"
                        :class="loading ? 'cursor-not-allowed' : 'cursor-pointer'"
                        class="px-4 lg:px-8 py-2.5 bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors">Enregistrer les modifications</button>
                </div>
            </form>
        </div>
        <div v-else class="max-w-6xl mx-auto h-96 flex items-center justify-center">

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
    </div>
</template>
<script lang="ts" setup>
const { findAllBooksAuthors } = booksData();
const { updateBooksPricing, getBooksPricingByUuid } = booksPricingData();
const { getProfile } = usersData();
const { toConnectUser } = authenticate();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const pdf_price = ref<number>(500);
const books = ref<BookData[]>([]);
const bookPricing = ref<BookPricing | null>(null);
const subscription_price_monthly = ref<number>(500);
const description = ref<string>("");
const id_book = ref<any>("");
const currency = ref<string>("XOF");
const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);
const loading = ref(false);
const router = useRouter();
const route = useRoute();

const back = () => {
    router.back();
}

const updateBookPricing = async () => {
    error.value = null;
    message.value = null;
    loading.value = true; // ✅ désactivation début
    try {
        if (pdf_price.value <= 0 && subscription_price_monthly.value <= 0) {
            error.value = `Le montant ne doit pas être inférieur à 0 ${currency.value}`
            return;
        }
        if (pdf_price.value > 0 && subscription_price_monthly.value > 0 && id_book.value && currency.value.trim() !== "") {
            const res = await updateBooksPricing(`${route.params.uuid}`, {book: {id: id_book.value}, pdf_price: pdf_price.value, subscription_price_monthly: subscription_price_monthly.value, currency: currency.value})
            if (res.success) {
                message.value = res.msg;
                setTimeout(() => {
                    router.push("/my-stories/books-pricing")
                }, 1500);
            } else {
                error.value = res.error;
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
    books.value = await findAllBooksAuthors();
    bookPricing.value = await getBooksPricingByUuid(`${route.params.uuid}`);

    if(bookPricing.value) {
        id_book.value = bookPricing.value.id_book;
        pdf_price.value = bookPricing.value.pdf_price;
        subscription_price_monthly.value = bookPricing.value.subscription_price_monthly;
        currency.value = bookPricing.value.currency;
    }

    user.value = await toConnectUser();
    profil.value = await getProfile();
    if (!user.value) {
        router.push("/login");
    }
    if ((user.value && profil.value) && authorizeRoleUser(`${profil.value.role.toLocaleLowerCase()}`)) {
        useSeoMeta({
            title: `Ajout d'une configuration`,
        });
    } else {
        router.back();
    }
    if (profil.value && profil.value.status === 'inactif') {
        router.push("/authorization");
    }
})
</script>