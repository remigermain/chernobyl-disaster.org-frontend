<template>
  <div class="grid-contribute">
    <navbar-contribute />
    <div class="grid-contribute-content overflow-y-scroll md:p-4 -md:pt-4 min-h-full">
      <nuxt-child :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Contribute",

  middleware: [
    "model",
    "auth",
  ],

}
</script>

<style lang="scss" scoped>
.grid-contribute {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

.contribute-menu > * + * {
  margin-top: 2rem
}

.contribute-link {
  display: block;
  transition: color .4s, transform .2s;
  &.nuxt-link-exact-active {
    color: rgb(128, 9, 128);
    transform: translateX(10%);
  }
  &:hover {
    color: rgb(128, 9, 128);
    transform: translateX(10%);
  }
}


@media screen and (max-width:900px){
  .grid-contribute {
    display: block;
  }
}

</style>
