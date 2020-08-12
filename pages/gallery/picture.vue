<template>
  <div class="grid-picture">
    <div v-for="el in object" :key="el.id" class="picture-item">
      <img :alt="el.title" :src="el.picture" loading="lazy">
    </div>
    <lazy-extra-infinite-loading class="picture-infinite" :identifier="uniqueId" @infinite="refresh" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/page/gallery"
import _ from "lodash"

export default {

  mixins: [
    galleryMixin
  ],

  asyncData({app, route}) {
    const query = (_.isEmpty(route.query) ? "" : `&search=${route.query.search}&order=${route.query.order}`)
    return app.$axios.get(`picture/?page=1${query}`)
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
      model: "picture"
    }
  },
}
</script>


<style lang="scss" scoped>
.grid-picture {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}

.picture-item {
  height: auto;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  img {
    transition: transform .4s;
    width: inherit;
    height: inherit;
    object-fit: cover;
    &:hover {
      margin:auto;
      transform: scale(105%);
    }
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

</style>
