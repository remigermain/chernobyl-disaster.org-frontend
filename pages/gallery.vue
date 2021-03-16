<template>
  <div class="grid-gallery">
    <gallery-toolbar />
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: 'Gallery',

  asyncData({ app, store }) {
    // poopulate sotre if not character
    if (!store.getters['model/characters'].length) {
      return app.$axios
        .get('populate/characters')
        .then(response => {
          if (response.status !== 200) {
            throw new Error('error-server')
          }
          store.commit('model/POPULATE_CHARACTERS', response.data)
        })
        .catch(error => {
          store.commit('ERROR_SERVER', error.message || error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-gallery {
  display: grid;
  grid-template-columns: 230px 1fr;
  height: 100%;
}

@media screen and (max-width: 840px) {
  .grid-gallery {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }
}
</style>
