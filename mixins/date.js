export default {
  methods: {
    getFullDate (date, checkTime=true) {
      if (!date) return null
      const _date = (typeof date === "string" ? new Date(date) : new Date(date.date))
      let options = {year: "numeric", month: "long", day: "numeric" }
      if (checkTime && !this.isTimeEmpty(date)) {
        options = {...options, hour: "2-digit", minute: "2-digit", second: "2-digit"}
      }
      return _date.toLocaleDateString(this.$i18n.locale, options)
    },
    getDate (date) {
      return date.toLocaleDateString(this.$i18n.locale, { month: "long", day: "numeric" })
    },
    isTimeEmpty (date) {
      return !date.have_second && !date.have_minute && !date.have_hour
    },
  }
}
