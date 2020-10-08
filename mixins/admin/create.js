import { setObjectKeysValue } from '~/lib/utils'
import baseFormMixins from "~/mixins/admin/baseForm"

export default {

  mixins: [baseFormMixins],

  methods: {

    afterRequest(type, id) {
      if (type === "continue") {
        this.$router.push(this.localePath({name: this.pathUpdate, params: {id}}))
      } else if (type === "detail") {
        this.$router.push(this.localePath({name: this.pathDetail, params: {id}}))
      } else {
        this.data = this.baseData()
      }

    },

    submit (event) {
      this.$store.commit("ON_LOADING", true)
      const data = this.getData(this.data)

      setObjectKeysValue(this.errors, [])

      this.$axios.post(`${this.model.name}/`, data)
        .then(response => {
          if (response.status !== 201 ) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t("success.create")).goAway(4000)
          // redirect after
          this.afterRequest(event.submitter.dataset.type, response.data.id)
        })
        .catch(error => {
          this.responseError(error).then(this.assignError)
        })

    },
  }

}
