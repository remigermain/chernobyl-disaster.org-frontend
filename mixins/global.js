export default {

  data () {
    return {
      loading: false,
      toastLoading: null,
      inRequest: false
    }
  },

  computed: {
    empty () {
      return `-- ${this.$t("utils.empty")} --`
    },
    i18nToast () {
      const close = {
        action: {
          text: this.$t("utils.close"),
          onClick: (e, toast) => {
            toast.goAway(0)
          }
        }
      }

      return {
        "show": (text, options) => {
          return this.$toast.show(text, options)
        },
        "success": (text, options) => {
          return this.$toast.success(text, {...close, ...options})
        },
        "info": (text, options) => {
          return this.$toast.info(text, {...close, ...options})
        },
        "error": (text, options) => {
          return this.$toast.error(text, {...close, ...options})
        },
      }
    }
  },

  watch: {
    loading (value) {
      if (value) {
        this.toastLoading = this.i18nToast.show(this.$t("utils.loading"))
      } else if (this.toastLoading) {
        this.toastLoading.remove()
      }
      return value
    }
  },

  methods: {
    // video youtube
    urlVideo (src) {
      return src.replace("watch?v=", "embed/")
    },

    // shortcut for router change
    redirect(to) {
      this.$router.push(this.localePath(to))
    },
    i18nAttr(obj, key) {
      // locale lang
      let el = obj.langs.find(el => el.language === this.$i18n.locale)
      if (el) return el[key]

      // default lang
      el = obj.langs.find(el => el.language === this.$i18n.defaultLocale)
      if (el) return el[key]

      // if obj has key
      if (obj[key]) return obj[key]

      // return first langs
      if (obj.langs.length > 0) return obj.langs[0][key]

      return this.$t("errors.language")
    },
    requestError (error) {
      if (error.response?.status >= 500) {
        this.i18nToast.error(this.$t("errors.server")).goAway(10000)
      }
      else if (error.response?.data?.detail) {
        this.i18nToast.error(error.response.data.detail).goAway(10000)
      }
      else if (error.response?.data) {
        // assign response to error
        this.errors = {...this.errors, ...error.response.data}
        // if non_field_errors as set, create toast
        if (error.response.data.non_field_errors) {
          error.response.data.non_field_errors.forEach(msg => {
            this.i18nToast.error(msg).goAway(10000)
          })
        } else {
          this.i18nToast.error(this.$t("errors.error-in-form")).goAway(10000)
        }
        if (Array.isArray(this.errors.langs)) {
          this.errors.langs.forEach(msg => {
            if (typeof msg === "string") {
              if (msg === "101") { // error unique translate
                msg = this.$t("errors.unique-translate", {"model": this.model.label})
              }
              this.i18nToast.error(msg).goAway(10000)
            }
          })
        }
      } else if (error.message === "Network Error") {
        // ERROR network
        this.i18nToast.error(this.$t("errors.network")).goAway(10000)
      } else {
        // create ERROR server
        this.i18nToast.error(this.$t("errors.server")).goAway(10000)
      }
    },

    getFullDate (date, checkTime=true) {
      const _date = (typeof date === "string" ? new Date(date) : new Date(date.date))
      let options = {year: "numeric", month: "long", day: "numeric" }
      if (checkTime && !this.isTimeEmpty(date)) {
        options = {...options, hour: "2-digit", minute: "2-digit", second: "2-digit"}
      }
      return _date.toLocaleDateString(this.$i18n.locale, options)
    },
    getDateYear (date) {
      return date.toLocaleDateString(this.$i18n.locale, {year: "numeric", month: "long", day: "numeric" })
    },
    getDate (date) {
      return date.toLocaleDateString(this.$i18n.locale, { month: "long", day: "numeric" })
    },
    isTimeEmpty (date) {
      return !date.have_second && !date.have_minute && !date.have_hour
    },
    getTime (date) {
      return date.toLocaleTimeString(this.$i18n.locale)
    }

  }

}
