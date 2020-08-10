<template>
  <div class="wrapper">
    <div id="gallery-toolbar" class="gallery-toolbar">
      <gallery-toolbar class="gallery-toolbar-item" @change="change" @submit="submit" />
    </div>
    <div class="gallery-grid">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      options: {},
    }
  },

  methods: {
    change (value) {
      this.type = value
    },
    submit (obj) {
      this.options = obj
    },
  },
}
</script>

<style lang="scss">

.grid-index {
  grid-template-rows: auto auto 1fr auto;
}

.gallery-toolbar {
  grid-area: 2/ 1 / 2 / 2;
  display: flex;
  justify-content: center;
}

.gallery-grid {
  grid-area: 2/ 2 / 2 / 6;
}
.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-x: hidden;
}

</style>
