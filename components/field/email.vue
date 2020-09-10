<template>
  <lazy-field-text v-bind="$attrs" type="email">
    <template v-slot:icon>
      <svg-icon name="mail" class="inline text-gray-600 cursor-pointer" :aria-label="$t('utils.email')" />
    </template>
  </lazy-field-text>
</template>

<script>
export default {

  inheritAttrs: false,

}
</script>
