export default {
  methods: {
    getDateYear (date) {
      return date.toLocaleDateString(this.$i18n.locale, {year: "numeric", month: "long", day: "numeric" })
    },
    getDate (date) {
      return date.toLocaleDateString(this.$i18n.locale, { month: "long", day: "numeric" })
    },
    isTimeEmpty (date) {
      return (date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0)
    },
    getTime (date) {
      return date.toLocaleTimeString(this.$i18n.locale)
    }
  }
}
