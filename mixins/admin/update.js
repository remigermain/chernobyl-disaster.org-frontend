import base from "./base"


export default {

  mixins: [
    base
  ],

  methods: {
    submit (event) {
      const form = new FormData(event.srcElement)
      this.assignFormData(form)

      this.loading = true
      this.errors = []

      this.$axios.patch(`${this.model.name}/${this.$route.params.id}/`, form)
        .then(response => {
          if (response.status != 200) {
            throw Error(this.$t("errors.update"))
          }

          this.i18nToast.success(this.$t("success.update"))
          // redirect after
          if (event.submitter.dataset.type === "new") {
            this.redirect({...this.pathCreate.path})
          } else if (event.submitter.dataset.type === "detail") {
            this.redirect({...this.pathDetail.path, params: {id: response.data.id}})
          } else {
            this.langs = []
            this.$nuxt.refresh()
          }
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    },
  }

}
