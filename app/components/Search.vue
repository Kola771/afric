<template>
  <div>
    <div class="fixed inset-0 z-50 p-4 flex min-h-full items-end md:items-center justify-center">
      <div class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
        <div
          class="relative transform overflow-hidden z-50 rounded-xl bg-white dark:bg-dark dark:border text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md ring-1 ring-black/5">

          <div class="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 sm:mx-0 sm:h-10 sm:w-10 ring-1 ring-amber-100">
                <Icon name="solar:magnifer-linear" class="text-amber-600" width="24"></Icon>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-slate-900 dark:text-slate-200">Recherche avancée</h3>
                <div class="mt-2">
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    Recherchez des histoires, auteurs ou catégories et utilisez les filtres pour affiner les résultats.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2 px-4 flex flex-col gap-2.5 overflow-y-auto text-xs">
            <div class="lg:mt-2">
              <select v-model="searchType" required
                class="w-full placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-400 rounded-md px-2 py-2.5">
                <option value="" disabled>Vous recherchez quoi ?</option>
                <option value="histoires">Histoires</option>
                <option value="auteurs">Auteurs</option>
                <option value="categories">Catégories</option>
              </select>
            </div>
            <input type="text" name="search" id="search" required autofocus placeholder="Rechercher" v-model="search"
              class="w-full placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200 rounded-md px-2 py-2.5">

            <div v-if="showBooks" class="pb-1 flex flex-col gap-2.5">
              <div>
                <select v-model="status"
                  class="w-full placeholder:text-slate-500 text-slate-800 outline-none border border-slate-300 dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-400 rounded-md p-2">
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

          <div class="px-4 pb-3 text-xs" v-if="histories.length">

            <!-- bouton -->
            <button @click="showHistory = !showHistory"
              class="w-full flex items-center justify-center gap-2 text-slate-600 dark:text-slate-200 dark:hover:text-orange-500 hover:text-orange-600 transition font-medium border border-slate-200 rounded-md py-2 hover:bg-slate-50">

              <Icon name="mdi:history" size="16" />
              Historique de recherche
            </button>

            <!-- liste historique -->
            <div v-if="showHistory && histories.length" class="mt-2 max-h-40 overflow-y-auto flex flex-col gap-1.5">

              <!-- header historique -->
              <div class="flex items-center justify-between px-1 mb-1">

                <span class="text-[11px] text-slate-400 font-medium">
                  Recherches récentes
                </span>

                <button @click="clearHistories"
                  class="text-[11px] text-red-500 hover:text-red-600 flex items-center gap-1">

                  <Icon name="mdi:trash-can-outline" size="14" />
                  Tout supprimer
                </button>

              </div>

              <!-- éléments -->
              <div v-for="(item, index) in histories" :key="index" @click="useHistory(item)"
                class="flex items-start justify-between gap-2 p-2 rounded-md border border-slate-100 hover:bg-slate-50 cursor-pointer transition group">

                <!-- infos -->
                <div class="flex flex-col text-left gap-1 flex-1">

                  <span class="font-medium text-slate-700 dark:text-slate-200 dark:group-hover:text-orange-400 text-sm">
                    {{ item.search }}
                  </span>

                  <span class="text-[11px] text-slate-400">
                    {{ item.searchType }}
                  </span>

                  <div class="flex flex-wrap gap-1 mt-0.5">

                    <span v-if="item.status"
                      class="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-700 border border-green-100">
                      {{ statusLabel(item.status) }}
                    </span>

                    <span v-if="item.rating_age && item.rating_age.length"
                      class="text-[10px] px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-100">
                      {{ item.rating_age.join(', ') }}
                    </span>

                  </div>

                </div>

                <!-- droite -->
                <div class="flex flex-col items-end gap-1">

                  <span class="text-[10px] text-slate-400 whitespace-nowrap">
                    {{ formatRelativeDate(item.datetime) }}
                  </span>

                  <div class="flex items-center gap-1">

                    <Icon name="mdi:arrow-top-right" size="16" class="text-slate-400" />

                    <!-- supprimer -->
                    <button @click.stop="removeHistory(index)" class="text-slate-400 hover:text-red-500 transition">
                      <Icon name="mdi:delete-outline" size="16" />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>
          <div
            class="bg-slate-50 dark:bg-dark px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 border-t border-slate-100 text-sm lg:text-[13px]">
            <button @click="sendSearch"
              class="inline-flex w-full justify-center rounded-lg bg-orange-600 dark:bg-orange-500 px-3 md:px-8 py-2 font-semibold text-white shadow-sm hover:bg-orange-700 sm:ml-3 lg:ml-1 sm:w-auto transition-colors">
              Rechercher
            </button>
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
const showHistory = ref<boolean>(false);
const histories = ref(JSON.parse(localStorage.getItem("search_history") || "[]"));

const statusLabel = (status: string) => {
  switch (status.toLocaleLowerCase()) {
    case "ongoing":
      return "En cours"
    case "completed":
      return "Terminé"
    case "paused":
      return "Pause"
    case "draft":
      return "Brouillon"
    case "inactive":
      return "Inactif"
    default:
      return "Brouillon"
  }
}

const useHistory = (item: any) => {
  searchType.value = item.searchType;
  search.value = item.search;
  status.value = item.status || "";
  rating_age.value = item.rating_age || [];

  showHistory.value = false;
  sendSearch();
};

const removeHistory = (index: number | string) => {
  const i = Number(index);
  histories.value.splice(i, 1);
  localStorage.setItem("search_history", JSON.stringify(histories.value));
};

const clearHistories = () => {
  histories.value = [];
  localStorage.removeItem("search_history");
  showHistory.value = false;
};

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