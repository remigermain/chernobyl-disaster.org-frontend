<template>
  <div class="flex flex-col mt-2">
    <label class="flex justify-center items-start flex-wrap space-y-2">
        <span class="text-lg leading-3 italic text-gray-700 font-medium dark:text-gray-200 select-none w-full">
        {{ field.label }}:
        {{ valueModel ? $t('word.yes') : $t('word.no') }}
      </span>
      <div class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
        <input v-model="valueModel"
                type="checkbox"
                class="opacity-0 absolute"
                :name="field.name"
                :required="field.required"
                @change="$emit('input', valueModel)"
        >
        <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
      </div>
    </label>
    <lazy-admin-utils-error :errors="errors" />
  </div>
</template>

<script>
import FieldMixins from "~/mixins/field"
export default {

  mixins: [FieldMixins],

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

}
</script>

<style scoped>
  input:checked + svg {
  	display: block;
  }
</style>
