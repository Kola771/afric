<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference =
    colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button
      @click="toggleTheme"
      class="md:w-auto flex items-center md:gap-2 rounded-full bg-gray-200 dark:bg-primary"
    >
      <span v-if="colorMode.value === 'dark'"
        class="p-1 rounded-full flex items-center justify-center"
        :class="'bg-transparent dark:text-white'"
      >
        <Icon name="mdi:weather-sunny" class="w-4 h-4" />
      </span>

      <span v-else
        class="p-1 rounded-full flex items-center justify-center text-primary"
        :class="'bg-transparent dark:text-white'"
      >
        <Icon name="mdi:weather-night" class="w-4 h-4" />
      </span>
    </button>
  </ClientOnly>
</template>
