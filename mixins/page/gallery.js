import { galleryUrl} from "@/lib/gallery"
import isNil from "lodash/isNil"

export default {

  data () {
    return {
      object: [],
      pageSet: [parseInt(this.$route.query.page) || 1],
      page: parseInt(this.$route.query.page) || 1,
      currentObject: null,
      completed: false,
      interval: 0,
      inRequestPrev: false,
      inRequestNext: false,
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
    hasPrevPage () {
      return !this.pageSet.includes(1) // check if page "1" one is in
    },
    inPrev () {
      if (this.hasPrevPage) {
        return new Array(this.$pagination)
      }
      return []
    },
    inNext () {
      if (!this.completed) {
        return new Array(this.$pagination)
      }
      return []
    },
  },

  mounted() {
    if (process.client) {
        this.interval = setInterval(() => {
          if (!this.scroll()) { clearInterval(this.interval) }
        }, 1)
    }
  },

  methods: {
    scroll () {
      // check if prev and next is visible , and refresh page
      let ret = false
      if (this.$refs.prevLoading.isVisible() && !this.pageSet.includes(1)) {
        ret = true
      }
      if (this.$refs.nextLoading.isVisible() && !this.completed) {
        ret = true
      }
      return ret
    },
    reset () {
      // reset data when query params change
      this.object = []
      this.page = 1
      this.pageSet = []
      this.completed = false
      this.refresh(response => {
        this.object = response.data.results
        this.scroll()
      })
    },
    nextPage() {
      return new Promise(resolve => {
        const max = Math.max(...this.pageSet)
        if (!this.pageSet.includes(max + 1) && !this.completed) {
          this.inRequestPrev = true
          this.page = max + 1
          this.refresh(response => {
            // append the new data
            this.object = [...this.object, ...response.data.results,]
            resolve()
          })
        }
      })
    },
    prevPage() {
      return new Promise(resolve => {
        const min = Math.min(...this.pageSet)
        if (!this.pageSet.includes(min - 1) && min > 1) {
          this.page = min - 1
          this.inRequestNext = true

          // save the old height
          let oldHeight = this.$el.scrollHeight
          let oldTop = this.$el.scrollTop
          this.refresh(response => {
            // prepand the new data
            this.object = [...response.data.results, ...this.object]
            resolve()

            // assign the correct height
            this.$nextTick(() => {
              this.$el.scrollTop = this.$el.scrollHeight - oldHeight + oldTop
            })

          })
        }
      })
    },
    refresh (callback) {
      if (this.inRequest) {
        return
      }

      // add page set
      this.pageSet.push(this.page)

      this.inRequest = true
      return this.$axios.get(this.url)
        .then(response => {
          if (response.status != 200) {
            throw Error("")
          }
          this.length = response.data.count
          this.inRequest = false
          this.inRequestPrev = false
          this.inRequestNext = false
          if (isNil(response.data.next)) {
            this.completed = true
          }
          if (callback) {
            callback(response)
          }
        })
        .catch((error) => { this.$i18nToast().error(error) })
        .finally(() => {
          this.inRequest = false
          this.inRequestPrev = false
          this.inRequestNext = false
        })
    },
  },

  beforeDestroy() {
    clearInterval(this.interval)
  }

}
