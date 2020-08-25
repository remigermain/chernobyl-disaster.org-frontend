const errorsField = {
  title: [],
  tags: [],
  event: [],
  doc: [],
  date: [],
  langs: [{
    title: [],
    language: []
  }]
}

export default {
  data () {
    return {
      model: {
        name: "document",
        label: this.$t("admin.label.document"),
      },
      fields: {
        title: {
          label: this.$t("admin.model.title"),
          name: "title",
          required: true,
          max_length: 50,
          help: this.$t("admin.help.model.document.title")
        },
        tags: {
          label: this.$t("admin.model.tags"),
          name: "tags",
          model: "tag",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("admin.help.global.tag")
        },
        event: {
          label: this.$t("admin.model.event"),
          name: "event",
          required: false,
          choices: this.$store.getters["model/events"],
          help: this.$t("admin.help.global.event")
        },
        doc: {
          label: this.$t("admin.model.doc"),
          name: "doc",
          required: true,
          help: this.$t("admin.help.model.document.document")
        },
        date: {
          label: this.$t("admin.model.date"),
          name: "date",
          required: false,
          help: this.$t("admin.help.model.document.date")
        },
        langs: {
          title: {
            label: this.$t("admin.model.title"),
            name: "title",
            max_length: 50,
            required: true,
            help: this.$t("admin.help.model.document.langs.title")
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
