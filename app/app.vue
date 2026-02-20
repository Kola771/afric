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