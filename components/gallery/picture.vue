<template>
  <component :is="tag"
             class="picture-item"
             :class="{'skeleton': skeleton}"
             :alt="title"
             :src="picture"
             loading="lazy"
             @click="$emit('click')"
  />
</template>

<script>
export default {
  props: {
    object: {
      type: Object,
      required: true
    },
    skeleton: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    title () {
      return this.object?.title
    },
    picture () {
      return this.object?.picture?.thumbnail
    },
    tag () {
      return (this.skeleton ? "div" : "img")
    }
  }
}
</script>

<style lang="scss" scoped>

.picture-item {
  width: 220px;
  height: 140px;
  padding: 5px;
  overflow: hidden;
  &:not(.skeleton) {
    transition: transform .4s, width 1s, height  1s;
    cursor: pointer;
    object-fit: cover;
    &:hover {
      transform: scale(105%);
    }
  }
  &.skeleton {
    background-clip: content-box;
    @apply animate-pulse bg-gray-400;
  }
}

@media screen and (max-width: 1250px){
  .picture-item {
    width: 25%;
  }
}

@media screen and (max-width: 650px){
  .picture-item {
    width: 50%;
  }
}

@media screen and (max-width: 470px){
  .picture-item {
    width: 100%;
  }
}
</style>
