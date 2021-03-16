<template>
  <lazy-field-text
    v-bind="$attrs"
    type="email"
    autocomplete="email"
    @input="$emit('input', $event)"
  >
    <template #icon>
      <svg-icon
        name="mail"
        class="inline text-gray-600"
        :aria-label="$t('authentication.email')"
      />
    </template>
  </lazy-field-text>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
