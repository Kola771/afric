<template>
  <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-8">
    <main class="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">

        <!-- SIDEBAR NAVIGATION -->
        <aside class="hidden lg:block lg:col-span-3">
          <div class="sticky top-28 space-y-8">
            <div id="toc-container" class="space-y-1">
              <!-- TOC généré automatiquement -->
            </div>
          </div>
        </aside>

        <!-- DOCUMENT CONTENT -->
        <div class="lg:col-span-9 relative min-h-[500px]">

          <article id="view-cgu" class="fade-in block">

            <!-- HEADER -->
            <div class="mb-10 pb-8 border-b border-slate-200">
              <div
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold mb-4 border border-orange-100">
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Version 1.0 — Février 2026
              </div>
              <h1
                class="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                Conditions Générales d'Utilisation
              </h1>
              <p class="text-md text-slate-500 dark:text-slate-200 leading-relaxed max-w-2xl">
                Règles encadrant l'utilisation de la plateforme <strong>Afric Storyline</strong>,
                vos droits en tant qu'auteur et nos responsabilités.
              </p>
            </div>

            <!-- CONTENT -->
            <div class="space-y-10">

              <section id="cgu-intro" class="scroll-mt-28" data-title="Préambule">
                <p class="leading-relaxed text-sm dark:text-slate-200">
                  L'accès et l'utilisation de la plateforme <strong>Afric Storyline</strong> impliquent
                  l'acceptation sans réserve des présentes Conditions Générales d'Utilisation.
                  Ces conditions constituent un contrat entre vous (l'Utilisateur)
                  et <strong>Afric Storyline</strong>.
                </p>
              </section>

              <section id="cgu-definitions" class="scroll-mt-28" data-title="Définitions">
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  Définitions
                </h2>
                <div class="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                  Aux fins des présentes conditions :
                  <p><strong>Plateforme</strong> : désigne le site Afric Storyline.</p>
                  <p><strong>Utilisateur</strong> : toute personne disposant d’un compte.</p>
                  <p><strong>Auteur</strong> : utilisateur publiant du contenu.</p>
                  <p><strong>Contenu</strong> : toute œuvre, texte, commentaire ou publication mise en ligne.</p>
                </div>
              </section>

              <section id="cgu-accounts" class="scroll-mt-28" data-title="Comptes & Accès">
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icon name="mdi:account" class="w-5 h-5 text-orange-600 dark:text-orange-500" />
                  Comptes et Accès
                </h2>
                <div class="bg-white dark:bg-slate-50 rounded-xl border border-slate-200 p-6 shadow-sm">
                  <ul class="space-y-4">
                    <li class="flex items-start gap-2">
                      <Icon name="mdi:check" class="w-4 h-4 flex-shrink-0 text-slate-600" />
                      <span>
                        <span class="block text-sm font-semibold text-slate-900">
                          Eligibilité
                        </span>
                        <span class="text-sm text-slate-500">
                          Vous devez avoir au moins 13 ans pour créer un compte.
                          Les mineurs doivent avoir l'autorisation de leurs parents.
                        </span>
                      </span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon name="mdi:check" class="w-4 h-4 flex-shrink-0 text-slate-600" />
                      <span>
                        <span class="block text-sm font-semibold text-slate-900">
                          Sécurité
                        </span>
                        <span class="text-sm text-slate-500">
                          Vous êtes responsable de la confidentialité de vos identifiants.
                          Toute action effectuée depuis votre compte est réputée effectuée par vous.
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="cgu-ip" class="scroll-mt-28" data-title="Propriété Intellectuelle">
                <div class="bg-orange-50 border border-orange-100 rounded-xl p-6">
                  <h2 class="text-xl font-display font-bold text-orange-900 mb-4">
                    <Icon name="mdi:shield-account" class="w-5 h-5 text-orange-600 dark:text-orange-500" />
                    Propriété Intellectuelle
                  </h2>
                  <p class="text-sm text-orange-900 font-medium mb-2">Vos histoires vous appartiennent.</p>
                  <p class="text-sm text-orange-800/80 leading-relaxed mb-4">
                    En publiant sur <strong>Afric Storyline</strong>, vous conservez l’intégralité de vos droits
                    d’auteur sur vos œuvres.
                    <strong>Afric Storyline</strong> n’acquiert aucun droit de propriété sur votre contenu.
                    Vous nous accordez uniquement une licence non-exclusive, mondiale et gratuite
                    permettant d’héberger, reproduire, afficher et promouvoir votre contenu
                    sur la plateforme.
                  </p>

                  <p class="text-sm text-orange-800/80 leading-relaxed">
                    Lorsque votre contenu est accessible via un modèle payant (abonnement, achat ou
                    autre mécanisme de monétisation), <strong>Afric Storyline</strong> peut percevoir une commission
                    sur les revenus générés via la plateforme, conformément aux conditions tarifaires en vigueur.
                    Cette commission constitue la rémunération du service fourni et ne transfère
                    aucun droit de propriété intellectuelle à <strong>Afric Storyline</strong>.
                  </p>
                  <div class="grid sm:grid-cols-2 gap-4 mt-4">
                    <div class="bg-white/60 dark:bg-white/90 p-3 rounded-lg text-sm text-orange-900">
                      <span class="font-semibold block mb-1">Ce que nous pouvons faire</span>
                      Afficher votre histoire, la recommander aux lecteurs, créer des extraits pour les réseaux sociaux.
                    </div>
                    <div class="bg-white/60 dark:bg-white/90 p-3 rounded-lg text-sm text-orange-900">
                      <span class="font-semibold block mb-1">Ce que nous ne ferons jamais</span>
                      Vendre, modifier votre œuvre sans accord, ou revendiquer la paternité.
                    </div>
                  </div>
                </div>
              </section>

              <section id="cgu-publication" class="scroll-mt-28" data-title="Publication & Responsabilité">
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  Publication et Responsabilité
                </h2>
                <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                  L’Auteur garantit être titulaire des droits sur le contenu publié.
                  Il s’engage à ne publier aucun contenu violant les droits d’un tiers.
                  <br />
                  Afric Storyline n’exerce aucun contrôle éditorial préalable systématique
                  et ne peut être tenu responsable des contenus publiés par les utilisateurs.
                  <br />
                  En cas de violation signalée, la plateforme se réserve le droit
                  de retirer le contenu concerné sans préavis.
                </p>
              </section>

              <section id="cgu-content" class="scroll-mt-28" data-title="Code de conduite">
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  <Icon name="mdi:account-multiple-minus" class="w-5 h-5 text-orange-600 dark:text-orange-500" />
                  Code de conduite
                </h2>
                <p class="mb-4 text-md dark:text-slate-200">Le contenu suivant est strictement interdit :</p>
                <div class="grid gap-3 sm:grid-cols-2">
                  <div
                    class="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Icon name="solar:forbidden-circle-linear" class="w-5 h-5 text-red-500" />
                    Discours haineux ou discriminatoire
                  </div>
                  <div
                    class="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Icon name="solar:forbidden-circle-linear" class="w-5 h-5 text-red-500" />
                    Contenu plagié
                  </div>
                  <div
                    class="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Icon name="solar:forbidden-circle-linear" class="w-5 h-5 text-red-500" />
                    Harcèlement ou cyberintimidation
                  </div>
                  <div
                    class="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Icon name="solar:forbidden-circle-linear" class="w-5 h-5 text-red-500" />
                    Spam ou publicité non sollicitée
                  </div>
                </div>
              </section>

              <section id="cgu-reporting" class="scroll-mt-28" data-title="Signalement">
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  Signalement de contenu
                </h2>
                <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                  Tout utilisateur peut signaler un contenu jugé illicite ou contraire
                  aux présentes conditions via l’adresse suivante :
                  <strong><a href="mailto:contact@africstoryline.com">contact@africstoryline.com</a></strong>.
                  <br />
                  Après vérification, la plateforme pourra suspendre ou supprimer
                  le contenu concerné.
                </p>
              </section>

              <section id="cgu-data" class="scroll-mt-28" data-title="Données personnelles">
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  Données personnelles
                </h2>
                <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                  Afric Storyline collecte certaines données nécessaires
                  au fonctionnement du service (email, pays, statistiques de lecture).
                  <br />
                  Ces données ne sont ni vendues ni cédées à des tiers.
                  <br />
                  L’Utilisateur peut demander la suppression de ses données
                  en contactant : <strong><a href="mailto:contact@africstoryline.com">contact@africstoryline.com</a></strong>.
                </p>
              </section>

              <section id="cgu-termination" class="scroll-mt-28" data-title="Résiliation">
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  <Icon name="mdi:account-off" class="w-5 h-5 text-orange-600 dark:text-orange-500" />
                  Suspension et Résiliation
                </h2>
                <p class="text-slate-500 dark:text-slate-200 text-sm">
                  Nous nous réservons le droit de suspendre ou de supprimer votre
                  compte en cas de violation grave ou répétée de ces conditions,
                  après notification préalable, sauf en cas d'urgence impérieuse
                  (contenu illégal).
                </p>
              </section>

              <section id="cgu-liability" class="scroll-mt-28" data-title="Limitation de responsabilité">
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  Limitation de responsabilité
                </h2>
                <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                  Afric Storyline ne garantit pas un accès continu et sans interruption
                  au service.
                  <br />
                  La plateforme ne pourra être tenue responsable
                  des pertes indirectes, pertes de données ou dommages
                  résultant de l’utilisation du service.
                </p>
              </section>

              <section id="cgu-law" class="scroll-mt-28" data-title="Droit applicable">
                <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  Droit applicable
                </h2>
                <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                  Les présentes conditions sont régies par le droit applicable
                  dans le pays d’établissement de la plateforme.
                  <br />
                  Tout litige sera soumis aux juridictions compétentes
                  du ressort du siège social de Afric Storyline.
                </p>
              </section>
            </div>
          </article>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
useSeoMeta({
  title: 'Conditions d\'utilisation',
  description: 'Découvrez nos conditions d\'utilisation et comment utiliser notre plateforme.',

  ogTitle: 'Conditions d\'utilisation',
  ogDescription: 'Découvrez nos conditions d\'utilisation et comment utiliser notre plateforme.',
  ogImage: `${config.public.frontUrl}/afric.png`,
  ogUrl: `${config.public.frontUrl}`,
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Conditions d\'utilisation',
  twitterDescription: 'Découvrez nos conditions d\'utilisation et comment utiliser notre plateforme.',
  twitterImage: `${config.public.frontUrl}/afric.png`
});

onMounted(() => {
  const tocContainer = document.getElementById("toc-container");
  const article = document.getElementById("view-cgu");
  if (!tocContainer || !article) return;

  // Générer le sommaire
  tocContainer.innerHTML =
    '<p class="px-3 pb-2 text-xs font-semibold text-slate-400 dark:text-slate-200 uppercase tracking-wider">Sommaire</p>';

  const sections = article.querySelectorAll<HTMLElement>("section[id]");

  sections.forEach((section) => {
    const title = section.getAttribute("data-title");
    const id = section.getAttribute("id");
    if (!title || !id) return;

    const link = document.createElement("a");
    link.href = `#${id}`;
    link.className =
      "group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg transition-colors";

    link.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-orange-500 transition-colors"></span>
      ${title}
    `;

    tocContainer.appendChild(link);
  });

  const handleScroll = () => {
    const links = tocContainer.querySelectorAll<HTMLAnchorElement>("a");
    let currentId: string | null = null;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 180) {
        currentId = section.getAttribute("id");
      }
    });

    links.forEach((link) => {
      const span = link.querySelector("span");
      link.classList.remove("text-orange-600");
      link.classList.remove("dark:text-orange-500");
      link.classList.add("text-slate-500");
      span?.classList.remove("bg-orange-600");
      span?.classList.add("bg-slate-300");

      if (currentId && link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("text-orange-600");
        link.classList.add("dark:text-orange-500");
        link.classList.remove("text-slate-500");
        span?.classList.add("bg-orange-600");
        span?.classList.remove("bg-slate-300");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
