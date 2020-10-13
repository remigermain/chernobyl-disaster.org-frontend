<template>
  <div class="flex flex-col">
    <div class="flex mt-2 ">
      <span v-if="$slots.icon" class="px-2 flex justify-center items-center text-gray-700 field-icon">
        <slot name="icon" />
      </span>
      <label class="w-full text-gray-700 text-sm font-bold flex flex-col-reverse border-b-2 border-gray-600 field-label">
        <input v-model="valueModel"
               :type="type"
               :name="field.name"
               :maxlength="field.max_length"
               :minlength="field.min_length"
               :required="field.required"
               :autocomplete="autocomplete"
               class="p-2 field-input w-full"
               :class="{'empty': !valueModel}"
               @input="$emit('input', valueModel)"
        >
        <span class="field-input-label">
          {{ field.label }}
        </span>
      </label>
      <span v-if="$slots.iconRight" class="px-2 flex justify-center items-center text-gray-700 field-icon">
        <slot name="icon-right"/>
      </span>
    </div>
    <lazy-admin-utils-error :errors="errors" />
  </div>
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

.field-input {
  @apply text-gray-700;
  &:focus, &:not(.empty) {
    @apply bg-gray-200;
    @apply rounded-t-md
  }
}

.field-icon {
  @apply text-2xl;
}

.dark {
  .field-input {
    @apply text-gray-200;
    &:focus, &:not(.empty) {
      @apply bg-gray-700;
      @apply rounded-t-md
    }
  }
  .field-icon {
    @apply text-gray-100
  }
  .field-input-label {
    @apply text-gray-100
  }
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
</style>
