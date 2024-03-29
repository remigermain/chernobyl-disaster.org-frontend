<template>
  <div class="grid-picture" @scroll="scroll">
    <div class="flex w-full flex-wrap justify-around">
      <span
        v-for="(_, idx) in inPrev"
        :key="`skeleton-prev-${idx}`"
        class="picture-item skeleton"
      />
      <gallery-infinite-loading
        v-if="hasPrevPage"
        ref="prevLoading"
        position="top"
        class="picture-item skeleton"
        @visible="nextPage"
      />
      <button
        v-for="(el, idx) in object"
        :key="el.id"
        type="button"
        class="picture-item"
        @click="setCurrent(el, idx)"
      >
        <picture role="img">
          <source
            :srcset="$media(el.picture.thumbnail_webp)"
            type="image/webp"
          />
          <img
            class="w-full h-full object-cover"
            :src="$media(el.picture.thumbnail_jpeg)"
            :alt="i18nAttr(el, 'title')"
            loading="lazy"
            type="image/jpeg"
          />
        </picture>
      </button>
      <gallery-infinite-loading
        v-if="!completed"
        ref="nextLoading"
        position="bottom"
        class="picture-item skeleton"
        @visible="nextPage"
      />
      <span
        v-for="(_, idx) in inNext"
        :key="`skeleton-next-${idx}`"
        class="picture-item skeleton"
      />
    </div>
    <span
      v-if="object.length === 0"
      class="italic text-gray-900 dark:text-gray-300 text-opacity-75 leading-3 text-xl w-full h-full flex justify-center items-center animate-pulse"
    >
      {{ this.$t('word.empty') }}
    </span>
    <lazy-gallery-detail-picture
      v-if="current"
      :object="convertCurrent"
      :idx="currentIdx"
      :length="length"
      :to-edit="toEdit"
      @close="current = null"
      @next="nextDetail"
      @prev="prevDetail"
    />
  </div>
</template>

<script>
import galleryMixin from '~/mixins/page/gallery'
import { asynDataUrl } from '~/lib/gallery'
import { convertImageUrl } from '~/lib/contribute'

export default {
  name: 'GalleryPicture',

  mixins: [galleryMixin],

  scrollToTop: true,

  asyncData({ app, route, store }) {
    return app.$axios
      .get(asynDataUrl('picture', route.query))
      .then(response => {
        if (response.status !== 200) {
          throw new Error('error-server')
        }

        return {
          object: response.data.results,
          length: response.data.count,
          completed: !response.data.next
        }
      })
      .catch(error => {
        store.commit('ERROR_SERVER', error.message || error)
        return { object: [], length: 0, completed: true }
      })
  },

  data() {
    return {
      model: 'picture',
      current: null,
      currentIdx: -1
    }
  },

  head() {
    const title = this.$t('menu-name.picture')
    const description = this.$t('description.gallery-pictures')
    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'twitter:card', content: description },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image:alt', content: title }
      ]
    }
  },

  computed: {
    convertCurrent() {
      const newCurrent = { ...this.current.picture }
      convertImageUrl(newCurrent, this.$media)
      return newCurrent
    },
    toEdit() {
      return { name: 'contribute-picture-id', params: { id: this.current.id } }
    }
  },

  methods: {
    setCurrent(current, idx) {
      this.current = current
      this.currentIdx = idx
    },
    nextDetail() {
      /*
       **  set the next detail of image or refresh the next page and set the next object
       */
      if (this.length - 1 > this.currentIdx) {
        if (this.object.length - 1 > this.currentIdx) {
          this.setCurrent(this.object[this.currentIdx + 1], this.currentIdx + 1)
        } else {
          this.nextPage().then(() => {
            this.setCurrent(
              this.object[this.currentIdx + 1],
              this.currentIdx + 1
            )
          })
        }
      }
    },
    prevDetail() {
      /*
       ** same has nextDetail but for previous object
       */
      if (!this.hasPrevPage && this.currentIdx === 0) {
        this.prevPage().then(() => {
          this.setCurrent(this.object[this.currentIdx - 1], this.currentIdx - 1)
        })
      } else if (this.currentIdx > 0) {
        this.setCurrent(this.object[this.currentIdx - 1], this.currentIdx - 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-picture {
  width: 100%;
  overflow: hidden scroll;
}

@media screen and (max-width: 840px) {
  .grid-picture {
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
    @apply animate-pulse;
    @apply bg-gray-400;
  }
  &:not(.skeleton) {
    transition: transform 0.4s, width 1s, height 1s;
    cursor: pointer;
    object-fit: cover;
    &:hover {
      transform: scale(1.05);
    }
  }
}

@media screen and (max-width: 1250px) {
  .picture-item {
    width: 25%;
  }
}

@media screen and (max-width: 650px) {
  .picture-item {
    width: 50%;
  }
}

@media screen and (max-width: 470px) {
  .picture-item {
    width: 100%;
  }
}

.img-enter-active,
.img-leave-active {
  transition: all 1s;
}
.img-enter,
.img-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
