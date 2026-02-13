<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const isOpen = ref(false)
</script>

<template>
  <header>
    <nav class="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 dark:bg-dark dark:border-slate-300 dark:text-white backdrop-blur-md transition-all">
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">

          <!-- Logo -->
          <nuxt-link to="/" class="flex items-center gap-2.5 group">
            <div class="w-8 h-8 bg-primary rounded-lg dark:border-gray-600 dark:border flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300 tracking-tighter">
              A
            </div>
            <span class="font-display font-semibold dark:text-gray-200 text-slate-900 tracking-tight text-lg">
              Afric Storyline
            </span>
          </nuxt-link>

          <!-- Desktop Menu -->
          <div class="hidden lg:flex items-center gap-8 text-slate-500">
            <nuxt-link to="/" :class="`${route.path === '/' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} text-sm font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">Découvrir</nuxt-link>
            <nuxt-link to="/categories" :class="`${route.path === '/categories' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} text-sm font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">Categories</nuxt-link>
            <nuxt-link to="/stories" :class="`${route.path === '/stories' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} text-sm font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">Histoires</nuxt-link>
            <nuxt-link to="/authors" :class="`${route.path === '/authors' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} text-sm font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">Auteurs</nuxt-link>
            <nuxt-link to="/" :class="`${route.path === '/about' ? 'text-primary dark:text-orange-400' : 'dark:text-white'} text-sm font-medium hover:text-slate-900 dark:hover:text-gray-400 transition-colors`">A propos</nuxt-link>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-3">

          <ThemeToggle class="lg:hidden" />

            <!-- Hamburger (mobile only) -->
            <button 
              @click="isOpen = !isOpen"
              class="lg:hidden p-2 mt-1 text-slate-700 dark:text-white"
            >
              <Icon 
                :name="isOpen ? 'mdi:close' : 'mdi:menu'" 
                class="w-6 h-6 transition-transform duration-300"
              />
            </button>

            <!-- Desktop actions -->
            <button class="hidden lg:flex p-2 text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-gray-400 transition-colors">
              <Icon name="mdi:magnify" class="w-5 h-5" />
            </button>

            <div class="h-5 w-px bg-slate-200 hidden lg:block"></div>

            <a href="#" class="hidden lg:block text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-white dark:hover:text-gray-400 transition-colors px-2">
              Connexion
            </a>

            <a href="#" class="hidden lg:flex items-center gap-2 bg-primary hover:bg-slate-800 dark:bg-white dark:hover:bg-orange-50 dark:hover:border-orange-100/50 dark:hover:text-orange-800 dark:text-stone-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md transform active:scale-95">
              <span>Commencer</span>
            </a>

            <ThemeToggle class="hidden lg:flex" />
          </div>
        </div>
      </div>

      <!-- 🔥 Mobile Menu avec animation -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div 
          v-if="isOpen"
          class="lg:hidden bg-white dark:bg-dark border-t border-slate-200 dark:border-gray-700 px-6 py-6 space-y-5 shadow-xl"
        >
          <nuxt-link to="/" @click="isOpen = !isOpen" :class="`${route.path === '/' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">Découvrir</nuxt-link>
          <nuxt-link to="/categories" @click="isOpen = !isOpen" :class="`${route.path === '/categories' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">Categories</nuxt-link>
          <nuxt-link to="/stories" @click="isOpen = !isOpen" :class="`${route.path === '/stories' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">Histoires</nuxt-link>
          <nuxt-link to="/authors" @click="isOpen = !isOpen" :class="`${route.path === '/authors' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">Auteurs</nuxt-link>
          <nuxt-link to="/" @click="isOpen = !isOpen" :class="`${route.path === '/about' ? 'text-primary dark:text-orange-400' : 'text-slate-500 dark:text-white'} block text-sm dark:hover:text-gray-400 font-medium hover:text-primary transition-colors`">A propos</nuxt-link>

          <div class="pt-4 border-t border-slate-200 dark:border-gray-700 flex md:flex-row flex-col gap-2">
            <nuxt-link to="/" @click="isOpen = !isOpen" class="text-center font-medium text-primary bg-white rounded-lg px-4 py-3 md:py-2 md:px-6 border-primary border-[1px] dark:border-none">Connexion</nuxt-link>
            <nuxt-link to="/" @click="isOpen = !isOpen" class="text-center bg-primary text-white py-3 md:py-2 md:px-6 px-4 rounded-lg font-medium dark:border-gray-600 dark:border-[1px]">
              Commencer
            </nuxt-link>
          </div>
        </div>
      </transition>

    </nav>
  </header>
</template>
