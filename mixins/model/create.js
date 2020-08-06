import _ from "lodash"
import base from "./base"

export default {

  mixins: [base],

  methods: {
    submit (event) {
      const form = new FormData(event.srcElement)
      this.assignFormData(form)

      this.loading = true
      this.errors = []

      this.$axios.post(`${this.model}/`, form)
        .then(response => {
          if (response.status != 201) {
            throw Error(this.$t("global.create-ko"))
          }
          // assigne data
          this.$i18nToast().success(this.$t("global.create-ok"))
          // redirect after
          if (event.submitter.dataset.type === "continue") {
            this.redirect({...this.pathUpdate.path, params: {id: response.data.id}})
          } else if (event.submitter.dataset.type === "detail") {
            this.redirect({...this.pathDetail.path, params: {id: response.data.id}})
          } else {
            event.srcElement.reset() // reset all input in form
            if (_.has(this, "callbackSuccess")) {
              this.callbackSuccess(response)
            }
          }
        })
        .catch(error => {
          this.$i18nToast().error(this.$t("global.create-ko"))
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
