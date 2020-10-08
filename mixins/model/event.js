
export default {
  data () {
    return {
      model: {
        name: "event",
        label: this.$t("admin.label.event"),
      },
      modelField: {
        title: {
          label: this.$t("admin.model.title"),
          name: "title",
          required: true,
          max_length: 100,
          help: this.$t("help.event.title")
        },
        tags: {
          label: this.$t("admin.model.tags"),
          name: "tags",
          model: "tag",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("help.tag.global-description")
        },
        date: {
          label: this.$t("admin.model.date"),
          name: "date",
          required: true,
          help: this.$t("help.event.date"),
        },
        langs: {
          title: {
            label: this.$t("admin.model.title"),
            name: "title",
            max_length: 100,
            required: true,
            help: this.$t("help.event.langs-title")
          },
          description: {
            label: this.$t("admin.model.description"),
            name: "description",
            required: true,
            help: this.$t("help.event.langs-description")
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
      errors: {
        title: [],
        date: [],
        tags: [],
        langs: []
      },
      pathCreate: "contribute-event",
      pathDetail: "contribute-event-id",
      pathUpdate: "contribute-event-update-id",
    }
  },

  methods: {
    getData(dataValue) {
      const tags = dataValue.tags.map(o => {
        const obj =  {name: o.display_name}
        if (o.value !== -1) {
          obj.id = o.value
        }
        return obj
      })
      const data = {
        ...dataValue,
        ...dataValue.date,
        tags,
      }
      return data
    },

    assignError (data) {
      /* add error after request */
      data.title && (this.errors.title = data.title)
      data.date && (this.errors.date = data.date)
      data.tags && (this.errors.tags = data.tags)
      data.langs && (this.errors.langs = data.langs)
    },
  }

}
