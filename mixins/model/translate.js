export default {
  data () {
    return {
      model: {
        name: "translate",
        label: this.$t("admin.label.translate"),
      },
      modelField: {
        language: {
          label: this.$t("utils.language"),
          name: "language",
          choices: this.$store.getters["model/langs"],
          help: this.$t("help.language.global-description"),
        },
        ratio: {
          label: this.$t("utils.percentage"),
          name: "code",
          choices: this.$store.getters["model/langs"],
        }
      },
      errors: {language: []}
    }
  }
}
