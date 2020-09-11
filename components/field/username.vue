<template>
  <lazy-field-text v-bind="$attrs">
    <template v-slot:icon>
      <svg-icon name="user" class="inline text-gray-600 cursor-pointer"
                role="img" :aria-label="$t('auth.field.username')"
      />
    </template>
  </lazy-field-text>
</template>
