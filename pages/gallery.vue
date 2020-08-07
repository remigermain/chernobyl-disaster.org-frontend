<template>
  <div class="wrapper">
    <gallery-toolbar @sort="sortBy" @search="search" class="gallery-toolbar"/>
    <div class="gallery-grid">
      <img v-for="el in object" :key="el.id" :alt="el.title" :src="el.picture" class="gallery-item">
    </div>
    <div class="gallery-pagination flex justify-center">
      <field-pagination :length="objectLength" @change="search" />
    </div>
  </div>
</template>

<script>

export default {

  asyncData({ app, }) {
    return app.$axios.get("picture/?page=1")
      .then(response => {
        if (response.status != 200) {
          throw Error("") //TODO
        }
        return {
          object: response.data.results,
          objectLength: response.data.count
        }
      })
      .catch((error) => {
        this.$i18nToast().error(error)
      })
  },

  data () {
    return {
      page: 1,
      order: "",
      searchValue: ""
    }
  },

  computed: {
    url () {
      return `picture/?search=${this.value}&page=${this.page}${this.order}`
    }
  },

  methods: {
    sortBy(sortFnc) {
      this.listPictures.sort(sortFnc)
    },
    search (value) {
      this.search = value
      this.refresh()
    },
    refresh () {
      this.loading = true

      this.$axios.get(this.url)
        .then(response => {
          if (response.status != 200) {
            throw Error("")
          }
          return {
            object: response.data.results,
            objectLength: response.data.count
          }
        })
        .catch((error) => {
          this.$i18nToast().error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },

}
</script>

<style lang="scss">

.grid-index {
  grid-template-rows: auto auto 1fr auto;
}

.gallery-toolbar,
.gallery-grid,
.gallery-pagination {
  grid-column: 1 / -1;
}

.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .gallery-item {
    width: 300px;
    object-fit: cover;
  }
}

</style>
