import { convertToTags } from "~/lib/contribute"
import { setObjectKeysValue } from "~/lib/utils"
import baseModel from "~/mixins/model/base"

export default {

  mixins: [baseModel],

  data () {
    return {
      model: {
        name: "people",
        label: this.$t("menu.people"),
      },
      modelField: {
        name: {
          label: this.$t("word.name"),
          name: "name",
          required: true,
          max_length: 100,
          help: this.$t("help-people.name")
        },
        born: {
          label: this.$t("word.born"),
          name: "born",
          required: false,
          help: this.$t("help-people.born"),
        },
        death: {
          label: this.$t("word.death"),
          name: "death",
          required: false,
          help: this.$t("help-people.death"),
        },
        profil: {
          label: this.$t("word.profil"),
          name: "profil",
          required: false,
          help: this.$t("help-people.profil")
        },
        tags: {
          label: this.$t("word.tags"),
          name: "tags",
          model: "tag",
          required: false,
          max_length: 50,
          choices: this.$store.getters["model/tags"],
          help: this.$t("description.tag")
        },
        langs: {
          biography: {
            label: this.$t("word.biography"),
            name: "biography",
            required: true,
            help: this.$t("help-people.biography")
          },
          language: {
            label: this.$t("word.language"),
            name: "language",
            required: true,
            choices: this.$store.getters["model/langs"],
          }
        }
      },
      errors: setObjectKeysValue(this.baseData(), []),
      pathList: {name: 'contribute-people'},
      pathCreate: {name: 'contribute-people-create'},
      linkDeleteLang: "people-lang"
    }
  },

  methods: {
    pathDetail (id) {
      return {name: 'contribute-people-id', params: {id}}
    },
    pathEdit (id) {
      return {name: 'contribute-people-edit-id', params: {id}}
    },
    getData(dataValue) {
      const tags = convertToTags(dataValue.tags)
      const data = {
        ...dataValue,
        tags,
      }

      /* check profil image */
      if (data.profil && data.profil._new) {
        const profil = data.profil._new
        delete data.profil

        const form = this.toFormData(data)
        form.append('profil', profil)
        return form

      } else if (data.profil) {
        delete data.profil
      }
      return data
    },

    assignError (data) {
      /* add error after request */
        data.name && (this.errors.name = data.name)
        data.born && (this.errors.born = data.born)
        data.death && (this.errors.death = data.death)
        data.profil && (this.errors.profil = data.profil)
        data.wikipedia && (this.errors.wikipedia = data.wikipedia)
        data.tags && (this.errors.tags = data.tags)
        data.langs && (this.errors.langs = data.langs)
    },

    baseData () {
      return {name: "", profil: null, born: null, death: null, wikipedia: "", tags: [], langs: []}
    },

    baseDataLang (language) {
      return {biography: '', language}
    }
  }
}
