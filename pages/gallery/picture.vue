<template>
  <div class="wrapper">
    <div v-for="el in object" :key="el.id" class="picture-item">
      <img :alt="el.title"
           :src="el.picture"
           loading="lazy"
           @click="setDetail(el)"
      >
    </div>
    <!-- <extra-infinite-loading class="w-full" :identifier="uniqueId" @infinite="refresh" /> -->
  </div>
</template>

<script>
// import galleryMixin from "@/mixins/gallery"
import _ from "lodash"

export default {

  mixins: [
    // galleryMixin
  ],

  asyncData({app, route}) {
    const query = (_.isEmpty(route.query) ? "" : `&search=${route.query.search}&order=${route.query.order}`)
    return app.$axios.get(`picture/?page=1${query}`)
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
        }
        return {
          object: response.data.results,
          completed: _.isNil(response.data.next)
        }
      })
  },

  data () {
    return {
      model: "picture"
    }
  },
}
</script>


<style lang="scss" scoped>
.picture-item {
  img {
    padding: .1rem;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}

</style>
