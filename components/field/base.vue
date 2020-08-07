<template>
  <div class="p-3 flex justify-between items-center flex-wrap border-b border-gray-700 border-opacity-50 -md:justify-center">
    <label v-if="label" class="text-xl capitalize italic w2/4 text-gray-800 -md:w-full">
      <slot name="label" />
    </label>
    <div class="w-2/4 flex items-center p-2 -md:w-full">
      <slot name="icon">
        <template v-slot:icon />
      </slot>
      <slot name="input" />
    </div>
    <field-error :errors="errors" />
  </div>
</template>

<script>
export default {

  props: {
    label: {
      type: Boolean,
      default: true
    },
    errors: {
      type: Array,
      default: () => []
    }
  }

}
</script>
