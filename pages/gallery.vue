<template>
  <div class="grid-gallery">
    <gallery-toolbar />
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: "Gallery",

  asyncData ({ app, store }) {
    return app.$axios.get("populate/people")
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        store.commit("model/POPULATE_PEOPLES", response.data)
      })
      .catch(() => {
        // TODO
      })
  }
}
</script>

<style lang="scss" scoped>
.grid-gallery {
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100%;
}

@media screen and (max-width: 840px) {
  .grid-gallery {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }
}
</style>
