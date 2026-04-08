<template>
  <div
    class="bg-[#fafafa] dark:bg-dark text-slate-800 font-sans antialiased selection:bg-orange-100 selection:text-orange-900 bg-noise">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- Scroll To Top Button -->
    <button v-if="showScrollTop" @click="scrollToTop"
      class="fixed bottom-20 lg:bottom-6 flex items-center justify-center right-2 md:right-6 z-30 bg-slate-900 text-white p-2.5 lg:p-3 rounded-full shadow-xl hover:bg-slate-800 transition-all duration-300 dark:bg-white dark:text-slate-900">
      <Icon name="mdi:arrow-up" class="w-5 h-5" />
    </button>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
</style>

<script lang="ts" setup>
const { getProfile } = usersData();
const showScrollTop = ref<boolean>(false);
const profil = ref<User | null>(null);
const router = useRouter();

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400 // position déclencheur (400px)
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
const { getVisit } = visitorsData();

onMounted(async () => {
  try {
    profil.value = await getProfile();
    await getVisit();
    if (profil.value && profil.value.status === 'inactif') {
      router.push("/authorization");
    }
  } catch (err) {
    console.error("Erreur IP:", err);
  }
});
</script>