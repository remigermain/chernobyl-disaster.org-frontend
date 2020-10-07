<template>
  <lazy-field-text v-bind="$attrs" @input="$emit('input', $event)">
    <template #icon>
      <svg-icon name="user" class="inline text-gray-600"
                role="img" :aria-label="$t('auth.username')"
      />
    </template>
  </lazy-field-text>
</template>
