import { setObjectKeysValue } from '~/lib/utils'
import deleteMixins from "~/mixins/admin/delete"

export default {

  mixins: [deleteMixins],

  props: {

    create: {
      type: Boolean,
      rquired: true,
    },

    object: {
      type: Object,
      default: null,
    }

  },

  data () {
    return {
      /* if mode is create we get default base data else the props object */
      data: (this.create ? this.baseData() : this.object),
      newLang: false,
    }
  },

  created () {
    if (this.$route.query.add) {
      const lang = this.$store.getters["model/lang"](this.$route.query.add)
      if (lang) {
        const obj = this.object.langs.find(o => o.lang === lang.value)
        if (!obj) {
          this.addLang(lang.value)
          this.newLang = true
        }
      }
    }
  },

  mounted () {
    if (process.client && this.newLang) {

      // scrol to lang view
      this.$interval = setInterval(() => {
        const el = document.getElementById(this.$route.query.add)
        if (el) {
          el.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
          clearInterval(this.$interval)
        // if inteval is more than one seconde , clear
        } else if (this.$interval >= 1000) {
          clearInterval(this.$interval)
        }
      }, 100)
    }
  },
  /*
    create or update obj
  */

  methods: {

    addLang (language) {
      this.data.langs.push({
        ...this.baseDataLang(),
        _new: true,
        language
      })
    },

    submit (event) {
      this.$store.commit("ON_LOADING", true)
      const data = this.getData(this.data)

      setObjectKeysValue(this.errors, [])


      const status = (this.create ? 201 : 200)
      const axiosPromess = (this.create ?
        this.$axios.post(`${this.model.name}/`, data) :
        this.$axios.patch(`${this.model.name}/${this.object.id}/`, data)
      )

      axiosPromess.then(response => {
        if (response.status !== status ) {
          throw new Error("error-server")
        }
        this.i18nToast.success(this.$t("success-message.create")).goAway(4000)
        // redirect after
        this.afterRequest(event.submitter.dataset.goTo, response.data.id)
      })
      .catch(error => {
        this.responseError(error).then(this.assignError)
      })
      .finally(() => { this.$store.commit("ON_LOADING", false) })
    },

    afterRequest(goTo, id) {
      if (goTo === "detail") {
        this.$router.push(this.localePath(this.pathDetail(id)))
      } else if (this.create) {
          if (goTo === "new") {
            this.$router.push(this.localePath(this.pathCreate))
          } else {
            // type == "continue", refresh data from api
            this.$nuxt.refresh()
          }
      } else if (goTo === "continue") {
        this.$router.push(this.localePath(this.pathEdit(id)))
      } else {
        this.data = this.baseData()
      }
    }
  },

  beforDestroy () {
    clearInterval(this.$interval)
  }

}
