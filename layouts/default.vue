<template>
  <div class="grid-layout">
    <div class="grid-layout-title">
      <h1 class="grid-layout-title-item font-russia">
        {{ $t('global.chernobyl') }}
      </h1>
    </div>
    <navbar />
    <div class="grid-layout-contents hide-scroolbar">
      <nuxt />
    </div>
  </div>
</template>

<style lang="scss">
.grid-layout {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: auto 1fr;
  padding: .8rem;
  height: 100vh;
  width: 100vw;
}

.grid-layout-title {
  grid-area: 1 / 1 / 2 / 3;
  display: flex;
  justify-items: center;
  align-items: center;
  color: #2D3748;
  .grid-layout-title-item {
    text-transform: uppercase;
    font-size: 2.5rem;
  }
}

.grid-layout-contents {
  grid-area: 2 / 1 / 2 / 11;
  overflow-y: scroll;
}
</style>
