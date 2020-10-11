<template>
  <admin-field-base :field="field" :errors="errors">
    <div class="flex justify-center flex-col w-full">
      <quill-editor
        ref="editor"
        v-model="valueModel"
        class="w-full text-xl"
        :options="editorOption"
      />
    </div>
  </admin-field-base>
</template>

<script>
import Vue from 'vue'
import FieldMixins from "~/mixins/field"

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
export default {

  mixins: [FieldMixins],

  props: {
    type: {
      type: String,
      default: "text"
    }
  },

  data () {
    return {
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['link'],
            ['clean'],
          ]
        }
      }
    }
  },

  watch: {
    valueModel (newValue) {
      this.$emit('input', newValue)
    }
  },

  created () {
    if (process.client) {
      Vue.use(require("vue-quill-editor").default)
    }
  },

}
</script>

<style>

.input {
  padding: 0.5rem !important;
  display: block !important;
  border-width: 1px !important;
  border-radius: 0.25rem !important;
  border-color: rgb(43, 108, 176) !important;
  background-color: rgb(237, 242, 247) !important;
}
.quill-editor .ql-editor {
  font-size: 1.35em;
}
</style>

<style lang="scss">

.dark .ql-container, .dark .ql-editor.ql-blank::before {
  @apply bg-gray-700;
  @apply text-gray-200;
}

.dark .quill-editor .ql-toolbar {
  .ql-picker,
  .ql-stroke {
    color: white !important;
    stroke: white !important;
  }
  button:hover {
    .ql-picker,
    .ql-stroke {
      color: #06c !important;
      stroke: #06c  !important;
    }
  }
}
</style>
