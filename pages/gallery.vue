<template>
  <div class="wrapper">
    <gallery-toolbar />
    <div class="gallery-grid pt-2 pr-2 pl-2">
      <nuxt-child />
    </div>
  </div>
</template>

<style lang="scss">

.gallery-grid {
  grid-area: 2/ 3 / 2 / 11;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-x: hidden;
}

@screen -md {
  .gallery-grid {
    grid-area: 2/ 1 / 2 / 11;
  }
}

</style>
