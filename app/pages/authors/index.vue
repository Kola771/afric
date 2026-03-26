<template>
  <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-24 pb-12 lg:pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center md:items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl font-display font-semibold dark:text-white text-slate-900 tracking-tight">
            Découvrez nos auteurs
          </h2>

          <p class="text-slate-500 text-sm mt-1 dark:text-slate-200 max-w-xl">
            Explorez les profils des auteurs qui donnent vie à nos histoires.
            Consultez leurs livres, suivez leurs publications et plongez dans leurs univers littéraires.
          </p>

          <div class="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-300">
            <span class="flex items-center gap-1">
              <Icon name="mdi:account-edit" class="w-4 h-4" />
              Auteurs actifs
            </span>

            <span class="flex items-center gap-1">
              <Icon name="mdi:book-open-page-variant" class="w-4 h-4" />
              Histoires originales
            </span>

            <span class="flex items-center gap-1">
              <Icon name="mdi:trending-up" class="w-4 h-4" />
              Classement dynamique
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" v-if="authors.length > 0">
        <template v-if="loadingAuthor">
          <AuthorCardSkeleton v-for="i in 6" :key="i" />
        </template>

        <template v-else>
          <AuthorCard v-for="(author, index) in authors" :key="author.id" :user="user" :index="index" :author="author"
            ref="cardRefs" />
        </template>
      </div>
      <!-- Message vide -->
      <div v-else class="flex flex-col items-center justify-center py-16 text-center">
        <Icon name="mdi:account-group-outline" class="w-12 h-12 text-slate-300 mb-3" />

        <p class="text-slate-500 text-sm font-medium">
          Aucun auteur trouvé
        </p>
      </div>
      <!-- LOADING -->
      <div v-if="loading" class="text-center text-sm text-slate-500 dark:text-slate-200">
        Chargement...
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { findAuthors } = usersData()
const { toConnectUser } = authenticate();
const user = ref<User | null>(null);
const authors = ref<Author[]>([])
const loading = ref<boolean>(false)
const loadingAuthor = ref<boolean>(false)
const page = ref<number>(1)
const limit = ref<number>(25)
const totalPages = ref<number>(1)
const cardRefs = ref<any[]>([]);
const observer = ref<IntersectionObserver | null>(null);

useSeoMeta({
  title: 'Auteurs',
  description: 'Découvrez nos auteurs préférés et leurs histoires captivantes.',

  ogTitle: 'Auteurs',
  ogDescription: 'Découvrez nos auteurs préférés et leurs histoires captivantes.',
  ogImage: 'https://africstoryline.com/afric.png',
  ogUrl: 'https://africstoryline.com/',
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Auteurs',
  twitterDescription: 'Découvrez nos auteurs préférés et leurs histoires captivantes.',
  twitterImage: 'https://africstoryline.com/afric.png'
});

// ============================
// Load Authors
// ============================

const loadAuthors = async () => {
  if (loading.value) return;
  if (page.value > totalPages.value) return;

  loading.value = true;
  loadingAuthor.value = true;

  try {
    const res = await findAuthors(page.value, limit.value);

    authors.value.push(...res.data);

    totalPages.value = res.pagination.totalPages;
    page.value++;
  } finally {
    loading.value = false;
    loadingAuthor.value = false;
  }
};

// ============================
// Intersection Observer
// ============================

const observeLastCard = () => {
  if (observer.value) observer.value.disconnect();

  nextTick(() => {
    const cards = cardRefs.value;
    if (!cards.length) return;

    const lastCard = cards[cards.length - 1]?.cardRef;

    if (!lastCard) return;

    observer.value = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          loadAuthors();
        }
      },
      {
        threshold: 0.8
      }
    );

    observer.value.observe(lastCard);
  });
};

// ============================
// Watch DOM rendering
// ============================

watch(
  () => authors.value.length,
  () => {
    observeLastCard();
  }
);

// ============================
// Mounted
// ============================

onMounted(async () => {
  user.value = await toConnectUser();
  await loadAuthors();
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>
