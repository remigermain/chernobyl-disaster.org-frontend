export default {
  methods: {
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
