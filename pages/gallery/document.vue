<template>
  <div class="wrapper">
    <article v-for="el in object" :key="el.id" class="document-item shadow flex flex-col">
      <span class="w-full h-full text-center pt-4">
        {{ i18nAttr(el, 'title') }}
      </span>
      <a :href="el.doc" class="w-full h-12 text-center bg-gray-300" target="_blank" rel="noopener">
        <span class="document-link block">
          {{ $t('global.link') }}
          <icon-file-download />
        </span>
      </a>
    </article>
    <extra-infinite-loading class="w-full" :identifier="uniqueId" @infinite="refresh" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/gallery"
import iconFileDownload from "@/assets/svg/file-download.svg"
import _ from "lodash"

export default {

  components: {
    iconFileDownload
  },

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    const query = (_.isEmpty(route.query) ? "" : `&search=${route.query.search}&order=${route.query.order}`)
    return app.$axios.get(`document/?page=1${query}`)
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
        }
        return {
          object: response.data.results,
          completed: _.isNil(response.data.next)
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

<style lang="scss">

.document-link {
  object-fit: cover;
  padding: 5px;
  cursor: pointer;
  transition: transform .2s;
  &:hover {
    transform: scale(1.1);
  }
}


@screen md {
  .document-item  {
    width: 250px;
    height: 100px;
  }
}



@screen -md {
  .document-item {
    width: 150px;
    height: 50px;
  }
}


</style>
