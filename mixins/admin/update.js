import { setObjectKeysValue } from '~/lib/utils'
import baseFormMixins from "~/mixins/admin/baseForm"

export default {

  mixins: [baseFormMixins],

  methods: {

    addLang (language) {
      this.addObjLang(this.object.langs, this.baseDataLang(language))
    },

    submit (event) {
      this.$store.commit("ON_LOADING", true)
      const data = this.getData(this.object)

      setObjectKeysValue(this.errors, [])

      this.$axios.patch(`${this.model.name}/${this.object.id}/`, data)
        .then(response => {
          if (response.status !== 200 ) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t("success.update")).goAway(4000)
          // redirect after
          this.afterRequest(event.submitter.dataset.type, response.data.id)
        })
        .catch(error => {
          this.responseError(error).then(this.assignError)
        })
        .finally(() => { this.$store.commit("ON_LOADING", false) })
    },

    afterRequest(type, id) {
      if (type === "new") {
        this.$router.push(this.localePath(this.pathCreate))
      } else if (type === "detail") {
        this.$router.push(this.localePath(this.pathDetail(id)))
      } else {
        // type == "continue", refresh data from api
        this.$nuxt.refresh()
      }
    },

  }
}
