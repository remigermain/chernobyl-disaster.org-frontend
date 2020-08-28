<template>
  <div class="shadow-lg bg-gray-900 grid-extra w-full h-full rounded-lg">
    <div class="flex justify-around items-center flex-col bg-gray-900 text-white text-center border-r-8 border-yellow-600 rounded-l-lg">
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800 rounded-tl-lg': pictureActive}" @click.prevent="pictureShow">
        <icon-photo />
      </button>
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800': videoActive}" @click.prevent="videoShow">
        <icon-movie />
      </button>
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800': documentActive}" @click.prevent="documentShow">
        <icon-file />
      </button>
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800 rounded-bl-lg': articleActive}" @click.prevent="articleShow">
        <icon-article />
      </button>
    </div>
    <div class="bg-gray-800 overflow-y-scroll flex flex-wrap" :class="{'justify-center items-center ': activeExtra.length === 0}">
      <template v-if="pictureActive">
        <img v-for="(img, idx) in object.pictures"
             :key="img.id"
             :alt="img.title"
             :src="img.picture.thumbnail"
             loading="lazy"
             class="extra extra-picture"
             @click="setCurrent(img, idx)"
        >
        <span v-if="object.pictures.length == 0" class="italic text-white text-opacity-50">
          {{ empty }}
        </span>
        <lazy-gallery-detail-picture v-else
                                     :object="current"
                                     :idx="currentIdx"
                                     :length="object.pictures.length"
                                     @close="removeCurrent"
                                     @next="nextDetail"
                                     @prev="prevDetail"
        />
      </template>
    </div>
  </div>
</template>

<script>
import iconPhoto from "@/assets/svg/photo.svg"
import iconMovie from "@/assets/svg/movie.svg"
import iconFile from "@/assets/svg/file-text.svg"
import iconArticle from "@/assets/svg/news.svg"

const active = Object.freeze({
  "PICTURE": 1,
  "VIDEO": 2,
  "DOCUMENT": 3,
  "ARTICLE": 4
})

export default {

  components: {
    iconMovie,
    iconPhoto,
    iconFile,
    iconArticle,
  },

  props: {
    object: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      active: active.PICTURE,
      current: null,
      currentIdx: 0
    }
  },

  computed: {
    pictureActive () {
      return this.active === active.PICTURE
    },
    videoActive () {
      return this.active === active.VIDEO
    },
    articleActive () {
      return this.active === active.ARTICLE
    },
    documentActive () {
      return this.active === active.DOCUMENT
    },
    activeExtra() {
      if (this.pictureActive) {
        return this.object.pictures
      } else if (this.videoActive) {
        return this.object.videos
      } else if (this.articleActive) {
        return this.object.articles
      } else {
        return this.object.documents
      }
    }
  },

  methods: {
    pictureShow () {
      return this.active = active.PICTURE
    },
    videoShow () {
      return this.active = active.VIDEO
    },
    articleShow () {
      return this.active = active.ARTICLE
    },
    documentShow () {
      return this.active = active.DOCUMENT
    },
    setCurrent (current, idx) {
      this.current = current
      this.currentIdx = idx
    },
    removeCurrent () {
      this.current = null
      this.currentIdx = 0
    },
    nextDetail () {
      if (this.object.pictures.length - 1 > this.currentIdx) {
          this.setCurrent(this.object.pictures[this.currentIdx + 1], this.currentIdx + 1)
      }
    },
    prevDetail () {
      if (this.currentIdx > 0) {
        this.setCurrent(this.object.pictures[this.currentIdx - 1], this.currentIdx - 1)
      }
    },
  }

}
</script>

<style lang="scss" scoped>
.grid-extra {
  display: grid;
  grid-template-columns: auto 1fr;
}

.extra {
  width: 10%;
  height: 80px;
  padding: .2rem;
  &.extra-picture {
    object-fit: cover;
    cursor: pointer;
    transition: transform .4s;
    &:hover {
      transform: scale(105%);
    }
  }
}
</style>
