export default {
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
    exactLink(to) {
      return this.localePath(to) == this.$route.path
    },
    StaticApiLink(link) {
      return this.$apiUrl + link
    },
    getValLang(obj, key) {
      // locale lang
      let el = obj.langs.filter(el => el.language === this.$i18n.locale)[0]
      if (el) {
        return el[key]
      }
      // default lang
      el = obj.langs.filter(el => el.language === this.$i18n.defaultLocale)[0]
      if (el) {
        return el[key]
      }
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return obj[key]
      }
      return this.$t("global.error-key")
    },
    hasAttr (obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key)
    }
  }
}
