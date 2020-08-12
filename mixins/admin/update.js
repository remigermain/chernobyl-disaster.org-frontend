import _ from "lodash"
import base from "./base"


export default {

  mixins: [
    base
  ],

  methods: {
    submit (event) {
      const form = new FormData(event.srcElement)
      this.assignFormData(form)
      console.log(form.get("date"))

      this.loading = true
      this.errors = []

      this.$axios.patch(`${this.model}/${this.$route.params.id}/`, form)
        .then(response => {
          if (response.status != 200) {
            throw Error(this.$t("global.update-ko"))
          }

          this.$i18nToast().success(this.$t("global.update-ok"))
          // redirect after
          if (event.submitter.dataset.type === "new") {
            this.redirect({...this.pathCreate.path})
          } else if (event.submitter.dataset.type === "detail") {
            this.redirect({...this.pathDetail.path, params: {id: response.data.id}})
          } else if (_.has(this, "callbackSuccess")) {
            this.callbackSuccess(response)
          }
          this.object = response.data
          this.langs = []

        })
        .catch(error => {
          this.$i18nToast().error(this.$t("global.update-ko"))
          if (!_.isNil(error.response)) {
            this.errors = error.response.data
          }
          if (_.has(this, "callbackError")) {
            this.callbackError(error)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  }

}
