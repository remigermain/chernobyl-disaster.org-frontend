import dateMixins from "@/mixins/date"

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

  mixins: [
    dateMixins
  ],

  middleware({ store, $axios }) {
    return $axios.get("populate/picture")
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
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
          display: obj => {
            const ev = this.$store.getters["model/event"](obj.event)
            return ev && ev.display_name || null
          }
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
          display: obj => this.getFullDate(obj.date)
        },
        photographer: {
          label: this.$t("admin.model.photographer"),
          name: "photographer",
          model: "people",
          required: false,
          choices: this.$store.getters["model/photographers"],
          help: this.$t("help.picture.photographer"),
          display: obj => {
            const ph = this.$store.getters["model/photographer"](obj.photographer)
            return ph && ph.display_name || null
          }
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
