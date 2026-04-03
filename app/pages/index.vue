<template>
  <div>
    <HomeBanner />
    <HomeCatalog />
    <HomeBentoGrid />
    <HomeCta />
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
    localStorage.removeItem("register_author");
    localStorage.removeItem("register_email");
  });
</script>