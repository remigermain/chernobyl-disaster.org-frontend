const errorsField = {
  title: [],
  tags: [],
  event: [],
  video: [],
  date: [],
  langs: [{
    title: [],
    language: [],
  }]
}

export default {
  data () {
    return {
      model: {
        name: "video",
        label: this.$t("admin.label.video"),
      },
      fields: {
        title: {
          label: this.$t("admin.model.title"),
          name: "title",
          required: true,
          max_length: 50,
          help: this.$t("admin.help.model.video.title")
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
        video: {
          label: this.$t("admin.model.video"),
          name: "video",
          required: true,
          help: this.$t("admin.help.model.video.video")
        },
        date: {
          label: this.$t("admin.model.date"),
          name: "date",
          required: false,
          help: this.$t("admin.help.model.video.date")
        },
        langs: {
          title: {
            label: this.$t("admin.model.title"),
            name: "title",
            max_length: 50,
            required: true,
            help: this.$t("admin.help.model.video.langs.title")
          },
          language: {
            label: this.$t("utils.language"),
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
