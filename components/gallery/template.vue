<template>
  <div class="grid-picture">
    <div class="flex w-full flex-wrap justify-around">
      <slot />
      <gallery-infinite-loading position="bottom" @visible="$emit('next')" />
      <span v-for="(_, idx) in inNext" :key="`skeleton-next-${idx}`" class="picture-item skeleton" />
    </div>
    <slot name="extra" />
  </div>
</template>

<script>
export default {

  props: {
    completed: {
      type: Boolean,
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },

  computed: {
    inNext () {
      const length = Math.max(Math.min(this.length - (this.page * this.$pagination), this.$pagination), 0)
      return new Array(length)
    }
  }

}
</script>
