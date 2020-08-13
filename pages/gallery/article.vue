<template>
  <div class="grid-article">
    <article v-for="el in object" :key="el.id" class="article-item shadow flex flex-col">
      <span class="w-full h-full text-center pt-4">
        {{ i18nAttr(el, 'title') }}
      </span>
      <a :href="el.link" class="w-full h-12 text-center bg-gray-300" target="_blank" rel="noopener">
        <span class="article-link block">
          {{ $t('global.link') }}
          <icon-link />
        </span>
      </a>
    </article>
    <extra-infinite-loading class="article-infinite" :identifier="uniqueId" @infinite="refresh" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import iconLink from "@/assets/svg/external-link.svg"
import isEmpty from "lodash/isEmpty"
import isNil from "lodash/isNil"

export default {

  components: {
    iconLink
  },

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    const query = (isEmpty(route.query) ? "" : `&search=${route.query.search}&order=${route.query.order}`)
    return app.$axios.get(`article/?page=1${query}`)
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
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}

.article-infinite {
  grid-column: span 4;
  grid-row: span 2;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
