<template>
  <div class="grid-document" @scroll="scroll">
    <gallery-infinite-loading ref="prevLoading" position="lower" :completed="hasPrevPage" @visible="prevPage">
      <template v-slot:completed>
        &nbsp;
      </template>
    </gallery-infinite-loading>
    <div class="grid-content">
      <article v-for="el in object" :key="el.id" class="document-item shadow flex flex-col">
        <span class="w-full h-full text-center pt-4">
          {{ i18nAttr(el, 'title') }}
        </span>
        <a :href="el.doc" class="w-full h-12 text-center bg-gray-300" target="_blank" rel="noopener">
          <span class="document-link block">
            {{ $t('utils.link') }}
            <icon-file-download />
          </span>
        </a>
      </article>
    </div>
    <gallery-infinite-loading ref="nextLoading" position="upper" :completed="completed" @visible="nextPage" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import iconFileDownload from "@/assets/svg/file-download.svg"
import isNil from "lodash/isNil"
import { asynDataUrl } from "@/lib/gallery"

export default {
    name: "GalleryDocument",

  components: {
    iconFileDownload
  },

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    return app.$axios.get(asynDataUrl("document", route.query))
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
      model: "document"
    }
  },
}
</script>

<style lang="scss" scoped>

.grid-document {
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
