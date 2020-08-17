<template>
  <div class="grid-picture">
    <img v-for="(el, idx) in object" :key="el.id" class="picture-item" :alt="el.title" :src="el.picture" loading="lazy" @click="setCurrent(el, idx)">
    <lazy-gallery-detail-picture v-if="current"
                                 :object="current"
                                 :idx="currentIdx"
                                 :length="object.length"
                                 @close="current = null"
                                 @next="next"
                                 @prev="prev"
    />
    <lazy-extra-infinite-loading class="picture-infinite" :identifier="uniqueId" @infinite="refresh" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import isEmpty from "lodash/isEmpty"
import isNil from "lodash/isNil"

export default {
  name: "GalleryPicture",

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    const query = (isEmpty(route.query) ? "" : `&search=${route.query.search}&ordering=${route.query.ordering}`)
    return app.$axios.get(`picture/?page=1${query}`)
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
      model: "picture",
      current: null,
      currentIdx: -1
    }
  },
  methods: {
    setCurrent (current, idx) {
      this.current = current
      this.currentIdx = idx
    },
    next () {
      if (this.object.length - 1 > this.currentIdx) {
        this.setCurrent(this.object[this.currentIdx + 1], this.currentIdx + 1)
      }
    },
    prev () {
      if (this.currentIdx > 0) {
        this.setCurrent(this.object[this.currentIdx - 1], this.currentIdx - 1)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.grid-picture {
  display: flex;
  justify-content: center;
  //align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.picture-item {
  width: 20%;
  height: auto;
  padding: 5px;
  cursor: pointer;
  overflow: hidden;
  transition: transform .4s, width 1s, height  1s;
  object-fit: cover;
  // &:hover {
  //   transform: scale(105%);
  // }
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
