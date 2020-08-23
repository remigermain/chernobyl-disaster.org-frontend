import galleryUrl from "@/lib/gallery"
import isNil from "lodash/isNil"

export default {

  data () {
    return {
      pageValue: this.page,
      object: [],
      pageSet: [parseInt(this.$route.query.page) || 1],
      page: parseInt(this.$route.query.page) || 1,
      currentObject: null,
      completed: false,
      skeleton: 0,
      inPrev: false,
      inNext: false
    }
  },

  watch: {
    "$route.query" (newquery, oldquery) {
      if (newquery.search != oldquery.search || newquery.ordering != oldquery.ordering) {
        this.reset()
      }
    }
  },

  computed: {
    url () {
      return `${this.model}/?page=${this.page}${galleryUrl(this.$route.query)}`
    },
    hasPrev () {
      return this.pageSet.includes(1)
    },
  },

  methods: {
    setDetail (value) {
      if (value != this.currentObject) {
        this.currentObject = value
      }
    },
    nextPage() {
      const max = Math.max(...this.pageSet)
      if (!this.pageSet.includes(max + 1) && !this.completed) {
        this.page = max + 1
        this.next = true
        this.refresh((response) => {
          this.object = [...this.object, ...response.data.results,]
        })
      }
    },
    prevPage() {
      const min = Math.min(...this.pageSet)
      if (!this.pageSet.includes(min - 1) && min > 1) {
        // save the old height
        let oldHeight = this.$el.scrollHeight
        let oldTop = this.$el.scrollTop

        this.page = min - 1
        this.inPrev = true

        this.refresh((response) => {
          this.object = [...response.data.results, ...this.object]
          this.$nextTick(() => {
            this.$el.scrollTop = this.$el.scrollHeight - oldHeight + oldTop
          })
        })
      }
    },
    refresh (callback) {
      if (this.inRequest) {
        return
      }

      this.pageSet.push(this.page)
      this.inRequest = true
      return this.$axios.get(this.url)
        .then(response => {
          if (response.status != 200) {
            throw Error("")
          }
          this.length = response.data.count
          this.inRequest = false
          callback(response)
          if (isNil(response.data.next)) {
            this.completed = true
          }
        })
        .catch((error) => {
          this.$i18nToast().error(error)
        })
        .finally(() => {
           this.inRequest, this.inPrev, this.inNext = false, false, false
        })
    },
  }

}
