import _ from "lodash"

export default {

  data () {
    return {
      pageValue: this.page,
      object: [],
      uniqueId: 0,
      page: 2,
      currentObject: null,
    }
  },

  watch: {
    options () {
      this.object = []
      this.page = 1
      this.uniqueId++
    }
  },

  computed: {
    baseUrl () {
      return `${this.model}/?page=${this.page}`
    },
    url () {
      if (_.isEmpty(this.$route.query, true)) {
        return this.baseUrl
      }
      const q = this.$route.query
      return `${this.baseUrl}&search=${q.search}&ordering=${q.order}`
    }
  },

  methods: {
    setDetail (value) {
      if (value != this.currentObject) {
        this.currentObject = value
      }
    },
    refresh ($state) {
      if (this.completed) {
        $state.complete()
        this.completed = false
        return
      }
      this.$axios.get(this.url)
        .then(response => {
          if (response.status != 200) {
            throw Error("")
          }
          this.page++
          this.object.push(...response.data.results)
          if (response.data.next) {
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch((error) => {
          $state.error()
          this.$i18nToast().error(error)
        })
    },
  }

}
