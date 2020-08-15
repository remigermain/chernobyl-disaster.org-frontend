import iconTrash from "@/assets/svg/trash.svg"

export default {

  components: {
    iconTrash
  },

  data () {
    return {
      langs: [], // object for extra langs add
      counter: 0, // unique id for langs
      errors: {...this.object}, // error returned by api, clone actual object for access the key
    }
  },

  computed: {
    pathList () {
      return {
          label: this.model.label,
          path: {
            name: `contribute-${this.model.name}`
          },
        }
    },
    pathDetail () {
      return {
        label: this.$t("global.detail"),
        path: {
          name: `contribute-${this.model.name}-id`,
          params: this.$route.params
        }
      }
    },
    pathUpdate () {
      return {
        label: this.$t("global.update"),
        path: {
          name: `contribute-${this.model.name}-update-id`,
          params: this.$route.params
        }
      }
    },
    pathCreate () {
      return {
        label: this.$t("global.create"),
        path: {
          name: `contribute-${this.model.name}-create`
        }
      }
    }
  },

  methods: {
    assignFormData () {
      return
    },
    addLang () {
      this.langs.push(this.counter++)
    },
    deleteLang (idx) {
      this.$delete(this.langs, idx)
    },
    prefixLang (idx) {
      return `langs[${idx}]`
    }
  }

}
