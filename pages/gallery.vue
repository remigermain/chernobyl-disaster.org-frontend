<template>
  <div class="parent-gallery">
    <div class="gallery-toolbar px-10 py-3 flex justify-center items-center h-inherit w-inherit">
      <div class="w-2/4">
        <utils-field v-model="searchValue" @input="search">
          <template v-slot:label>
            {{ $t('global.search') }}
          </template>
          <template v-slot:icon>
            <icon-search />
          </template>
        </utils-field>
      </div>
      <div class="w-2/4 flex flex-col justify-center items-center select-parent">
        <div class="relative sort-set rounded-lg">
          <span class="p-2 opacity-50 italic text-sm">
            <span class="text-xl">
              {{ $t("global.sort-by") }}
            </span>
            {{ currentSort ? currentSort.name : "" }}
          </span>
          <icon-selector class="opacity-50" />
          <ul class="sort-list absolute bg-white rounded-lg p-2">
            <li v-for="sort in sortList" :key="sort.name" class="link cursor-pointer" @click="sort.fnc()">
              {{ sort.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="grid-gallery">
      <img v-for="el in listPictures" :key="el.id"
           class="image-gallery shadow-lg"
           :src="StaticApiLink(el.picture)"
           title="el.title" alt="el.title" loading="lazy"
           @click="showPicture(el)"
      >
    </div>
    <div v-if="current" class="photo-preview" @click="hidePicture()">
      <icon-circle-x class="photo-preview-close" @click="hidePicture()" />
      <h2 class="photo-preview-title">
        {{ getValLang(current, 'title') }}
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
import iconSearch from "@/assets/svg/search.svg"
import iconSelector from "@/assets/svg/selector.svg"


export default {
  components: {
    iconCircleX,
    iconSearch,
    iconSelector
  },
  async asyncData({ app, }) {
    const response = await app.$axios.get("picture/")
    if (response.status === 200) {
      const list =response.data
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
      searchValue: "",
      currentSort: null,
      sortList: [
        {name: this.$t("global.date"), fnc: this.sortByDate},
        {name: this.$t("global.created"), fnc: this.sortByCreated},
      ]
    }
  },
  computed: {
    haveCurrent () {
      return this.current != null
    }
  },
  methods: {
    sortByDate() {
      this.listPictures.sort((el1, el2) => el1.date > el2.date)
      this.currentSort = this.sortList[0]

    },
    sortByCreated() {
      this.listPictures.sort((el1, el2) => el1.created > el2.created)
      this.currentSort = this.sortList[1]
    },
    search () {
      this.listPictures = this.pictures.filter(el => {
        // title
        if (el.title.includes(this.searchValue)) {
          return true
        }
        // tags
        if (el.tags.filter(tag => {
            console.log(tag.name)
            if (tag.name.includes(this.searchValue)) {
              return true
            }
            // tags langs
            return tag.langs.filter(tagLang => tagLang.name.includes(this.searchValue)).length > 0
          }).length > 0)
        {
          return true
        }
        // title lang
        if (el.langs.filter(lang => lang.title.includes(this.searchValue)).length > 0) {
          return true
        }
        return false
      })
    },
    showPicture (el) {
      this.current = el
    },
    hidePicture () {
      console.log("hidePicture () {")
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


.sort-set {
  svg {
    transition: opacity .2s;
  }
  &:hover {
    svg {
      opacity: .8;
    }
    .sort-list {
      visibility: visible;
    }
  }
}

.sort-list {
  visibility: hidden;
}
</style>
