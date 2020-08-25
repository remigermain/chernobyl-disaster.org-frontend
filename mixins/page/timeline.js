export default {
  methods: {
    getDateYear (date) {
      return date.toLocaleDateString(this.$i18n.locale, {year: "numeric", month: "long", day: "numeric" })
    },
    getDate (date) {
      return date.toLocaleDateString(this.$i18n.locale, { month: "long", day: "numeric" })
    },
    isTimeEmpty (date) {
      if (date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0) {
        return true
      }
      return false
    },
    getTime (date) {
      if (this.isTimeEmpty(date)) {
        return ""
      }
      return `${date.getHours()}${this.$t("utils.hours-mini")} : ${date.getMinutes()}${this.$t("utils.minutes-mini")} : ${date.getSeconds()}${this.$t("utils.secondes-mini")}`
    }
  }
}
