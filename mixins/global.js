export default {
  methods: {
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

      return '\\error\\'
    },
    responseError(error) {
      /*
        request Error is a function to generate errors message
        default message when error is from server
                                   is offline
                                   is detail and non_field_error
      */
      return new Promise(resolve => {
        /* if error has not response and data , its a error from server */
        if (
          !error.response ||
          !error.response.data ||
          error.response.status >= 500
        ) {
          this.$toast.error(this.$t('error-message.server'))
        } else if (this.$nuxt.isOffline) {
          this.$toast.error(this.$t('error-message.network'))
        } else {
          const data = error.response.data

          // count errors in data
          const haveError = Object.keys(data).reduce((val, key) => {
            return val + (data[key] && data[key].length ? data[key].length : 0)
          }, 0)

          if (haveError > 0) {
            this.$toast.error(this.$t('error-message.error-in-the-form'))
          }
          // detail
          data.detail && this.$toast.error(data.detail)

          // no field errors
          if (data.non_field_errors) {
            data.non_field_errors.forEach(msg => {
              this.$toast.error(msg)
            })
          }

          // resolve with data
          resolve(data)
        }
      })
    }
  }
}
