<template>
  <nuxt-link :to="localePath(to)" class="action text-white bg-purple-700 hover:bg-purple-800" @click="$emit('click')">
    <svg-icon name="edit" class="action-icon" />
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
