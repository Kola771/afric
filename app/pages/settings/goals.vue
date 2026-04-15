<template>
    <div class="bg-[#fffcfccc] dark:bg-transparent">
        <div class="flex flex-col gap-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12" v-if="user">
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                        <button @click="back"
                            class="py-2 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Icon name="mdi:arrow-left" class="w-4 h-4" />
                        </button>
                        <h3
                            class="text-lg font-semibold text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                            Objectifs & Certifications <span v-if="profil && profil?.rank" :class="[
                                'text-[11px] w-fit px-2 rounded-md flex items-center gap-1',
                                profil?.rank === 'certifié'
                                    ? 'bg-orange-50 text-orange-700 border border-orange-100'
                                    : profil?.rank === 'best'
                                        ? 'bg-purple-50 text-purple-700 border border-purple-100'
                                        : profil?.rank === 'top'
                                            ? 'bg-green-50 text-green-700 border border-green-100'
                                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                            ]">
                                <Icon name="mdi:star-outline" size="14" />
                                {{ profil?.rank }}
                            </span>
                        </h3>
                    </div>
                    <p class="text-[14px] text-slate-500 dark:text-slate-300">
                        Débloquez des fonctionnalités et gagnez en visibilité en atteignant certains paliers. <br />
                        Vos
                        statistiques sont basées uniquement sur les histoires dont le statut est soit en cours, en
                        pause ou terminé.
                    </p>
                </div>
                <!-- TOGGLE ITEM -->
                <details class="group border rounded-lg p-3 cursor-pointer bg-white dark:bg-slate-800">
                    <summary class="flex justify-between items-center font-medium text-slate-800 dark:text-white">
                        🎬 Mini-vidéos par chapitre
                        <span class="group-open:rotate-180 transition">
                            <Icon name="mdi:arrow-bottom" class="w-4 h-4 text-slate-700 dark:text-slate-200" />
                        </span>
                    </summary>
                    <div class="mt-3 text-[14px] text-slate-600 dark:text-slate-300 space-y-2">
                        <p>
                            Dès qu’un chapitre atteint <span class="font-semibold text-orange-600">1 000
                                vues</span>,
                            vous pouvez ajouter une mini-vidéo immersive (30 à 40 secondes).
                        </p>
                        <p>
                            Cela permet d’augmenter l’engagement et de donner vie à vos histoires.
                        </p>
                    </div>
                </details>
                <!-- CERTIFICATIONS -->
                <details class="group border rounded-lg p-3 cursor-pointer bg-white dark:bg-slate-800">
                    <summary class="flex justify-between items-center font-medium text-slate-800 dark:text-white">
                        🏅 Système de certification
                        <span class="group-open:rotate-180 transition">
                            <Icon name="mdi:arrow-bottom" class="w-4 h-4 text-slate-700 dark:text-slate-200" />
                        </span>
                    </summary>
                    <div
                        class="mt-3 space-y-4 md:space-y-0 text-[14px] md:grid md:grid-cols-2 md:gap-4 text-slate-600 dark:text-slate-300">
                        <div>
                            <p class="font-semibold text-slate-900 dark:text-white">🔰 Standard</p>
                            <ul class="list-disc ml-5">
                                <li>Statut par défaut</li>
                                <li>Accès aux fonctionnalités de base</li>
                            </ul>
                        </div>
                        <div>
                            <p class="font-semibold text-green-600">🔥 Top</p>
                            <ul class="list-disc ml-5">
                                <li>50 000 vues cumulées sur une ou plusieurs histoires</li>
                                <li>+200 réactions (likes)</li>
                                <li>+50 commentaires</li>
                            </ul>
                        </div>
                        <div>
                            <p class="font-semibold text-purple-600">💎 Best</p>
                            <ul class="list-disc ml-5">
                                <li>350 000 vues cumulées</li>
                                <li>+800 réactions</li>
                                <li>+200 commentaires</li>
                            </ul>
                        </div>
                        <div>
                            <p class="font-semibold text-orange-600">👑 Certifié</p>
                            <ul class="list-disc ml-5">
                                <li>1 000 000 vues cumulées</li>
                                <li>+2500 réactions</li>
                                <li>+800 commentaires</li>
                            </ul>
                        </div>
                    </div>
                </details>
                <!-- AVANTAGES -->
                <details class="group border rounded-lg p-3 cursor-pointer bg-white dark:bg-slate-800">
                    <summary class="flex justify-between items-center font-medium text-slate-800 dark:text-white">
                        🚀 Avantages des paliers
                        <span class="group-open:rotate-180 transition">
                            <Icon name="mdi:arrow-bottom" class="w-4 h-4 text-slate-700 dark:text-slate-200" />
                        </span>
                    </summary>
                    <div class="mt-3 text-[14px] text-slate-600 dark:text-slate-300 space-y-2">
                        <ul class="list-disc ml-5">
                            <li>Plus de visibilité sur la plateforme</li>
                            <li>Mise en avant dans les recommandations</li>
                            <li>Accès anticipé à certaines fonctionnalités</li>
                            <li>Badge de reconnaissance auprès des lecteurs</li>
                        </ul>
                    </div>
                </details>

                <!-- MONETISATION -->
                <details class="group border rounded-lg p-3 cursor-pointer bg-white dark:bg-slate-800">
                    <summary class="flex justify-between items-center font-medium text-slate-800 dark:text-white">
                        💰 Monétisation & Abonnements
                        <span class="group-open:rotate-180 transition">
                            <Icon name="mdi:arrow-bottom" class="w-4 h-4 text-slate-700 dark:text-slate-200" />
                        </span>
                    </summary>

                    <div class="mt-3 text-[14px] text-slate-600 dark:text-slate-300 space-y-4">

                        <!-- PDF -->
                        <div class="border rounded-lg p-3">
                            <p class="font-semibold text-slate-900 dark:text-white">📕 Vente du livre (PDF complet)</p>
                            <ul class="list-disc ml-5 mt-1">
                                <li>Accessible à partir de <span class="font-semibold text-orange-600">3 000 vues
                                        cumulées</span></li>
                                <li>Minimum <span class="font-semibold">10 chapitres</span></li>
                                <li>Le livre doit être <span class="font-semibold">terminé</span></li>
                                <li>Le lecteur télécharge le livre complet (format PDF) en l'achetant</li>
                            </ul>

                            <p class="mt-2 text-xs text-slate-500">
                                💸 <span class="font-semibold">Répartition :</span> Vous gagnez <span
                                    class="text-green-600 font-semibold">80%</span>
                                sur chaque vente, la plateforme prend <span
                                    class="text-orange-600 font-semibold">20%</span>.
                            </p>
                        </div>

                        <!-- ABONNEMENT LIVRE -->
                        <div class="border rounded-lg p-3">
                            <p class="font-semibold text-slate-900 dark:text-white">📖 Abonnement à un livre</p>
                            <ul class="list-disc ml-5 mt-1">
                                <li>Accessible à partir de <span class="font-semibold text-orange-600">2 000 vues</span>
                                </li>
                                <li>Minimum <span class="font-semibold">5 chapitres</span></li>
                                <li>Pas besoin que le livre soit terminé</li>
                                <li>Le lecteur paie un abonnement mensuel pour suivre votre histoire</li>
                            </ul>

                            <p class="mt-2 text-xs text-slate-500">
                                💸 <span class="font-semibold">Répartition :</span> Vous gagnez <span
                                    class="text-green-600 font-semibold">75%</span>
                                des revenus, la plateforme prend <span class="text-orange-600 font-semibold">25%</span>.
                            </p>
                        </div>

                        <!-- ABONNEMENT GLOBAL -->
                        <div class="border rounded-lg p-3">
                            <p class="font-semibold text-slate-900 dark:text-white">🌍 Abonnement global</p>
                            <ul class="list-disc ml-5 mt-1">
                                <li>Les lecteurs accèdent à plusieurs livres avec un seul abonnement</li>
                                <li>Toutes les histoires éligibles peuvent générer des revenus automatiquement</li>
                            </ul>

                            <p class="mt-2 text-xs text-slate-500">
                                💸 <span class="font-semibold">Répartition :</span> La plateforme prend
                                <span class="text-orange-600 font-semibold">30%</span>.
                                Les <span class="text-green-600 font-semibold">70%</span> restants sont redistribués
                                entre les auteurs
                                en fonction de leurs performances (vues, engagement, popularité).
                            </p>
                        </div>
                        <p class="text-xs text-slate-500">
                            💡 <span class="font-semibold">Fixation des prix :</span>
                            Le prix du livre (PDF) et des abonnements par livre est défini librement par l’auteur.
                            L’abonnement global est défini par la plateforme.
                        </p>

                        <p class="text-xs text-slate-500">
                            💳 <span class="font-semibold">Retrait des gains :</span>
                            Vos revenus sont disponibles sur votre compte et peuvent être retirés directement depuis la
                            plateforme.
                        </p>

                        <!-- INFO -->
                        <p class="text-xs text-slate-400">
                            ⚠️ Ces conditions sont proposées dans le cadre de la phase bêta et peuvent évoluer afin d’améliorer l’expérience et la rémunération des auteurs.
                        </p>

                    </div>
                </details>
                <p class="text-xs text-slate-400">
                    D'autres fonctionnalités exclusives seront débloquées avec les prochaines évolutions de la
                    plateforme.
                </p>
            </div>
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
    </div>
</template>
<script lang="ts" setup>
const { toConnectUser } = authenticate();
const { getProfile, } = usersData();
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const router = useRouter();

const back = () => {
    router.back();
}

onMounted(async () => {
    user.value = await toConnectUser();
    profil.value = await getProfile();
    if (!user.value) {
        router.push("/login");
    } else {
        if (user.value && profil.value) {
            if (profil.value && profil.value.status === 'inactif') {
                router.push("/authorization");
            }
            if (!authorizeRoleUser(`${profil.value.role.toLocaleLowerCase()}`)) {
                router.push("/");
            }
            useSeoMeta({
                title: `Objectifs - ${user.value.name}`,
            });
        } else {
            router.push("/login");
        }
    }
})
</script>