<template>
  <div class="grid-document" @scroll="scroll">
    <gallery-infinite-loading ref="prevLoading" position="lower" :completed="hasPrevPage" @visible="prevPage">
      <template v-slot:completed>
        &nbsp;
      </template>
    </gallery-infinite-loading>
    <div class="grid-content">
      <article v-for="el in object" :key="el.id" class="article-item shadow flex flex-col">
        <span class="w-full h-full text-center pt-4">
          {{ i18nAttr(el, 'title') }}
        </span>
        <a :href="el.link" class="w-full h-12 text-center bg-gray-300" target="_blank" rel="noopener">
          <span class="article-link block">
            {{ $t('utils.link') }}
            <icon-link />
          </span>
        </a>
      </article>
    </div>
    <gallery-infinite-loading ref="nextLoading" position="upper" :completed="completed" @visible="nextPage" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import isNil from "lodash/isNil"
import { asynDataUrl } from "@/lib/gallery"

export default {
    name: "GalleryDocument",

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    return app.$axios.get(asynDataUrl("article", route.query))
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
        }
        return {
          object: response.data.results,
          completed: isNil(response.data.next)
        }
      })
  },

  data () {
    return {
      model: "article"
    }
  },
}
</script>

<style lang="scss" scoped>

.grid-article {
  width: 100%;
  overflow: hidden scroll;
}

.grid-content {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}
</style>
