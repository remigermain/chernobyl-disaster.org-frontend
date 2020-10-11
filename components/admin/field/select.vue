<template>
  <admin-field-base :field="field" :errors="errors">
    <multiselect
      v-model="valueModel"
      :placeholder="field.label"
      label="display_name"
      track-by="value"
      :options="field.choices"
      :allow-empty="!field.required"
    />
    <slot />
  </admin-field-base>
</template>

<script>
import Multiselect from 'vue-multiselect'
import FieldMixins from "~/mixins/field"

export default {
  components: { Multiselect },

  mixins: [FieldMixins],

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },

  watch: {
    valueModel (newValue) {
      this.$emit('input', newValue)
    }
  },

}
</script>

<style lang="scss">
@import "~/assets/css/multiselect.scss";
</style>
