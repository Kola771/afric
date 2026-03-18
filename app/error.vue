<script setup lang="ts">
const error = useError()

const handleClearError = () => {
  clearError({ redirect: '/' })
}

useSeoMeta({
    title: "Page non trouvée"
})
</script>

<template>
  <div class="dark:bg-dark bg-white flex flex-col items-center justify-center min-h-screen text-center px-4">
    <img v-if="error?.statusCode === 404" src="/assets/error.svg" alt="Error" class="w-96 h-96">
    <h1 class="text-4xl font-bold mb-4 dark:text-slate-200">
      {{ error?.statusCode === 404 ? '' : 'Une erreur est survenue' }}
    </h1>

    <p class="mb-4 text-gray-500 dark:text-slate-400">
      {{ error?.message }}
    </p>

    <button
      class="text-sm px-6 py-2.5 bg-orange-600 text-white rounded-lg flex items-center gap-2"
      @click="handleClearError"
    >
      Retour à l'accueil
      <Icon name="mdi:arrow-right" class="w-4 h-4" />
    </button>
  </div>
</template>