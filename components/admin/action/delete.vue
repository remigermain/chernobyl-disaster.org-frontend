<template>
  <button type="button" :title="$t('word.delete')" class="action text-white bg-red-700 hover:bg-red-800" @click="$emit('click')">
    <svg-icon name="trash" class="action-icon" />
    <span v-if="$slots.default" class="mx-2">
      <slot />
    </span>
  </button>
</template>
