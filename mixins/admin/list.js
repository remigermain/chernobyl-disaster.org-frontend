import { generateUrl } from "~/lib/contribute"
import deleteMixins from "~/mixins/admin/delete"

export default {

  mixins: [deleteMixins],

  data () {
    return {
      activeHelp: this.$auth.user.show_help,

      page: 1,
      pageLang: 1,

      searchValue: "",
      searchValueLang: "",
      fields: {
        id: {
          label: this.$t("utils.id"),
        },
        not_available_languages: {
          label: this.$t("utils.need-translation"),
        }
      }

    }
  },

  methods: {
    haveDeletedObject () {
      this.refresh()
      this.refreshLang()
    },

    /*
      all method for normal object
    */
    setPagination (num) {
      this.page = num
      this.refresh()
    },
    refresh () {
      const url = generateUrl(this.model.name, this.page, this.searchValue)
      // refresh for object list
      this.$axios.get(url)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("error-server")
          }
          this.object = response.data.results
          this.objectlength = response.data.count
        })
        .catch((error) => { this.responseError(error) })
    },

    /*
      all method for object langiages
    */
    setLangPagination (num) {
      this.pageLang = num
      this.refreshLang()
    },
    refreshLang () {

      const url = generateUrl(this.model.name, this.pageLang, this.searchValueLang, false)
      // refresh for object list languages
      this.$axios.get(url)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("error-server")
          }
          this.objectLang = response.data.results
          this.objectlengthLang = response.data.count
        })
        .catch((error) => { this.responseError(error) })
    }
  }
}
