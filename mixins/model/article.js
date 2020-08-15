export default {
  data () {
    return {
      model: {
        name: "article",
        label: this.$t("admin.label.article"),
      },
      fields: {
        title: {
          label: this.$t("admin.model.title"),
          name: "title",
          required: true,
          max_length: 50,
          help: this.$t("admin.help.model.article.title")
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
        link: {
          label: this.$t("admin.model.link"),
          name: "link",
          required: true,
          help: this.$t("admin.help.model.article.link")
        },
        date: {
          label: this.$t("admin.model.date"),
          name: "date",
          required: false,
          help: this.$t("admin.help.model.article.date")
        },
        langs: {
          title: {
            label: this.$t("admin.model.title"),
            name: "title",
            max_length: 50,
            required: true,
            help: this.$t("admin.help.model.article.langs.title")
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
      errorsField: {
        title: [],
        tags: [],
        event: [],
        link: [],
        date: [],
        langs: {
          title: [],
          language: []
        }
      }
    }
  },

}
