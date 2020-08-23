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
        if (response.status != 200) {
          throw Error("")
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
  grid-template-columns: auto 1fr;
  height: 100%;
}

.grid-gallery-items {
  overflow-y: scroll;
}

</style>
