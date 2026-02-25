<template>
  <div class="bg-[#fafafa] dark:bg-dark text-slate-800 font-sans antialiased selection:bg-orange-100 selection:text-orange-900 bg-noise">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
html {
    scroll-behavior: smooth;
}
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
</style>

<script lang="ts" setup>
const { getVisit } = visitorsData();
const visitor = ref<any>(null);

onMounted(async () => {
     try {
      const res = await fetch("https://api.ipapi.is/");
      const data = await res.json();

      visitor.value = {
        ip: data.ip,
        origin: data.location.country,
        city: data.location.city,
      };

      await getVisit(visitor.value);
  } catch (err) {
    console.error("Erreur IP:", err);
  }
});
</script>