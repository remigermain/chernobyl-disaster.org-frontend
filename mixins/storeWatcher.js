export default {

  computed: {
    background () {
      return this.$store.state.have_background
    },
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
        this.$toastLoading = this.i18nToast.show(this.$t("utils.loading"))
      } else if (this.$toastLoading) {
        this.$toastLoading.remove()
      }
    }
  },

  methods: {
    hideBackground () {
      this.$store.commit("ACTIVE_BACKGROUND", false)
    }
  }

}
