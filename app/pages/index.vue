<template>
  <div>
    <HomeBanner />
    <HomeCatalog />
    <HomeBentoGrid />
    <HomeCta />
    <HomeHommageAuthors />
  </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
useSeoMeta({
  title: 'Accueil',
  description: 'Explorez des histoires africaines originales écrites par des auteurs émergents et passionnés sur Afric Storyline.',

  ogTitle: 'Accueil',
  ogDescription: 'Plongez dans des récits africains captivants publiés par une nouvelle génération d’auteurs talentueux.',
  ogImage: `${config.public.frontUrl}/afric.png`,
  ogUrl: `${config.public.frontUrl}`,
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Accueil',
  twitterDescription: 'Découvrez des récits africains uniques écrits par des auteurs émergents.',
  twitterImage: `${config.public.frontUrl}/afric.png`
});

onMounted(() => {
  const LAST_PLAY_KEY = "last_audio_play";
  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

  const now = Date.now();
  const lastPlay = localStorage.getItem(LAST_PLAY_KEY);

  if (!lastPlay || now - parseInt(lastPlay) > ONE_WEEK) {
    const audio = new Audio("/assets/audios/faaaa.mp3"); // ton fichier ici
    window.addEventListener("click", () => {
      audio.play().then(() => {
        localStorage.setItem(LAST_PLAY_KEY, now.toString());
      }).catch(() => {
        console.log("Lecture bloquée par le navigateur");
      });
    }, { once: true });
  }

  localStorage.removeItem("register_author");
  localStorage.removeItem("register_email");
});
</script>