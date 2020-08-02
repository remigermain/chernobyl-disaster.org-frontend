<template>
  <div class="wrapper bread-crumb text-md text-opacity-50 text-gray-700">
    <nuxt-link v-for="obj in paths" :key="obj.path" :to="obj.path">
      {{ obj.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    paths: {
      type: Array[Object],
      required: true
    }
  }

}
</script>

<style lang="scss">
.bread-crumb > :not(:last-child) {
  &::after {
    content: '/';
    color: rgb(33, 17, 105);
  }
}
</style>
