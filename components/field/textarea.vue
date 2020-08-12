<template>
  <div>
    <div class="flex">
      <span class="px-2 flex justify-center items-center text-gray-700">
        <slot name="icon" />
      </span>
      <label class="w-full text-gray-700 text-sm font-bold mb-2 capitalize flex flex-col-reverse border-b-2 border-gray-600">
        <textarea v-model="valueModel"
                  :type="type"
                  :name="field.name"
                  :maxlength="field.max_length"
                  :required="field.required"
                  :class="{'empty': valueModel === '' }"
                  class="p-2 input h-48"
                  @input="$emit('input', valueModel)"
                  @change="$emit('change', valueModel)"
        />
        <span class="input-label">
          {{ field.label }}
        </span>
      </label>
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
    }
  }

}
</script>

<style lang="scss" scoped>

.input.empty:hover ~ .input-label {
  cursor: text;
}

.input:not(.empty), .input.empty:focus {
  & ~ .input-label {
    transform: translateY(0) scale(90%) translateX(-5%);
    opacity: 1;
  }
}

.input-label {
  transition: transform .3s, opacity .3s;
  transform: translateY(150%);
  opacity: .5;
}
</style>
