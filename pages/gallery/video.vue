<template>
  <div class="grid-video">
    <div v-for="el in object" :key="el.id" class="video-item">
      <iframe :src="urlVideo(el.video)" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
      />
    </div>
    <lazy-extra-infinite-loading class="video-infinite" :identifier="uniqueId" @infinite="refresh" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import isEmpty from "lodash/isEmpty"
import isNil from "lodash/isNil"

export default {

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    const query = (isEmpty(route.query) ? "" : `&search=${route.query.search}&order=${route.query.order}`)
    return app.$axios.get(`video/?page=1${query}`)
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
        }
        return {
          object: response.data.results,
          completed: isNil(response.data.next)
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


<style lang="scss" scoped>
.grid-video {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}


.video-item {
  height: 100%;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  iframe {
    width: inherit;
    height: inherit;
  }
}

.video-infinite {
  grid-column: span 4;
  grid-row: span 2;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1000px){
  .grid-video {
    grid-template-columns: repeat(3, 1fr);
  }
  .video-infinite {
    grid-column: span 3;
  }
}

@media screen and (max-width: 750px){
  .grid-video {
    grid-template-columns: repeat(2, 1fr);
  }
  .video-infinite {
    grid-column: span 2;
  }
}

@media screen and (max-width: 750px){
  .grid-video {
    grid-template-columns: 1fr;
  }
  .video-infinite {
    grid-column: span 1;
  }
}
</style>
