<template>
  <lazy-field-text v-bind="$attrs" type="checkbox">
    <template #icon>
      <svg-icon name="trash" class="inline text-gray-600" role="img" />
    </template>
  </lazy-field-text>
</template>
