<template>
  <form-base :field="field" :errors="errors">
    <input v-model="valueModel"
            :type="type"
            :name="field.name"
            class="input w-full"
            :placeholder="field.label"
            :maxlength="field.max_length"
            :minlength="field.min_length"
            :required="field.required"
            @input="$emit('input', valueModel)"
    >
  </form-base>
</template>

<script>
import FieldMixins from "~/mixins/field"
export default {

  mixins: [FieldMixins],

  props: {
    type: {
      type: String,
      default: "text"
    },
  },

}
</script>

<style lang="scss" scoped>

.input {
  padding: 0.5rem !important;
  display: block !important;
  border-width: 1px !important;
  border-radius: 0.25rem !important;
  border-color: rgb(43, 108, 176) !important;
  background-color: rgb(237, 242, 247) !important;
}

.dark .input {
  background-color: #4a5568 !important;
}
</style>
