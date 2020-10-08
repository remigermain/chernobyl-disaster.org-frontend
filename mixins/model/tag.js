
export default {
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
    }
  },
}
