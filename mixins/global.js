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
    }
  },

  watch: {
    loading (value) {
      if (value) {
        this.toastLoading = this.$i18nToast().show(this.$t("utils.loading"))
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
      let el = obj.langs.find(el => el.language == this.$i18n.locale)
      if (el) return el[key]

      // default lang
      el = obj.langs.find(el => el.language == this.$i18n.defaultLocale)
      if (el) return el[key]

      // if obj has key
      if (obj[key]) return obj[key]

      // return first langs
      if (obj.langs.length > 0) return obj.langs[0][key]

      return this.$t("errors.language")
    },
    requestError (error) {
      if (error.response?.data?.detail) {
        this.$i18nToast().error(this.$t("errors.auth")).goAway(4000)
      }
      else if (error.response?.data) {
        // assign response to error
        this.errors = error.response.data
        // if non_field_errors as set, create toast
        if (error.response.data.non_field_errors) {
          error.response.data.non_field_errors.forEach(msg => {
            this.$i18nToast().error(msg).goAway(4000)
          })
        } else {
          this.$i18nToast().error(this.$t("errors.error-in-form")).goAway(4000)
        }
      } else if (error.message === "Network Error") {
        // ERROR network
        this.$i18nToast().error(this.$t("errors.network")).goAway(4000)
      } else {
        // create ERROR server
        this.$i18nToast().error(this.$t("errors.server")).goAway(4000)
      }
    }
  }

}
