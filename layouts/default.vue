<template>
  <div class="site">
    <div class="grid-home h-screen w-screen p-4 text-gray-900">
      <div class="flex z-20 text-gray-700">
        <logo class="inline-block w-20" />
        <h1 class="text-5xl uppercase extra-auto font-russia -md:opacity-0 transition-opacity  duration-400">
          {{ $t('global.chernobyl') }}
        </h1>
      </div>
      <cher-navbar />
      <nuxt />
    </div>
  </div>
</template>

<script>
import Logo from "@/assets/svg/logo.svg"
export default {
  components: { Logo }
}
</script>

<style lang="scss">
.site {
  background-color: white;
  //linear-gradient(rgba(var(--primary), .9), rgba(var(--primary-rev), .9)), url('~assets/img/background.jpeg');
  background-size: cover;
  min-height: inherit;
  height: inherit;
}

.grid-home {
  display: grid;
  grid-template-columns: 6fr 5fr;
  grid-template-rows: auto 1fr;
}

@media screen and (max-width:900px){
  .grid-home {
    position: relative;
    grid-template-columns: 1fr auto;
  }
}

</style>
