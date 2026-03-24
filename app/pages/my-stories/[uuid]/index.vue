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
      <div class="flex items-center gap-3" v-if="!['completed'].includes(book.status)">
        <span v-if="saving"
          class="text-xs text-orange-600 dark:text-orange-500 font-medium flex items-center gap-1 animate-pulse">
          <Icon name="mdi:loading" class="w-5 h-5 animate-spin" />
          Sauvegarde...
        </span>
        <button @click="confirmSwitch(true, STATUS.DRAFT)"
          class="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          Brouillon
        </button>
        <button @click="confirmSwitch(true, STATUS.COMPLETED)" :disabled="ocrLoading"
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

        <div
          :class="`${['completed'].includes(book.status) ? 'max-h-screen' : 'max-h-[80vh]'} flex-1 overflow-y-auto custom-scroll p-3 space-y-1`">
          <!-- Skeleton -->
          <template v-if="loadingSkeleton">
            <MyStoryChapterSkeleton v-for="index in 5" :key="index" />
          </template>
          <template v-else>
            <div v-for="chap in chapters" :key="chap.id" class="flex flex-col justify-between gap-1" :class="[
              'w-full group flex items-start gap-3 p-3 rounded-xl text-left transition-all',
              chap.id === currentChapterId
                ? 'bg-slate-50 dark:bg-slate-100 border border-slate-200'
                : 'border border-slate-300 dark:hover:bg-slate-100 dark:border-slate-200 hover:border-slate-200 hover:bg-slate-50'
            ]">
              <button @click="attemptSwitchChapter(chap.id)"
                class="w-full group flex items-start gap-3 text-left transition-all">
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
                    <p
                      :class="['text-xs truncate font-serif line-clamp-1', chap.id === currentChapterId ? 'text-slate-500' : 'text-slate-400']">
                      {{ formatLocalDate(`${chap.created_at}`) }}</p>
                    <div class="flex items-center gap-1">
                      <div class="text-xs">
                        <span class="font-semibold text-slate-900 dark:text-slate-400">{{
                          formatNumber(chap.chapter_reactions || 0) }}</span>
                        <span class="text-slate-400 dark:text-slate-600">
                          <Icon name="mdi:heart" class="w-4 h-4" />
                        </span>
                      </div>
                      <div class="text-xs">
                        <span class="font-semibold text-slate-900 dark:text-slate-400">{{
                          formatNumber(chap.chapter_reads || 0) }}</span>
                        <span class="text-slate-400 dark:text-slate-600">
                          <Icon name="mdi:eye" class="w-4 h-4" />
                        </span>
                      </div>
                      <div class="w-px h-3 bg-slate-200"></div>
                      <div class="text-xs">
                        <span class="font-semibold text-slate-900 dark:text-slate-400">{{
                          formatNumber(chap.chapter_comments || 0) }}</span> <span
                          class="text-slate-400 dark:text-slate-600">
                          <Icon name="mdi:comments" class="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <div class="w-full flex justify-end gap-2">
                <button @click="saveUpdateChapter(chap, STATUS.COMPLETED)" v-if="chap.status === 'draft'"
                  class="dark:border dark:bg-slate-800 flex items-center gap-2 px-2 py-1 font-medium text-white bg-slate-900 rounded hover:bg-slate-800 transition-all shadow-sm text-[10px]">
                  Publier
                </button>
                <button @click="saveUpdateChapter(chap, STATUS.DRAFT)" v-else
                  class="hidden sm:flex items-center gap-2 px-2 py-1 font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-[10px]">
                  Brouillon
                </button>
                <button class="text-[10px] text-red-400 dark:text-red-500 font-medium flex-shrink-0 text-right"
                  @click="showDelete(chap)">
                  <Icon name="mdi:trash" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </template>
        </div>
        <div v-if="!loadingSkeleton && !chapters.length"
          class="flex flex-col items-center justify-center py-16 text-center h-screen">
          <Icon name="mdi:book-outline" class="w-12 h-12 text-slate-300 mb-3" />

          <p class="text-slate-500 text-sm font-medium">
            Aucun chapitre trouvé
          </p>

          <p class="text-xs text-slate-400 mt-1" v-if="!['completed'].includes(book.status)">
            Ajoutez un chapitre pour commencer
          </p>
        </div>

        <div class="p-3 border-t border-slate-100 bg-slate-50/50 dark:bg-dark"
          v-if="!['completed'].includes(book.status)">
          <button @click="createChapter"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
            <Icon name="mdi:plus" class="w-5 h-5" />
            Nouveau Chapitre
          </button>
          <button @click="showPdfModal = true"
            class="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
            <Icon name="mdi:plus" class="w-5 h-5" />
            Importer les chapitres
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
          <button @click="saveContent" v-if="!['completed'].includes(book.status)"
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

            <div class="mb-5 lg:mb-7">
              <label class="text-xs font-medium text-slate-600 block mb-1 dark:text-slate-200">
                Importer jusqu'à 3 images pour le chapitre (option alternative)
              </label>

              <input type="file" accept="image/*" multiple @change="handleImagesUpload"
                class="text-xs border-slate-300 border p-2 rounded-lg w-full dark:text-slate-200"
                :disabled="ocrLoading" />

              <p class="text-[11px] text-slate-600 dark:text-slate-200 mt-1">
                ⚠️ Vous pouvez soit rédiger votre chapitre dans l’éditeur ci-dessous,
                soit importer jusqu’à <strong>3 images</strong> contenant le texte.
                Le contenu sera extrait automatiquement et inséré dans l’éditeur.
                Merci de relire et corriger avant publication.
              </p>
              <!-- Erreur -->
              <div v-if="errorSize" class="mt-3 text-xs text-center text-red-500">
                {{ errorSize }}
              </div>

              <!-- LOADING OCR -->
              <div v-if="ocrLoading" class="mt-3 space-y-2">
                <div v-for="(progress, idx) in ocrProgressList" :key="idx"
                  class="flex items-center gap-2 text-xs text-orange-600 font-medium">
                  <Icon name="mdi:loading" class="w-4 h-4 animate-spin" />
                  Extraction de l'image {{ idx + 1 }}... {{ progress }}%
                </div>

                <div v-for="(progress, idx) in ocrProgressList" :key="'bar' + idx"
                  class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div class="bg-orange-500 h-2 transition-all duration-300 ease-out"
                    :style="{ width: progress + '%' }">
                  </div>
                </div>
              </div>
            </div>

            <TinyMCE v-model="chapterContent" @update:modelValue="markDirty" />
          </div>

          <!-- PREVIEW VIEW -->
          <div v-if="view === 'preview'" class="max-w-2xl mx-auto px-6 py-12 pb-24 animate-fade-in">
            <h2
              class="text-3xl dark:text-white sm:text-4xl font-display font-bold text-slate-900 tracking-tight mb-8 text-center leading-tight">
              {{ chapterTitle || 'Sans titre' }}</h2>
            <div class="dark:text-white" v-html="formattedContent"></div>
          </div>

          <div v-if="chapters.length === 0"
            class="lg:hidden flex flex-col items-center justify-center text-center h-screen">
            <Icon name="mdi:book-outline" class="w-12 h-12 text-slate-300 mb-3" />

            <p class="text-slate-500 text-sm font-medium">
              Aucun chapitre trouvé
            </p>

            <p class="text-xs text-slate-400 mt-1" v-if="!['completed'].includes(book.status)">
              Ajoutez un chapitre pour commencer
            </p>

            <div class="p-3 border-t border-slate-100" v-if="!['completed'].includes(book.status)">
              <button @click="createChapter"
                class="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
                <Icon name="mdi:plus" class="w-5 h-5" />
                Nouveau Chapitre
              </button>
              <button @click="showPdfModal = true"
                class="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
                <Icon name="mdi:plus" class="w-5 h-5" />
                Importer les chapitres
              </button>
              <p class="text-xs text-red-600 text-center mt-1" v-if="error">{{ error }}</p>
            </div>
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
        <div
          :class="`${['completed'].includes(book.status) ? 'max-h-[calc(100vh-5rem)]' : 'max-h-[calc(100vh-10rem)]'} space-y-2 overflow-y-auto`">
          <!-- Skeleton -->
          <template v-if="loadingSkeleton">
            <MyStoryChapterSkeleton v-for="index in 5" :key="index" />
          </template>
          <template v-else>
            <div v-for="chap in chapters" :key="chap.id" class="flex flex-col justify-between gap-1" :class="[
              'w-full group flex items-start gap-3 p-3 rounded-xl text-left transition-all',
              chap.id === currentChapterId
                ? 'bg-slate-50 dark:bg-slate-100 border border-slate-200'
                : 'border border-slate-300 dark:hover:bg-slate-100 dark:border-slate-200 hover:border-slate-200 hover:bg-slate-50'
            ]">
              <button @click="attemptSwitchChapter(chap.id)"
                class="max-w-full group flex items-start gap-3 text-left transition-all">
                <div :class="['mt-0.5 shrink-0', chap.id === currentChapterId ? 'text-orange-600' : 'text-slate-400']">
                  <Icon :name="chap.id === currentChapterId ? 'mdi:book-open-variant' : 'mdi:book-open-variant-outline'"
                    class="w-5 h-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex justify-between items-center mb-0.5">
                    <span
                      :class="['text-xs font-medium truncate w-2/3', chap.id === currentChapterId ? 'text-slate-900' : 'text-slate-700 dark:text-white group-hover:text-slate-900']">{{
                        chap.title }}</span>
                    <span
                      :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded border', chap.status.toLocaleLowerCase() === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200']">{{
                        showStatus(`${chap.status}`) }}</span>
                  </div>
                  <div class="flex justify-between items-center gap-2">
                    <p
                      :class="['text-xs truncate font-serif line-clamp-1', chap.id === currentChapterId ? 'text-slate-500' : 'text-slate-400']">
                      {{ formatLocalDate(`${chap.created_at}`) }}</p>
                    <div class="flex items-center gap-1">
                      <div class="text-xs">
                        <span class="font-semibold text-slate-900 dark:text-slate-400">{{
                          formatNumber(chap.chapter_reactions
                            || 0) }}</span>
                        <span class="text-slate-400 dark:text-slate-600">
                          <Icon name="mdi:heart" class="w-4 h-4" />
                        </span>
                      </div>
                      <div class="text-xs">
                        <span class="font-semibold text-slate-900 dark:text-slate-400">{{
                          formatNumber(chap.chapter_reads
                            ||
                            0) }}</span>
                        <span class="text-slate-400 dark:text-slate-600">
                          <Icon name="mdi:eye" class="w-4 h-4" />
                        </span>
                      </div>
                      <div class="w-px h-3 bg-slate-200"></div>
                      <div class="text-xs">
                        <span class="font-semibold text-slate-900 dark:text-slate-400">{{
                          formatNumber(chap.chapter_comments
                            || 0) }}</span> <span class="text-slate-400 dark:text-slate-600">
                          <Icon name="mdi:comments" class="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <div class="w-full flex justify-end gap-2">
                <button @click="saveUpdateChapter(chap, STATUS.COMPLETED)" v-if="chap.status === 'draft'"
                  class="dark:border dark:bg-slate-800 flex items-center gap-2 px-2 py-1 font-medium text-white bg-slate-900 rounded hover:bg-slate-800 transition-all shadow-sm text-[10px]">
                  Publier
                </button>
                <button @click="saveUpdateChapter(chap, STATUS.DRAFT)" v-else
                  class="hidden sm:flex items-center gap-2 px-2 py-1 font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-[10px]">
                  Brouillon
                </button>
                <button class="text-[10px] text-red-400 dark:text-red-500 font-medium flex-shrink-0 text-right"
                  @click="showDelete(chap)">
                  <Icon name="mdi:trash" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </template>
        </div>
        <div v-if="!loadingSkeleton && !chapters.length"
          class="flex flex-col items-center justify-center py-16 text-center">
          <Icon name="mdi:book-outline" class="w-12 h-12 text-slate-300 mb-3" />

          <p class="text-slate-500 text-sm font-medium">
            Aucun chapitre trouvé
          </p>

          <p class="text-xs text-slate-400 mt-1" v-if="!['completed'].includes(book.status)">
            Ajoutez un chapitre pour commencer
          </p>
        </div>
        <div class="pt-3 border-t border-slate-300 mt-4" v-if="!['completed'].includes(book.status)">
          <button @click="createChapter"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
            <Icon name="mdi:plus" class="w-5 h-5" />
            Nouveau Chapitre
          </button>
          <button @click="showPdfModal = true; showMobileChapters = false"
            class="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
            <Icon name="mdi:plus" class="w-5 h-5" />
            Importer les chapitres
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

    <div v-if="showDeleteModal && chapterDelete" class="fixed inset-0 z-50">
      <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
      <div
        class="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md ring-1 ring-black/5">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-50 sm:mx-0 sm:h-10 sm:w-10 ring-1 ring-red-100">
                <Icon name="mdi:alert" class="text-red-600" width="24"></Icon>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-slate-900">Suppression du chaptire "<strong
                    class="text-red-600 dark:text-red-500">{{ chapterDelete?.title }}</strong>"</h3>
                <div class="mt-2">
                  <p class="text-sm text-slate-500">Toutes les données liées à ce chapitre disparaîtront définitivement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 border-t border-slate-100">
            <button @click="() => showDeleteModal = false"
              class="mt-3 inline-flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 sm:mt-0 sm:w-auto transition-colors">Annuler</button>
            <button @click="deleteChapter"
              class="inline-flex w-full justify-center rounded-lg bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto transition-colors">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="errorSave || good" class="fixed inset-0 z-50">
      <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
      <div
        class="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full md:max-w-md ring-1 ring-black/5">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start" v-if="errorSave">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-50 sm:mx-0 sm:h-10 sm:w-10 ring-1 ring-red-100">
                <Icon name="mdi:alert" class="text-red-600" width="24"></Icon>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-slate-900">Erreur</h3>
                <p class="text-xs text-red-600 text-center mt-1">{{ errorSave }}</p>
              </div>
            </div>
            <div class="sm:flex sm:items-start" v-if="good">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-50 sm:mx-0 sm:h-10 sm:w-10 ring-1 ring-green-100">
                <Icon name="mdi:success" class="text-green-600" width="24"></Icon>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-slate-900">Succès</h3>
                <p class="text-xs text-green-600 text-center mt-1">{{ good }}</p>
              </div>
            </div>
          </div>
          <div class="bg-slate-50 px-4 py-3 sm:flex md:justify-end sm:px-6 gap-2 border-t border-slate-100">
            <button @click="closeModalMessage"
              class="mt-3 bg-red-600 dark:bg-red-500 w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white sm:mt-0 sm:w-auto transition-colors">Fermer</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPdfModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        class="bg-white relative dark:bg-dark dark:border-slate-300 dark:border w-[95%] md:max-w-[600px] rounded-xl p-6">
        <h2 class="text-sm font-semibold mb-4 dark:text-slate-200">
          Importer un PDF
        </h2>

        <div class="overflow-y-auto max-h-[65vh] md:max-h-[80vh] lg:max-h-[70vh]">
          <input type="file" accept="application/pdf" @change="handlePdfUpload" :disabled="pdfLoading"
            class="text-xs border-slate-300 border w-full p-2 rounded-lg dark:text-slate-200" />
          <p class="text-[11px] text-slate-600 mt-2 dark:text-slate-200">
            Nous détectons automatiquement les sections dont les titres sont clairement indiqués,
            tels que <strong>Préface</strong>, <strong>Résumé</strong>, <strong>Introduction</strong>
            ou encore <strong>Chapitre 1, Chapitre 2, etc.</strong>
            Veillez à ce que ces intitulés apparaissent de manière explicite dans votre document PDF afin de garantir
            une extraction optimale.
            <br />
            Si des chapitres existent déjà sur la plateforme, la numérotation sera ajustée automatiquement.
            <br />
            Les chapitres importés seront enregistrés en brouillon par défaut. Après sauvegarde, nous vous recommandons
            de les relire attentivement afin d’y apporter d’éventuelles corrections.
          </p>
          <!-- Loader -->
          <div v-if="pdfLoading" class="mt-4 text-xs text-orange-600 dark:text-orange-500">
            Extraction des chapitres en cours...
          </div>
          <!-- Erreur -->
          <div v-if="pdfError" class="mt-4 text-xs text-red-500">
            {{ pdfError }}
          </div>
          <!-- Affichage navigation -->
          <div v-if="pdfChapters.length" class="mt-6">
            <div class="flex items-center justify-between mb-3 dark:text-slate-200">
              <button @click="prevPdfChapter" :disabled="currentPdfIndex === 0"
                class="p-2 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30">
                <Icon name="mdi:chevron-left" class="w-5 h-5" />
              </button>
              <span class="text-xs text-slate-500 dark:text-slate-200">
                {{ currentPdfIndex + 1 }} / {{ pdfChapters.length }}
              </span>
              <button @click="nextPdfChapter" :disabled="currentPdfIndex === pdfChapters.length - 1"
                class="p-2 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30">
                <Icon name="mdi:chevron-right" class="w-5 h-5" />
              </button>
            </div>
            <div class="border rounded-xl p-4 min-h-[250px] bg-slate-50 relative">

              <!-- Bouton supprimer -->
              <button @click="deletePdfChapter(currentPdfIndex)"
                class="absolute text-[11px] top-2 right-2 text-red-500 hover:text-red-700 flex items-center gap-1">
                <Icon name="mdi:trash" class="w-4 h-4" />
                Supprimer
              </button>

              <h3 class="text-sm font-semibold mb-3">
                {{ currentPdfChapter?.title || 'Titre non détecté' }}
              </h3>

              <div class="text-xs text-slate-600 whitespace-pre-line max-h-[300px] overflow-y-auto">
                {{ currentPdfChapter?.content }}
              </div>

            </div>
          </div>
        </div>

        <div class="absolute inset-0 h-full z-10 flex items-center justify-center bg-black/20 rounded-xl"
          v-if="loadingSave">
          <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-slate-200 animate-spin fill-blue-600" viewBox="0 0 100 101"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div class="text-xs mt-2 flex flex-col items-center gap-2" v-if="errorSavePdf && errorSavePdf.length > 0">
          Ce(s) chapitre(s) existe(nt) déjà !
          <p class="text-red-600 flex flex-wrap gap-1">
            <span class="" v-for="(error, i) in errorSavePdf" :key="i">{{ error?.title }}</span>
          </p>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <button @click="saveDatalPdf" v-if="currentPdfChapter"
            class="text-xs text-orange-500 dark:border-slate-200 dark:border dark:px-4 dark:py-1.5 dark:rounded dark:lg:py-2 lg:px-2 dark:lg:px-6">
            Enregistrer
          </button>
          <button @click="closeModalPdf"
            class="text-xs text-red-500 dark:border-slate-200 dark:border dark:px-4 dark:py-1.5 dark:rounded dark:lg:py-2 lg:px-2 dark:lg:px-6">
            Fermer
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const uuid = useRoute().params.uuid;
const router = useRouter();
import Tesseract from 'tesseract.js'
interface ImportedChapter {
  title: string
  content: string
}
definePageMeta({
  layout: "not-layout",
  ssr: false
});

const { findBookByUuid } = booksData();
const { toConnectUser } = authenticate();
const { getProfile } = usersData();
const { findAllPaginated, createData, createManyData, updateData, deleteData } = chaptersData();
const book = ref<BookData | null>(null);
const user = ref<User | null>(null);
const profil = ref<User | null>(null);
const chapters = ref<ChapterData[]>([]);
const chapterDelete = ref<ChapterData | null>(null);
const page = ref<number>(1);
const limit = ref<number>(25);
const totalPages = ref<number>(0);
const chapterUuid = ref<string>("")
const chapterTitle = ref<string>("")
const chapterContent = ref<string>("")
const error = ref<string | undefined | null>(null);
const good = ref<string | undefined | null>(null);
const errorSavePdf = ref<any[] | string | null | undefined>([]);
const errorSave = ref<string | undefined | null>(null);
const errorSize = ref<string | undefined | null>(null);
const backurl = ref<number>(0);
const STATUS = ref({
  DRAFT: "draft",
  COMPLETED: "completed"
});
const view = ref<'edit' | 'preview'>('edit')
const saving = ref<boolean>(false)
const loadingSkeleton = ref<boolean>(true)
const currentChapterId = ref(1)
const pendingChapterId = ref<number | null>(null)
const showUnsavedModal = ref<boolean>(false)
const showDeleteModal = ref<boolean>(false)
let isDirty = ref<boolean>(false)
const showMobileChapters = ref<boolean>(false);
const showPdfModal = ref<boolean>(false)
const pdfFile = ref<File | null>(null)
const pdfLoading = ref<boolean>(false)
const loadingSave = ref<boolean>(false)
const pdfChapters = ref<any[]>([])
const pdfError = ref<string | null>(null)
const currentPdfIndex = ref<number>(0)
const ocrProgress = ref<number>(0);
const selectedImages = ref<File[]>([])
const ocrLoading = ref<boolean>(false)
const ocrProgressList = ref<number[]>([])

const currentPdfChapter = computed(() => {
  return pdfChapters.value[currentPdfIndex.value] || null
})

function nextPdfChapter() {
  if (currentPdfIndex.value < pdfChapters.value.length - 1) {
    currentPdfIndex.value++
  }
}

function prevPdfChapter() {
  if (currentPdfIndex.value > 0) {
    currentPdfIndex.value--
  }
}

function closeModalPdf() {
  showPdfModal.value = false;
  pdfChapters.value = [];
  currentPdfIndex.value = 0;
}

const saveDatalPdf = async () => {
  errorSavePdf.value = []
  loadingSave.value = true;
  const res = await createManyData(pdfChapters.value);
  if (res.success) {
    setTimeout(async () => {
      loadingSave.value = false;
      showPdfModal.value = false;
      pdfChapters.value = [];
      currentPdfIndex.value = 0;
      await onLoad();
    }, 1500);
  } else {
    loadingSave.value = false;
    errorSavePdf.value = res.errors;
  }
}

function deletePdfChapter(index: number) {
  pdfChapters.value.splice(index, 1)

  // Ajuster l’index courant si nécessaire
  if (currentPdfIndex.value >= pdfChapters.value.length) {
    currentPdfIndex.value = pdfChapters.value.length - 1
  }

  if (pdfChapters.value.length === 0) {
    currentPdfIndex.value = 0
  }
}

// function pour extraire le contenu d'un pdf
async function handlePdfUpload(event: Event): Promise<void> {
  if (process.server) return

  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  pdfFile.value = file
  pdfLoading.value = true
  pdfError.value = null
  pdfChapters.value = []

  try {
    // 🔥 Import dynamique côté client
    const pdfjsLib = await import('pdfjs-dist/build/pdf')
    const pdfWorker = await import('pdfjs-dist/build/pdf.worker?url')

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker.default

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    let fullText = ''

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const content = await page.getTextContent()

      const pageText = content.items
        .map((item: any) => item.str)
        .join(' ')

      fullText += pageText + '\n\n'
    }

    pdfChapters.value = splitChapters(fullText)
    currentPdfIndex.value = 0

    if (!pdfChapters.value.length) {
      pdfError.value = "Aucun chapitre détecté. Vérifiez le format (Chapitre 1, Chapitre 2...)."
    }

  } catch (error) {
    console.error(error)
    pdfError.value = "Erreur lors de l'extraction du PDF."
  } finally {
    pdfLoading.value = false
    input.value = ''
  }
}

// Fonction de base pour l'extraction
function splitChapters(text: string): ImportedChapter[] {
  // Regex qui gère :
  // - préface / preface (avec ou sans accents)
  // - résumé / resume
  // - introduction
  // - chapitre X ou chapitre_X
  const regex = /\b(pr[eé]face|resume|r[eé]sum[eé]|introduction|chapitre[_ ]?\d+)\b/gi;

  const matches = [...text.matchAll(regex)];
  if (!matches.length) return [];

  const extracted: any[] = [];
  let chapterCounter = chapters.value.length + 1; // Compteur pour les chapitres numériques

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index!;
    const end = matches[i + 1]?.index ?? text.length;

    // le titre exact tel qu'il apparaît
    let title = matches[i][0].trim();
    let rawContent = text.slice(start, end).trim();
    let content = rawContent.replace(new RegExp(`^${matches[i][0]}`, 'i'), '').trim();

    // normaliser certains titres
    if (/pr[eé]face/i.test(title)) {
      title = "Préface";
    } else if (/resume/i.test(title) || /r[eé]sum[eé]/i.test(title)) {
      title = "Résumé";
    } else if (/introduction/i.test(title)) {
      title = "Introduction";
    } else if (/chapitre[_ ]?\d+/i.test(title)) {
      // renumérotation propre pour les chapitres
      title = `Chapitre ${chapterCounter}`;
      chapterCounter++;
    }

    if (book.value) {
      extracted.push({
        id_book: book.value.id,
        title,
        content,
        status: STATUS.value.DRAFT
      });
    } else {
      extracted.push({
        title,
        content,
        status: STATUS.value.DRAFT
      });
    }
  }

  return extracted;
}

function handleImagesUpload(event: Event) {
  errorSize.value = null;
  chapterContent.value = "";
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || []).slice(0, 3) // max 3 fichiers
  if (!files.length) return
  if (input.files && input.files.length > 3) {
    return errorSize.value = "Vous avez dépassé le nombre de fichiers autorisés !"
  } else {
    selectedImages.value = files
    startOCR()
  }
}

async function startOCR() {
  ocrLoading.value = true
  ocrProgressList.value = selectedImages.value.map(() => 0)

  for (let i = 0; i < selectedImages.value.length; i++) {
    const file = selectedImages.value[i]

    try {
      const { data } = await Tesseract.recognize(file, 'fra', {
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            ocrProgressList.value[i] = Math.round(m.progress * 100)
          }
        }
      })

      // Ajouter le texte extrait au chapitre
      chapterContent.value += cleanExtractedText(data.text) + '\n\n'
    } catch (error) {
      console.error(`Erreur OCR image ${i + 1}:`, error)
    }
  }

  ocrLoading.value = false
  view.value = 'preview'
  isDirty.value = true
}

// Fonction pour l'extraction d'un texte sur une image
async function handleImageUpload(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement
  const file: File | undefined = input.files?.[0]

  if (!file) return

  try {
    ocrLoading.value = true
    ocrProgress.value = 0

    const { data } = await Tesseract.recognize(
      file,
      'fra',
      {
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            ocrProgress.value = Math.round(m.progress * 100)
          }
        }
      }
    )

    // Injection du texte extrait dans l’éditeur
    chapterContent.value += cleanExtractedText(data.text);
    view.value = "preview";

    isDirty.value = true
  } catch (error) {
    console.error('Erreur OCR:', error)
  } finally {
    ocrLoading.value = false
    input.value = ''
  }
}

function cleanExtractedText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

const showStatus = (status: string) => {
  if (status === STATUS.value.DRAFT) {
    return "Brouillon"
  } else if (status === STATUS.value.COMPLETED) {
    return "Publié"
  }
}

function goBack() {
  backurl.value++;
  if (isDirty.value) {
    showUnsavedModal.value = true
  } else {
    router.back();
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
function closeModalMessage() {
  if (backurl.value > 0) {
    router.back();
    backurl.value = 0;
  } else {
    router.push(`/my-stories/${uuid}`);
    router.go(0);
  }
}

function showDelete(chap: ChapterData) {
  chapterDelete.value = chap;
  showDeleteModal.value = true;
}

async function deleteChapter() {
  showDeleteModal.value = false;
  if (chapterDelete) {
    const res = await deleteData(`${chapterDelete.value?.uuid}`);
    if (res.success) {
      localStorage.setItem('chapterId', ``);
      setTimeout(() => {
        good.value = res.msg;
      }, 1000);
    } else {
      setTimeout(() => {
        errorSave.value = res.error;
      }, 1000);
    }
  } else {
    errorSave.value = "Veuillez bien sélectionner un chapitre !";
  }
}

function loadChapter(id: number) {
  currentChapterId.value = id
  const chap = chapters.value.find(c => c.id === id)!
  chapterTitle.value = chap.title
  chapterContent.value = chap.content
  chapterUuid.value = chap.uuid
  useSeoMeta({
    title: `${chapterTitle.value}`
  })
}

const onLoad = async () => {
  user.value = await toConnectUser();
  profil.value = await getProfile();
  book.value = await findBookByUuid(`${uuid}`);
  if (((user.value && book.value && profil.value) && authorizeRoleUser(`${profil.value.role.toLocaleLowerCase()}`) && (Number(profil.value.id) === Number(book.value.id_user)))) {
    if (profil.value && profil.value.status === 'inactif') {
      router.push("/authorization");
    }
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
  } else {
    // router.push("/")
  }
  loadingSkeleton.value = false;
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
    localStorage.setItem('chapterId', `${res.data?.id}`);
    router.push(`/my-stories/${uuid}`);
    router.go(0);
  } else {
    error.value = res.error;
  }
}

async function saveUpdateChapter(chap: ChapterData, status: string) {
  errorSave.value = null;
  showUnsavedModal.value = false;
  saveContent();
  const res = await updateData(`${chap.uuid}`, {
    title: chap.title,
    content: chap.content,
    status: status,
    id_book: Number(book.value?.id),
    id_user: Number(book.value?.id_user)
  });
  if (res.success && book.value) {
    pendingChapterId.value = chap.id;
    currentChapterId.value = chap.id;
    localStorage.setItem('chapterId', `${pendingChapterId.value ?? currentChapterId.value}`);
    setTimeout(() => {
      good.value = res.msg;
    }, 1000);
  } else {
    setTimeout(() => {
      errorSave.value = res.error;
    }, 1000);
  }
}

async function confirmSwitch(save: boolean, status: string) {
  errorSave.value = null;
  showUnsavedModal.value = false;
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
      setTimeout(() => {
        good.value = res.msg;
      }, 1000);
    } else {
      setTimeout(() => {
        errorSave.value = res.error;
      }, 1000);
    }
  } else {
    localStorage.setItem('chapterId', `${pendingChapterId.value}`);
    if (backurl.value > 0) {
      router.back();
      backurl.value = 0;
    } else {
      router.push(`/my-stories/${uuid}`);
      router.go(0);
    }
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