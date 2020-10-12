<template>
  <div class="grid-video" @scroll="scroll">
    <div class="flex w-full flex-wrap justify-around">
      <span v-for="(_, idx) in inPrev" :key="`skeleton-prev-${idx}`" class="video-item skeleton" />
      <gallery-infinite-loading v-if="hasPrevPage" ref="prevLoading" position="top" class="video-item skeleton" @visible="nextPage" />

      <gallery-video v-for="el in object" :key="el.id" />

      <gallery-infinite-loading v-if="!completed" ref="nextLoading" position="bottom" class="video-item skeleton" @visible="nextPage" />
      <span v-for="(_, idx) in inNext" :key="`skeleton-next-${idx}`" class="video-item skeleton" />
    </div>
    <span v-if="object.length === 0" class="italic text-gray-900 text-opacity-75 leading-3 text-xl w-full h-full flex justify-center items-center animate-pulse">
      {{ this.$t("word.empty") }}
    </span>
  </div>
</template>

<script>
import galleryMixin from "~/mixins/page/gallery"
import { asynDataUrl } from "~/lib/gallery"
import { convertVideoLink } from "~/lib/contribute"

export default {
  name: "GalleryVideo",

  mixins: [
    galleryMixin
  ],

  scrollToTop: true,

  asyncData({app, route, store}) {
    return app.$axios.get(asynDataUrl("video", route.query))
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        return {
          object: response.data.results,
          length: response.data.count,
          completed: !response.data.next
        }
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return { object: [], completed: true }
      })
  },

  data () {
    return {
      model: "video"
    }
  },

  head () {
    const title = this.$t("menu.video")
    const description = this.$t("description.video")
    return {
      title,
      meta: [
          { hid: "description", name: "description", content: description },
          { property: "og:title", content: title},
          { property: "og:description", content: description},
          { name: "twitter:card", content: description },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: description },
          { name: "twitter:image:alt", content: title }
      ]
    }
  },

  methods: {
    convertVideoLink,
  },

}
</script>


<style lang="scss">
.grid-video {
  width: 100%;
  overflow: hidden scroll;
}

@media screen and (max-width: 840px) {
  .grid-video{
    grid-area: 1 / 1 / 1 / 2;
  }
}

.video-item {
  width: 220px;
  height: 140px;
  padding: 5px;
  overflow: hidden;
  &.skeleton {
    background-clip: content-box;
    @apply animate-pulse;
    @apply bg-gray-400;
  }
  &:not(.skeleton) {
    transition: transform .4s, width 1s, height  1s;
    cursor: pointer;
    object-fit: cover;
    &:hover {
      transform: scale(1.05);
    }
  }
}

@media screen and (max-width: 1250px){
  .video-item {
    width: 25%;
  }
}

@media screen and (max-width: 650px){
  .video-item {
    width: 50%;
  }
}

@media screen and (max-width: 470px){
  .video-item {
    width: 100%;
  }
}

</style>
