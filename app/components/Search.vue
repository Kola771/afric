<template>
  <div>
    <div class="fixed inset-0 z-50">
      <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
      <div
        class="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md ring-1 ring-black/5">

          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 sm:mx-0 sm:h-10 sm:w-10 ring-1 ring-amber-100">
                <Icon name="solar:magnifer-linear" class="text-amber-600" width="24"></Icon>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-slate-900">Recherche avancée</h3>
                <div class="mt-2">
                  <p class="text-sm text-slate-500">
                    Recherchez des histoires, auteurs ou catégories et utilisez les filtres pour affiner les résultats.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2 px-4 flex flex-col gap-2.5 overflow-y-auto text-xs">
            <div class="lg:mt-2">
              <select v-model="searchType" required
                class="w-full placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md px-2 py-2.5">
                <option value="" disabled>Vous recherchez quoi ?</option>
                <option value="histoires">Histoires</option>
                <option value="auteurs">Auteurs</option>
                <option value="categories">Catégories</option>
              </select>
            </div>
            <input type="text" name="search" id="search" required autofocus placeholder="Rechercher" v-model="search"
              class="w-full placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md px-2 py-2.5">

            <div v-if="showBooks" class="pb-1 flex flex-col gap-2.5">
              <div>
                <select v-model="status"
                  class="w-full placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:border-slate-200 dark:bg-slate-50 rounded-md p-2">
                  <option value="" disabled selected>Status</option>
                  <option value="ongoing">En cours</option>
                  <option value="paused">En pause</option>
                  <option value="completed">Terminé</option>
                </select>
              </div>

              <div class="flex overflow-x-auto gap-2">

                <label class="cursor-pointer group flex-shrink-0">
                  <input type="checkbox" value="18+" v-model="rating_age" class="peer sr-only">
                  <div
                    class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all
      peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                    <span>18ans+</span>
                  </div>
                </label>

                <label class="cursor-pointer group flex-shrink-0">
                  <input type="checkbox" value="16+" v-model="rating_age" class="peer sr-only">
                  <div
                    class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all
      peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                    <span>16ans+</span>
                  </div>
                </label>

                <label class="cursor-pointer group flex-shrink-0">
                  <input type="checkbox" value="12+" v-model="rating_age" class="peer sr-only">
                  <div
                    class="rounded-md px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm transition-all
      peer-checked:border-orange-500 peer-checked:text-orange-600 peer-checked:bg-orange-50 hover:bg-slate-50 flex items-center gap-1.5">
                    <span>12ans+</span>
                  </div>
                </label>

              </div>
            </div>
            <p class="p-2 rounded text-red-600 bg-red-50 text-center" v-if="error">{{ error }}</p>
          </div>
          <div
            class="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 border-t border-slate-100 text-sm lg:text-[13px]">
            <button @click="sendSearch"
              class="inline-flex w-full justify-center rounded-lg bg-orange-600 dark:bg-orange-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-orange-700 sm:ml-3 lg:ml-1 sm:w-auto transition-colors">
              Rechercher
            </button>
            <button @click="closeModal"
              class="mt-2 inline-flex w-full justify-center rounded-lg bg-red-600 dark:bg-red-500 text-white px-3 py-2 font-semibold sm:mt-0 sm:w-auto transition-colors">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['close-modal', 'function-search'])

// Valeur sélectionnée
const searchType = ref<string>('');
const search = ref<string>('');
const status = ref<string>('');
const rating_age = ref<string[]>([]);
const error = ref<string>('');

// Affichage conditionnel
const showBooks = computed(() => searchType.value === 'histoires')

const sendSearch = () => {
  error.value = "";
  if (searchType.value.trim() !== "" && search.value.trim() !== "") {

    const data = {
      searchType: searchType.value,
      search: search.value,
      status: status.value,
      rating_age: rating_age.value
    }

    emit('function-search', data);
    closeModal();
  } else {
    error.value = "Veuillez bien remplir les champs s'il vous plaît !"
  }
}

const closeModal = () => {
  emit('close-modal');
  error.value = "";
  searchType.value = "";
  search.value = "";
  status.value = "";
  rating_age.value = [];
}
</script>