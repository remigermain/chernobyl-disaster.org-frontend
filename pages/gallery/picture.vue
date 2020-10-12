<template>
  <gallery-template :length="length" :page="page" :completed="completed" @next="nextPage">
      {{ completed }}
      <picture v-for="(el, index) in object" :key="el.id" role="img" class="picture-item">
        <source :srcset="$media(el.picture.thumbnail_webp)" type="image/webp">
        <img class="w-full h-full object-cover"
             :src="$media(el.picture.thumbnail_jpeg)"
             loading="lazy"
             role="image"
             type="image/jpeg"
             @click="setCurrent(el, index)"
        >
      </picture>
      <template #extra>
        <lazy-gallery-detail-picture
          v-if="current"
          :object="current"
          :idx="idx"
          :length="length"
          @close="current = null"
          @next="next"
          @prev="prev"
        />
      </template>

  </gallery-template>

</template>

<script>
// import galleryMixin from "~/mixins/page/gallery"
import { toUrl } from "~/lib/utils"
// import { convertImageUrl } from "~/lib/contribute"

export default {
  name: "GalleryPicture",


  scrollToTop: true,

  asyncData({app, route, store}) {
    return app.$axios.get(toUrl("picture/", {...route.query, page: 1}))
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }

        return {
          object: response.data.results,
          length: response.data.count,
          completed: !response.data.next
        }
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return { object: [], length: 0, completed: true }
      })
  },

  data () {
    return {
      page: 1,
      current: null,
      idx: -1,
      inFetch: false
    }
  },

  head () {
    const title = this.$t("menu.picture")
    const description = this.$t("description.picture")
    return {
      title,
      meta: [
          { hid: "description", name: "description", content: description },
          { property: "og:title", content: title},
          { property: "og:description", content: description},
          { name: "twitter:card", content: description },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: description },
          { name: "twitter:image:alt", content: title }
      ]
    }
  },

  methods: {
    setCurrent (current, idx) {
      this.current = current
      this.idx = idx
    },
    refresh () {
      this.inFetch = true
      this.$axios.get(toUrl("picture/", {...this.$route.query, page: this.page}))
        .then(r => {
          if (r.status !== 200) {
            throw new Error("errer-server")
          }
          this.object = [...this.object, ...r.data.results]
          this.length = r.data.count
          this.completed = !r.data.next
        })
        .catch(this.responseError)
        .finally(() => { this.inFetch = false })
    },
    nextPage () {
      console.log("nextpage", this.completed, this.inFetch)
      if (!this.completed && !this.inFetch) {
        this.page += 1
        this.refresh()
      }
    }

  },

}
</script>
