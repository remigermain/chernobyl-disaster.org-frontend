<template>
  <div
    class="p-2 rounded-md shadow-md bg-green-100 font-medium text-gray-800 border-t-4
        rounded-t-md border-green-700 dark:bg-green-700 dark:border-green-900 dark:text-gray-300 text-md"
  >
    <p class="whitespace-pre-line">{{ field.help }}</p>
    <span v-show="detail" class="flex justify-center mt-2 gap-x-4">
      <span class="italic font-medium "> {{ $t('word.required') }} : </span>
      <span class="text-gray-900">
        {{ field.required ? $t('word.yes') : $t('word.no') }}
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    detail: {
      type: Boolean,
      default: true
    }
  }
}
</script>
