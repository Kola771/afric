<template>
  <div class="dark:bg-dark bg-slate-50 h-screen text-center flex flex-col items-center justify-center px-4">
    <div
      class="flex flex-col items-center gap-4 max-w-2xl mx-auto justify-center p-8 bg-white rounded-2xl border-slate-200 border-[1px] w-full"
      v-if="profil">
      <div class="flex flex-col items-center lg:flex-row lg:items-center lg:gap-4">
        <div
          class="w-24 h-24 sm:w-40 sm:h-40 rounded-full border-[4px] border-white shadow-lg overflow-hidden bg-slate-200">
          <img v-if="profil?.photo" :src="profil.photo.includes('https') ? profil.photo : `${config.public.apiBackendUrl}/uploads/users/${profil.photo}`"
            class="w-full h-full object-cover" alt="Profile">
          <span v-if="!profil?.photo"
            class="p-1 text-xl lg:text-3xl font-medium text-slate-600 flex items-center justify-center w-full h-full rounded-full"
            :style="`background-color: ${profil?.code_color}`">
            {{ profil?.name.split(" ").length > 1 ? `${profil?.name.charAt(0).toUpperCase() +
              profil?.name.split(" ")[1]?.charAt(0).toUpperCase()}` :
              profil?.name.charAt(0).toUpperCase() }}
          </span>
        </div>
        <div class="">
          <h2 class="text-3xl lg:text-2xl font-display font-semibold tracking-tight">{{ profil.name }}</h2>
          <p class="text-slate-500 text-md lg:text-left">Pseudonyme : <strong>{{ profil.pseudonym }}</strong></p>
          <p class="text-slate-500 text-md lg:text-left">Pays d'origine : <strong>{{ profil.country }}</strong></p>
        </div>
      </div>

      <div class="text-sm text-slate-800 lg:text-md">
        <p class="text-lg font-semibold text-red-600">
          Votre compte est actuellement inactif
        </p>

        <p class="mt-2 text-slate-600">
          Votre compte a été désactivé. Il sera définitivement supprimé dans un délai de <strong>{{ getDaysFromToday(profil.sanction_date).days }} jours</strong>.
        </p>

        <p class="mt-2 text-slate-600">
          Si vous souhaitez conserver votre compte et vos données, nous vous invitons à le réactiver dès maintenant en contactant notre support.
        </p>

        <p class="mt-4 flex flex-col gap-4">
          <a href="mailto:africstoryline@gmail.com" class="inline-block text-orange-600 font-medium underline">
            Contacter le support
          </a>
          <button class="inline-block bg-red-600 hover:bg-red-700 hover:ease-linear hover:duration-300 font-medium text-white py-3 rounded-lg" @click="logout">Se déconnecter</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "not-layout",
});

const config = useRuntimeConfig();
const { getProfile } = usersData();
const { logout } = authenticate();
const profil = ref<User | null>(null);

useSeoMeta({
  title: "Page non trouvée"
});

onMounted(async () => {
  profil.value = await getProfile();
})
</script>