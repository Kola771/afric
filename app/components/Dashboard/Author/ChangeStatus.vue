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
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="dark:bg-dark bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div
                      class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:size-10">
                      <Icon name="mdi:swap-horizontal" class="size-6 text-amber-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold text-gray-900 dark:text-white">
                        Modifier le statut de cet auteur "<strong class="text-amber-600 dark:text-amber-500">{{
                          author.name }}</strong>"
                      </DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500 dark:text-slate-200">
                          Passage de <strong>{{ author.status }}</strong> à <strong class="text-amber-400">{{ statut }}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 flex flex-col gap-1 text-sm">
                    <label for="reason" class="text-slate-700 dark:text-slate-200 font-semibold">Indiquez la raison :</label>
                    <textarea name="reason" id="reason" v-model="reason"
                      class="w-full h-24 rounded-lg p-2 border-slate-300 border-[1px] outline-none resize-none"></textarea>
                  </div>
                </div>

                <div v-if="error" class="text-xs text-center font-medium text-red-500 mb-4">{{ error }}</div>
                <div v-if="message" class="text-xs text-center font-medium text-green-500 mb-4">{{ message }}</div>

                <div class="dark:bg-slate-800 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" :disabled="disabled"
                    :class="disabled ? 'cursor-not-allowed bg-orange-300' : 'cursor-pointer'"
                    class="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 lg:px-6 py-2 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 sm:ml-3 sm:w-auto"
                    @click="functionChangeStatus">Appliquer le changement</button>
                  <button type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 lg:px-6 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
const { changeStatusUser } = usersData();
const props = defineProps<{
  author: Author;
  statut: string
}>();

const emit = defineEmits(['close-change-modal', 'on-load']);
const open = ref<boolean>(true);
const reason = ref<string>("");
const error = ref<any>(null);
const message = ref<any>(null);
const disabled = ref<boolean>(false);

const closeModal = () => {
  error.value = null;
  message.value = null;
  reason.value = "";
  emit('close-change-modal');
  open.value = false;
  disabled.value = false;
}

const functionChangeStatus = async () => {
  error.value = null;
  message.value = null;
  disabled.value = true;
  if (reason.value.trim() !== "") {
    const response = await changeStatusUser(props.author.uuid, {
      status: props.statut,
      reason: reason.value,
      name: props.author.name
    });

    if (response.success) {
      message.value = response.msg;

      setTimeout(() => {
        open.value = false;
        emit('close-change-modal');
        emit('on-load');
      }, 2000);
    } else {
      error.value = response.error;
      disabled.value = false;
    }
  } else {
    error.value = "Veuillez nous donner la raison de ce changement !";
    disabled.value = false;
  }
}
</script>