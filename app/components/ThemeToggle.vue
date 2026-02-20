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
      class="px-1.5 p-1 flex items-center gap-2 rounded-full bg-gray-200 dark:bg-primary dark:border-gray-600 dark:border"
    >
      <span
        class="p-1 rounded-full flex items-center justify-center text-primary"
        :class="colorMode.value === 'light'
          ? 'bg-white'
          : 'bg-transparent dark:text-white'"
      >
        <Icon name="mdi:weather-sunny" class="w-4 h-4" />
      </span>

      <span
        class="p-1 rounded-full flex items-center justify-center text-primary"
        :class="colorMode.value === 'dark'
          ? 'bg-white'
          : 'bg-transparent dark:text-white'"
      >
        <Icon name="mdi:weather-night" class="w-4 h-4" />
      </span>
    </button>
  </ClientOnly>
</template>
