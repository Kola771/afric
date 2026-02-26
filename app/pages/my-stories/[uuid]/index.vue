<template>
  <div class="h-screen flex flex-col font-sans text-slate-800 bg-slate-50 dark:bg-dark overflow-hidden" v-if="book">

    <!-- 1. TOP HEADER navigation -->
    <div
      class="h-14 bg-white dark:bg-dark border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-20">
      <div class="flex items-center gap-4">
        <button @click="goBack"
          class="p-1.5 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 dark:text-slate-200 transition-colors">
          <Icon name="mdi:arrow-left" class="w-5 h-5" />
        </button>
        <div class="h-6 w-px bg-slate-200 mx-1"></div>
        <div :class="`${saving ? 'hidden md:block' : ''} flex flex-col`">
          <h2 v-if="book.title" class="text-sm font-semibold text-slate-900 font-display dark:text-white flex">
            <span class="truncate overflow-hidden whitespace-nowrap">{{ book.title }}</span>
          </h2>
          <p v-if="book.created_at" class="text-xs text-slate-500 dark:text-slate-200">Crée le : {{
            formatLocalDate(book.created_at) }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span v-if="saving"
          class="text-xs text-orange-600 dark:text-orange-500 font-medium flex items-center gap-1 animate-pulse">
          <Icon name="mdi:loading" class="w-5 h-5 animate-spin" />
          Sauvegarde...
        </span>
        <button @click="confirmSwitch(true, STATUS.DRAFT)"
          class="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          Brouillon
        </button>
        <button @click="confirmSwitch(true, STATUS.COMPLETED)"
          class="dark:border dark:bg-slate-800 flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all shadow-sm">
          Publier
          <Icon name="mdi:send" class="w-5 h-4 animate-pulse" />
        </button>
      </div>
    </div>

    <!-- MAIN CONTENT WRAPPER -->
    <div class="flex flex-1 overflow-hidden">

      <!-- 2. SIDEBAR: Chapter List -->
      <aside class="w-72 bg-white dark:bg-dark border-r border-slate-200 flex flex-col shrink-0 h-full hidden md:flex">
        <div class="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-200">Sommaire</h2>
        </div>

        <div class="flex-1 max-h-[80vh] overflow-y-auto custom-scroll p-3 space-y-1" v-if="chapters?.length > 0">
          <button v-for="chap in chapters" :key="chap.id" @click="attemptSwitchChapter(chap.id)" :class="[
            'w-full group flex items-start gap-3 p-3 rounded-xl text-left transition-all',
            chap.id === currentChapterId
              ? 'bg-slate-50 dark:bg-slate-100 border border-slate-200'
              : 'border dark:hover:bg-slate-100 dark:border-slate-200 border-transparent hover:border-slate-200 hover:bg-slate-50'
          ]">
            <div :class="['mt-0.5 shrink-0', chap.id === currentChapterId ? 'text-orange-600' : 'text-slate-400']">
              <Icon :name="chap.id === currentChapterId ? 'mdi:book-open-variant' : 'mdi:book-open-variant-outline'"
                class="w-5 h-5" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex justify-between items-center mb-0.5">
                <span
                  :class="['text-xs font-medium truncate', chap.id === currentChapterId ? 'text-slate-900' : 'text-slate-700 dark:text-white group-hover:text-slate-900']">{{
                    chap.title }}</span>
                <span
                  :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded border', chap.status.toLocaleLowerCase() === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200']">{{
                    showStatus(`${chap.status}`) }}</span>
              </div>
              <div class="flex justify-between items-center gap-2">
                <p :class="['text-xs truncate font-serif line-clamp-1', chap.id === currentChapterId ? 'text-slate-500' : 'text-slate-400']">{{ formatLocalDate(`${chap.created_at}`) }}</p>
                <div class="flex items-center gap-1">
                  <div class="text-xs">
                    <span class="font-semibold text-slate-900 dark:text-slate-400">{{ chap.likes?.length || 0 }}</span>
                    <span class="text-slate-400 dark:text-slate-600">
                      <Icon name="mdi:heart" class="w-4 h-4" />
                    </span>
                  </div>
                  <div class="text-xs">
                    <span class="font-semibold text-slate-900 dark:text-slate-400">{{ chap.views?.length || 0 }}</span>
                    <span class="text-slate-400 dark:text-slate-600">
                      <Icon name="mdi:eye" class="w-4 h-4" />
                    </span>
                  </div>
                  <div class="w-px h-3 bg-slate-200"></div>
                  <div class="text-xs">
                    <span class="font-semibold text-slate-900 dark:text-slate-400">{{ chap.comments?.length || 0
                    }}</span> <span class="text-slate-400 dark:text-slate-600">
                      <Icon name="mdi:comments" class="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-16 text-center h-screen">
          <Icon name="mdi:book-outline" class="w-12 h-12 text-slate-300 mb-3" />

          <p class="text-slate-500 text-sm font-medium">
            Aucun chapitre trouvé
          </p>

          <p class="text-xs text-slate-400 mt-1">
            Ajoutez un chapitre pour commencer
          </p>
        </div>

        <div class="p-3 border-t border-slate-100 bg-slate-50/50 dark:bg-dark">
          <button @click="createChapter"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
            <Icon name="mdi:plus" class="w-5 h-5" />
            Nouveau Chapitre
          </button>
          <p class="text-xs text-red-600 text-center mt-1" v-if="error">{{ error }}</p>
        </div>
      </aside>

      <!-- 3. MAIN EDITOR AREA -->
      <main class="flex-1 flex flex-col min-w-0 bg-white dark:bg-dark relative">

        <!-- Toolbar & Tabs -->
        <div
          class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 dark:bg-dark backdrop-blur px-6 py-2">
          <button class="md:hidden p-2 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200"
            @click="showMobileChapters = !showMobileChapters">
            <Icon name="mdi:menu" class="w-5 h-5" />
          </button>

          <div class="bg-slate-100 p-1 rounded-lg flex items-center">
            <button @click="toggleView('edit')"
              :class="['px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2', view === 'edit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500']">
              <Icon name="mdi:edit" class="w-5 h-5" /> Édition
            </button>
            <button @click="toggleView('preview')"
              :class="['px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2', view === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500']">
              <Icon name="mdi:eye" class="w-5 h-5" /> Aperçu
            </button>
          </div>
          <button @click="saveContent"
            class="flex md:hidden items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Brouillon
          </button>
        </div>

        <div class="flex-1 overflow-y-auto custom-scroll relative">
          <!-- EDIT VIEW -->
          <div v-if="view === 'edit' && chapterTitle" class="max-w-3xl mx-auto px-6 py-10 pb-24 animate-fade-in">

            <input type="text" v-model="chapterTitle" @input="markDirty" autofocus="true"
              class="w-full dark:text-white text-3xl font-display font-bold text-slate-900 placeholder:text-slate-300 border-slate-300 border p-0 focus:ring-0 bg-transparent mb-6 tracking-tight"
              placeholder="Titre du chapitre">

            <TinyMCE v-model="chapterContent" @update:modelValue="markDirty" />
          </div>

          <!-- PREVIEW VIEW -->
          <div v-if="view === 'preview'" class="max-w-2xl mx-auto px-6 py-12 pb-24 animate-fade-in">
            <h2
              class="text-3xl dark:text-white sm:text-4xl font-display font-bold text-slate-900 tracking-tight mb-8 text-center leading-tight">
              {{ chapterTitle || 'Sans titre' }}</h2>
            <div class="dark:text-white" v-html="formattedContent"></div>
          </div>
        </div>
      </main>
    </div>

    <!-- Mobile Chapter Drawer -->
    <div v-if="showMobileChapters" class="fixed md:hidden inset-0 z-50 bg-black/40 flex">
      <aside class="w-72 bg-white dark:bg-dark h-full p-4">
        <div class="flex justify-between items-center mb-4 border-slate-300 border-b pb-1.5">
          <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-white">Sommaire</h2>
          <button @click="showMobileChapters = false"
            class="flex items-center justify-center p-1 rounded hover:bg-slate-100 dark:text-white">
            <Icon name="mdi:close" class="w-5 h-5" />
          </button>
        </div>
        <div class="space-y-2 max-h-[calc(100vh-10rem)] overflow-y-auto" v-if="chapters?.length > 0">
          <button v-for="chap in chapters" :key="chap.id"
            @click="() => { attemptSwitchChapter(chap.id); showMobileChapters = false }"
            :class="['text-sm w-full text-left p-2 rounded transition', chap.id === currentChapterId ? 'bg-slate-100 dark:bg-slate-100 border border-slate-200' : 'dark:hover:bg-slate-100 dark:border-slate-200 dark:border hover:bg-slate-50']">

            <div class="min-w-0 flex-1">
              <div class="flex justify-between items-center mb-0.5">
                <span
                  :class="['text-xs font-medium truncate', chap.id === currentChapterId ? 'text-slate-900' : 'dark:text-white text-slate-700 group-hover:text-slate-900']">{{
                    chap.title }}</span>
                <span
                  :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded border', chap.status.toLocaleLowerCase() === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200']">{{
                    showStatus(`${chap.status}`) }}</span>
              </div>
              <div class="flex justify-between items-center gap-2">
                <p :class="['text-xs truncate font-serif line-clamp-1', chap.id === currentChapterId ? 'text-slate-500' : 'text-slate-400']">{{ formatLocalDate(`${chap.created_at}`) }}</p>
                <div class="flex items-center gap-1">
                  <div class="text-xs">
                    <span class="font-semibold text-slate-900 dark:text-slate-200">{{ chap?.likes?.length || 0 }}</span>
                    <span class="text-slate-400 dark:text-slate-600">
                      <Icon name="mdi:heart" class="w-4 h-4" />
                    </span>
                  </div>
                  <div class="text-xs">
                    <span class="font-semibold text-slate-900 dark:text-slate-200">{{ chap?.views?.length || 0 }}</span>
                    <span class="text-slate-400 dark:text-slate-600">
                      <Icon name="mdi:eye" class="w-4 h-4" />
                    </span>
                  </div>
                  <div class="w-px h-3 bg-slate-200"></div>
                  <div class="text-xs">
                    <span class="font-semibold text-slate-900 dark:text-slate-200">{{ chap?.comments?.length || 0
                    }}</span> <span class="text-slate-400 dark:text-slate-600">
                      <Icon name="mdi:comments" class="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-16 text-center">
          <Icon name="mdi:book-outline" class="w-12 h-12 text-slate-300 mb-3" />

          <p class="text-slate-500 text-sm font-medium">
            Aucun chapitre trouvé
          </p>

          <p class="text-xs text-slate-400 mt-1">
            Ajoutez un chapitre pour commencer
          </p>
        </div>
        <div class="pt-3 border-t border-slate-300 mt-4">
          <button @click="createChapter"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
            <Icon name="mdi:plus" class="w-5 h-5" />
            Nouveau Chapitre
          </button>
          <p class="text-xs text-red-600 text-center mt-1" v-if="error">{{ error }}</p>
        </div>
      </aside>
    </div>

    <!-- UNSAVED MODAL -->
    <div v-if="showUnsavedModal" class="fixed inset-0 z-50">
      <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
      <div
        class="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md ring-1 ring-black/5">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 sm:mx-0 sm:h-10 sm:w-10 ring-1 ring-amber-100">
                <Icon name="mdi:alert" class="text-amber-600" width="24"></Icon>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-slate-900">Modifications non enregistrées</h3>
                <div class="mt-2">
                  <p class="text-sm text-slate-500">Vous avez des modifications en attente sur ce chapitre. Si vous
                    changez de chapitre sans sauvegarder, vos écrits seront perdus.</p>
                </div>
              </div>
            </div>
          </div>
          <p class="text-xs text-red-600 text-center mt-1" v-if="errorSave">{{ errorSave }}</p>
          <div class="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 border-t border-slate-100">
            <button @click="confirmSwitch(true, STATUS.DRAFT)"
              class="inline-flex w-full justify-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 sm:ml-3 sm:w-auto transition-colors">Sauvegarder</button>
            <button @click="confirmSwitch(false, STATUS.DRAFT)"
              class="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-red-50 sm:mt-0 sm:w-auto transition-colors">Ignorer</button>
            <button @click="closeModal"
              class="mt-3 inline-flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 sm:mt-0 sm:w-auto transition-colors mr-auto">Annuler</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const uuid = useRoute().params.uuid
definePageMeta({
  layout: "not-layout",
});

const { getBookByUuid } = booksData();
const { findAllPaginated, createData, updateData } = chaptersData();
const book = ref<BookData | null>(null);
const chapters = ref<ChapterData[]>([]);
const page = ref<number>(1);
const limit = ref<number>(25);
const totalPages = ref<number>(0);
const chapterUuid = ref<string>("")
const chapterTitle = ref<string>("")
const chapterContent = ref<string>("")
const error = ref<string | undefined | null>(null);
const errorSave = ref<string | undefined | null>(null);
const STATUS = ref({
  DRAFT: "draft",
  COMPLETED: "completed"
});
const view = ref<'edit' | 'preview'>('edit')
const saving = ref(false)
const currentChapterId = ref(1)
const pendingChapterId = ref<number | null>(null)
const showUnsavedModal = ref(false)
let isDirty = ref(false)
const showMobileChapters = ref(false)

const showStatus = (status: string) => {
  if (status === STATUS.value.DRAFT) {
    return "Brouillon"
  } else if (status === STATUS.value.COMPLETED) {
    return "Publié"
  }
}

function goBack() {
  if(isDirty.value) {
    showUnsavedModal.value = true
  } else {
    window.history.back()
  }
}

// --- COMPUTED ---
const formattedContent = computed(() => {
  return chapterContent.value
    .split('\n')
    .filter(p => p.trim() !== '')
    .map(p => `<p>${p}</p>`)
    .join('')
})

// --- FUNCTIONS ---
function markDirty() { isDirty.value = true }

function saveContent() {
  saving.value = true
  setTimeout(() => { saving.value = false; isDirty.value = false }, 800)
}

function attemptSwitchChapter(id: number) {
  if (id === currentChapterId.value) return
  if (isDirty.value) {
    pendingChapterId.value = id
    showUnsavedModal.value = true
  } else {
    localStorage.setItem('chapterId', `${id}`)
    window.location.reload()
  }
}

function closeModal() { showUnsavedModal.value = false; pendingChapterId.value = null }

function loadChapter(id: number) {
  currentChapterId.value = id
  const chap = chapters.value.find(c => c.id === id)!
  chapterTitle.value = chap.title
  chapterContent.value = chap.content
  chapterUuid.value = chap.uuid
}

const onLoad = async () => {
  book.value = await getBookByUuid(`${uuid}`);
  if (book.value) {
    const { data, totalPages: tp } = await findAllPaginated(page.value, limit.value, book.value.id);
    totalPages.value = tp;
    chapters.value = data;

    const firstChapter = chapters.value[0]
    const storedChapterId = Number(localStorage.getItem('chapterId'))

    if (chapters.value.length > 0 && firstChapter) {
      if (!storedChapterId || !chapters.value.some(c => c.id === storedChapterId)) {
        loadChapter(firstChapter.id)
        localStorage.setItem('chapterId', `${firstChapter.id}`)
      } else {
        loadChapter(storedChapterId)
      }
    }
  }
}

const createChapter = async () => {
  error.value = null;
  const res = await createData({
    title: `Chapitre ${chapters.value.length + 1}`,
    content: "",
    id_book: Number(book.value?.id),
    status: STATUS.value.DRAFT
  });
  if (res.success) {
    await onLoad();
  } else {
    error.value = res.error;
  }
}

async function confirmSwitch(save: boolean, status: string) {
  errorSave.value = null;
  if (save) {
    saveContent();
    const res = await updateData(`${chapterUuid.value}`, {
      title: chapterTitle.value,
      content: chapterContent.value,
      status: status,
      id_book: Number(book.value?.id),
      id_user: Number(book.value?.id_user)
    });
    if (res.success && book.value) {
      localStorage.setItem('chapterId', `${pendingChapterId.value ?? currentChapterId.value}`);
      window.location.reload();
    } else {
      errorSave.value = res.error;
    }
  } else {
    localStorage.setItem('chapterId', `${pendingChapterId.value}`);
    window.location.reload();
  }
}

function toggleView(v: 'edit' | 'preview') { view.value = v }

onMounted(async () => {
  await onLoad();
})

</script>

<style>
.custom-scroll::-webkit-scrollbar {
  width: 6px
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 20px
}
</style>