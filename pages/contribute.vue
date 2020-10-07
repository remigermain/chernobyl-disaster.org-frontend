<template>
  <div class="grid-contribute">
    <contribute-navbar />
    <div class="grid-contribute-content overflow-y-scroll md:p-4 -md:pt-4 min-h-full">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
  name: "Contribute",
  layout: "default",

  middleware: [
    "model",
    "auth",
  ],

  transition: "page",
}
</script>

<style lang="scss" scoped>
.grid-contribute {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

@media screen and (max-width:1000px){
  .grid-contribute {
    display: block;
  }
}
</style>
