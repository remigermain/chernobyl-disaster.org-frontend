<template>
  <div class="flex flex-col">
    <div class="flex mt-2">
      <span class="px-2 flex justify-center items-center text-gray-700 field-icon">
        <slot name="icon" />
      </span>
      <label class="w-full text-gray-700 text-sm font-bold flex flex-col-reverse border-b-2 border-gray-600 field-label">
        <input v-model="valueModel"
               :type="type"
               :name="field.name"
               :maxlength="field.max_length"
               :required="field.required"
               :autocomplete="autocomplete"
               :class="{'empty': valueModel === '' }"
               class="p-2 field-input"
               @input="$emit('input', valueModel)"
               @change="$emit('change', valueModel)"
               @blur="$emit('blur')"
               @focus="$emit('focus')"
        >
        <span class="field-input-label">
          {{ field.label }}
        </span>
      </label>
      <span class="px-2 flex justify-center items-center text-gray-700 field-icon">
        <slot name="icon-right" />
      </span>
    </div>
    <lazy-admin-error :errors="errors" />
  </div>
</template>

<script>
import FieldMixins from "~/mixins/admin/field"
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
    },
    errors: {
      type: Array,
      default: () => []
    }
  },


}
</script>

<style lang="scss" scoped>

.field-input:focus {
  @apply bg-gray-100;
}

.field-input.empty:hover ~ .field-input-label {
  cursor: text;
}

.field-input:not(.empty), .field-input.empty:focus {
  & ~ .field-input-label {
    transform: translateY(calc(0% - .5rem)) translateX(-5%) scale(.9);
    opacity: 1;
  }
}

.field-input-label {
  transition: transform .3s, opacity .6s;
  transform: translateY(100%);
  opacity: .5;
}

.dark-mode {
  .field-input {
    @apply text-gray-400;
    &:focus {
      @apply bg-gray-800 rounded-lg text-white rounded-b-none;
    }
  }
  .field-icon {
    @apply text-gray-100
  }
  .field-input-label {
    @apply text-gray-100
  }
}

</style>
