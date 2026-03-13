<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Editor from '@tinymce/tinymce-vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const content = ref(props.modelValue)
const loading = ref(true)

watch(content, (val) => {
  emit('update:modelValue', val)
})

onMounted(() => {
  // simule le temps de chargement de l'éditeur
  setTimeout(() => {
    loading.value = false
  }, 800)
})

const editorInit = {
  height: 400,
  menubar: false,
  plugins: [
    'anchor autolink charmap codesample emoticons link lists media searchreplace table visualblocks wordcount',
    'checklist mediaembed casechange formatpainter a11ychecker tinymcespellchecker advtable advcode advtemplate ai uploadcare mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown importword exportword exportpdf'
  ],
  toolbar:
    'undo redo | formatselect | fontfamily fontsize | bold italic underline strikethrough | ' +
    'forecolor backcolor | link media table mergetags | addcomment showcomments | ' +
    'spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | ' +
    'emoticons charmap | removeformat',
}
</script>

<template>
  <!-- Skeleton -->
  <div v-if="loading" class="border rounded-lg p-3 bg-white">
    
    <!-- fake toolbar -->
    <div class="flex gap-2 mb-3 animate-pulse">
      <div class="h-6 w-10 bg-slate-200 rounded"></div>
      <div class="h-6 w-10 bg-slate-200 rounded"></div>
      <div class="h-6 w-16 bg-slate-200 rounded"></div>
      <div class="h-6 w-12 bg-slate-200 rounded"></div>
      <div class="h-6 w-8 bg-slate-200 rounded"></div>
      <div class="h-6 w-8 bg-slate-200 rounded"></div>
    </div>

    <!-- fake editor area -->
    <div class="animate-pulse space-y-3">
      <div class="h-4 bg-slate-200 rounded w-5/6"></div>
      <div class="h-4 bg-slate-200 rounded w-full"></div>
      <div class="h-4 bg-slate-200 rounded w-4/6"></div>
      <div class="h-4 bg-slate-200 rounded w-3/6"></div>
      <div class="h-4 bg-slate-200 rounded w-5/6"></div>
      <div class="h-4 bg-slate-200 rounded w-full"></div>
      <div class="h-4 bg-slate-200 rounded w-4/6"></div>
    </div>

  </div>

  <!-- Editor -->
  <Editor
    v-else
    api-key="y9u2astqlyiz8degmcalms6g9688ef45uk5715dtq8hu3jjs"
    v-model="content"
    :init="editorInit"
  />
</template>