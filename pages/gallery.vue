<template>
  <div class="grid-gallery">
    <div class="grid-gallery-toolbar">
      <gallery-toolbar />
    </div>
    <div class="grid-gallery-items overflow-x-hidden">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.grid-gallery {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr auto;
  height: 100%;
}

.grid-gallery-items {
  overflow-y: scroll;
  padding: 1rem;
}

.grid-gallery-toolbar {
  padding: 1rem;
}

@media screen and (max-width: 1300px) {
  .grid-gallery {
    grid-template-columns: 1fr;
  }
  .grid-gallery-items {
    grid-area: 1 / 1 / 1 / 2;
  }
  .grid-gallery-toolbar {
    grid-area: 2 / 1 / 2 / 2;
    padding: 0;
  }
}

</style>
