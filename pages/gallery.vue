<template>
  <div class="grid-gallery">
    <gallery-toolbar />
    <div class="grid-gallery-items overflow-x-hidden">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
    name: "Gallery",
}
</script>

<style lang="scss" scoped>
.grid-gallery {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;
}

.grid-gallery-items {
  overflow-y: scroll;
}

</style>
