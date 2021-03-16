<template>
  <button
    type="button"
    class="action bg-orange-500 hover:bg-orange-600 text-gray-900"
    @click="$emit('click')"
  >
    <svg-icon name="message-report" class="action-icon" />
    <span v-if="$slots.default" class="mx-2">
      <slot />
    </span>
  </button>
</template>
