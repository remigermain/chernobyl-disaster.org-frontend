export default {


  computed: {

    i18nToast () {
      const close = {
        action: {
          text: this.$t("word.close"),
          onClick: (e, toast) => {
            toast.goAway(0)
          }
        }
      }

      return {
        "show": (text, options) => {
          return this.$toast.show(text, options)
        },
        "success": (text, options) => {
          return this.$toast.success(text, {...close, ...options})
        },
        "info": (text, options) => {
          return this.$toast.info(text, {...close, ...options})
        },
        "error": (text, options) => {
          return this.$toast.error(text, {...close, ...options})
        },
      }
    }
  },


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

      return ""
    },
    responseError (error) {
      /*
        request Error is a function to generate errors message
        default message when error is from server
                                   is offline
                                   is detail and non_field_error
      */
      return new Promise(resolve => {
        /* if error has not response and data , its a error from server */
        if (!error.response || !error.response.data || error.response.status >= 500) {
          this.i18nToast.error(this.$t("error-message.server")).goAway(10000)
        } else if (this.$nuxt.isOffline) {
          this.i18nToast.error(this.$t("error-message.network")).goAway(10000)
        } else {
          const data = error.response.data

          // count errors in data
          const haveError = Object.keys(data).reduce((val, key) => {
            return val + (data[key] && data[key].length ? data[key].length : 0)
          }, 0)

          if (haveError > 0) {
            this.i18nToast.error(this.$t('error-message.error-in-the-form')).goAway(10000)
          }
          // detail
          data.detail && this.i18nToast.error(data.detail).goAway(10000)

          // no field errors
          if (data.non_field_errors) {
            data.non_field_errors.forEach(msg => {
              this.i18nToast.error(msg).goAway(10000)
            })
          }

          // resolve with data
          resolve(data)
        }
      })
    }
  }
}
