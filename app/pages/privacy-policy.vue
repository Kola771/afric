<template>
    <div class="bg-[#fffcfccc] dark:bg-dark pt-8">
        <main class="flex-1 w-full max-w-7xl mx-auto px-6 pt-16 pb-12">
        
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
                <!-- SIDEBAR NAVIGATION (Sticky on Desktop) -->
                <aside class="hidden lg:block lg:col-span-3">
                    <nav class="sticky top-28 space-y-1">
                        <p class="px-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sommaire</p>
                        <a href="#intro" class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50/50 rounded-lg transition-colors">
                            <Icon name="mdi:info" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            Introduction
                        </a>
                        <a href="#collection" class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                            <Icon name="mdi:database" class="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors" />
                            Données collectées
                        </a>
                        <a href="#usage" class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                            <Icon name="mdi:data" class="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors" />
                            Utilisation
                        </a>
                        <a href="#security" class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                            <Icon name="mdi:shield-check" class="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors" />
                            Sécurité
                        </a>
                        <a href="#rights" class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                            <Icon name="mdi:user-check" class="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors" />
                            Vos droits
                        </a>
                        <a href="#contact" class="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                            <Icon name="mdi:email-outline" class="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors" />
                            Contact
                        </a>
                    </nav>
                </aside>
                <!-- DOCUMENT CONTENT -->
                <div class="lg:col-span-9">
        
                    <!-- Page Header -->
                    <div class="mb-10 pb-8 border-b border-slate-200">
                        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold mb-4 border border-orange-100">
                            <span class="relative flex h-2 w-2">
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                              <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            Dernière mise à jour : 24 Octobre 2023
                        </div>
                        <h1 class="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight mb-4">Politique de Confidentialité</h1>
                        <p class="text-lg text-slate-500 leading-relaxed max-w-2xl">
                            Chez Afric Storyline, la protection de vos histoires et de vos données personnelles est notre priorité. Ce document détaille comment nous traitons vos informations.
                        </p>
                    </div>
                    <!-- Content Blocks -->
                    <div class="space-y-12">
        
                        <!-- 1. Introduction -->
                        <section id="intro" class="scroll-mt-28">
                            <p class="leading-relaxed">
                                Bienvenue sur Afric Storyline. En utilisant notre plateforme d'écriture et de publication, vous nous confiez certaines informations. Cette politique de confidentialité a pour but de vous expliquer de manière transparente quelles données nous collectons, comment nous les utilisons et les droits dont vous disposez.
                            </p>
                        </section>
                        <!-- 2. Données collectées -->
                        <section id="collection" class="scroll-mt-28">
                            <h2 class="flex items-center gap-3 text-xl font-display font-bold text-slate-900 mb-4">
                                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600">
                                    <iconify-icon icon="solar:database-bold" width="18"></iconify-icon>
                                </span>
                                Données que nous collectons
                            </h2>
                            <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <ul class="space-y-4">
                                    <li class="flex items-start gap-3">
                                        <div class="mt-1 text-orange-600 shrink-0">
                                            <iconify-icon icon="solar:check-circle-bold" width="20"></iconify-icon>
                                        </div>
                                        <div>
                                            <span class="block text-sm font-semibold text-slate-900">Informations de compte</span>
                                            <span class="text-sm text-slate-500">Votre nom d'utilisateur, adresse email et mot de passe crypté lors de votre inscription.</span>
                                        </div>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <div class="mt-1 text-orange-600 shrink-0">
                                            <iconify-icon icon="solar:check-circle-bold" width="20"></iconify-icon>
                                        </div>
                                        <div>
                                            <span class="block text-sm font-semibold text-slate-900">Vos écrits et contenus</span>
                                            <span class="text-sm text-slate-500">Les textes, chapitres, titres et images de couverture que vous téléchargez sur l'éditeur. Ces données sont stockées de manière sécurisée pour vous permettre d'y accéder à tout moment.</span>
                                        </div>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <div class="mt-1 text-orange-600 shrink-0">
                                            <iconify-icon icon="solar:check-circle-bold" width="20"></iconify-icon>
                                        </div>
                                        <div>
                                            <span class="block text-sm font-semibold text-slate-900">Données d'utilisation</span>
                                            <span class="text-sm text-slate-500">Des informations techniques comme votre adresse IP, votre type de navigateur et les pages visitées, afin d'assurer la sécurité et la performance du service.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <!-- 3. Utilisation -->
                        <section id="usage" class="scroll-mt-28">
                            <h2 class="text-xl font-display font-bold text-slate-900 mb-4">Utilisation de vos données</h2>
                            <p class="mb-4">Nous utilisons vos informations principalement pour :</p>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div class="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 class="text-sm font-bold text-slate-900 mb-1">Fournir le service</h3>
                                    <p class="text-xs text-slate-500">Sauvegarder vos brouillons, publier vos histoires et gérer votre authentification.</p>
                                </div>
                                <div class="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 class="text-sm font-bold text-slate-900 mb-1">Communication</h3>
                                    <p class="text-xs text-slate-500">Vous envoyer des notifications importantes concernant votre compte ou des mises à jour majeures.</p>
                                </div>
                                <div class="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 class="text-sm font-bold text-slate-900 mb-1">Amélioration</h3>
                                    <p class="text-xs text-slate-500">Analyser les tendances d'utilisation pour optimiser l'interface de l'éditeur.</p>
                                </div>
                                <div class="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 class="text-sm font-bold text-slate-900 mb-1">Sécurité</h3>
                                    <p class="text-xs text-slate-500">Détecter et prévenir les activités frauduleuses ou les abus.</p>
                                </div>
                            </div>
                        </section>
                        <!-- 5. Sécurité -->
                        <section id="security" class="scroll-mt-28">
                            <div class="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
                                <!-- Decor -->
                                <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        
                                <div class="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
                                    <div class="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                        <iconify-icon icon="solar:shield-keyhole-bold" width="32" class="text-orange-500"></iconify-icon>
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-display font-bold mb-2">Sécurité des données</h2>
                                        <p class="text-slate-300 text-sm leading-relaxed mb-4">
                                            Nous ne vendons jamais vos données à des tiers. Vos écrits sont votre propriété intellectuelle exclusive. Nous utilisons des protocoles de cryptage TLS (SSL) pour toutes les communications entre votre appareil et nos serveurs.
                                        </p>
                                        <ul class="text-sm text-slate-300 space-y-1">
                                            <li class="flex items-center gap-2">
                                                <iconify-icon icon="solar:check-square-linear" class="text-orange-500"></iconify-icon> Sauvegardes quotidiennes chiffrées
                                            </li>
                                            <li class="flex items-center gap-2">
                                                <iconify-icon icon="solar:check-square-linear" class="text-orange-500"></iconify-icon> Accès serveurs restreint
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <!-- 6. Vos droits -->
                        <section id="rights" class="scroll-mt-28">
                            <h2 class="text-xl font-display font-bold text-slate-900 mb-4">Vos droits (RGPD)</h2>
                            <p class="mb-4">Conformément à la réglementation, vous disposez des droits suivants sur vos données :</p>
                            <div class="grid gap-3">
                                <details class="group bg-white rounded-lg border border-slate-200 open:ring-2 open:ring-orange-100 open:border-orange-300 transition-all">
                                    <summary class="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-800 hover:bg-slate-50 rounded-lg">
                                        <span>Droit d'accès et de rectification</span>
                                        <iconify-icon icon="solar:alt-arrow-down-linear" class="text-slate-400 group-open:rotate-180 transition-transform"></iconify-icon>
                                    </summary>
                                    <div class="px-4 pb-4 pt-0 text-sm text-slate-500">
                                        Vous pouvez consulter, modifier ou corriger vos informations personnelles directement depuis les paramètres de votre compte à tout moment.
                                    </div>
                                </details>
                                <details class="group bg-white rounded-lg border border-slate-200 open:ring-2 open:ring-orange-100 open:border-orange-300 transition-all">
                                    <summary class="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-800 hover:bg-slate-50 rounded-lg">
                                        <span>Droit à l'oubli (Suppression)</span>
                                        <iconify-icon icon="solar:alt-arrow-down-linear" class="text-slate-400 group-open:rotate-180 transition-transform"></iconify-icon>
                                    </summary>
                                    <div class="px-4 pb-4 pt-0 text-sm text-slate-500">
                                        Sur simple demande ou via l'option "Supprimer mon compte", toutes vos données personnelles et vos écrits seront définitivement effacés de nos serveurs sous 30 jours.
                                    </div>
                                </details>
                                <details class="group bg-white rounded-lg border border-slate-200 open:ring-2 open:ring-orange-100 open:border-orange-300 transition-all">
                                    <summary class="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-800 hover:bg-slate-50 rounded-lg">
                                        <span>Droit à la portabilité</span>
                                        <iconify-icon icon="solar:alt-arrow-down-linear" class="text-slate-400 group-open:rotate-180 transition-transform"></iconify-icon>
                                    </summary>
                                    <div class="px-4 pb-4 pt-0 text-sm text-slate-500">
                                        Vous pouvez demander un export complet de vos chapitres et données personnelles dans un format standard (JSON ou CSV).
                                    </div>
                                </details>
                            </div>
                        </section>
                        <!-- 7. Contact -->
                        <section id="contact" class="scroll-mt-28 mb-12">
                            <div class="bg-orange-50 rounded-xl p-6 border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <h2 class="text-lg font-bold text-slate-900 mb-1">Des questions ?</h2>
                                    <p class="text-sm text-slate-600">Notre délégué à la protection des données est à votre écoute.</p>
                                </div>
                                <a href="mailto:privacy@africstoryline.com" class="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <iconify-icon icon="solar:letter-bold" width="18"></iconify-icon>
                                    Nous contacter
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<style scoped>
    /* Custom Scrollbar */
    .custom-scroll::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scroll::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
        background-color: #cbd5e1;
        border-radius: 20px;
    }
    html {
        scroll-behavior: smooth;
    }
</style>