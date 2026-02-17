<script setup lang="ts">
import { ref, watch } from 'vue'
import Editor from '@tinymce/tinymce-vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const content = ref(props.modelValue)

watch(content, (val) => {
  emit('update:modelValue', val)
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
  fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 32pt 48pt',
  content_style: `
    body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #ccc; padding: 6px; }
    th { background: #f3f4f6; }
  `,
  setup: (editor: any) => {
    editor.on('Change', () => {
      content.value = editor.getContent()
    })
  }
}

</script>

<template>
  <Editor
    api-key="y9u2astqlyiz8degmcalms6g9688ef45uk5715dtq8hu3jjs"
    v-model="content"
    :init="editorInit"
  />
</template>
