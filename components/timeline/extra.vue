<template>
  <div class="wrapper">
    <div class="fix-mobile" />
    <div class="shadow-lg grid-extra w-full h-full rounded-lg" :class="{'active': activeMenu}">
      <div class="extra-toolbar-mobile bg-gray-800" @click="toogleActive">
        <span class="ml-6 w-2/4 capitalize">
          {{ $t('utils.menu') }}
        </span>
        <span class="mr-6 text-right w-2/4">
          <svg-icon name="arrow-up" class="extra-toolbar-mobile-icon" :class="{'active': activeMenu}" />
        </span>
      </div>
      <nav class="extra-toolbar-desktop flex justify-around items-center flex-col bg-gray-800 text-white text-center md:border-r-8 md:border-blue-800 md:rounded-l-lg md:rounded-b-lg"
           :class="{'active': activeMenu}"
      >
        <button class="w-full h-2/4 px-4 extra-btn" :class="{'bg-gray-800': pictureActive, 'bg-gray-900 -md:rounded-lg': !pictureActive}"
                :title="$t('utils.goto-picture')"
                @click.prevent="pictureShow"
        >
          <svg-icon name="photo" class="extra-icon-mobile" role="img" :aria-label="$t('utils.picture')" />
        </button>
        <button class="w-full h-2/4 px-4 extra-btn md:rounded-b-lg" :class="{'bg-gray-800': videoActive, 'bg-gray-900 -md:rounded-lg': !videoActive}"
                :title="$t('utils.goto-video')"
                @click.prevent="videoShow"
        >
          <svg-icon name="movie" class="extra-icon-mobile" role="img" :aria-label="$t('utils.video')" />
        </button>
      </nav>
      <div class="extra-toolbar-desktop overflow-y-scroll overflow-x-hidden flex flex-wrap" :class="{'justify-center items-center ': activeExtra.length === 0, 'active': activeMenu}">
        <template v-if="pictureActive">
          <picture v-for="(img, idx) in object.pictures" :key="img.id" class="extra extra-picture" role="img">
            <source :srcset="img.picture.thumbnail_webp" type="image/webp">
            <img :alt="i18nAttr(img, 'title')"
                 :src="img.picture.thumbnail_jepg"
                 loading="lazy"
                 class="extra extra-picture"
                 tabindex="0"
                 role="button"
                 type="image/jpeg"
                 @click="setCurrent(img, idx)"
            >
          </picture>
          <span v-if="object.pictures.length === 0" class="italic text-gray-700 text-opacity-50">
            {{ empty }}
          </span>
        </template>
        <template v-else>
          <iframe v-for="el in object.videos"
                  :key="el.id"
                  :src="urlVideo(el.video)" frameborder="0"
                  class="extra extra-picture"
                  loading="lazy"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
          />
          <span v-if="object.videos.length === 0" class="italic text-gray-700 text-opacity-50">
            {{ empty }}
          </span>
        </template>
      </div>
    </div>
    <lazy-gallery-detail-picture v-if="pictureActive && object.pictures.length!==0"
                                 :object="current"
                                 :idx="currentIdx"
                                 :length="object.pictures.length"
                                 @close="removeCurrent"
                                 @next="nextDetail"
                                 @prev="prevDetail"
    />
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
      activeMenu: false,
      parent: null
    }
  },

  computed: {
    pictureActive () {
      return this.active === active.PICTURE
    },
    videoActive () {
      return this.active === active.VIDEO
    },
    activeExtra() {
      if (this.pictureActive) {
        return this.object.pictures
      } else {
        return this.object.videos
      }
    }
  },

  beforeMount() {
    if (process.client) {
      this.parent = document.getElementById("layout-contents")
    }
  },

  methods: {
    toogleActive () {
      this.activeMenu = !this.activeMenu
    },
    pictureShow () {
      this.active = active.PICTURE
    },
    videoShow () {
      this.active = active.VIDEO
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
      transform: scale(1.05);
    }
  }
}

.fix-mobile {
  display: none;
  height: 50px;
  width: 100%;
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
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: white;
    &.active {
      height: 70vh;
    }
  }

  .fix-mobile {
    display: block;
  }

  .extra-toolbar-desktop {
    flex-direction: row;
    display: none;
    & > .extra-btn {
      width: 50%;
      height: auto;
    }
    &.active {
      display: flex;
    }
  }
  .extra-icon-mobile {
    width: inherit;
    height: 3em;
  }
}

</style>
