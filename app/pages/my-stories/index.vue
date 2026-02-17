<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b pt-12 pb-12">
        <section class="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-100 lg:gap-10">
            <div class="flex flex-col md:flex-row md:justify-end">
                <button @click="toggleCreateModal" class="flex items-center gap-2 bg-primary text-white dark:bg-slate-800 dark:border hover:bg-slate-700 hover:ease-in-out hover:duration-300 rounded-full py-3 text-sm justify-center border-slate-200 border md:px-6 md:py-2.5">
                    <Icon name="mdi:plus" class="w-5 h-5" />
                    Ajouter une histoire</button>
            </div>
            <div class="border-t border-slate-200 mt-6 pt-6">
                <h3 class="font-display text-xl font-medium text-slate-900 dark:text-white flex items-center gap-1 mb-4"><Icon name="mdi:book-multiple-outline" class="w-5 h-5" /> Mes histoires</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
                    <div class="flex flex-col gap-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 hover:border-slate-300 transition-all group-hover:scale-105 hover:shadow-sm pb-2" v-for="(story, index) in stories">
                        <nuxt-link
                            :key="story.id"
                            :to="`/books/book-uuid-${story.id}`"
                            class="group flex flex-col"
                            >
                            <img :src="story.image" class="w-full h-28 lg:h-40 rounded-t-lg object-cover transition-transform duration-500" :alt="story.title">
                            <div class="px-2.5 pb-2 pt-2 flex flex-col gap-1">
                                <p class="font-medium text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                                    Histoire {{ index + 1 }}
                                </p>
                                <p class="flex items-center gap-3 text-[10px] font-medium text-orange-600">
                                    <span class="bg-orange-50 border border-orange-100/50 text-orange-600 font-medium animate-fade-in-up px-2 py-1 rounded">Romance</span>
                                    <span class="bg-slate-100 text-slate-500 px-2 py-1 rounded">En cours</span>
                                </p>
                                <p class="text-xs text-slate-500 dark:text-slate-200 flex flex-wrap gap-2">
                                    <span>{{ story.chapters }} chap,</span> <span class="flex items-center gap-1"><Icon name="mdi:eye" class="w-3 h-3" /> <span>{{ story.views }} vue(s)</span></span>
                                </p>
                            </div>
                        </nuxt-link>
                        <div class="grid grid-cols-1 gap-1 px-2.5">
                            <button @click="toggleUpdateModal" class="text-blue-500 font-medium text-end gap-1 text-xs text-right dark:text-blue-400 px-1 group-hover:translate-x-1 transition-transform hover:underline">
                                <Icon name="mdi:pencil" class="w-3 h-3" />
                                Modifier l'histoire
                            </button>
                            <nuxt-link :to="`/my-stories/chapter-uuid-${story.id}`" class="text-orange-500 text-center font-medium text-end gap-1 text-xs text-right dark:text-orange-400 px-1 group-hover:translate-x-1 transition-transform hover:underline">
                                <Icon name="mdi:pencil" class="w-3 h-3" />
                                Modifier les chapitres
                            </nuxt-link>
                            <button @click="toggleDeleteModal" class="text-red-500 font-medium text-end gap-1 text-xs text-right dark:text-red-400 px-1 group-hover:translate-x-1 transition-transform hover:underline">
                                <Icon name="mdi:delete" class="w-3 h-3" />
                                Supprimer l'histoire
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <MyStoryCreateBook @close-create-modal="toggleCreateModal" :showCreateModal="showCreateModal" v-if="showCreateModal" />
        <MyStoryUpdateBook @close-update-modal="toggleUpdateModal" :showUpdateModal="showUpdateModal" v-if="showUpdateModal" />
        <MyStoryDeleteBook @close-delete-modal="toggleDeleteModal" :showDeleteModal="showDeleteModal" v-if="showDeleteModal" />
    </div>
</template>
<script lang="ts" setup>
const stories = ref<any[]>([
  {
    id: 1,
    image: "/assets/img1.jpg",
    number: "01",
    title: "Titre de l'histoire",
    views: "4,5k",
    chapters: 12,
    publishedAt: "12 Oct 2023"
  },
  {
    id: 2,
    image: "/assets/img2.jpg",
    number: "02",
    title: "Titre de l'histoire",
    views: "3,2k",
    chapters: 15,
    publishedAt: "19 Oct 2023"
  },
  {
    id: 3,
    image: "/assets/img3.jpg",
    number: "03",
    title: "Titre de l'histoire",
    views: "2,5k",
    chapters: 10,
    publishedAt: "26 Oct 2023"
  },
  {
    id: 4,
    image: "/assets/img4.jpg",
    number: "04",
    title: "Titre de l'histoire",
    views: "2k",
    chapters: 8,
    publishedAt: "26 Oct 2023"
  },
  {
    id: 5,
    image: "/assets/img5.jpg",
    number: "05",
    title: "Titre de l'histoire",
    views: "1,5k",
    chapters: 6,
    publishedAt: "26 Oct 2023"
  }
])
const showUpdateModal = ref(false);
const showDeleteModal = ref(false);
const showCreateModal = ref(false);

const toggleUpdateModal = () => {
    showUpdateModal.value = !showUpdateModal.value
}
const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value
}
const toggleCreateModal = () => {
    showCreateModal.value = !showCreateModal.value
}
</script>