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
      model: "picture",
      fields: {
        title: {
          label: "title",
          required: true,
          max_length: 50,
          help: this.$t("model-help.picture.title")
        },
        tags: {
          label: "tags",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("model-help.global.tags")
        },
        event: {
          label: "event",
          required: false,
          choices: this.$store.getters["model/events"],
          help: this.$t("model-help.global.event")
        },
        picture: {
          label: "picture",
          required: true,
          help: this.$t("model-help.picture.picture")
        },
        date: {
          label: "date",
          required: false,
          help: this.$t("model-help.picture.date")
        },
        photographer: {
          label: "photographer",
          required: false,
          choices: this.$store.getters["model/photographer"],
          help: this.$t("model-help.picture.photographer")
        },
        langs: {
          title: {
            label: "title",
            max_length: 50,
            help: this.$t("model-help.picture.langs.title")
          },
          language: {
            label: "language",
            requiredd: true,
            choices: this.$store.getters["model/langs"],
            help: this.$t("model-help.global.language")
          }
        }
      }
    }
  },

}
