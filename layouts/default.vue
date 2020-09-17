<template>
  <main class="grid-layout">
    <div class="grid-layout-title">
      <extra-nuxt-link :to="{name: 'index'}" :title="$t('menu.home')" class="hover:text-gray-700">
        <h1 class="grid-layout-title-item font-russia">
          <svg-icon name="logo" />
          <!-- <object type="image/svg+xml" item-prop="image" :data="require('~/assets/svg/logo.svg')" /> -->
          <span>chernobyl</span>
        </h1>
      </extra-nuxt-link>
    </div>
    <navbar />
    <section id="layout-contents" class="grid-layout-contents hide-scroolbar" role="main" :aria-label="$t('utils.content')">
      <nuxt v-if="!$slots.default" />
      <slot />
    </section>
  </main>
</template>

<style lang="scss">
.grid-layout {
  display: grid;
  grid-template-columns: auto repeat(9, 1fr);
  grid-template-rows: auto 1fr;
  padding: .8rem;
  height: 100vh;
  width: 100vw;
}

.grid-layout-title {
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
