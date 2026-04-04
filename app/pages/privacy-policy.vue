<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-8">
        <main class="flex-1 w-full max-w-7xl mx-auto px-6 pt-16 pb-12">

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">

                <!-- SIDEBAR NAVIGATION (Sticky on Desktop) -->
                <aside class="hidden lg:block lg:col-span-3">
                    <nav class="sticky top-28 space-y-1">
                        <p
                            class="px-3 pb-2 text-xs font-semibold text-slate-600 dark:text-slate-200 uppercase tracking-wider">
                            Sommaire</p>
                        <a href="#intro"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50/50 dark:bg-slate-700 rounded-lg transition-colors">
                            Introduction
                        </a>
                        <a href="#collection"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            Données collectées
                        </a>
                        <a href="#usage"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            Utilisation des données
                        </a>
                        <a href="#controller"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            Responsable du traitement
                        </a>
                        <a href="#legal-basis"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            Base légale du traitement
                        </a>
                        <a href="#cookies"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            Cookies
                        </a>
                        <a href="#security"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            Sécurité
                        </a>
                        <a href="#rights"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            Vos droits (RGPD)
                        </a>
                        <a href="#retention"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            Durée de conservation
                        </a>
                        <a href="#international"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            Transfert international
                        </a>
                        <a href="#modifications"
                            class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                            Modification de la politique
                        </a>
                    </nav>
                </aside>
                <!-- DOCUMENT CONTENT -->
                <div class="lg:col-span-9">

                    <!-- Page Header -->
                    <div class="mb-10 pb-8 border-b border-slate-200">
                        <div
                            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold mb-4 border border-orange-100">
                            <span class="relative flex h-2 w-2">
                                <span
                                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            Dernière mise à jour : 18 Octobre 2026
                        </div>
                        <h1
                            class="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                            Politique de Confidentialité</h1>
                        <p class="text-md text-slate-500 dark:text-slate-200 leading-relaxed max-w-2xl">
                            Chez Afric Storyline, la protection de vos histoires et de vos données personnelles est
                            notre priorité. Ce document détaille comment nous traitons vos informations.
                        </p>
                    </div>
                    <!-- Content Blocks -->
                    <div class="space-y-10">

                        <!-- 1. Introduction -->
                        <section id="intro" class="scroll-mt-28">
                            <p class="leading-relaxed text-sm dark:text-slate-200">
                                Bienvenue sur Afric Storyline. En utilisant notre plateforme d'écriture et de
                                publication, vous nous confiez certaines informations. Cette politique de
                                confidentialité a pour but de vous expliquer de manière transparente quelles données
                                nous collectons, comment nous les utilisons et les droits dont vous disposez.
                            </p>
                        </section>

                        <!-- 2. Données collectées -->
                        <section id="collection" class="scroll-mt-28">
                            <h2
                                class="flex items-center gap-3 text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                                <span
                                    class="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600">
                                    <Icon name="solar:database-bold" class="w-5 h-5" />
                                </span>
                                Données que nous collectons
                            </h2>
                            <div class="bg-white dark:bg-slate-50 rounded-xl border border-slate-200 p-6 shadow-sm">
                                <ul class="space-y-4">
                                    <li class="flex items-start gap-3">
                                        <div class="mt-1 text-orange-600 shrink-0">
                                            <Icon name="solar:check-circle-bold" class="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span class="block text-sm font-semibold text-slate-900">Informations de
                                                compte</span>
                                            <span class="text-sm text-slate-500">Votre nom d'utilisateur, adresse email
                                                et mot de passe lors de votre inscription.</span>
                                        </div>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <div class="mt-1 text-orange-600 shrink-0">
                                            <Icon name="solar:check-circle-bold" class="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span class="block text-sm font-semibold text-slate-900">Vos écrits et
                                                contenus</span>
                                            <span class="text-sm text-slate-500">Les textes, chapitres, titres et images
                                                de couverture que vous téléchargez sur l'éditeur. Ces données sont
                                                stockées de manière sécurisée pour vous permettre d'y accéder à tout
                                                moment.</span>
                                        </div>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <div class="mt-1 text-orange-600 shrink-0">
                                            <Icon name="solar:check-circle-bold" class="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span class="block text-sm font-semibold text-slate-900">Données
                                                d'utilisation</span>
                                            <span class="text-sm text-slate-500">Des informations techniques comme votre
                                                adresse IP, votre type de navigateur et les pages visitées, afin
                                                d'assurer la sécurité et la performance du service.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <!-- 3. Utilisation -->
                        <section id="usage" class="scroll-mt-28">
                            <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">Utilisation
                                de vos données</h2>
                            <p class="mb-4 text-md dark:text-slate-200">Nous utilisons vos informations principalement
                                pour :</p>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div class="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 class="text-sm font-bold text-slate-900 mb-1">Fournir le service</h3>
                                    <p class="text-xs text-slate-500">Sauvegarder vos brouillons, publier vos histoires
                                        et gérer votre authentification.</p>
                                </div>
                                <div class="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 class="text-sm font-bold text-slate-900 mb-1">Communication</h3>
                                    <p class="text-xs text-slate-500">Vous envoyer des notifications importantes
                                        concernant votre compte ou des mises à jour majeures.</p>
                                </div>
                                <div class="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 class="text-sm font-bold text-slate-900 mb-1">Amélioration</h3>
                                    <p class="text-xs text-slate-500">Analyser les tendances d'utilisation pour
                                        optimiser l'interface de l'éditeur.</p>
                                </div>
                                <div class="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 class="text-sm font-bold text-slate-900 mb-1">Sécurité</h3>
                                    <p class="text-xs text-slate-500">Détecter et prévenir les activités frauduleuses ou
                                        les abus.</p>
                                </div>
                            </div>
                        </section>

                         <section id="controller" class="scroll-mt-28">
                            <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                                Responsable du traitement
                            </h2>
                            <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                                Les données personnelles collectées sur Afric Storyline
                                sont traitées par l’éditeur de la plateforme.
                                <br />
                                Pour toute question relative à la protection des données :
                                <strong><a href="mailto:contact@africstoryline.com">contact@africstoryline.com</a></strong>
                            </p>
                        </section>

                        <section id="legal-basis" class="scroll-mt-28">
                            <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                                Base légale du traitement
                            </h2>
                            <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                                Le traitement de vos données repose sur :
                                <br />
                                • L’exécution du contrat (création de compte, publication)
                                <br />
                                • Votre consentement (inscription, notifications)
                                <br />
                                • L’intérêt légitime de la plateforme (sécurité, prévention des abus)
                            </p>
                        </section>

                        <section id="cookies" class="scroll-mt-28">
                            <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                                Cookies
                            </h2>
                            <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                                Afric Storyline utilise des cookies strictement nécessaires
                                au fonctionnement du service (authentification, sécurité).
                                <br />
                                Des cookies analytiques peuvent être utilisés
                                afin d’améliorer l’expérience utilisateur.
                                <br />
                                Vous pouvez configurer votre navigateur
                                pour refuser les cookies.
                            </p>
                        </section>

                        <!-- 5. Sécurité -->
                        <section id="security" class="scroll-mt-28">
                            <div class="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
                                <!-- Decor -->
                                <div
                                    class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl">
                                </div>

                                <div class="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
                                    <div
                                        class="bg-white/10 p-3 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                        <Icon name="solar:shield-keyhole-bold" class="w-8 h-8 text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-display font-bold mb-2">Sécurité des données</h2>
                                        <p class="text-slate-300 text-sm leading-relaxed mb-4">
                                            Nous ne vendons jamais vos données à des tiers. Vos écrits sont votre
                                            propriété intellectuelle exclusive.
                                        </p>
                                        <ul class="text-sm text-slate-300 space-y-1">
                                            <li class="flex items-center gap-2">
                                                <Icon name="solar:check-square-linear"
                                                    class="w-5 h-5 text-orange-500" />
                                                Sauvegardes quotidiennes chiffrées
                                            </li>
                                            <li class="flex items-center gap-2">
                                                <Icon name="solar:check-square-linear"
                                                    class="w-5 h-5 text-orange-500" />
                                                Accès serveurs restreint
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- 6. Vos droits -->
                        <section id="rights" class="scroll-mt-28">
                            <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">Vos droits
                                (RGPD)</h2>
                            <p class="mb-4 text-md dark:text-slate-200">Conformément à la réglementation, vous disposez
                                des droits suivants sur vos données :</p>
                            <div class="grid gap-3">
                                <details
                                    class="group bg-white dark:bg-slate-50 rounded-lg border border-slate-200 open:ring-2 open:ring-orange-100 open:border-orange-300 transition-all">
                                    <summary
                                        class="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-sm">
                                        <span>Droit d'accès et de rectification</span>
                                        <Icon name="solar:alt-arrow-down-linear"
                                            class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <div class="px-4 pb-4 pt-0 text-sm text-slate-500">
                                        Vous pouvez consulter, modifier ou corriger vos informations personnelles
                                        directement depuis les paramètres de votre compte à tout moment.
                                    </div>
                                </details>
                                <details
                                    class="group bg-white dark:bg-slate-50 rounded-lg border border-slate-200 open:ring-2 open:ring-orange-100 open:border-orange-300 transition-all">
                                    <summary
                                        class="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-sm">
                                        <span>Droit à l'oubli (Suppression)</span>
                                        <Icon name="solar:alt-arrow-down-linear"
                                            class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <div class="px-4 pb-4 pt-0 text-sm text-slate-500">
                                        Sur simple demande ou via l'option "Supprimer mon compte", toutes vos données
                                        personnelles et vos écrits seront définitivement effacés de nos serveurs.
                                    </div>
                                </details>
                                <details
                                    class="group bg-white dark:bg-slate-50 rounded-lg border border-slate-200 open:ring-2 open:ring-orange-100 open:border-orange-300 transition-all">
                                    <summary
                                        class="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-sm">
                                        <span>Droit à la portabilité</span>
                                        <Icon name="solar:alt-arrow-down-linear"
                                            class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <div class="px-4 pb-4 pt-0 text-sm text-slate-500">
                                        Vous pouvez demander un export complet de vos chapitres et données personnelles
                                        dans un format standard (JSON ou CSV).
                                    </div>
                                </details>
                            </div>
                        </section>

                        <section id="retention" class="scroll-mt-28">
                            <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                                Durée de conservation
                            </h2>
                            <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                                Vos données sont conservées tant que votre compte est actif.
                                <br />
                                En cas de suppression du compte,
                                les données sont effacées dans un délai maximum de 30 jours,
                                sauf obligation légale contraire.
                            </p>
                        </section>

                        <section id="international" class="scroll-mt-28">
                            <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                                Transfert international
                            </h2>
                            <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                                Les données peuvent être hébergées
                                sur des serveurs situés hors de votre pays.
                                <br />
                                Dans ce cas, Afric Storyline s’assure
                                que des garanties appropriées sont mises en place
                                pour protéger vos données.
                            </p>
                        </section>

                        <section id="modifications" class="scroll-mt-28">
                            <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                                Modification de la politique
                            </h2>
                            <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                                Afric Storyline peut modifier la présente politique
                                à tout moment.
                                <br />
                                Les utilisateurs seront informés
                                en cas de changement substantiel.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
useSeoMeta({
    title: 'Politique de confidentialité',
    description: 'Découvrez notre politique de confidentialité et comment nous protégeons vos données.',

    ogTitle: 'Politique de confidentialité',
    ogDescription: 'Découvrez notre politique de confidentialité et comment nous protégeons vos données.',
    ogImage: `${config.public.frontUrl}/afric.png`,
    ogUrl: `${config.public.frontUrl}`,
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'Politique de confidentialité',
    twitterDescription: 'Découvrez notre politique de confidentialité et comment nous protégeons vos données.',
    twitterImage: `${config.public.frontUrl}/afric.png`
});

onMounted(() => {
    const sections = document.querySelectorAll<HTMLElement>("section");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>("aside nav a");

    const handleScroll = () => {
        let current: string | null = null;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 180) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("text-orange-600", "bg-orange-50/50", "dark:bg-transparent", "dark:text-orange-500", "dark:bg-slate-700");
            const span = link.querySelector<HTMLElement>("span");
            if (span) {
                span.classList.add("text-slate-400");
            }
            link.classList.add("text-slate-600");

            const href = link.getAttribute("href");
            if (current && href?.includes(current)) {
                link.classList.add("text-orange-600", "bg-orange-50/50", "dark:bg-slate-700", "dark:text-orange-500");
                link.classList.remove("text-slate-600", "dark:text-slate-200", "hover:bg-slate-100");

                const icon = link.querySelector<HTMLElement>("span");
                if (icon) {
                    icon.classList.remove("text-slate-400");
                }
            }
        });
    };

    window.addEventListener("scroll", handleScroll);

    onBeforeUnmount(() => {
        window.removeEventListener("scroll", handleScroll);
    });
});
</script>