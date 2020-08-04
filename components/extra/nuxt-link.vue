<template>
  <nuxt-link :to="localePath(to)" v-bind="$attrs" @click.native="$emit('click')">
    <slot />
  </nuxt-link>
</template>

<script>
export default {

  inheritAttrs: false,

  props: {
    to: {
      type: [Object, String],
      required: true
    }
  },

}
</script>
