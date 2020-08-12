<template>
  <div class="gallery-toolbar">
    <div class="flex bg-gray-800 rounded text-white w-full">
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
  </div>
</template>

<script>

import iconMovie from "@/assets/svg/movie.svg"
import iconPhoto from "@/assets/svg/photo.svg"
import iconFile from "@/assets/svg/file-text.svg"
import iconArticle from "@/assets/svg/news.svg"


export default {

  components: {
    iconMovie,
    iconPhoto,
    iconFile,
    iconArticle,
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

.toolbar-item > * {
  margin-top: 2em
}

.toolbar-link {
  transition: transform .2s;
  &.nuxt-link-active, &:hover {
    background-color: rgb(233, 233, 233);
    color: rgba(45, 55, 72, 1);
  }
}

</style>
