export default {
  data () {
    return {
      model: {
        name: "translate",
        label: this.$t("menu.translate"),
      },
      modelField: {
        language: {
          label: this.$t("word.language"),
          name: "language",
          choices: this.$store.getters["model/langs"],
          help: this.$t("description.translate"),
        },
        ratio: {
          label: this.$t("word.percentage"),
          name: "code",
          choices: this.$store.getters["model/langs"],
        }
      },
      errors: {language: []},
      pathList: {name: 'contribute-translate'}
    }
  }
}
