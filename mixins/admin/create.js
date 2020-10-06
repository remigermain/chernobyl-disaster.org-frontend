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
      this.errors = {...this.errorsField}

      this.$axios.post(`${this.model.name}/`, form)
        .then(response => {
          if (response.status!==201) {
            throw new Error("error-server")
          }
          // assigne data
          this.i18nToast.success(this.$t("success.create"))
          // redirect after
          if (event.submitter.dataset.type === "continue") {
            this.$router.push(this.localePath({...this.pathUpdate.path, params: {id: response.data.id}}))
          } else if (event.submitter.dataset.type === "detail") {
            this.$router.push(this.localePath({...this.pathDetail.path, params: {id: response.data.id}}))
          } else {
            event.srcElement.reset() // reset all input in form
            this.langs = []
          }
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    },
  }

}
