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
                      class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <ExclamationTriangleIcon class="size-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold text-gray-900 dark:text-white">Supprimer votre
                        compte</DialogTitle>
                      <div class="mt-2" v-if="profil.role.toLocaleLowerCase() === 'lecteur'">
                        <p class="text-sm text-gray-500 dark:text-slate-200">
                          Êtes-vous certain de vouloir supprimer votre compte ? Toutes vos données seront définitivement
                          effacées. Cette action est irréversible.
                        </p>
                      </div>
                      <div class="mt-2" v-else>
                        <p class="text-sm text-gray-500 dark:text-slate-200">
                          Êtes-vous certain de vouloir supprimer votre compte ? Vos données seront supprimées
                          définitivement après un délai de 10 jours.
                          Ce délai vous permet de revenir sur votre décision en nous contactant à l’adresse suivante :
                          <strong><a href="mailto:contact@africstoryline.com">contact@africstoryline.com</a></strong>.
                          Une fois l'action effectuée, vous serez déconnecté et n’aurez plus accès à votre compte,
                          sauf en cas de réactivation avant la fin du délai.
                        </p>
                      </div>
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
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto" :class="action ? 'cursor-not-allowed' : 'cursor-pointer'">Supprimer</button>
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
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
const { deleteAccount, deletePersonNotLector } = usersData();
const props = defineProps<{
  profil: User
}>();

const open = ref<boolean>(true);
const action = ref<boolean>(false);
const error = ref<any>(null);
const message = ref<any>(null);
const emit = defineEmits(['close-delete-modal']);
const closeModal = () => {
  emit('close-delete-modal');
  open.value = false;
}

const executeAction = async () => {
  action.value = true;
  message.value = null;
  error.value = null;
  if (props.profil.role.toLocaleLowerCase() === 'lecteur') {
    const res = await deleteAccount(`${props.profil.uuid}`);
    if (res.success) {
      message.value = res.msg;
      setTimeout(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("register_author");
        localStorage.removeItem("register_email");
        window.location.href = "/login";
      }, 3000);
    } else {
      error.value = res.msg_error;
    }
    action.value = false;
  } else {
    const res = await deletePersonNotLector(`${props.profil.uuid}`, {status: 'inactif'});
    if (res.success) {
      message.value = "Votre compte est inactif !";
      setTimeout(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("register_author");
        localStorage.removeItem("register_email");
        window.location.href = "/login";
      }, 3000);
    } else {
      error.value = res.error;
    }
    action.value = false;
  }
}
</script>