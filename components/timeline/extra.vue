<template>
  <div class="wrapper">
    <div class="fix-mobile" />
    <div
      class="shadow-lg grid-extra overflow-hidden w-full h-full timeline:rounded-lg"
      :class="{ active: activeMenu }"
    >
      <div
        class="extra-toolbar-mobile bg-gray-800 w-full flex justify-around"
        @click="toogleActive"
      >
        <span class="ml-6 w-2/4 capitalize">
          {{ $t('menu-name.medias') }}
        </span>
        <span class="mr-6 text-right w-2/4">
          <svg-icon
            name="arrow-up"
            class="extra-toolbar-mobile-icon"
            :class="{ active: activeMenu }"
          />
        </span>
      </div>
      <nav
        class="extra-toolbar-desktop flex justify-around items-center flex-col bg-gray-800 text-white text-center md:border-r-8 md:border-blue-800 md:rounded-l-lg md:rounded-b-lg"
        :class="{ active: activeMenu }"
      >
        <button
          type="button"
          class="w-full h-2/4 px-4 extra-btn"
          :class="{
            'timeline:bg-gray-800 -timeline:bg-gray-900': pictureActive,
            'timeline:bg-gray-900 -timeline:bg-gray-800': !pictureActive
          }"
          :title="$t('text.goto-picture')"
          @click.prevent="pictureShow"
        >
          <svg-icon
            name="photo"
            class="extra-icon-mobile"
            role="img"
            :aria-label="$t('menu-name.picture')"
          />
        </button>
        <button
          type="button"
          class="w-full h-2/4 px-4 extra-btn timeline:rounded-b-lg"
          :class="{
            'timeline:bg-gray-800 -timeline:bg-gray-900': videoActive,
            'timeline:bg-gray-900 -timeline:bg-gray-800': !videoActive
          }"
          :title="$t('text.goto-video')"
          @click.prevent="videoShow"
        >
          <svg-icon
            name="movie"
            class="extra-icon-mobile"
            role="img"
            :aria-label="$t('menu-name.video')"
          />
        </button>
      </nav>
      <div class="extra-toolbar-desktop overflow-y-scroll overflow-x-hidden">
        <div
          class="flex flex-wrap"
          :class="{
            'justify-center items-center h-full w-full':
              activeExtra.length === 0,
            'h-min': activeExtra.length >= 1
          }"
        >
          <template v-if="pictureActive">
            <button
              v-for="(img, idx) in object.pictures"
              :key="img.id"
              type="button"
              @click="setCurrent(img, idx)"
            >
              <picture class="extra extra-picture" role="img">
                <source
                  :srcset="img.picture.thumbnail_webp"
                  type="image/webp"
                />
                <img
                  :alt="i18nAttr(img, 'title')"
                  :src="img.picture.thumbnail_jpeg"
                  loading="lazy"
                  class="w-full h-full object-cover"
                  type="image/jpeg"
                />
              </picture>
            </button>
          </template>
          <template v-else>
            <gallery-video-preview
              v-for="el in object.videos"
              :key="el.id"
              :object="el"
              :link="el.video"
              :mini="true"
              class="extra extra-picture w-full"
            />
          </template>
          <span
            v-if="activeExtra.length === 0"
            class="italic text-gray-700 dark:text-gray-500 text-opacity-50 empty"
          >
            {{ this.$t('word.empty') }}
          </span>
        </div>
      </div>
    </div>
    <lazy-gallery-detail-picture
      v-if="pictureActive && current"
      :object="current.picture"
      :idx="currentIdx"
      :length="object.pictures.length"
      :alt="i18nAttr(current, 'title')"
      :to-detail="{ name: 'contribute-picture-id', params: { id: current.id } }"
      @close="removeCurrent"
      @next="nextDetail"
      @prev="prevDetail"
    />
  </div>
</template>

<script>
const active = Object.freeze({
  PICTURE: 1,
  VIDEO: 2
})

export default {
  props: {
    object: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      active:
        !this.object.pictures.length && this.object.videos.length
          ? active.VIDEO
          : active.PICTURE,
      current: null,
      currentIdx: 0,
      activeMenu: false,
      parent: null
    }
  },

  computed: {
    pictureActive() {
      return this.active === active.PICTURE
    },
    videoActive() {
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

  watch: {
    object(newObject) {
      this.active =
        !newObject.pictures.length && newObject.videos.length
          ? active.VIDEO
          : active.PICTURE
    }
  },

  beforeMount() {
    if (process.client) {
      this.parent = document.getElementById('layout-contents')
    }
  },

  methods: {
    urlVideo(src) {
      return src.replace('watch?v=', 'embed/')
    },
    toogleActive() {
      this.activeMenu = !this.activeMenu
    },
    pictureShow() {
      this.active = active.PICTURE
    },
    videoShow() {
      this.active = active.VIDEO
    },
    setCurrent(current, idx) {
      this.current = current
      this.currentIdx = idx
    },
    removeCurrent() {
      this.current = null
      this.currentIdx = 0
    },
    nextDetail() {
      if (this.object.pictures.length - 1 > this.currentIdx) {
        this.setCurrent(
          this.object.pictures[this.currentIdx + 1],
          this.currentIdx + 1
        )
      }
    },
    prevDetail() {
      if (this.currentIdx > 0) {
        this.setCurrent(
          this.object.pictures[this.currentIdx - 1],
          this.currentIdx - 1
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-extra {
  display: grid;
  grid-template-columns: auto 1fr;
  @apply border-t-8;
  @apply border-gray-800;
}

.extra {
  width: 10%;
  height: 80px;
  padding: 0.2rem;
  &.extra-picture {
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.4s;
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

@media screen and (max-width: 1350px) {
  .extra {
    width: 14%;
  }
}

@media screen and (max-width: 950px) {
  .extra {
    width: 20%;
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
  transition: transform 0.5s;
  &.active {
    transform: rotate(-180deg);
  }
}

@media screen and (max-width: 850px) {
  .extra-toolbar-mobile {
    display: flex;
  }
  .grid-extra {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto 1fr;
    transition: height 0.6s;
    height: 60px;
    border-top-width: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    &.active {
      height: 70vh;
    }
  }

  .fix-mobile {
    display: block;
  }

  .extra-toolbar-desktop {
    flex-direction: row;
    display: flex;
    height: max-content;
    background-color: white;
    height: 100%;
    max-height: calc(70vh - 60px - 48px);
    & > .extra-btn {
      width: 50%;
      height: auto;
    }
  }
  .dark .extra-toolbar-desktop {
    @apply bg-gray-900;
  }
  .extra-icon-mobile {
    width: inherit;
    height: 3em;
  }
}
</style>
