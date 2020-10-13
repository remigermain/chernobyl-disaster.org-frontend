<template>
  <admin-field-base :field="field" :errors="errors">
    <div class="flex flex-wrap flex-col space-y-2">
      <div class="preview-image flex items-center justify-center"
           :class="{'border-dashed border-2 border-gray-600': !imageSrc}"
      >
        <div v-if="imageSrc" class="relative h-full w-full">
          <img class="w-full h-full object-contain"
                alt="image"
                :src="imageSrc"
                loading="lazy"
                role="button"
                tabindex="-1"
                @click="active = true"
            >
          <span class="w-full h-full absolute top-0 left-0 cursor-pointer duration-300 transition-opacity justify-center opacity-0
                      hover:opacity-100 items-center flex z-10 hover:bg-gray-800 hover:bg-opacity-50" @click="active = true">
            <svg-icon name="link" class="text-gray-900 text-6xl" />
          </span>
        </div>
        <span v-else class="italic text-md text-gray-600">
          {{ $t('word.empty') }}
        </span>
      </div>
      <label class="p-2 rounded-full bg-indigo-700 h-10 text-gray-300 space-x-2 group cursor-pointer hover:bg-indigo-600 flex justify-center items-center">
        <svg-icon name="upload" class="h-full group-hover:scale-125 transform transition-transform duration-300"/>
        <span v-if="original">
          {{ $t('text.change-picture') }}
        </span>
        <span v-else>
          {{ $t('text.add-picture') }}
        </span>
        <input ref="image" type="file" class="opacity-0 w-1px h-1px" :required="required" @change="change" />
      </label>
    </div>
    <lazy-gallery-detail-picture v-if="active" :object="object" :idx="0" :length="1" @close="active = null" />
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
    original: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      active: null,
      imageUrl: null
    }
  },

  computed: {
    imageSrc () {
      return this.imageUrl || this.original && this.original.original_jpeg
    },
    object () {
      return this.imageUrl || this.original
    },
    required () {
      if (this.original) return false
      return this.field.required
    }
  },

  watch: {
    valueModel () {
      // reset image when reset data
      this.imageUrl = null
    }
  },

  methods: {
    readImage () {
      /* read file image , and assigne to url value */
      const reader = new FileReader()
      reader.onload = (e) => { this.imageUrl = e.target.result }
      reader.readAsDataURL(this.valueModel._new)
    },
    change () {
      this.valueModel = {_new: this.$refs.image.files[0]}
      this.$emit('input', this.valueModel)
      this.readImage()
    }
  }

}

</script>

<style lang="scss" scoped>
.preview-image {
  width: 250px;
  height: 250px;
}
</style>
