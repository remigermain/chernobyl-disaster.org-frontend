<template>
  <div class="grid-picture">
    <img v-for="el in object" :key="el.id" class="picture-item" :alt="el.title" :src="el.picture" loading="lazy" @click="current = el">
    <lazy-gallery-detail-picture v-if="current" :object="current" @close="current = null" />
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
      current: null
    }
  },
}
</script>


<style lang="scss" scoped>
.grid-picture {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}

.picture-item {
  height: 100%;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  transition: transform .4s;
  object-fit: cover;
  &:hover {
    margin:auto;
    transform: scale(105%);
  }
}

.picture-item:nth-of-type(13n + 1),
.picture-item:nth-of-type(13n + 5),
.picture-item:nth-of-type(13n + 10) {
  grid-column: span 4;
  grid-row: span 2;
}

.picture-item:nth-of-type(13n + 2) {
  grid-column: span 6;
  grid-row: span 3;
}

.picture-item:nth-of-type(13n + 3),
.picture-item:nth-of-type(13n + 4),
.picture-item:nth-of-type(13n + 6),
.picture-item:nth-of-type(13n + 7),
.picture-item:nth-of-type(13n + 8),
.picture-item:nth-of-type(13n + 9),
.picture-item:nth-of-type(13n + 11),
.picture-item:nth-of-type(13n + 12),
.picture-item:nth-of-type(13n + 13){
  grid-column: span 2;
}

.picture-infinite {
  grid-column: span 10;
  grid-row: span 2;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 500px){
  .picture-item:nth-of-type(4n + 1),
  .picture-item:nth-of-type(4n + 4) {
    grid-column: span 6;
    grid-row: span 5;
  }
  .picture-item:nth-of-type(4n + 2),
  .picture-item:nth-of-type(4n + 3) {
    grid-column: span 4;
    grid-row: span 5;
  }

}


</style>
