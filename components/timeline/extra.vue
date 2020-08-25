<template>
  <div class=" shadow-md rounded-sm border-2 border-gray-900 grid-extra">
    <div class="flex justify-around items-center flex-col bg-gray-900 text-white text-center">
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800': pictureActive}" @click.prevent="pictureShow">
        <icon-photo />
      </button>
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800': videoActive}" @click.prevent="videoShow">
        <icon-movie />
      </button>
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800': documentActive}" @click.prevent="documentShow">
        <icon-file />
      </button>
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800': articleActive}" @click.prevent="articleShow">
        <icon-article />
      </button>
    </div>
    <div class="bg-gray-700 overflow-y-scroll flex flex-wrap">
      <template v-if="pictureActive">
        <img v-for="(img, idx) in object.pictures"
             :key="img.id"
             :alt="img.title"
             :src="img.picture.thumbnail"
             loading="lazy"
             class="extra extra-picture"
             @click="setCurrent(img, idx)"
        >
        <span v-if="object.pictures.length == 0" class="w-full p-4 self-center italic text-white">
          {{ empty }}
        </span>
        <lazy-gallery-detail-picture :object="current"
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
