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
        },
        tags: {
          label: "tags",
          required: false,
          choices: this.$store.getters["model/tags"]
        },
        event: {
          label: "event",
          required: false,
          choices: this.$store.getters["model/events"]
        },
        picture: {
          label: "picture",
          required: true,
        },
        photographer: {
          label: "photographer",
          required: false,
          choices: this.$store.getters["model/photographer"]
        },
        langs: {
          title: {
            label: "title",
            max_length: 50,
          },
          language: {
            label: "language",
            requiredd: true,
            choices: this.$store.getters["model/langs"]
          }
        }
      }
    }
  },

}
