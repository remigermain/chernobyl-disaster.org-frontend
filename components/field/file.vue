<template>
  <admin-field-base :field="field" :errors="errors">
    <div class="flex flex-wrap flex-col space-y-2">
      <div class="preview-image flex items-center justify-center">
        <div v-if="valueModel.obj" class="relative">
          {{ fileName }}
        </div>
        <span v-else class="italic text-md text-gray-600">
          {{ $t('word.empty') }}
        </span>
      </div>
      <label class="p-2 rounded-full bg-indigo-700 h-10 text-gray-300 space-x-2 group cursor-pointer hover:bg-indigo-600 flex justify-center items-center">
        <svg-icon name="upload" class="h-full group-hover:scale-125 transform transition-transform duration-300"/>
        <span>
          {{ $t('text.add-file') }}
        </span>
        <input ref="image" type="file" class="opacity-0 w-1px h-1px" :required="field.required" @change="change" />
      </label>
    </div>
  </admin-field-base>
</template>

<script>
import FieldMixins from "~/mixins/field"

export default {

  mixins: [FieldMixins],

  props: {
    value: {
      type: Object,
      default: null
    },
  },

  computed: {
    fileName () {
      return this.valueModel.obj.name
    },
  },

  methods: {
    change () {
      this.valueModel = {obj: this.$refs.image.files[0]}
      this.$emit('input', this.valueModel)
    }
  }

}

</script>
