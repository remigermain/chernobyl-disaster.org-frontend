export default {
  data () {
    return {
      /* delete obj */
      acticeModalDelete: false,
      objDelete: null,

      objLangDelete: null,
    }
  },

  methods: {

    /*
      deleted obj
    */
    setDeleted (obj) {
      this.objDelete = obj
      this.acticeModalDelete = true
    },
    submitDelete (url) {
      this.$store.commit("ON_LOADING", true)
      this.acticeModalDelete = false

      const urlPath  = url || `${this.model.name}/${this.objDelete.id}/`

      this.$axios.delete(urlPath)
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

    submitLangDelete(object, idx) {
      /* remove only lang object ( only admin user ) */
      this.$store.commit("ON_LOADING")
      this.acticeModalDelete = false

      this.$axios.delete(`${this.linkDeleteLang}/${this.objLangDelete.id}/`)
        .then(response => {
          if (response.status !== 204) {
            throw new Error("errer-server")
          }
          this.i18nToast.success(this.$t('message.delete'))
          // delete object
          this.$delete(object.langs, idx)
        })
        .catch(error => { this.responseError(error) })
        .finally(() => this.$store.commit("ON_LOADING"))
    },


    langDelete (idx) {
      const object = this.data || this.object
      this.objLangDelete = object.langs[idx]
      if (this.objLangDelete ._new) {
        /* remove directly in array if is a new elements */
        this.$delete(object.langs, idx)
      } else {
        this.submitLangDelete(object, idx)
      }
    }
  }
}
