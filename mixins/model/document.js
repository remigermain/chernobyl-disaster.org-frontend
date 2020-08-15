export default {
  data () {
    return {
      model: {
        name: "document",
        label: this.$t("model.name.document"),
      },
      fields: {
        title: {
          label: this.$t("model.document.title"),
          name: "title",
          required: true,
          max_length: 50,
          help: this.$t("model-help.document.title")
        },
        tags: {
          label: this.$t("model.common.tags"),
          name: "tags",
          model: "tag",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("model-help.global.tags")
        },
        event: {
          label: this.$t("model.document.event"),
          name: "event",
          required: false,
          choices: this.$store.getters["model/events"],
          help: this.$t("model-help.global.event")
        },
        doc: {
          label: this.$t("model.document.doc"),
          name: "doc",
          required: true,
          help: this.$t("model-help.document.document")
        },
        date: {
          label: this.$t("model.document.date"),
          name: "date",
          required: false,
          help: this.$t("model-help.document.date")
        },
        langs: {
          title: {
            label: this.$t("model.document.title"),
            name: "title",
            max_length: 50,
            help: this.$t("model-help.document.langs.title")
          },
          language: {
            label: this.$t("model.document.language"),
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
