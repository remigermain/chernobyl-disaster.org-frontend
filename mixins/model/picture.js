const errorsField = {
  title: [],
  tags: [],
  event: [],
  picture: [],
  date: [],
  langs: [{
    title: [],
    language: [],
  }]
}

export default {

  middleware({ store, $axios }) {
    return $axios.get("populate/picture")
      .then(response => {
        if (response.status != 200) {
          throw Error("error")
        }
        store.commit("model/POPULATE_PICTURE", response.data)
      })
      .catch(() => {
        // TODO
      })
  },

  data () {
    return {
      model: {
        name: "picture",
        label: this.$t("admin.label.picture"),
      },
      fields: {
        title: {
          label: this.$t("admin.model.title"),
          name: "title",
          required: true,
          max_length: 50,
          help: this.$t("help.picture.title")
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
          display: obj => this.$store.getters["model/event"](obj.event)?.display_name
        },
        picture: {
          label: this.$t("admin.model.picture"),
          name: "picture",
          required: true,
          help: this.$t("help.picture.picture")
        },
        date: {
          label: this.$t("admin.model.date"),
          name: "date",
          required: false,
          help: this.$t("help.picture.date"),
          display: obj => this.getDateYear(obj.date)
        },
        photographer: {
          label: this.$t("admin.model.photographer"),
          name: "photographer",
          model: "people",
          required: false,
          choices: this.$store.getters["model/photographers"],
          help: this.$t("help.picture.photographer"),
          display: obj => this.$store.getters["model/photographer"](obj.photographer)?.display_name
        },
        langs: {
          title: {
            label: this.$t("admin.model.title"),
            name: "title",
            max_length: 50,
            required: true,
            help: this.$t("help.picture.langs-title")
          },
          language: {
            label: this.$t("utils.language"),
            name: "language",
            required: true,
            choices: this.$store.getters["model/langs"],
            help: this.$t("help.language.global-description"),
          }
        }
      },
      errorsField,
      errors: {...errorsField}
    }
  },

}
