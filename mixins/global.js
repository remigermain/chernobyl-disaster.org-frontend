import has from "lodash/has"
import each from "lodash/each"

export default {

  data () {
    return {
      loading: false,
      toastLoading: null
    }
  },

  watch: {
    loading (value) {
      if (value) {
        this.toastLoading = this.$i18nToast().show(this.$t("global.loading"))
      } else if (this.toastLoading) {
        this.toastLoading.remove()
      }
      return value
    }
  },

  methods: {
    // shortcut for router change
    redirect(obj) {
      this.$router.push(this.localePath(obj))
    },
    // methods for logout and redirect to login page
    logout () {
      this.$auth.logout()
      this.redirect({ name: "aut-login" })
    },
    StaticApiLink(link) {
      return this.$apiUrl + link
    },
    i18nAttr(obj, key) {
      // locale lang
      let el = obj.langs.find(el => el.language == this.$i18n.defaultLocale)
      if (el) return el[key]

      // default lang
      el = obj.langs.find(el => el.language == this.$i18n.defaultLocale)
      if (el) return el[key]

      if (has(obj, key)) return obj[key]

      return this.$t("global.error-key")
    },
    requestError (error) {
      if (has(error, "response") && has(error.response, "data")) {
        // assign response to error
        this.errors = error.response.data
        // if non_field_errors as set, create toast
        if (has(error.response.data, "non_field_errors")) {
          each(error.response.data.non_field_errors, (msg) => {
            this.$i18nToast().error(msg).goAway(4000)
          })
        }
      } else if (error.message === "Network Error") {
        // ERROR network
        this.$i18nToast().error(this.$t("global.error.network")).goAway(4000)
      } else {
        // create ERROR server
        this.$i18nToast().error(this.$t("global.error.server")).goAway(4000)
      }
    }
  }

}
