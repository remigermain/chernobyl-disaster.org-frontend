export default {

  data () {

    return {
      model: {
        name: "people",
        label: this.$t("model.name.people"),
      },
      fields: {
        name: {
          label: this.$t("model.people.name"),
          name: "name",
          required: true,
          max_length: 50,
          help: this.$t("model-help.people.name")
        },
        born: {
          label: this.$t("model.people.born"),
          name: "born",
          required: false,
          help: this.$t("model-help.people.born")
        },
        death: {
          label: this.$t("model.people.death"),
          name: "death",
          required: false,
          help: this.$t("model-help.people.death")
        },
        profil: {
          label: this.$t("model.people.profil"),
          name: "profil",
          required: false,
          help: this.$t("model-help.people.profil")
        },
        wikipedia: {
          label: this.$t("model.people.wikipedia"),
          name: "wikipedia",
          required: false,
          help: this.$t("model-help.people.wikipedia")
        },
        tags: {
          label: this.$t("model.common.tags"),
          name: "tags",
          model: "tag",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("model-help.global.tags")
        },
        langs: {
          biography: {
            label: this.$t("model.people.biography"),
            name: "biography",
            required: true,
            help: this.$t("model-help.people.biography")
          },
          language: {
            label: this.$t("model.people.language"),
            name: "language",
            required: true,
            choices: this.$store.getters["model/langs"],
            help: this.$t("model-help.global.language")
          }
        }
      }
    }
  },

}
