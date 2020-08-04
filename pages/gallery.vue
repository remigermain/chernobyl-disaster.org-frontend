<template>
  <div class="parent-gallery">
    <gallery-toolbar @sort="sortBy" @search="search" />
    <div class="grid-gallery">
      <img v-for="el in listPictures" :key="el.id"
           class="image-gallery shadow-lg"
           :src="StaticApiLink(el.picture)"
           title="el.title" alt="el.title" loading="lazy"
           @click="showPicture(el)"
      >
      <p v-if="listPictures.length == 0">
        {{ $t('global.no-result') }}
      </p>
    </div>
    <div v-if="current" class="photo-preview" @click="hidePicture()">
      <icon-circle-x class="photo-preview-close" @click="hidePicture()" />
      <h2 class="photo-preview-title">
        {{ i18nAttr(current, 'title') }}
      </h2>
      <img :src="StaticApiLink(current.picture)"
           class="photo-preview-img"
           title="el.title" alt="el.title" loading="lazy"
           @click.stop=""
      >
    </div>
  </div>
</template>

<script>
import iconCircleX from "@/assets/svg/circle-x.svg"

export default {

  components: {
    iconCircleX,
  },

  async asyncData({ app, }) {
    const response = await app.$axios.get("picture/?no_page=true")
    if (response.status === 200) {
      const list = response.data
      list.forEach(element => {
        element.created = new Date(element.created)
        element.updated = new Date(element.updated)
        if (element.date) {
          element.date = new Date(element.date)
        }
      })
      return {
        pictures: list,
        listPictures: list
      }
    }
    return {
      errors: true,
      pictures: [],
    }
  },

  data () {
    return {
      current: null,
    }
  },

  methods: {
    sortBy(sortFnc) {
      this.listPictures.sort(sortFnc)
    },
    search (value) {
      this.listPictures = this.pictures.filter(el => {
        // title
        if (el.title.includes(value)) {
          return true
        }
        // tags
        if (el.tags.filter(tag => {
            if (tag.name.includes(value)) {
              return true
            }
            // tags langs
            return tag.langs.filter(tagLang => tagLang.name.includes(value)).length > 0
          }).length > 0)
        {
          return true
        }
        // title lang
        if (el.langs.filter(lang => lang.title.includes(value)).length > 0) {
          return true
        }
        return false
      })
    },
    showPicture (el) {
      this.current = el
    },
    hidePicture () {
      this.current = null
    }
  },

}
</script>

<style lang="scss">
.parent-gallery {
  grid-area: 2 / 1 / 6 / 6;
  .grid-gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow: hidden;
    & .image-gallery {
      padding: 3px;
      width: 300px;
      object-fit: cover;
      cursor: pointer;
      &:not(.active):hover {
        transform: scale(1.2);
        box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.39);
      }
      &.active {
        position: fixed;
        z-index: 30;
        top: 0;
        left: 0;
        padding: 30px;
        width: 100%;
      }
    }
  }
  .photo-preview {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 40;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .photo-preview-title {
      text-transform: capitalize;
      color: white;
      font-weight: 600;
      font-size: 2em;
    }
    .photo-preview-close {
      color: white;
      cursor: pointer;
      position: absolute;
      width: 40px;
      transition: transform .4s;
      right: 0;
      top: 0;
      margin-right: 10px;
      margin-top: 10px;
      &:hover {
        transform: scale(1.2);
      }
    }
    .photo-preview-img {
      z-index: 50;
      max-height: 80vh;
    }
  }
}


</style>
