<template>
    <div class="bg-[#fffcfccc] dark:bg-transparent px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12">

        <!-- CONTENT -->
        <div v-if="user && wallet" class="flex flex-col gap-6 max-w-6xl mx-auto">

            <!-- HEADER -->
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 class="text-2xl flex items-center gap-2 font-display font-bold text-slate-900 dark:text-white">
                        <button @click="back"
                            class="py-2 rounded-lg flex items-center text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Icon name="mdi:arrow-left" class="w-4 h-4 lg:w-6" />
                        </button>
                        Bonjour, {{ user.name }} 👋
                    </h1>
                    <p class="text-sm text-slate-500 dark:text-slate-300 mt-1">
                        Gérez vos revenus et vos transactions en toute simplicité.
                    </p>
                </div>

                <!-- ACTIONS -->
                <div class="flex flex-wrap gap-2">
                    <nuxt-link to="#" class="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs">
                        💸 Retrait
                    </nuxt-link>

                    <nuxt-link to="#"
                        class="border border-slate-300 dark:border-slate-200 px-4 py-2 rounded-lg text-xs dark:text-slate-200">
                        📊 Historique
                    </nuxt-link>
                </div>
            </div>

            <!-- STATS -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <!-- SOLDE -->
                <div class="bg-white dark:bg-transparent border border-slate-200 p-4 rounded-xl shadow-sm">
                    <p class="text-xs text-slate-500 dark:text-slate-300">Solde total</p>
                    <p class="text-2xl font-bold text-slate-900 dark:text-white">
                        {{ formatNumber(wallet.balance_total) }}
                        <span class="text-orange-600">{{ wallet.currency }}</span>
                    </p>
                </div>

                <!-- PDF -->
                <div class="bg-white dark:bg-transparent border border-slate-200 p-4 rounded-xl shadow-sm">
                    <p class="text-xs text-slate-500 dark:text-slate-300">Revenus PDF</p>
                    <p class="text-xl font-semibold text-green-600">
                        {{ formatNumber(wallet.balance_total_pdf ?? 0) }} <span class="text-stone-800 dark:text-slate-200">{{
                            wallet.currency }}</span>
                    </p>
                </div>

                <!-- ABONNEMENT LIVRE -->
                <div class="bg-white dark:bg-transparent border border-slate-200 p-4 rounded-xl shadow-sm">
                    <p class="text-xs text-slate-500 dark:text-slate-300">Abonnement livre</p>
                    <p class="text-xl font-semibold text-green-600">
                        {{ formatNumber(wallet.balance_total_book_subscription ?? 0) }} <span class="text-stone-800 dark:text-slate-200">{{
                            wallet.currency }}</span>
                    </p>
                </div>

                <!-- ABONNEMENT GLOBAL -->
                <div class="bg-white dark:bg-transparent border border-slate-200 p-4 rounded-xl shadow-sm">
                    <p class="text-xs text-slate-500 dark:text-slate-300">Abonnement global</p>
                    <p class="text-xl font-semibold text-green-600">
                        {{ formatNumber(wallet.balance_total_subscription_global ?? 0) }} <span
                            class="text-stone-800 dark:text-slate-200">{{ wallet.currency }}</span>
                    </p>
                </div>

                <!-- RETRAITS -->
                <div class="bg-white dark:bg-transparent border border-slate-200 p-4 rounded-xl shadow-sm">
                    <p class="text-xs text-slate-500 dark:text-slate-300">Retraits</p>
                    <p class="text-xl font-semibold text-red-500">
                        {{ formatNumber(wallet.withdrawal_amount ?? 0) }} <span class="text-stone-800 dark:text-slate-200">{{
                            wallet.currency }}</span>
                    </p>
                </div>

            </div>

            <!-- EMPTY STATE -->
            <div v-if="wallet.balance_total === 0"
                class="text-xs text-slate-500 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                💡 Monétisez vos livres pour commencer à générer des revenus.
            </div>

            <!-- INFO -->
            <div class="bg-white dark:bg-transparent border border-slate-200 rounded-xl p-4">
                <p class="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    📚 Revenus de vos livres
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-300">
                    Vos revenus proviennent des ventes PDF et des abonnements lecteurs.
                </p>
            </div>

        </div>

        <!-- LOADING -->
        <div v-if="loading" class="h-96 flex flex-col items-center justify-center gap-3">
            <div class="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p class="text-sm text-slate-500">Chargement du portefeuille...</p>
        </div>

        <!-- NO WALLET -->
        <div v-if="!loading && !wallet"
            class="flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-slate-300">
            <Icon name="mdi:cash" class="w-12 h-12 text-slate-300 mb-3" />
            <p class="text-sm font-medium">Votre portefeuille n'est pas encore disponible</p>
        </div>

    </div>
</template>
<script lang="ts" setup>
const { toConnectUser } = authenticate();
const { findWalletByUserId } = userWalletsData();
const user = ref<User | null>(null);
const wallet = ref<Wallet | null>(null);
const loading = ref<boolean>(false);
const router = useRouter();

const back = () => {
    router.back();
}

onMounted(async () => {
    loading.value = true
    user.value = await toConnectUser();
    wallet.value = await findWalletByUserId();
    loading.value = false;
    if (!user.value || (user.value && !authorizeRoleUser(user.value.role))) {
        router.push("/login");
    } else {
        useSeoMeta({
            title: `Portefeuille - ${user.value.name}`,
        });
    }
})
</script>