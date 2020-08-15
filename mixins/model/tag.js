export default {

  data () {
    return {
      model: {
        name: "tag",
        label: this.$t("model.name.tag"),
      },
      fields: {
        name: {
          label: this.$t("model.tag.name"),
          name: "name",
          required: true,
          max_length: 50,
          help: this.$t("model-help.global.tag")
        },
        langs: {
          name: {
            label: this.$t("model.tag.name"),
            name: "name",
            max_length: 50,
            help: this.$t("model-help.tag.langs.name")
          },
          language: {
            label: this.$t("model.tag.language"),
            name: "language",
            requiredd: true,
            choices: this.$store.getters["model/langs"],
            help: this.$t("model-help.global.language")
          }
        }
      }
    }
  },

}
