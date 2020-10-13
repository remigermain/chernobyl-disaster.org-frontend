<template>
  <div class="flex flex-col">
    <div class="flex mt-2">
      <span class="flex justify-center items-center text-gray-700 field-icon">
        <slot name="icon" />
      </span>
      <label class="w-full text-gray-800 text-sm font-bold flex flex-col-reverse border-b-2 border-gray-600 field-label">
        <textarea v-model="valueModel"
                  v-autosize
                  :name="field.name"
                  :maxlength="field.max_length"
                  :minlength="field.min_length"
                  :required="field.required"
                  class="p-2 field-input w-full"
                  :class="{'empty': !valueModel, 'min-textarea': min}"
                  @input="$emit('input', valueModel)"
        />
        <span class="field-input-label">
          {{ field.label }}
        </span>
      </label>
    </div>
    <lazy-admin-utils-error :errors="errors" />
  </div>
</template>

<script>
import autosize from "v-autosize"
import FieldMixins from "~/mixins/field"

export default {

  directives: {
    autosize
  },

  mixins: [FieldMixins],

  props: {
    errors: {
      type: Array,
      default: () => []
    },
    min: {
      type: Boolean,
      default: false
    },
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

.min-textarea {
  min-height: 200px;
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
