export default {

  computed: {
    errorServer () {
      return this.$store.state.error_server
    },
    on_loading () {
      return this.$store.state.on_loading
    },
  },

  watch: {
    errorServer (message) {
      if (message) {
        this.i18nToast.error(message).goAway(8000)
        this.$store.commit("ERROR_SERVER", null)
      }
    },
    on_loading (value) {
      if (value) {
        this.$toastLoading = this.i18nToast.show(this.$t("word.loading"))
      } else if (this.$toastLoading) {
        this.$toastLoading.remove()
      }
    }
  },

}
