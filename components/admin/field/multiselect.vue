<template>
  <admin-field-base :field="field" :errors="errors">
    <multiselect
      v-model="valueModel"
      :placeholder="field.label"
      label="display_name"
      track-by="value"
      :options="choices"
      :allow-empty="!field.required"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
    />
  </admin-field-base>
</template>

<script>
import Multiselect from 'vue-multiselect'
import FieldMixins from '~/mixins/field'

export default {
  components: { Multiselect },

  mixins: [FieldMixins],

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      choices: [...this.field.choices]
    }
  },

  watch: {
    valueModel(newValue) {
      this.$emit('input', newValue)
    }
  },

  mounted() {
    if (process.client && this.field.max_length) {
      const selectInput = document.querySelector('.multiselect__input')
      if (selectInput) {
        selectInput.setAttribute('maxlength', this.field.max_length)
      }
    }
  },

  methods: {
    addTag(name) {
      const tag = { display_name: name, value: -1 }
      this.choices.push(tag)
      this.valueModel.push(tag)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/multiselect.scss';
</style>
