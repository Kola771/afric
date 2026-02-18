<template>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="closeModal">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="" leave="ease-in duration-200" leave-from="" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to=" translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from=" translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg lg:max-w-4xl">
                <div class="dark:bg-dark bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-center">
                    <div class="mx-auto flex bg-slate-100 w-12 h-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0">
                      <Icon name="mdi:book-multiple-outline" class="w-6 h-6" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold text-gray-900 dark:text-white">Mise à jour du livre</DialogTitle>  
                    </div>
                  </div>
                </div>
                <form class="w-full dark:bg-dark pt-2 lg:pt-0">
                  <div class="mb-2 px-4 grid grid-cols-1 lg:grid-cols-2 gap-2.5 max-h-96 md:max-h-[600px] lg:max-h-[calc(100vh-200px)] overflow-y-auto">
                    <div class="flex flex-col gap-2.5 lg:mb-1">
                      <div class="flex flex-col gap-1">
                        <p class="text-sm text-slate-500 dark:text-slate-200">Image actuelle :</p>
                        <div class="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg"><img src="/assets/img8.avif" alt="Image actuelle" class="max-h-[200px] dark:border object-cover lg:object-contain lg:max-h-[220px] rounded-lg" /></div>
                      </div>
                      <input type="text" name="title" id="title" autocomplete="true" placeholder="Titre" class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2">
                      <input type="file" name="image" id="image" class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2" @change="onFileChange">
                      <div class="flex flex-col gap-1" v-if="preview">
                        <p class="text-sm text-slate-500 dark:text-slate-200">Aperçu de l'image :</p>
                        <div class="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg"><img :src="preview" alt="Preview" class="max-h-[200px] dark:border object-cover lg:object-contain lg:max-h-[220px] rounded-lg" /></div>
                      </div>
                    </div>

                    <div class="flex flex-col gap-2.5">                      
                      <div class="flex flex-col gap-1">
                        <label for="description" class="text-sm text-slate-500 dark:text-slate-200">Description :</label>
                        <textarea name="description" id="description" placeholder="Description" :class="`w-full h-24 ${preview ? 'lg:h-[300px]' : 'lg:h-28 xl:h-32'} resize-none text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2`"></textarea>
                      </div>
                      
                      <div class="pb-1 lg:pb-0">
                          <label class="block text-xs font-medium leading-6 text-slate-900 dark:text-white mb-1">Catégorie(s) :</label>
                          <div class="flex lg:flex-wrap overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto lg:max-h-[180px] gap-2">
                              <label class="cursor-pointer group flex-shrink-0">
                                  <input type="checkbox" class="peer sr-only" checked>
                                  <div class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                                      <span>Roman</span>
                                  </div>
                              </label>
                              <label class="cursor-pointer group flex-shrink-0">
                                  <input type="checkbox" class="peer sr-only">
                                  <div class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                                      <span>Poésie</span>
                                  </div>
                              </label>
                              <label class="cursor-pointer group flex-shrink-0">
                                  <input type="checkbox" class="peer sr-only" checked>
                                  <div class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                                      <span>Sci-Fi</span>
                                  </div>
                              </label>
                              <label class="cursor-pointer group flex-shrink-0">
                                  <input type="checkbox" class="peer sr-only">
                                  <div class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                                      <span>Essai</span>
                                  </div>
                              </label>
                          </div>
                      </div>
                      <div class="lg:mt-2">
                        <select required class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2">
                          <option value="" disabled selected>Statut de l'histoire</option>
                          <option value="">Brouillon</option>
                          <option value="">En cours</option>
                          <option value="">En pause</option>
                          <option value="">Terminée</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="dark:bg-slate-800 bg-gray-50 px-4 md:px-3.5 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-orange-600 dark:bg-orange-500 px-3 lg:px-6 py-2 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 sm:ml-3 sm:w-auto" @click="closeModal">Enregistrer</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 lg:px-6 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeModal" ref="cancelButtonRef">Annuler</button>
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
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(true)
const emit = defineEmits(['close-update-modal']);
const preview = ref(null)
 
const onFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return
 
  preview.value = URL.createObjectURL(file)
}

const closeModal = () => {
    emit('close-update-modal');
    open.value = false;
} 

onUnmounted(() => {
  if (preview.value) {
    URL.revokeObjectURL(preview.value)
  }
})
</script>