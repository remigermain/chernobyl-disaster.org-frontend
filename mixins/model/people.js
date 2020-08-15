export default {

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
          help: this.$t("admin.help.model.people.name")
        },
        born: {
          label: this.$t("admin.model.born"),
          name: "born",
          required: false,
          help: this.$t("admin.help.model.people.born")
        },
        death: {
          label: this.$t("admin.model.death"),
          name: "death",
          required: false,
          help: this.$t("admin.help.model.people.death")
        },
        profil: {
          label: this.$t("admin.model.profil"),
          name: "profil",
          required: false,
          help: this.$t("admin.help.model.people.profil")
        },
        wikipedia: {
          label: this.$t("admin.model.wikipedia"),
          name: "wikipedia",
          required: false,
          help: this.$t("admin.help.model.people.wikipedia")
        },
        tags: {
          label: this.$t("admin.model.tags"),
          name: "tags",
          model: "tag",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("admin.help.global.tag")
        },
        langs: {
          biography: {
            label: this.$t("admin.model.biography"),
            name: "biography",
            required: true,
            help: this.$t("admin.help.model.people.biography")
          },
          language: {
            label: this.$t("admin.model.language"),
            name: "language",
            required: true,
            choices: this.$store.getters["model/langs"],
            help: this.$t("admin.help.global.language")
          }
        }
      }
    }
  },

}
