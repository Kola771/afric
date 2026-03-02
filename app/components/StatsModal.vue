<template>
  <transition name="slide-up-down" appear>
    <div
      v-if="show"
      class="fixed inset-0 bg-black/40 z-50 flex justify-end lg:justify-end"
      @click.self="close"
    >
      <!-- Mobile Bottom Sheet -->
      <div
        class="lg:hidden absolute bottom-0 w-full h-2/3 bg-white dark:bg-slate-800 rounded-t-2xl shadow-xl p-4 overflow-auto transition-transform transform"
      >
        <slot />
      </div>

      <!-- Desktop Sidebar -->
      <div
        class="hidden lg:block lg:relative lg:w-2/4 xl:w-2/5 2xl:w-1/3 bg-white dark:bg-slate-800 shadow-xl h-full p-6 transition-transform transform"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits(['close'])

const close = () => emit('close')
</script>

<style>
/* Mobile slide up/down */
.slide-up-down-enter-from {
  transform: translateY(100%);
}
.slide-up-down-enter-to {
  transform: translateY(0%);
}
.slide-up-down-leave-from {
  transform: translateY(0%);
}
.slide-up-down-leave-to {
  transform: translateY(100%);
}
.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition: transform 0.3s ease-in-out;
}

/* Desktop slide right/left */
@media (min-width: 1024px) {
  .slide-up-down-enter-from {
    transform: translateX(100%);
  }
  .slide-up-down-enter-to {
    transform: translateX(0%);
  }
  .slide-up-down-leave-from {
    transform: translateX(0%);
  }
  .slide-up-down-leave-to {
    transform: translateX(100%);
  }
}
</style>