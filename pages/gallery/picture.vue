<template>
  <div class="grid-picture" @scroll="scroll">
    <div class="flex w-full flex-wrap justify-around">
      <span v-for="(_, idx) in inPrev" :key="`skeleton-prev-${idx}`" class="picture-item skeleton" />
      <gallery-infinite-loading v-if="hasPrevPage" ref="prevLoading" position="top" class="picture-item skeleton" @visible="nextPage" />
      <transition-group name="img" tag="div" class="wrapper">
        <img v-for="(el, idx) in object"
             :key="el.id"
             class="picture-item"
             :alt="i18nAttr(el, 'title')"
             :src="el.picture.thumbnail"
             loading="lazy"
             role="button"
             tabindex="0"
             @click="setCurrent(el, idx)"
        >
      </transition-group>
      <gallery-infinite-loading v-if="!completed" ref="nextLoading" position="bottom" class="picture-item skeleton" @visible="nextPage" />
      <span v-for="(_, idx) in inNext" :key="`skeleton-next-${idx}`" class="picture-item skeleton" />
    </div>
    <lazy-gallery-detail-picture :object="current"
                                 :idx="currentIdx"
                                 :length="length"
                                 @close="current = null"
                                 @next="nextDetail"
                                 @prev="prevDetail"
    />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import { asynDataUrl } from "@/lib/gallery"

export default {
  name: "GalleryPicture",

  mixins: [
    galleryMixin
  ],

  scrollToTop: true,

  asyncData({app, route}) {
    return app.$axios.get(asynDataUrl("picture", route.query))
      .then(response => {
        if (response.status != 200) {
          throw Error("")
        }
        return {
          object: response.data.results,
          length: response.data.count,
          completed: !response.data.next
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
      title: this.$t("menu.picture"),
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

.picture-item {
  width: 220px;
  height: 140px;
  padding: 5px;
  overflow: hidden;
  &.skeleton {
    background-clip: content-box;
    @apply .animate-pulse .bg-gray-400;
  }
  &:not(.skeleton) {
    transition: transform .4s, width 1s, height  1s;
    cursor: pointer;
    object-fit: cover;
    &:hover {
      transform: scale(105%);
    }
  }
}

@media screen and (max-width: 1250px){
  .picture-item {
    width: 25%;
  }
}

@media screen and (max-width: 650px){
  .picture-item {
    width: 50%;
  }
}

@media screen and (max-width: 470px){
  .picture-item {
    width: 100%;
  }
}

.img-enter-active, .img-leave-active {
  transition: all 1s;
}
.img-enter, .img-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
