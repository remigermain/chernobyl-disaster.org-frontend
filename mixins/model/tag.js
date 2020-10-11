import { setObjectKeysValue } from "~/lib/utils"
import baseModel from "~/mixins/model/base"

export default {

  mixins: [baseModel],

  data () {
    return {
      model: {
        name: "tag",
        label: this.$t("admin.label.tag"),
      },
      modelField: {
        name: {
          label: this.$t("admin.model.name"),
          name: "name",
          required: true,
          max_length: 50,
          help: this.$t("help.tag.global-description")
        },
        langs: {
          name: {
            label: this.$t("admin.model.name"),
            name: "name",
            max_length: 50,
            required: true,
            help: this.$t("help.tag.langs-name")
          },
          language: {
            label: this.$t("utils.language"),
            name: "language",
            required: true,
            choices: this.$store.getters["model/langs"],
            help: this.$t("help.language.global-description")
          }
        }
      },
      errors: setObjectKeysValue(this.baseData(), []),
      pathList: {name: 'contribute-tag'},
      pathCreate: {name: 'contribute-tag-create'},
      linkDeleteLang: "tag-lang"
    }
  },

  methods: {
    pathDetail (id) {
      return {name: 'contribute-tag-id', params: {id}}
    },
    pathEdit (id) {
      return {name: 'contribute-tag-edit-id', params: {id}}
    },
    getData(dataValue) {
      return dataValue
    },

    assignError (data) {
      /* add error after request */
        data.name && (this.errors.name = data.name)
        data.langs && (this.errors.langs = data.langs)
    },

    baseData () {
      return {name: '', langs: []}
    },

    baseDataLang (language) {
      return {name: '', language}
    }
  }
}
