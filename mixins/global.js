import _ from "lodash"

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
      let el = _.find(obj.langs,{"language": this.$i18n.locale})
      if (el) return el[key]

      // default lang
      el = _.find(obj.langs,{"language": this.$i18n.defaultLocale})
      if (el) return el[key]

      if (_.has(obj, key)) return obj[key]

      return this.$t("global.error-key")
    },
  }

}
