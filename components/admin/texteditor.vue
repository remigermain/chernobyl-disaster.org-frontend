<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <textarea v-model="valueModel"
                :name="name"
                class="opacity-0 w-0 h-0"
                :maxlength="field.max_length"
                :required="field.required"
                @change="$emit('change', valueModel)"
                @input="$emit('input', valueModel)"
      />
      <vue-editor v-model="valueModel"
                  :editor-options="editorSettings"
      />
    </template>
  </component>
</template>

<script>
import FieldMixins from "@/mixins/admin/field"
import { VueEditor, Quill } from 'vue2-editor'

const FontAttributor = Quill.import('attributors/class/font')
FontAttributor.whitelist = [
  'sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'
]
Quill.register(FontAttributor, true)
Quill.register(Quill.import('attributors/attribute/direction'), true)
Quill.register(Quill.import('attributors/class/align'), true)
Quill.register(Quill.import('attributors/class/background'), true)
Quill.register(Quill.import('attributors/class/color'), true)
Quill.register(Quill.import('attributors/class/direction'), true)
Quill.register(Quill.import('attributors/class/font'), true)
Quill.register(Quill.import('attributors/class/size'), true)
Quill.register(Quill.import('attributors/style/align'), true)
Quill.register(Quill.import('attributors/style/background'), true)
Quill.register(Quill.import('attributors/style/color'), true)
Quill.register(Quill.import('attributors/style/direction'), true)
Quill.register(Quill.import('attributors/style/font'), true)
Quill.register(Quill.import('attributors/style/size'), true)

export default {

  components: {
    VueEditor,
  },

  mixins: [FieldMixins],

  props: {
    type: {
      type: String,
      default: "text"
    }
  },

  data () {
    return {
      editorSettings: {
        modules: {
          toolbar: {
            container: [
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
            ],
          },
        }
      },
    }
  },
}
</script>

<style scoped>

.input {
  padding: 0.5rem !important;
  display: block !important;
  border-width: 1px !important;
  border-radius: 0.25rem !important;
  border-color: rgb(43, 108, 176) !important;
  background-color: rgb(237, 242, 247) !important;
}
</style>
