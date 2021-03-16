<template>
  <div class="grid-video" @scroll="scroll">
    <div class="flex w-full flex-wrap justify-around">
      <span
        v-for="(_, idx) in inPrev"
        :key="`skeleton-prev-${idx}`"
        class="video-item skeleton"
      />
      <gallery-infinite-loading
        v-if="hasPrevPage"
        ref="prevLoading"
        position="top"
        class="video-item skeleton"
        @visible="nextPage"
      />

      <gallery-video-preview
        v-for="el in object"
        :key="el.id"
        class="video-item p-2"
        :link="el.video"
        :object="el"
      />

      <gallery-infinite-loading
        v-if="!completed"
        ref="nextLoading"
        position="bottom"
        class="video-item skeleton"
        @visible="nextPage"
      />
      <span
        v-for="(_, idx) in inNext"
        :key="`skeleton-next-${idx}`"
        class="video-item skeleton"
      />
    </div>
    <span
      v-if="object.length === 0"
      class="italic text-gray-900 dark:text-gray-300 text-opacity-75 leading-3 text-xl w-full h-full flex justify-center items-center animate-pulse"
    >
      {{ this.$t('word.empty') }}
    </span>
  </div>
</template>

<script>
import galleryMixin from '~/mixins/page/gallery'
import { asynDataUrl } from '~/lib/gallery'

export default {
  name: 'GalleryVideo',

  mixins: [galleryMixin],

  scrollToTop: true,

  asyncData({ app, route, store }) {
    return app.$axios
      .get(asynDataUrl('video', route.query))
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
        return { object: [], completed: true }
      })
  },

  data() {
    return {
      model: 'video'
    }
  },

  head() {
    const title = this.$t('menu-name.video')
    const description = this.$t('description.gallery-videos')
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
  }
}
</script>

<style lang="scss" scoped>
.grid-video {
  overflow: hidden scroll;
}

@media screen and (max-width: 840px) {
  .grid-video {
    grid-area: 1 / 1 / 1 / 2;
  }
}

.video-item {
  width: 420px;
  height: 240px;
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
  }
}

@media screen and (max-width: 1250px) {
  .video-item {
    width: 312px;
    height: 190px;
  }
}

@media screen and (max-width: 700px) {
  .video-item {
    width: 650px;
    height: 300px;
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
