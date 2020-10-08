<template>
  <main class="grid-layout">
    <div class="grid-layout-title">
      <nuxt-link  :to="localePath({name: 'index'})" :title="$t('menu.home')" class="hover:text-gray-700 dark:text-gray-200 dark:hover:text-white">
        <h1 class="uppercase text-4xl font-russia">
          <svg-icon name="logo" />
          <span>chernobyl</span>
        </h1>
      </nuxt-link>
    </div>
    <navbar />
    <section id="layout-contents" class="grid-layout-contents hide-scroolbar" role="main" :aria-label="$t('utils.content')">
      <nuxt v-if="!$slots.default" />
      <slot v-else />
    </section>
    <div class="background" :class="{'active': background}" @click="hideBackground" />
  </main>
</template>

<script>
import storeWatcherMixins from "~/mixins/storeWatcher"
export default {

  mixins: [storeWatcherMixins]

}
</script>

<style lang="scss" scoped>
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
}

.grid-layout-contents {
  grid-area: 2 / 1 / 2 / 11;
  overflow-y: scroll;
}

.background {
  transition: background-color .2s;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  &.active {
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
