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
      this.$axios.patch(`${this.model}/${this.$route.params.id}/`, form)
        .then(response => {
          if (response.status == 200) {
            // assigne data
            this.data = _.clone(assigned)
            this.$toast.success(this.$t("global.update-ok"))
            // redirect after
            if (this.redirectTo == this.STATE_REDIRECT.REDIRECT_CREATE) {
              this.redirect({...this.pathCreate.path})
            } else if (this.redirectTo == this.STATE_REDIRECT.REDIRECT_DETAIL) {
              this.redirect({...this.pathDetail.path, params: {id: response.data.id}})
            }
          } else {
            throw Error(this.$t("global.update-ko"))
          }
        })
        .catch(error => {
          this.$toast.error(this.$t("global.update-ko"))
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
