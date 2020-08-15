<template>
  <div class="grid-document">
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
    <extra-infinite-loading class="document-infinite" :identifier="uniqueId" @infinite="refresh" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import iconFileDownload from "@/assets/svg/file-download.svg"
import isEmpty from "lodash/isEmpty"
import isNil from "lodash/isNil"

export default {
    name: "GalleryDocument",

  components: {
    iconFileDownload
  },

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    const query = (isEmpty(route.query) ? "" : `&search=${route.query.search}&ordering=${route.query.ordering}`)
    return app.$axios.get(`document/?page=1${query}`)
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
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}

.document-infinite {
  grid-column: span 4;
  grid-row: span 2;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
