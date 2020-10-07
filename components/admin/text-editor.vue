<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template #label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template #input>
        <textarea v-model="valueModel"
                    :name="name"
                    class="opacity-0 w-0 h-0"
                    :maxlength="field.max_length"
                    :required="field.required"
                    @change="$emit('change', valueModel)"
                    @input="$emit('input', valueModel)"
        />
        <quill-editor
          ref="editor"
          v-model="valueModel"
          class="w-full text-xl"
          :options="editorOption"
        />
    </template>
  </component>
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
            // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            // [{ direction: 'rtl' }], // text direction
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
