<template>
  <div>
    <HomeBanner />
    <HomeCatalog />
    <HomeBentoGrid />
    <HomeCta />
  </div>
</template>
<script lang="ts" setup>
  useSeoMeta({
    title: 'Accueil',
    description: 'Explorez des histoires africaines originales écrites par des auteurs émergents et passionnés sur Afric Storyline.',
    
    ogTitle: 'Accueil',
    ogDescription: 'Plongez dans des récits africains captivants publiés par une nouvelle génération d’auteurs talentueux.',
    ogImage: 'https://africstoryline.com/afric.png',
    ogUrl: 'https://africstoryline.com/',
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'Accueil',
    twitterDescription: 'Découvrez des récits africains uniques écrits par des auteurs émergents.',
    twitterImage: 'https://africstoryline.com/afric.png'
  });

  onMounted(() => {
    localStorage.removeItem("register_author");
    localStorage.removeItem("register_email");
  });
</script>