<template>
  <div class="shadow-lg md:bg-gray-900 grid-extra w-full h-full rounded-lg timeline-extra" :class="{'active': activeMenu}">
    <div class="extra-toolbar-mobile bg-gray-800" @click="toogleActive">
      <span class="ml-6 w-2/4 capitalize">
        {{ $t('utils.menu') }}
      </span>
      <span class="mr-6 text-right w-2/4">
        <svg-icon name="arrow-up" class="extra-toolbar-mobile-icon" :class="{'active': activeMenu}" />
      </span>
    </div>
    <div class="extra-toolbar-desktop flex justify-around items-center flex-col bg-gray-900 text-white text-center md:border-r-8 md:border-yellow-600 md:rounded-l-lg">
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800': pictureActive}" @click.prevent="pictureShow">
        <svg-icon name="photo" class="extra-icon-mobile" />
      </button>
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800': videoActive}" @click.prevent="videoShow">
        <svg-icon name="movie" class="extra-icon-mobile" />
      </button>
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800': documentActive}" @click.prevent="documentShow">
        <svg-icon name="file-text" class="extra-icon-mobile" />
      </button>
      <button class="w-full h-1/4 px-4" :class="{'bg-gray-800 md:rounded-bl-lg': articleActive}" @click.prevent="articleShow">
        <svg-icon name="news" class="extra-icon-mobile" />
      </button>
    </div>
    <div class="extra-toolbar-desktop bg-gray-800 overflow-y-scroll flex flex-wrap" :class="{'justify-center items-center ': activeExtra.length === 0, 'active': activeMenu}">
      <template v-if="pictureActive">
        <img v-for="(img, idx) in object.pictures"
             :key="img.id"
             :alt="img.title"
             :src="img.picture.thumbnail"
             loading="lazy"
             class="extra extra-picture"
             @click="setCurrent(img, idx)"
        >
        <span v-if="object.pictures.length == 0" class="italic text-gray-700 text-opacity-50">
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

const active = Object.freeze({
  "PICTURE": 1,
  "VIDEO": 2,
  "DOCUMENT": 3,
  "ARTICLE": 4
})

export default {

  props: {
    object: {
      type: Object,
      required: true,
    }
  },

  data () {
    return {
      active: active.PICTURE,
      current: null,
      currentIdx: 0,
      activeMenu: false
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
    toogleActive () {
      this.activeMenu = !this.activeMenu
    },
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
  @apply .border-t-8 .border-gray-800;
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

@media screen and (max-width: 1350px){
  .extra {
    width: 14%
  }
}

@media screen and (max-width: 950px){
  .extra {
    width: 20%
  }
}
.extra-toolbar-mobile {
  display: none;
  height: 60px;
  min-height: 60px;
  align-items: center;
  cursor: pointer;
  color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.extra-toolbar-mobile-icon {
  transition: transform .5s;
  &.active {
    transform: rotate(-180deg);
  }
}

@media screen and (max-width: 850px){
  .extra-toolbar-mobile {
    display: flex;
  }
  .grid-extra {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto 1fr;
    transition: height .6s;
    height: 60px;
    border-top-width: 0;
    &.active {
      height: 70vh;
    }
  }

  .extra-toolbar-desktop {
    flex-direction: row;
    overflow: hidden;
    display: flex;
    & > button {
      width: 25%;
      height: auto;
    }
  }
  .extra-icon-mobile {
    width: inherit;
    height: 3em;
  }
}
</style>
