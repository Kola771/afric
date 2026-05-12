<!-- components/HommageAuthors.vue -->
<script setup lang="ts">
interface Author {
  initials: string
  name: string
  country: string
  color: string
}

const authors: Author[] = [
  {
    initials: 'CA',
    name: 'Chimamanda N. Adichie',
    country: 'Nigéria',
    color: '#0E2138'
  },
  {
    initials: 'LS',
    name: 'Léopold S. Senghor',
    country: 'Sénégal',
    color: '#8B320C'
  },
  {
    initials: 'MB',
    name: 'Mariama Bâ',
    country: 'Sénégal',
    color: '#D88700'
  },
  {
    initials: 'AK',
    name: 'Ahmadou Kourouma',
    country: "Côte d’Ivoire",
    color: '#0E2138'
  },
  {
    initials: 'NO',
    name: "Ngũgĩ wa Thiong'o",
    country: 'Kenya',
    color: '#0E2138'
  }
]
</script>

<template>
  <section class="bg-white dark:bg-dark pt-14 lg:pt-16 pb-24 px-6">
    <div class="mx-auto max-w-7xl text-center">
      <!-- Subtitle -->
      <p
        class="mb-5 text-xs font-bold tracking-[0.35em] text-orange-600 dark:text-orange-500"
      >
        HOMMAGE
      </p>

      <!-- Title -->
      <h2
        class="mx-auto max-w-5xl text-3xl font-display font-medium text-slate-900 dark:text-white tracking-tight"
      >
        Voix qui ont marqué le continent
      </h2>

      <!-- Description -->
      <p
        class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-200 md:text-lg"
      >
        Les plumes essentielles dont l’héritage inspire chaque histoire publiée ici.
      </p>

      <!-- Authors -->
      <div
        class="mt-20 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-5"
      >
        <div
          v-for="author in authors"
          :key="author.name"
          class="flex flex-col items-center"
        >
          <!-- Circle -->
          <div
            class="flex h-32 w-32 items-center justify-center rounded-full text-5xl font-light text-slate-300 shadow-lg"
            :style="{ backgroundColor: author.color }"
          >
            {{ author.initials }}
          </div>

          <!-- Name -->
          <h3
            class="mt-6 max-w-[190px] text-xl lg:text-[22px] text-slate-800 dark:text-slate-300"
          >
            {{ author.name }}
          </h3>

          <!-- Country -->
          <p
            class="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-[#8d95a3]"
          >
            {{ author.country }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>