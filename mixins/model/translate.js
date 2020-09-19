export default {
  data () {
    return {
      model: {
        name: "translate",
        label: this.$t("admin.label.translate"),
      },
      fields: {
        file: {
          label: this.$t("admin.model.file"),
          name: "file",
          required: true,
        },
        deleted: {
          label: this.$t("admin.model.deleted"),
          name: "deleted",
          required: false,
        },
        language: {
          label: this.$t("utils.language"),
          name: "language",
          choices: this.$store.getters["model/langs"],
          help: this.$t("admin.help.global.language"),
          display: o => this.$store.getters["model/lang"](o.language).display_name
        },
        ratio: {
          label: this.$t("utils.percentage"),
          name: "code",
          choices: this.$store.getters["model/langs"],
          display: o => `${o.ratio}%`
        }
      },
      errors: {
        file: [],
        deleted: [],
        language: []
      }
    }
  }
}
