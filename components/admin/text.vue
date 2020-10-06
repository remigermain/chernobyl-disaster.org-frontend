<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <input v-model="valueModel"
             :type="type"
             :name="name"
             class="input w-full"
             :placeholder="field.label"
             :maxlength="field.max_length"
             :required="field.required"
             @change="$emit('change', valueModel)"
             @input="$emit('input', valueModel)"
      >
    </template>
  </component>
</template>

<script>
import FieldMixins from "~/mixins/admin/field"
export default {

  mixins: [FieldMixins],

  props: {
    type: {
      type: String,
      default: "text"
    }
  }

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

.dark-mode .input {
  background-color: #4a5568 !important;
}
</style>
