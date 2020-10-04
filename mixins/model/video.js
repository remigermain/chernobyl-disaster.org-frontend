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
          help: this.$t("help.video.title")
        },
        tags: {
          label: this.$t("admin.model.tags"),
          name: "tags",
          model: "tag",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("help.tag.global-description")
        },
        event: {
          label: this.$t("admin.model.event"),
          name: "event",
          required: false,
          choices: this.$store.getters["model/events"],
          help: this.$t("help.event.global-description"),
          display: obj => {
            const ev = this.$store.getters["model/event"](obj.event)
            return ev && ev.display_name || null
          }
        },
        video: {
          label: this.$t("admin.model.video"),
          name: "video",
          required: true,
          help: this.$t("help.video.video")
        },
        date: {
          label: this.$t("admin.model.date"),
          name: "date",
          required: false,
          help: this.$t("help.video.date"),
          display: obj => this.getFullDate(obj.date)
        },
        langs: {
          title: {
            label: this.$t("admin.model.title"),
            name: "title",
            max_length: 50,
            required: true,
            help: this.$t("help.video.langs-title")
          },
          language: {
            label: this.$t("utils.language"),
            name: "language",
            required: true,
            choices: this.$store.getters["model/langs"],
            help: this.$t("help.language.global-description")
          }
        }
      },
      errorsField,
      errors: {...errorsField}
    }
  },

}
