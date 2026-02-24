<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-slate-200 dark:border-b pt-12 pb-12">
        <section class="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-100 lg:gap-10">
            <div class="flex flex-col gap-4 md:items-center md:flex-row md:justify-between bg-slate-50 dark:bg-slate-800 border px-3 py-4 lg:p-3 rounded-lg">
                <div class="flex flex-col gap-1 items-start">
                    <button @click="back" class="p-1 border rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <Icon name="mdi:arrow-left" class="w-5 h-5" />
                    </button>
                    <p class="text-[14px] text-slate-500 dark:text-slate-200 max-w-xs">
                       Par défaut, toute histoire créée a pour statut
                       <span class="font-medium text-orange-600 dark:text-orange-500">Brouillon</span>
                       et n'est pas accessible aux lecteurs en ligne.
                                   </p>
                </div>
                <nuxt-link to="/my-stories/create_book" class="flex items-center gap-2 bg-primary text-white dark:border hover:bg-slate-700 hover:ease-in-out hover:duration-300 rounded-full py-3 text-[13px] justify-center border-slate-200 border md:px-6 md:py-2.5">
                    <Icon name="mdi:plus" class="w-5 h-5" />
                    Ajouter une histoire
                </nuxt-link>
            </div>
            <div class="border-t border-slate-200 mt-6 pt-6">
                <h3 class="font-display text-xl font-medium text-slate-900 dark:text-white flex items-center gap-1 mb-4"><Icon name="mdi:book-multiple-outline" class="w-5 h-5" /> Mes histoires</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    <div class="flex flex-col gap-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 hover:border-slate-300 transition-all group-hover:scale-105 hover:shadow-sm pb-2" v-for="(story, index) in stories">
                        <nuxt-link
                            :key="story.id"
                            :to="`/books/book-uuid-${story.id}`"
                            class="group flex flex-col"
                            >
                            <img :src="story.image" class="w-full h-40 md:h-36 lg:h-40 rounded-t-lg object-cover transition-transform duration-500" :alt="story.title">
                            <div class="px-2.5 pt-2 flex flex-col gap-1">
                                <p class="font-medium text-slate-900 dark:text-white group-hover:text-orange-600 flex transition-colors">
                                    <span class="truncate">Histoire {{ index + 1 }}</span>
                                </p>
                                <p class="flex items-center gap-3 text-[10px] font-medium text-orange-600">
                                    <span class="bg-orange-50 border border-orange-100/50 text-orange-600 font-medium animate-fade-in-up px-2 py-1 rounded">Romance</span>
                                    <span class="bg-slate-100 text-slate-500 px-2 py-1 rounded">En cours</span>
                                </p>
                            </div>
                        </nuxt-link>
                        <nuxt-link :to="`/my-stories/${story.id}/likes-and-comments`" class="hover:text-orange-600 transition-colors hover:underline px-2.5 py-2 text-xs text-slate-500 dark:text-slate-200 flex flex-wrap gap-2">
                            <span>{{ story.chapters }} chap,</span> <span class="flex items-center gap-1"><Icon name="mdi:eye" class="w-3 h-3" /> <span>{{ story.views }} vue(s)</span></span>
                        </nuxt-link>
                        <div class="grid grid-cols-2 gap-2 px-2.5 w-full">
                            <nuxt-link :to="`/my-stories/uuid-test-${story.id}/edit_book`" class="bg-blue-500 p-1.5 rounded flex items-center gap-1 justify-center text-white font-medium gap-1 text-xs dark:bg-blue-600 px-1 group-hover:translate-x-1 transition-transform hover:underline">
                                <Icon name="mdi:pencil" class="w-3 h-3" />
                                Modifier l'histoire
                            </nuxt-link>
                            <nuxt-link :to="`/my-stories/chapter-uuid-${story.id}`" class="bg-orange-500 p-1.5 rounded flex items-center gap-1 justify-center text-white font-medium gap-1 text-xs dark:bg-orange-600 px-1 group-hover:translate-x-1 transition-transform hover:underline">
                                <Icon name="mdi:book-open-variant-outline" class="w-3 h-3" />
                                Chapitres
                            </nuxt-link>
                            <button @click="toggleDeleteModal" class="col-span-2 bg-red-500 p-1.5 rounded flex items-center gap-1 justify-center text-white font-medium gap-1 text-xs dark:bg-red-600 px-1 group-hover:translate-x-1 transition-transform">
                                <Icon name="mdi:delete" class="w-3 h-3" />
                                Supprimer l'histoire
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <MyStoryUpdateBook @close-update-modal="toggleUpdateModal" :showUpdateModal="showUpdateModal" v-if="showUpdateModal" />
        <MyStoryDeleteBook @close-delete-modal="toggleDeleteModal" :showDeleteModal="showDeleteModal" v-if="showDeleteModal" />
    </div>
</template>
<script lang="ts" setup>
const {toConnectUser} = authenticate();
const user = ref<User | null>(null);
const router = useRouter();
const back = () => {
  window.history.back();
}

const onLoad = async() => {
    user.value = await toConnectUser();
    if(user.value) {
        if(!authorizeRoleUser(`${user.value.role.toLocaleLowerCase()}`)) {
            router.push("/");
        }
    }
}

onMounted(async () => {
    await onLoad();
})

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

const toggleUpdateModal = () => {
    showUpdateModal.value = !showUpdateModal.value
}
const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value
}
</script>