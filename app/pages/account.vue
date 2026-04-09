<template>
    <div class="font-sans antialiased text-slate-800 selection:bg-orange-100 selection:text-orange-900 h-screen">
    </div>
</template>
<script lang="ts" setup>
const { authorizePage, getTokenCookies } = authenticate();

definePageMeta({
    layout: "not-layout",
});

useSeoMeta({
    title: 'Connexion en cours',
});

onMounted(async () => {
    await authorizePage();
    await getTokenCookies();
})
</script>