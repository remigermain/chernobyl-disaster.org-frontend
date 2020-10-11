<template>
  <button type="button" class="action text-white bg-blue-700 hover:bg-blue-800" @click="$emit('click')">
    <svg-icon name="send" class="action-icon" />
    <span v-if="$slots.default" class="mx-2">
      <slot />
    </span>
  </button>
</template>

<style lang="scss">
@import '~/assets/css/action.scss';
</style>
