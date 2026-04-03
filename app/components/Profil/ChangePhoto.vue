<template>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-50" @close="closeModal">
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
                  <div class="sm:flex sm:items-center">
                    <div
                      class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:size-10">
                      <Icon name="mdi:image" class="size-6 text-amber-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold text-gray-900 dark:text-white">Changez votre
                        photo de profil</DialogTitle>
                    </div>
                  </div>
                  <div class="flex flex-col gap-1 mt-4" v-if="preview">
                    <p class="text-sm text-slate-900 dark:text-white">Aperçu de l'image :</p>
                    <div class="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg"><img :src="preview"
                        alt="Preview"
                        class="max-h-[200px] dark:border object-cover lg:object-contain lg:max-h-[220px] rounded-lg" />
                    </div>
                  </div>
                  <p className="mt-3 text-red-600 text-center p-2 rounded border-red-100 border-[1px] bg-red-50 font-semibold text-xs lg:text-sm"
                    v-if="error">
                    {{ error }}</p>
                  <p className="mt-3 text-green-600 text-center p-2 rounded border-green-100 border-[1px] bg-green-50 font-semibold text-xs lg:text-sm"
                    v-if="message">
                    {{ message }}</p>
                </div>
                <div class="dark:bg-slate-800 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" :disabled="action" @click="executeAction"
                    class="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 sm:ml-3 sm:w-auto"
                    :class="action ? 'cursor-not-allowed' : 'cursor-pointer'">Valider</button>
                  <button type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="closeModal" ref="cancelButtonRef">Annuler</button>
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
const { updateImg } = usersData();
const props = defineProps<{
  profil: User,
  preview: any
  image: any
}>();

const open = ref<boolean>(true);
const action = ref<boolean>(false);
const error = ref<any>(null);
const message = ref<any>(null);
const emit = defineEmits(['close-change-modal']);
const closeModal = () => {
  emit('close-change-modal');
  open.value = false;
}

const executeAction = async () => {
  action.value = true;
  message.value = null;
  error.value = null;
  const formData = new FormData()
  formData.append('image', props.image)
  const res = await updateImg(`${props.profil.uuid}`, formData);
  if (res.success) {
    message.value = res.msg;
    localStorage.setItem("user", JSON.stringify(res.user));
    setTimeout(() => {
      window.location.href = "/profil";
    }, 3000);
  } else {
    error.value = res.error;
  }
  action.value = false;
}
</script>