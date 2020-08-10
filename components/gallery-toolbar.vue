<template>
  <div class="flex flex-col h-inherit w-max-content p-4 toolbar">
    <div class="flex bg-gray-700 rounded text-white">
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
    <label>
      {{ $t('global.search') }}
      <div class="flex bg-gray-400 bg-opacity-50 px-2 py-3 focus:bg-gray-300 rounded-sm shadow appearance-none leading-none">
        <icon-search class="w-20px" />
        <input v-model="searchValue" type="text" class="bg-transparent italic text-gray-800 ml-1 input-search">
      </div>
    </label>
    <div>
      <span>
        {{ $t('global.sortby') }}
      </span>
      <div class="relative sort-set rounded-lg w-max-content">
        <span class="p-2 opacity-50 italic text-sm">{{ orderCurrent.label }}</span>
        <icon-selector class="opacity-50" />
        <ul class="sort-list absolute bg-gray-300 rounded-lg p-2 w-full text-center">
          <template v-for="order in orderChoices">
            <li v-if="order != orderCurrent" :key="order.value" @click="setOrder(order)">
              <span class="link text-sm cursor-pointer">
                {{ order.label }}
              </span>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <button class="p-2 rounded bg-blue-700 text-gray-300 hover:bg-blue-600" @click="submit">
      {{ $t('global.actualiser') }}
    </button>
  </div>
</template>

<script>
import iconSearch from "@/assets/svg/search.svg"

import iconMovie from "@/assets/svg/movie.svg"
import iconPhoto from "@/assets/svg/photo.svg"
import iconFile from "@/assets/svg/file-text.svg"
import iconArticle from "@/assets/svg/news.svg"
import iconSelector from "@/assets/svg/selector.svg"


export default {

  components: {
    iconSearch,
    iconMovie,
    iconPhoto,
    iconFile,
    iconArticle,
    iconSelector
  },

  data () {
    return {
      currentTab: null,
      orderCurrent: {},
      searchValue: "",
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
    setCurrent (value) {
      this.currentTab = value
      this.$emit("change", value)
    },
    setOrder (order) {
      this.orderCurrent = order
    },
    submit () {
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
  &.nuxt-link-active {
    background-color: rgb(233, 233, 233);
    color: rgba(74, 85, 104, 1);
  }
}

</style>
