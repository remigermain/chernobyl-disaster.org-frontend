<template>
  <div class="gallery-toolbar">
    <div v-if="toolbarActive" class="bg-black bg-opacity-75 w-full h-full z-10 top-0 left-0 absolute md:hidden" />
    <div class="flex flex-col h-inherit md:p-4 -md:p-1 toolbar" :class="{'active -md:z-20': toolbarActive}">
      <div class="text-center bg-transparent cursor-pointer md:hidden arrow-toolbar" @click="toogleToolbar">
        <icon-arrow-down v-if="toolbarActive" class="pt-2" />
        <icon-arrow-up v-else />
      </div>
      <div class="flex bg-gray-700 rounded text-white flex-wrap">
        <extra-nuxt-link :to="{name: 'gallery-picture'}" class="w-1/4 text-center py-2 rounded-l-sm cursor-pointer toolbar-link">
          <icon-photo stroke-width="1.5" />
        </extra-nuxt-link>
        <extra-nuxt-link :to="{name: 'gallery-video'}" class="w-1/4 text-center py-2 cursor-pointer toolbar-link">
          <icon-movie stroke-width="1.5" />
        </extra-nuxt-link>
        <extra-nuxt-link :to="{name: 'gallery-document'}" class="w-1/4 text-center py-2 cursor-pointer toolbar-link">
          <icon-file stroke-width="1.5" />
        </extra-nuxt-link>
        <extra-nuxt-link :to="{name: 'gallery-article'}" class="w-1/4 text-center py-2 rounded-r-sm cursor-pointer toolbar-link">
          <icon-article stroke-width="1.5" />
        </extra-nuxt-link>
      </div>
      <div class="wrapper toolbar-item">
        <div>
          <label>
            {{ $t('global.search') }}
            <div class="flex bg-gray-400 bg-opacity-50 px-2 py-3 focus:bg-gray-300 rounded-sm shadow appearance-none leading-none">
              <icon-search class="w-20px" />
              <input v-model="searchValue" type="text" class="bg-transparent italic text-gray-800 ml-1 input-search">
            </div>
          </label>
        </div>
        <div>
          <span>
            {{ $t('global.sortby') }}
          </span>
          <select class="w-full h-10">
            <template v-for="order in orderChoices">
              <option v-if="order != orderCurrent" :key="order.value" @click="setOrder(order)">
                <span class="link text-sm cursor-pointer">
                  {{ order.label }}
                </span>
              </option>
            </template>
          </select>
        </div>
        <button class="p-2 rounded bg-blue-700 text-gray-300 hover:bg-blue-600" @click="submit">
          {{ $t('global.refresh') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import iconSearch from "@/assets/svg/search.svg"

import iconMovie from "@/assets/svg/movie.svg"
import iconPhoto from "@/assets/svg/photo.svg"
import iconFile from "@/assets/svg/file-text.svg"
import iconArticle from "@/assets/svg/news.svg"
import iconArrowUp from "@/assets/svg/arrow-up.svg"
import iconArrowDown from "@/assets/svg/arrow-down.svg"


export default {

  components: {
    iconSearch,
    iconMovie,
    iconPhoto,
    iconFile,
    iconArticle,
    iconArrowUp,
    iconArrowDown
  },

  data () {
    return {
      currentTab: null,
      orderCurrent: {},
      searchValue: "",
      toolbarActive: false,
      orderChoices: [
        {label: `${this.$t("global.create")} - ${this.$t("global.ascending")}`, value: "id"},
        {label: `${this.$t("global.create")} - ${this.$t("global.descending")}`, value: "-id"},
        {label: `${this.$t("global.date")} - ${this.$t("global.ascending")}`, value: "date"},
        {label: `${this.$t("global.date")} - ${this.$t("global.descending")}`, value: "-date"},
        {label: `${this.$t("global.title")} - ${this.$t("global.title")}`, value: "title"},
        {label: `${this.$t("global.title")} - ${this.$t("global.title")}`, value: "-title"},
        {label: `${this.$t("global.event")} - ${this.$t("global.ascending")}`, value: "event__date"},
        {label: `${this.$t("global.event")} - ${this.$t("global.descending")}`, value: "-event__date"},
      ]
    }
  },

  computed: {
    PICTURE () { return "picture" },
    VIDEO () { return "video" },
    FILE () { return "document" },
    ARTICLE () { return "article" }
  },

  created () {
    this.orderCurrent = this.orderChoices[0]
    this.setCurrent(this.PICTURE)
  },

  methods: {
    toogleToolbar () {
      this.toolbarActive = !this.toolbarActive
    },
    setCurrent (value) {
      this.currentTab = value
      this.$emit("change", value)
    },
    setOrder (order) {
      this.orderCurrent = order
    },
    submit () {
      this.toogleToolbar()
      const query = {
        ...this.$route.query,
        search: this.searchValue,
        order: this.orderCurrent.value
      }
      this.$router.push({query})
    }
  },

}
</script>

<style lang="scss">


.gallery-toolbar {
  grid-area: 2/ 1 / 2 / 3;
  display: flex;
  justify-content: center;
}

.toolbar-item > * {
  margin-top: 2em
}

@screen -md {
  .gallery-toolbar {
    grid-area: 3 / 1 / 3 / -1;
  }
  .toolbar {
    //background-color: rgba(235, 235, 235, 1);
    width: 100%;
    &:not(.active) > .toolbar-item {
      display: none;
    }
    &.active {
      position: absolute;
      background-color: white;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      margin-top: 0;
      display: block;
      & button {
        margin: 5%;
        width: 90%;
      }
      .arrow-toolbar {
        background: linear-gradient(rgba(255, 255, 255, 0), rgb(209, 209, 209) 100%);
        clip-path: ellipse(50% 90% at 50% 0%);
        transform: translate(-50%, 0%);
        position: relative;
        height: 40px;
      }
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

.input-search {
  width: 80%
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

.toolbar > * + * {
  margin-top: 1em;
}

.toolbar-link {
  transition: transform .2s;
  &.nuxt-link-active, &:hover {
    background-color: rgb(233, 233, 233);
    color: rgba(74, 85, 104, 1);
  }
}

.arrow-toolbar {
  background: linear-gradient(rgb(209, 209, 209), rgba(255, 255, 255, 0) 100%);
  transform: translate(-50%, -50%);
  clip-path: ellipse(47% 91% at 51% 91%);
  width: 100px;
  height: 30px;
  z-index: 0;
  position: absolute;
  left: 50%;
}

</style>
