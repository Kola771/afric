<template>
  <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-8">
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 flex flex-col gap-4">
      <div class="flex flex-col items-start" v-if="category">
        <button @click="back"
          class="hover:bg-slate-200 hover:duration-300 hover:ease-in-out dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-lg border-slate-400 border-[1px] flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
          <Icon name="mdi:arrow-left" class="w-4 h-4" />
        </button>
        <div class="bg-slate-50 dark:bg-slate-800 rounded-lg w-full h-72 mt-2 relative">
          <img :src="`${config.public.apiBackendUrl}/uploads/categories/${category?.image}`" v-if="category"
            alt="Image de couverture de l'histoire"
            class="w-full h-full object-cover lg:object-contain grayscale-[20%] rounded-lg transition-transform duration-700">
        </div>
        <div class="py-4">
          <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">{{ category?.name }}
          </h2>
          <p class="text-sm mb-2 text-slate-500 dark:text-slate-200 mt-1">{{ category?.description }}</p>
          <p class="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400">Elle
            contient 154 histoire(s)</p>
        </div>
      </div>
      <div class="pt-5 border-slate-200 border-t flex flex-col gap-8">
        <div class="flex items-center md:items-end justify-between">
          <div>
            <h2 class="text-2xl font-display font-medium dark:text-white text-slate-900 tracking-tight">18ans+</h2>
          </div>
          <div class="flex gap-2">
            <select name="" id="" class="bg-slate-50 dark:bg-slate-800 dark:text-white outline-none px-3 py-1.5 text-sm lg:text-xs rounded-lg border-slate-300 border">
              <option value="" disabled selected>Statut</option>
              <option value="12+">En cours</option>
              <option value="16+">En pause</option>
              <option value="18+">Terminé</option>
            </select>
            <select name="" id="" class="bg-slate-50 dark:bg-slate-800 dark:text-white outline-none px-3 py-1.5 text-sm lg:text-xs rounded-lg border-slate-300 border">
              <option value="" disabled selected>Options</option>
              <option value="12+">12ans+</option>
              <option value="16+">16ans+</option>
              <option value="18+">18ans+</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          <HomeBookCard v-for="book in books" :key="book.id" :book="book" />
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();
const { getCategoryByUuid } = categoriesData();
const category = ref<Category | null>(null);

onMounted(async () => {
  category.value = await getCategoryByUuid(`${route.params.uuid}`);
});

const back = () => {
  window.history.back()
}
const books = ref<Book[]>([
  {
    id: 2,
    title: "Nairobi by Night",
    author: "Sarah O.",
    image: "/assets/img6.jpg",
    state: "En cours",
    rating: 4.6,
    rank: "#2",
    url: "/books/book-uuid-2"
  },
  {
    id: 3,
    title: "Le Chant du Baobab",
    author: "Moussa Traoré",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    state: "En cours",
    rating: 4.9,
    rank: "#3",
    url: "/books/book-uuid-3"
  },
])
</script>
