<template>
  <nuxt-link :to="localePath(to)" class="action text-white bg-blue-700 hover:bg-blue-800" @click="$emit('click')">
    <svg-icon name="eye" class="action-icon" />
    <span v-if="$slots.default" class="mx-2">
      <slot />
    </span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true
    },
  },

}
</script>

<style lang="scss">
@import '~/assets/css/action.scss';
</style>
