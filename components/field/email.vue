<template>
  <lazy-field-text v-bind="$attrs" type="email"
                   autocomplete="email"
                   @input="$emit('input', $event)"
                   @change="$emit('change', $event)"
  >
    <template v-slot:icon>
      <svg-icon name="mail" class="inline text-gray-600" :aria-label="$t('auth.field.email')" />
    </template>
  </lazy-field-text>
</template>

<script>
export default {

  inheritAttrs: false,

}
</script>
