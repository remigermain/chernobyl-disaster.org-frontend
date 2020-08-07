export default {
  data () {
    return {
      credential: {
        email: "",
        username: "",
        password1: "",
        password2: "",
      },
      errors: {
        email: [],
        username: [],
        password1: [],
        password2: [],
      },
      field: {
        email: {
          label: this.$t("global.username"),
          required: true,
          max_length: 50,
        },
        username: {
          label: this.$t("global.email"),
          required: true,
          max_length: 50,
        },
        password: {
          label: this.$t("global.email"),
          required: true,
          max_length: 50,
        }
      }
    }
  },

  methods: {
    resetError () {
      this.errors =  {
        email: [],
        username: [],
        password1: [],
        password2: [],
      }
    },
    resetData () {
      this.credential = {
        username: "",
        email: "",
        password1: "",
        password2: "",
      }
    }
  }
}
