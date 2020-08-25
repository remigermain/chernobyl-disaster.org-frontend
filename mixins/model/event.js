const errorsField = {
  title: [],
  tags: [],
  date: [],
  langs: [{
    title: [],
    description: [],
    language: []
  }]
}

export default {
  data () {
    return {
      model: {
        name: "event",
        label: this.$t("admin.label.event"),
      },
      fields: {
        title: {
          label: this.$t("admin.model.title"),
          name: "title",
          required: true,
          max_length: 100,
          help: this.$t("admin.help.model.event.title")
        },
        tags: {
          label: this.$t("admin.model.tags"),
          name: "tags",
          model: "tag",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("admin.help.global.tag")
        },
        date: {
          label: this.$t("admin.model.date"),
          name: "date",
          required: true,
          help: this.$t("admin.help.model.event.date")
        },
        langs: {
          title: {
            label: this.$t("admin.model.title"),
            name: "title",
            max_length: 100,
            required: true,
            help: this.$t("admin.help.model.event.langs.title")
          },
          description: {
            label: this.$t("admin.model.description"),
            name: "description",
            required: true,
            help: this.$t("admin.help.model.event.langs.description")
          },
          language: {
            label: this.$t("admin.model.language"),
            name: "language",
            required: true,
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
