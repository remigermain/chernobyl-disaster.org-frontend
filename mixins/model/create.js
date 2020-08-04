import _ from "lodash"
import base from "./base"

export default {

  mixins: [base],

  methods: {
    submit () {
      const form = new FormData()
      const assigned = this.mergeData()
      this.assignFormData(form, assigned)
      this.assignFormExtraData(form)

      this.loading = true
      this.errors = []
      this.$axios.post(`${this.model}/`, form)
        .then(response => {
          if (response.status == 201) {
            // assigne data
            this.$toast.success(this.$t("global.create-ok"))
            // redirect after
            if (this.redirectTo == this.STATE_REDIRECT.REDIRECT_CREATE) {
              this.redirect({...this.pathCreate.path}) // reload
            } else if (this.redirectTo == this.STATE_REDIRECT.REDIRECT_UPDATE) {
              this.redirect({...this.pathUpdate.path, params: {id: response.data.id}})
            } else {
              this.redirect({...this.pathDetail.path, params: {id: response.data.id}})
            }
          } else {
            throw Error(this.$t("global.create-ko"))
          }
        })
        .catch(error => {
          this.$toast.error(this.$t("global.create-ko"))
          if (!_.isNil(error.response)) {
            this.errors = error.response.data
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  }

}
