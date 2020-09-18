<template>
  <div class="flex flex-col">
    <div class="flex mt-2">
      <span class="px-2 flex justify-center items-center text-gray-700">
        <slot name="icon" />
      </span>
      <label class="w-full text-gray-700 text-sm font-bold capitalize flex flex-col-reverse border-b-2 border-gray-600">
        <input v-model="valueModel"
               :type="type"
               :name="field.name"
               :maxlength="field.max_length"
               :required="field.required"
               :autocomplete="autocomplete"
               :class="{'empty': valueModel === '' }"
               class="p-2 input"
               @input="$emit('input', valueModel)"
               @change="$emit('change', valueModel)"
        >
        <span class="input-label">
          {{ field.label }}
        </span>
      </label>
      <span class="px-2 flex justify-center items-center text-gray-700">
        <slot name="icon-right" />
      </span>
    </div>
    <lazy-admin-error :errors="errors" />
  </div>
</template>

<script>
import FieldMixins from "@/mixins/admin/field"
export default {

  mixins: [FieldMixins],

  props: {
    type: {
      type: String,
      default: "text"
    },
    autocomplete: {
      type: String,
      default: "off"
    }
  },


}
</script>

<style lang="scss" scoped>

.input:focus {
  @apply .bg-gray-100;
}

.input.empty:hover ~ .input-label {
  cursor: text;
}

.input:not(.empty), .input.empty:focus {
  & ~ .input-label {
    transform: translateY(calc(0% - .5rem)) translateX(-5%) scale(.9);
  }
}

.input-label {
  transition: transform .3s, opacity .3s;
  transform: translateY(100%);
  opacity: .5;
}
</style>
