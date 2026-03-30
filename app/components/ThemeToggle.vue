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
      class="p-1 w-12 h-6 md:h-8 md:w-auto flex items-center md:gap-2 rounded-full bg-gray-200 dark:bg-primary dark:border-gray-600 dark:border"
    >
      <span
        class="p-1 rounded-full flex items-center justify-center text-primary"
        :class="colorMode.value === 'light'
          ? 'bg-white'
          : 'bg-transparent dark:text-white'"
      >
        <Icon name="mdi:weather-sunny" class="w-3 h-3" />
      </span>

      <span
        class="p-1 rounded-full flex items-center justify-center text-primary"
        :class="colorMode.value === 'dark'
          ? 'bg-white'
          : 'bg-transparent dark:text-white'"
      >
        <Icon name="mdi:weather-night" class="w-3 h-3" />
      </span>
    </button>
  </ClientOnly>
</template>
