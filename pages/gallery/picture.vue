<template>
  <div class="grid-picture" @scroll="scroll">
    <gallery-infinite-loading ref="prevLoading" position="lower" :completed="hasPrevPage" @visible="prevPage">
      <template v-slot:completed>
        &nbsp;
      </template>
    </gallery-infinite-loading>
    <div class="flex w-full flex-wrap justify-around">
      <lazy-gallery-picture v-for="(el, idx) in object"
                            :key="el.id"
                            :object="el"
                            @click="setCurrent(el, idx)"
      />
    </div>
    <lazy-gallery-detail-picture :object="current"
                                 :idx="currentIdx"
                                 :length="length"
                                 @close="current = null"
                                 @next="nextDetail"
                                 @prev="prevDetail"
    />
    <gallery-infinite-loading ref="nextLoading" position="upper" :completed="completed" @visible="nextPage" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import isNil from "lodash/isNil"
import { asynDataUrl } from "@/lib/gallery"

export default {
  name: "GalleryPicture",

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    return app.$axios.get(asynDataUrl("picture", route.query))
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
        }
        return {
          object: response.data.results,
          length: response.data.count,
          completed: isNil(response.data.next)
        }
      })
  },

  data () {
    return {
      model: "picture",
      current: null,
      currentIdx: -1,
    }
  },

  methods: {
    setCurrent (current, idx) {
      this.current = current
      this.currentIdx = idx
    },
    nextDetail () {
      /*
      **  set the next detail of image or refresh the next page and set the next object
      */
      if (this.length - 1 > this.currentIdx) {
        if (this.object.length - 1 > this.currentIdx) {
          this.setCurrent(this.object[this.currentIdx + 1], this.currentIdx + 1)
        } else {
          this.nextPage()
            .then(() => {
              this.setCurrent(this.object[this.currentIdx + 1], this.currentIdx + 1)
            })
        }
      }
    },
    prevDetail () {
      /*
      ** same has nextDetail but for previous object
      */
      if (!this.hasPrevPage && this.currentIdx == 0) {
        this.prevPage()
          .then(() => {
            this.setCurrent(this.object[this.currentIdx - 1], this.currentIdx - 1)
          })
      } else if (this.currentIdx > 0) {
        this.setCurrent(this.object[this.currentIdx - 1], this.currentIdx - 1)
      }
    },
  },

  head () {
    return {
      title: this.$t("pages.menu.picture"),
      meta: [
          { hid: "description", name: "description", content: this.$t("pages.meta.picture.description") },
          { property: "og:title", content: this.$t("pages.meta.picture.title")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.$t("pages.meta.picture.description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.$t("pages.meta.picture.description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.$t("pages.meta.picture.title") },
          { name: "twitter:description", content: this.$t("pages.meta.picture.description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.$t("pages.meta.picture.title") }
      ]
    }
  },
}
</script>


<style lang="scss" scoped>
.grid-picture {
  width: 100%;
  overflow: hidden scroll;
}

@media screen and (max-width: 840px) {
  .grid-picture{
    grid-area: 1 / 1 / 1 / 2;
  }
}
</style>
