import Vue from "vue"

/*
  prototype for toast with translation action
*/

Vue.prototype.$i18nToast = function () {

  const cancel = {
    action: {
      text: this.$t("utils.close"),
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
      return this.$toast.success(text, options).goAway(3000)
    },
    "info": (text, options) => {
      return this.$toast.info(text, {...cancel, ...options})
    },
    "error": (text, options) => {
      return this.$toast.error(text, {...cancel, ...options})
    },
  }

}
