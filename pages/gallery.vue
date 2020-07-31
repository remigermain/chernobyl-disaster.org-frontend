<template>
  <div class="grid-gallery flex flex-wrap">
    <span v-for="el in pictures" :key="el.id"
          :class="{'active': pictureActive == el.id }"
          @click="hidePicture(el.id)"
    >
      <img loading="lazy" :src="StaticApiLink(el.picture)" :title="el.title" alt:="el.title"
           @click.stop="showPicture(el.id)"
      >
    </span>
  </div>
</template>

<script>
i
export default {
  async asyncData({ app, }) {
    const response = await app.$axios.get("picture/")
    if (response.status === 200) {
      return {
        pictures: response.data
      }
    }
    return {
      errors: true,
      pictures: []
    }
  },
  data () {
    return {
      pictureActive: 0
    }
  },
  methods : {
    test () {
      this.$axios.get("picture/")
        .then(response => {
          console.log(response)
        })
    },
    showPicture (id) {
      if (this.pictureActive) {
        this.hidePicture()
      } else {
        this.pictureActive = id
      }
    },
    hidePicture () {
      console.log("hidePicture () {")
      this.pictureActive = 0
    }
  },

}
</script>

<style lang="scss">
.grid-gallery {
  grid-area: 2 / 1 / 6 / 6;
  justify-content: center;
  & span {
    & > img {
      cursor: pointer;
      transition: transform .2s;
      object-fit: cover;
      max-width: 300px;
    }
    &:not(.active):hover {
      transform: scale(1.1);
    }
    &.active {
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.555);
      & > img {
        max-width: 90%;
      }
    }
  }
}
</style>
