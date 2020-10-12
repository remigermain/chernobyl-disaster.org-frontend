
export default {
  data () {
    return {
      modelField: {
        email: {
          label: this.$t("word.email"),
          name: "email",
          required: true,
          max_length: 50,
        },
        username: {
          label: this.$t("word.username"),
          name: "username",
          required: true,
          max_length: 50,
        },
        password: {
          label: this.$t("word.password"),
          name: "password1",
          min_length: 8,
          required: true,
        },
        show_help: {
          label: this.$t("text.show-help"),
          help: this.$t("help-account.show-help"),
          name: "show_help",
        },
        show_admin: {
          label: this.$t("text.show-admin"),
          help: this.$t("help-account.show-admin"),
          name: "show_admin",
        },
      },
    }
  }
}
