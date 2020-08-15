const errorsField = {
  name: [],
  langs: [{
    name: [],
    language: [],
  }]
}

export default {

  data () {
    return {
      model: {
        name: "tag",
        label: this.$t("admin.label.tag"),
      },
      fields: {
        name: {
          label: this.$t("admin.model.name"),
          name: "name",
          required: true,
          max_length: 50,
          help: this.$t("admin.help.global.tag")
        },
        langs: {
          name: {
            label: this.$t("admin.model.name"),
            name: "name",
            max_length: 50,
            required: true,
            help: this.$t("admin.help.model.tag.langs.name")
          },
          language: {
            label: this.$t("admin.model.language"),
            name: "language",
            requiredd: true,
            choices: this.$store.getters["model/langs"],
            help: this.$t("admin.help.global.language")
          }
        }
      },
      errorsField,
      errors: {...errorsField}
    }
  },

}
