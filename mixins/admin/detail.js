import base from "~/mixins/admin/base"

export default {

  mixins: [
    base
  ],

  methods: {
    isTimeEmpty (date) {
      return (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0)
    },
    getDateYear (date) {
      const _date = (date instanceof Date ? date : new Date(date))
      let options = {year: "numeric", month: "long", day: "numeric" }
      if (!this.isTimeEmpty(_date)) {
        options = {...options, hour: "2-digit", minute: "2-digit", second: "2-digit"}
      }
      return _date.toLocaleDateString(this.$i18n.locale, options)
    },
  }

}
