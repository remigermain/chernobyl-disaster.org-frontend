<template>
  <div class="grid-document" @scroll="scroll">
    <gallery-infinite-loading ref="prevLoading" position="top" :completed="!hasPrevPage" @visible="prevPage">
      <template v-slot:completed>
        &nbsp;
      </template>
    </gallery-infinite-loading>
    <div class="grid-video">
      <div v-for="el in object" :key="el.id" class="video-item">
        <iframe :src="urlVideo(el.video)" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
        />
      </div>
    </div>
    <gallery-infinite-loading ref="nextLoading" position="bottom" :completed="completed" @visible="nextPage" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import { asynDataUrl } from "@/lib/gallery"

export default {
    name: "GalleryDocument",

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    return app.$axios.get(asynDataUrl("video", route.query))
      .then(response => {
        if (response.status != 200) {
          throw Error("")
        }
        return {
          object: response.data.results,
          completed: !response.data.next
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

  head () {
    return {
      title: this.$t("menu.video"),
      meta: [
          { hid: "description", name: "description", content: this.$t("pages.meta.video.description") },
          { property: "og:title", content: this.$t("pages.meta.video.title")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.$t("pages.meta.video.description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.$t("pages.meta.video.description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.$t("pages.meta.video.title") },
          { name: "twitter:description", content: this.$t("pages.meta.video.description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.$t("pages.meta.video.title") }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.grid-document {
  width: 100%;
  overflow: hidden scroll;
}

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

@media screen and (max-width: 1000px){
  .grid-video {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 750px){
  .grid-video {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 750px){
  .grid-video {
    grid-template-columns: 1fr;
  }
}
</style>
