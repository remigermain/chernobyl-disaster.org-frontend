export default {
  async fetch () {
    await this.change(1)
    await this.changeLang(1)
  },
  data () {
    return {
      objectList: [],
      length: 0,
      objectListLang: [],
      lengthLang: 0
    }
  },
  methods: {
    urlDef(val) {
      return `${this.url}?page=${val}`
    },
    change (val) {
      return this.refresh(this.urlDef(val))
        .then(data => {
          this.assignResponse(data)
        })
    },
    changeLang (val) {
      const query = (this.query ? `&${this.query}` : "")
      return this.refresh(`${this.urlDef(val)}${query}`)
        .then(data => {
          this.assignResponseLang(data)
        })
    },
    assignResponse (data) {
      this.objectList = data.results
      this.length = data.length
      console.log("icicic")
    },
    assignResponseLang(data) {
      this.objectListLang = data.results
      this.lengthLang = data.length
    },
    refresh (url) {
      return this.$axios.get(url)
        .then(response => {
          if (response.status == 200) {
            return {
              results: response.data.results,
              length: response.data.count,
            }
          }
          this.$toast.error(this.$t("global.error"))
          return {results: [], length: 0}
        })
        .catch(() => {
          this.$toast.error(this.$t("global.error"))
          return {results: [], length: 0}
        })
    }
  }
}
