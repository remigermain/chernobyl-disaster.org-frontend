<template>
  <div id="gallery-picture" class="grid-picture" @scroll="scroll">
    <gallery-infinite-loading ref="prevLoading" parent="gallery-picture" :completed="hasPrev" @visible="prevPage()">
      <template v-slot:completed>
        &nbsp;
      </template>
    </gallery-infinite-loading>
    <img v-for="(el, idx) in object" :key="el.id" class="picture-item" :alt="el.title" :src="el.picture.thumbnail" loading="lazy" @click="setCurrent(el, idx)">
    <lazy-gallery-detail-picture :object="current"
                                 :idx="currentIdx"
                                 :length="length"
                                 @close="current = null"
                                 @next="nextDetail"
                                 @prev="prevDetail"
    />
    <gallery-infinite-loading ref="nextLoading" parent="gallery-picture" :completed="completed" @visible="nextPage()" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import isNil from "lodash/isNil"
import galleryUrl from "@/lib/gallery"

export default {
  name: "GalleryPicture",

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    return app.$axios.get(`picture/?page=${route.query.page || 1}${galleryUrl(route.query)}`)
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
        }
        return {
          object: response.data.results,
          length: response.data.count,
          completed: isNil(response.data.next)
        }
      })
  },

  data () {
    return {
      model: "picture",
      current: null,
      currentIdx: -1,
    }
  },

  created() {
    if (!isNil(this.$route.query.detail)) {
      const idx = parseInt(this.$route.query.detail) - 1
      if (this.object.length >= this.$route.query.detail) {
        this.setCurrent(this.object[idx], idx)
      } else {
        const query = this.$route.query
        delete query.detail
        this.$router.push({query})
      }
    }
  },
  mounted() {
    if (process.client) {
      this.scroll()
    }
  },

  methods: {
    scroll () {
      this.$refs.nextLoading.isVisible()
      this.$refs.prevLoading.isVisible()
    },
    setCurrent (current, idx) {
      this.current = current
      this.currentIdx = idx
    },
    nextDetail () {
      if (this.length - 1 > this.currentIdx) {
        if (this.object.length - 1 > this.currentIdx) {
          this.setCurrent(this.object[this.currentIdx + 1], this.currentIdx + 1)
        } else {
          //this.nextPage()
        }
      }
    },
    prevDetail () {
      if (this.currentIdx > 0) {
        this.setCurrent(this.object[this.currentIdx - 1], this.currentIdx - 1)
      }
    },
  }
}
</script>


<style lang="scss" scoped>
.grid-picture {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden scroll;
}

.picture-item {
  width: 20%;
  height: auto;
  padding: 5px;
  cursor: pointer;
  overflow: hidden;
  transition: transform .4s, width 1s, height  1s;
  object-fit: cover;
  &:hover {
    transform: scale(105%);
  }
}

@media screen and (max-width: 1250px){
  .picture-item {
    width: 25%;
  }
}

@media screen and (max-width: 650px){
  .picture-item {
    width: 50%;
  }
}

@media screen and (max-width: 470px){
  .picture-item {
    width: 100%;
  }
}

.picture-infinite {
  grid-column: span 10;
  grid-row: span 2;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
