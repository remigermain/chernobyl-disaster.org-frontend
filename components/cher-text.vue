<template>
  <div class="p-4 h-full text-left">
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
