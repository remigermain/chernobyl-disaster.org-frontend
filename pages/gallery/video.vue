<template>
  <div class="wrapper">
    <div class="video-responsive">
      <iframe v-for="el in object" :key="el.id" class="video-item" :src="urlVideo(el.video)" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
    </div>
    <extra-infinite-loading class="w-full" :identifier="uniqueId" @infinite="refresh" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/gallery"
import _ from "lodash"

export default {

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    const query = (_.isEmpty(route.query) ? "" : `&search=${route.query.search}&order=${route.query.order}`)
    return app.$axios.get(`video/?page=1${query}`)
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
      model: "video"
    }
  },

  methods: {
    urlVideo (src) {
      return src.replace("watch?v=", "embed/")
    }
  },
}
</script>

<style lang="scss">

@screen md {
  .video-item  {
    width: 340px;
    height: 190px;
  }
}



@screen -md {
  .video-item {
    width: 380px;
    height: 220px;
  }
}


</style>
