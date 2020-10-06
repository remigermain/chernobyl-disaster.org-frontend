import dateMixins from "@/mixins/date"

const errorsField = {
  name: [],
  born: [],
  death: [],
  profil: [],
  wikipedia: [],
  tags: [],
  langs: [{
    biography: [],
    language: [],
  }]
}


export default {

  mixins: [
    dateMixins
  ],

  data () {

    return {
      model: {
        name: "people",
        label: this.$t("admin.label.people"),
      },
      fields: {
        name: {
          label: this.$t("admin.model.name"),
          name: "name",
          required: true,
          max_length: 80,
          help: this.$t("help.people.name")
        },
        born: {
          label: this.$t("admin.model.born"),
          name: "born",
          required: false,
          help: this.$t("help.people.born"),
          display: obj => this.getFullDate(obj.born, false)
        },
        death: {
          label: this.$t("admin.model.death"),
          name: "death",
          required: false,
          help: this.$t("help.people.death"),
          display: obj => this.getFullDate(obj.born, false)
        },
        profil: {
          label: this.$t("admin.model.profil"),
          name: "profil",
          required: false,
          help: this.$t("help.people.profil")
        },
        wikipedia: {
          label: this.$t("admin.model.wikipedia"),
          name: "wikipedia",
          required: false,
          help: this.$t("help.people.wikipedia")
        },
        tags: {
          label: this.$t("admin.model.tags"),
          name: "tags",
          model: "tag",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("help.tag.global-description")
        },
        langs: {
          biography: {
            label: this.$t("admin.model.biography"),
            name: "biography",
            required: true,
            help: this.$t("help.people.biography")
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
      errorsField,
      errors: {...errorsField}
    }
  },

}
