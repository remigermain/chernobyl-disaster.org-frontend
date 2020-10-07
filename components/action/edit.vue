<template>
  <nuxt-link :to="localePath(path)">
    <svg-icon name="edit" class="cursor-pointer text-purple-700 action-btn" />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },

  computed: {
    path () {
      return {name: `contribute-${this.model}-update-id`, params:{id: this.id}}
    }
  }

}
</script>

<style lang="scss" scoped>
.action-btn {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  transition: transform .4s;
  &:hover {
    transform: scale(1.2);
  }
}
</style>
