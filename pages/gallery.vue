<template>
  <div class="grid-gallery">
    <div class="grid-gallery-toolbar">
      <gallery-toolbar />
    </div>
    <div class="grid-gallery-items">
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
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  height: 100%;
}

.grid-gallery-items {
  overflow-y: scroll;
  margin-top: .5rem;
  margin-bottom: .5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: 1fr;
}

@screen -md {
  .grid-gallery {
    grid-template-columns: 1fr;
  }
  .grid-gallery-items {
    grid-area: 1 / 1 / 1 / 2;
  }
  .grid-gallery-toolbar {
    grid-area: 2 / 1 / 2 / 2;
  }
}

</style>
