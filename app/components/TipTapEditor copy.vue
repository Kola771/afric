<template>
  <div>

    <!-- TOOLBAR -->
    <div v-if="isEditorReady" class="flex flex-wrap gap-3 mb-3 items-center border-b pb-2">

      <!-- Bold / Italic / Underline -->
      <button @click="toggleBold" :class="btn(editor?.isActive('bold'))" class="font-bold">B</button>
      <button @click="toggleItalic" :class="btn(editor?.isActive('italic'))" class="italic">I</button>
      <button @click="toggleUnderline" :class="btn(editor?.isActive('underline'))" class="underline">U</button>

      <!-- Highlight -->
      <div class="flex items-center gap-1">
        <input type="color" v-model="highlightColor" @input="applyHighlight" />
        <button @click="removeHighlight" class="px-2 py-1 border rounded text-xs">BG ✕</button>
      </div>

      <!-- Text Color -->
      <div class="flex items-center gap-1">
        <input type="color" v-model="textColor" @input="applyTextColor" />
        <button @click="removeTextColor" class="px-2 py-1 border rounded text-xs">Color ✕</button>
      </div>

      <!-- Font Size -->
      <select v-model="fontSize" @change="applyFontSize" class="border px-2 py-1 rounded">
        <option value="12px">12</option>
        <option value="14px">14</option>
        <option value="16px">16</option>
        <option value="18px">18</option>
        <option value="20px">20</option>
        <option value="24px">24</option>
        <option value="32px">32</option>
      </select>

      <!-- Indentation -->
      <button @click="indent('increase')" class="px-2 py-1 border rounded">→</button>
      <button @click="indent('decrease')" class="px-2 py-1 border rounded">←</button>

    </div>

    <!-- EDITOR -->
    <div ref="editorElement" class="editor outline-none border rounded-md p-4 min-h-[250px]"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'

interface Props { modelValue: string }
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const editorElement = ref<HTMLDivElement | null>(null)
const isEditorReady = ref(false)

const highlightColor = ref('#fde68a')
const textColor = ref('#000000')
const fontSize = ref('16px')

let editor: Editor

function btn(active?: boolean) {
  return [
    'px-3 py-1 border rounded transition',
    active ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
  ].join(' ')
}

onMounted(() => {
  editor = new Editor({
    element: editorElement.value!,
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      Underline,
      Placeholder.configure({ placeholder: 'Commencez à écrire...' }),
    ],
    content: props.modelValue,
    onUpdate({ editor }) {
      emit('update:modelValue', editor.getHTML())
    },
  })

  isEditorReady.value = true
})

/* ==== COMMANDES ==== */
function toggleBold() {
  editor.chain().focus().toggleBold().run()
}
function toggleItalic() {
  editor.chain().focus().toggleItalic().run()
}
function toggleUnderline() {
  editor.chain().focus().toggleUnderline().run()
}
function applyHighlight() {
  editor.chain().focus().setHighlight({ color: highlightColor.value }).run()
}
function removeHighlight() {
  editor.chain().focus().unsetHighlight().run()
}
function applyTextColor() {
  editor.chain().focus().setColor(textColor.value).run()
}
function removeTextColor() {
  editor.chain().focus().unsetColor().run()
}
function applyFontSize() {
  if (!editor.state.selection.empty) {
    editor.chain().focus().setMark('textStyle', { fontSize: fontSize.value }).run()
  }
}

function indent(dir: 'increase' | 'decrease') {
  const { from, to } = editor.state.selection
  editor.state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type.name === 'paragraph') {
      const style = node.attrs.style || ''
      const match = style.match(/margin-left:\s*(\d+)px/)
      let current = match ? parseInt(match[1]) : 0
      current = dir === 'increase' ? current + 20 : Math.max(0, current - 20)
      editor.chain().focus().setNode('paragraph', { style: `margin-left: ${current}px;` }).run()
    }
  })
}

watch(() => props.modelValue, (value) => {
  if (editor && editor.getHTML() !== value) editor.commands.setContent(value)
})

onBeforeUnmount(() => editor?.destroy())
</script>

<style scoped>
.editor :deep(p) {
  margin: 0.5rem 0;
}
</style>
