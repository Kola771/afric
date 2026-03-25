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
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full md:max-w-lg">
                <div class="dark:bg-dark bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div
                      class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <ExclamationTriangleIcon class="size-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" v-if="props.book.status !== 'inactive'">
                      <DialogTitle as="h3" class="text-base font-semibold text-gray-900 dark:text-white">Supprimer du
                        "<strong class="text-orange-600 dark:text-orange-500">{{ props.book.title }}</strong>"
                      </DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500 dark:text-slate-200">Êtes-vous sûr de vouloir supprimer cette
                          histoire ? Toutes les chapitres liés à cette dernière seront supprimées définitivement 10
                          jours après avoir effectué cette action.</p>
                      </div>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" v-else>
                      <DialogTitle as="h3" class="text-base font-semibold text-red-600 dark:text-red-400">"<strong>{{ props.book.title }}</strong>" est déjà inactif !
                      </DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500 dark:text-slate-200">Ce livre sera supprimé dans quelques jours...(<strong>{{ days }}</strong>jrs).
                        
                        Ce délai vous permet de revenir sur votre décision en nous contactant à l’adresse suivante :
                          <strong><a href="mailto:contact@africstoryline.com">contact@africstoryline.com</a></strong>.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p v-if="error" class="text-xs text-center font-medium text-red-600 dark:text-red-500 mb-2">{{ error }}
                </p>
                <p v-if="message" class="text-xs text-center font-medium text-green-600 dark:text-green-500 mb-2">{{
                  message }}</p>
                <div class="dark:bg-slate-800 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" v-if="props.book.status !== 'inactive'"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 lg:px-6 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                    @click="deleteBook">Supprimer</button>
                  <button type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 lg:px-6 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="closeModal" ref="cancelButtonRef">{{props.book.status !== 'inactive' ? "Annuler" : "Fermer"}}</button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
const { inactiveFunction } = booksData()
const props = defineProps<{
  book: BookData
}>();

const error = ref<string | null | undefined>(null);
const message = ref<string | null | undefined>(null);
const {days} = getDaysFromToday(`${props.book.deadline}`)
const open = ref(true)
const emit = defineEmits(['close-delete-modal', 'close-and-load']);
const deleteBook = async () => {
  error.value = null;
  message.value = null;
  const res = await inactiveFunction(props.book.uuid);
  if (res.success) {
    message.value = res.msg;
    setTimeout(() => {
      emit('close-and-load');
      open.value = false;
    }, 2000);
  } else {
    error.value = res.error;
  }
}

const closeModal = () => {
  emit('close-delete-modal');
  open.value = false;
}
</script>