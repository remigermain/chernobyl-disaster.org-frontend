import base from "./base"

const TIME_REFRESH = 20000 // every 20 secondes

export default {

  mixins: [
    base
  ],

  data () {
    return {
      interval: 0,
      interval2: 0,
      lastRefresh: TIME_REFRESH / 1000,
      lastRefreshLang: TIME_REFRESH / 1000,
      page: 1,
      pageLang: 1,
      searchValue: "",
      searchValueLang: ""
    }
  },

  computed: {
    url () {
      const search = (this.searchValue ? `&search=${this.searchValue}` : "")
      return `${this.model.name}/?page=${this.page}${search}`
    },
    urlLang () {
      const search = (this.searchValueLang ? `&search=${this.searchValueLang}` : "")
      return `${this.model.name}/?page=${this.pageLang}&completed=false${search}`
    },
  },

  methods: {
    pagnination (val) {
      this.page = val
      this.refresh()
    },
    pagninationLang (val) {
      this.pageLang = val
      this.refreshLang()
    },
    search (val) {
      this.searchValue = val
      this.page = 1
      this.refresh()
    },
    searchLang (val) {
      this.searchValueLang = val
      this.pageLang = 1
      this.refreshLang()
    },
    refresh () {
      this.$axios.get(this.url)
        .then(response => {
          if (response.status != 200) {
            throw Error(this.$t("global.error"))
          }
          this.objectList = response.data.results
          this.objectlength = response.data.count
        })
        .catch(() => {
          this.$i18nToast().error(this.$t("global.error"))
        })
    },
    refreshLang () {
      this.$axios.get(this.urlLang)
        .then(response => {
          if (response.status != 200) {
            throw Error(this.$t("global.error"))
          }
          this.objectListLang = response.data.results
          this.objectlengthLang = response.data.count
        })
        .catch(() => {
          this.$i18nToast().error(this.$t("global.error"))
        })
    }
  },

  mounted () {
    this.interval = setInterval(() => {
      this.refreshLang()
      this.refresh()
    }, TIME_REFRESH)
  },

  beforeDestroy () {
    clearInterval(this.interval)
  }

}
