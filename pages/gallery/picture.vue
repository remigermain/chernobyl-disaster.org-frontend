<template>
  <div class="wrapper">
    <img v-for="el in object" :key="el.id"
         :alt="el.title"
         :src="el.picture"
         class="picture-item"
         loading="lazy"
         @click="setDetail(el)"
    >
    <gallery-img-detail v-if="currentObject" :current-object="currentObject" @close="currentObject = null" />
    <extra-infinite-loading class="w-full" :identifier="uniqueId" @infinite="refresh" />
  </div>
</template>

<script>
import galleryMixin from "@/mixins/gallery"
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

<style lang="scss">

.picture-item {
  object-fit: cover;
  padding: 5px;
  cursor: pointer;
  transition: transform .2s;
  &:hover {
    transform: scale(1.1);
  }
}


@screen md {
  .picture-item  {
    width: 250px;
    height: 250px;
  }
}



@screen -md {
  .picture-item {
    width: 150px;
    height: 150px;
  }
}


</style>
