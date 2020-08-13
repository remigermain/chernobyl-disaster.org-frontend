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
          label: this.$t("model.picture.title"),
          name: "title",
          required: true,
          max_length: 50,
          help: this.$t("model-help.picture.title")
        },
        tags: {
          label: this.$t("model.common.tags"),
          name: "tags",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("model-help.global.tags")
        },
        event: {
          label: this.$t("model.picture.event"),
          name: "event",
          required: false,
          choices: this.$store.getters["model/events"],
          help: this.$t("model-help.global.event")
        },
        picture: {
          label: this.$t("model.picture.picture"),
          name: "picture",
          required: true,
          help: this.$t("model-help.picture.picture")
        },
        date: {
          label: this.$t("model.picture.date"),
          name: "date",
          required: false,
          help: this.$t("model-help.picture.date")
        },
        photographer: {
          label: this.$t("model.picture.photographer"),
          name: "photographer",
          required: false,
          choices: this.$store.getters["model/photographer"],
          help: this.$t("model-help.picture.photographer")
        },
        langs: {
          title: {
            label: this.$t("model.picture.title"),
            name: "title",
            max_length: 50,
            help: this.$t("model-help.picture.langs.title")
          },
          language: {
            label: this.$t("model.picture.language"),
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
