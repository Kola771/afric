<template>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-50" @close="closeModal">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="" leave="ease-in duration-200" leave-from="" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to=" translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from=" translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="dark:bg-dark bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex w-12 h-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0">
                      <img src="https://i.pravatar.cc/300?img=12" class="w-12 h-12 flex-shrink-0 object-cover rounded-full" alt="Profile">
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold text-gray-900 dark:text-white">Modifier votre profil</DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500 dark:text-slate-200">Vos informations seront mises à jour automatiquement</p>
                      </div>
                    </div>
                  </div>
                </div>
                <form class="w-full dark:bg-dark pt-2 lg:pt-0">
                  <div class="mb-2 px-4 flex flex-col gap-2.5 max-h-72 sm:max-h-96 overflow-y-auto">
                    <input type="text" name="fullname" id="fullname" placeholder="Nom au complet" class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2">
                    <input type="text" name="pseudonyme" id="pseudonyme" placeholder="Pseudonyme" class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2">
                    <input type="email" name="email" id="email" placeholder="Email" class="w-full text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2">
                    <div>
                      <select required id="pays" name="pays" class="mt-1 block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all p-3">
                      <option value="" disabled selected>Pays d'origine</option>
                      <option value="benin">Bénin</option>
                      <option value="burkina_faso">Burkina Faso</option>
                      <option value="cote_d_ivoire">Côte d'Ivoire</option>
                      <option value="mali">Mali</option>
                      <option value="niger">Niger</option>
                      <option value="senegal">Sénégal</option>
                      <option value="togo">Togo</option>
                      </select>
                    </div>
                    <textarea name="biography" id="biography" placeholder="Biographie" class="flex-shrink-0 w-full resize-none text-sm placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2"></textarea>   
                    <div class="pb-1">
                        <label class="block text-xs font-medium leading-6 text-slate-900 dark:text-white mb-1">Préférences</label>
                        <div class="flex overflow-x-auto gap-2">
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
                  </div>
                  <div class="dark:bg-slate-800 bg-gray-50 px-4 md:px-3.5 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-orange-600 dark:bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 sm:ml-3 sm:w-auto" @click="closeModal">Enregistrer</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeModal" ref="cancelButtonRef">Annuler</button>
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
const closeModal = () => {
    emit('close-update-modal');
    open.value = false;
}
</script>