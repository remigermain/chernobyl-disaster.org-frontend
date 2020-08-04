// import _ from "lodash"
import base from "./base"

export default {
  mixins: [base],

  data () {
    return {
      interval: 0,
      objectList: [],
      page: 1,
    }
  },

  computed: {
    url () {
      return `${this.model}?page=${this.page}`
    }
  },

  methods: {
    pagnination (val) {
      this.page = val
      this.refresh()
    },
    refresh () {
      this.loading = true

      this.$axios.get(this.url)
        .then(response => {
          if (response.status == 200) {
            this.objectList =  response.data.results
          } else {
            throw Error(this.$t("global.error"))
          }
        })
        .catch(() => {
          this.$toast.error(this.$t("global.error"))
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  mounted () {
    this.interval = setInterval(() => {
      this.refresh()
    }, 20000)
  },

  beforeDestroy () {
    clearInterval(this.interval)
  }

}
