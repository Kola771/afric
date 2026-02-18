<template>
  <div class="flex flex-col justify-between min-h-screen">
    
    <Header />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />

  </div>
</template>

<style>
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
</style>
