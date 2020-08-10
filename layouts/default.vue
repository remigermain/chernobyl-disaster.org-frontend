<template>
  <div class="site">
    <div class="grid-index p-4 text-gray-900 w-screen h-screen">
      <div class="grid-logo flex text-gray-800">
        <h1 class="text-5xl uppercase extra-auto font-russia transition-opacity duration-400 z-1">
          {{ $t('global.chernobyl') }}
        </h1>
      </div>
      <cher-navbar />
      <nuxt />
    </div>
  </div>
</template>

<style lang="scss">

.site {
  background-color: white;
  background-size: cover;
  min-height: inherit;
  height: inherit;
  position: relative;
  z-index: 77;
}

.grid-index {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: auto minmax(80%, auto) auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.grid-logo {
  grid-area: 1 / 1 / 2 / 3;
}

.grid-index:nth-child(3) {
  grid-area: 2 / 1 / 6 / 2;
}

.grid-index:nth-child(4) {
  grid-area: 2 / 2 / 6 / 6;
}
</style>
