import dateMixins from "~/mixins/date"

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

  mixins: [
    dateMixins
  ],

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
          display: obj => this.getFullDate(obj.date)
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
      errorsField,
      errors: {...errorsField}
    }
  },

}
