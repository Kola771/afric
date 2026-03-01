<template>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="closeModal">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to=""
          leave="ease-in duration-200" leave-from="" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to=" translate-y-0 sm:scale-100"
              leave="ease-in duration-200" leave-from=" translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                <div class="dark:bg-dark bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-center sm:justify-center">
                    <div
                      class="mx-auto flex bg-slate-100 lg:bg-transparent lg:w-auto w-10 h-10 md:w-8 md:h-8 flex-shrink-0 items-center justify-center rounded-full sm:mx-0">
                      <Icon name="solar:magnifer-linear" class="w-5 h-5 md:w-4 md:h-4" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold text-gray-900 dark:text-white">Faire une
                        recherche</DialogTitle>
                    </div>
                  </div>
                </div>
                <form class="w-full dark:bg-dark pt-2 lg:pt-0">
                  <div class="mb-2 px-4 flex flex-col gap-2.5 lg:max-h-[450px] overflow-y-auto">
                    <div class="lg:mt-2">
                      <select v-model="searchType" required
                        class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2">
                        <option value="" disabled>Vous recherchez quoi ?</option>
                        <option value="histoires">Histoires</option>
                        <option value="auteurs">Auteurs</option>
                        <option value="categories">Catégories</option>
                      </select>
                    </div>
                    <input type="text" name="search" id="search" autocomplete="true" placeholder="Rechercher"
                      class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2">

                    <div v-if="showBooks" class="pb-1">
                    <div>
                      <select
                        class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2">
                        <option value="" disabled selected>Statut</option>
                        <option value="ongoing">En cours</option>
                        <option value="paused">En pause</option>
                        <option value="completed">Terminé</option>
                      </select>
                    </div>
                      <div class="mt-2">
                        <label
                          class="block text-xs font-medium leading-6 text-slate-900 dark:text-white mb-1">Limite d'age(s)
                          :</label>
                        <div class="flex overflow-x-auto gap-2">
                          <label class="cursor-pointer group flex-shrink-0">
                            <input type="checkbox" class="peer sr-only">
                            <div
                              class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                              <span>18ans+</span>
                            </div>
                          </label>
                          <label class="cursor-pointer group flex-shrink-0">
                            <input type="checkbox" class="peer sr-only">
                            <div
                              class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                              <span>16ans+</span>
                            </div>
                          </label>
                          <label class="cursor-pointer group flex-shrink-0">
                            <input type="checkbox" class="peer sr-only">
                            <div
                              class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                              <span>12ans+</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div v-if="showCategories" class="pb-1">
                      <label
                        class="block text-xs font-medium leading-6 text-slate-900 dark:text-white mb-1">Catégorie(s)
                        :</label>
                      <div class="flex overflow-x-auto gap-2">
                        <label class="cursor-pointer group flex-shrink-0">
                          <input type="checkbox" class="peer sr-only" checked>
                          <div
                            class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                            <span>Roman</span>
                          </div>
                        </label>
                        <label class="cursor-pointer group flex-shrink-0">
                          <input type="checkbox" class="peer sr-only">
                          <div
                            class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                            <span>Poésie</span>
                          </div>
                        </label>
                        <label class="cursor-pointer group flex-shrink-0">
                          <input type="checkbox" class="peer sr-only" checked>
                          <div
                            class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                            <span>Sci-Fi</span>
                          </div>
                        </label>
                        <label class="cursor-pointer group flex-shrink-0">
                          <input type="checkbox" class="peer sr-only">
                          <div
                            class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                            <span>Essai</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="dark:bg-slate-800 bg-gray-50 px-4 md:px-3.5 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button"
                      class="inline-flex w-full justify-center rounded-md bg-orange-600 dark:bg-orange-500 px-3 md:px-6 py-2 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 sm:ml-3 sm:w-auto"
                      @click="closeModal">Rechercher</button>
                    <button type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 md:px-6 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      @click="closeModal" ref="cancelButtonRef">Annuler</button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(true)
const emit = defineEmits(['close-modal'])

// Valeur sélectionnée
const searchType = ref('')

// Affichage conditionnel
const showCategories = computed(() => searchType.value === 'categories')
const showBooks = computed(() => searchType.value === 'histoires')

const closeModal = () => {
  emit('close-modal')
  open.value = false
}
</script>