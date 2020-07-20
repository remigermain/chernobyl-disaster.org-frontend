<template>
  <div class="p-4 text-left">
    <h1 class="text-3xl -sm:text-lg md:mb-6 text-gray-800 font-molot">
      {{ element.title }}
    </h1>
    <nuxt-content :document="element" />
  </div>
</template>

<script>
export default {
    props: {
        element: {
            type: Object,
            default: null
        }
    }
}
</script>

<style>

</style>
