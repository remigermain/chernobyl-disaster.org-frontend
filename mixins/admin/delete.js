export default {
  data () {
    return {
      acticeModalDelete: false,
      objDelete: null,
    }
  },

  methods: {
    /*
      common base object
    */
    deleteObject () {
      this.submitDelete(`${this.model.name}/${this.objDelete.id}/`)
    },
    setDeleted (obj) {
      this.objDelete = obj
      this.acticeModalDelete = true
    },
    submitDelete (path) {
      this.$store.commit("ON_LOADING", true)
      this.acticeModalDelete = false

      this.$axios.delete(path)
        .then(response => {
          if (response.status !== 204) {
            throw new Error("server-error")
          }
          this.i18nToast.success(this.$t('success.delete'))
          this.haveDeletedObject()
          // this.$nuxt.refresh()
        })
        .catch(error => { this.responseError(error) })
        .finally(() => { this.$store.commit("ON_LOADING", false) })
    },
  }
}
