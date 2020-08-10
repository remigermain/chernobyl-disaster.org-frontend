<template>
  <div class="w-full">
    <p class="text-md italic text-gray-600">
      {{ field.help }}
    </p>
    <span>
      {{ $t('global.require') }} :
      <span :class="{'text-green-800': field.required,'text-red-800': !field.required,}">
        {{ (field.required ? $t('global.yes') : $t('global.no')) }}
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
