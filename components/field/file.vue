<template>
  <lazy-field-text v-bind="$attrs" type="file">
    <template v-slot:icon>
      <svg-icon name="file" class="inline text-gray-600" role="img" />
    </template>
  </lazy-field-text>
</template>
