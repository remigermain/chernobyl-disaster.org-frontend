import iconTrash from "@/assets/svg/trash.svg"

export default {

  components: {
    iconTrash
  },

  data () {
    return {
      langs: [], // object for extra langs add
      counter: 0, // unique id for langs
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
        label: this.$t("tools.detail"),
        path: {
          name: `contribute-${this.model.name}-id`,
          params: this.$route.params
        }
      }
    },
    pathUpdate () {
      return {
        label: this.$t("utils.update"),
        path: {
          name: `contribute-${this.model.name}-update-id`,
          params: this.$route.params
        }
      }
    },
    pathCreate () {
      return {
        label: this.$t("utils.create"),
        path: {
          name: `contribute-${this.model.name}-create`
        }
      }
    }
  },

  methods: {
    langConv (lang) {
      return this.$store.getters["model/lang"](lang).display_name
    },
    assignFormData () {},
    addLang () {
      this.langs.push(this.counter++)
    },
    deleteLang (idx) {
      this.$delete(this.langs, idx)
    },
    prefixLang (idx) {
      return `langs[${idx}]`
    },
    getErrorsIdx(tab, idx, key) {
      if (!tab) return []
      return tab[idx]?.[key] || []
    }
  }

}
