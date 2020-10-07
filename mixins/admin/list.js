export default {

  data () {
    return {
      pagination: 1,
      activeModal: false,
      objDelete: null
    }
  },

  methods: {
    setPagination (num) {
      this.pagination = num
    },
    setDeleted (obj) {
      this.objDelete = obj
      this.activeModal = true
    },
    submitDelete (path) {
      this.loading = true
      this.activeModal = false

      this.$axios.delete(path)
        .then(response => {
          if (response.status !== 204) {
            throw new Error("server-error")
          }
          this.i18nToast.success(this.$t('success.delete'))
        })
        .catch(error => { this.responseError(error) })
        .finally(() => { this.loading = false })
    }
  }

}
