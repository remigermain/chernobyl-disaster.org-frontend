<template>
  <div class="w-full">
    <p class="text-md italic text-gray-600">
      {{ field.help }}
    </p>
    <span>
      {{ $t('utils.require') }} :
      <span :class="{'text-green-800': field.required,'text-red-800': !field.required,}">
        {{ (field.required ? $t('utils.yes') : $t('utils.no')) }}
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
    }
  }
}
</script>
