<template>
    <div class="max-w-6xl mx-auto space-y-6 mb-4">
                
        <!-- Page Header -->
        <div class="flex flex-col items-start">
                <button @click="back" class="hover:bg-slate-200 hover:duration-300 hover:ease-in-out dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-lg border-slate-400 border-[1px] flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Icon name="mdi:arrow-left" class="w-4 h-4" />
                </button>
                <div class="w-full h-72 mt-2 relative">
                    <img src="/assets/img2.jpg" class="w-full h-full object-cover grayscale-[20%] rounded-lg transition-transform duration-700" alt="Image de couverture de l'histoire">
                </div>
                <div class="py-4">
                    <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Roman</h2>
                    <p class="text-sm mb-2 text-slate-500 dark:text-slate-200 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ea ducimus distinctio libero, quae quasi laboriosam autem delectus! Perferendis neque et necessitatibus officia assumenda? Ratione!</p>
                    <nuxt-link to="/dashboard/categories/category-uuid-1/stories" class="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:text-orange-600 underline">Elle contient 154 histoire(s)</nuxt-link>
                </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const back = () => {
    window.history.back()
}
</script>