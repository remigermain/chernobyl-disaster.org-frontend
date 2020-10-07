
export default {
  data () {
    return {
      modelField: {
        email: {
          label: this.$t("admin.model.email"),
          name: "email",
          required: true,
          max_length: 50,
        },
        username: {
          label: this.$t("admin.model.username"),
          name: "username",
          required: true,
          max_length: 50,
        },
        password: {
          label: this.$t("admin.model.password"),
          name: "password1",
          min_length: 8,
          required: true,
        },
        show_help: {
          label: this.$t("admin.model.show-help"),
          help: this.$t("help.account.show-help"),
          name: "show_help",
        },
        default_language: {
          label: this.$t("admin.model.default-language"),
          help: this.$t("help.account.default-language"),
          name: "default_language",
          choices: this.$store.getters["model/langs"],
        },
        color_mode: {
          label: this.$t("admin.model.color-mode"),
          help: this.$t("help.account.color-mode"),
          name: "color_mode",
        }
      },
    }
  }
}
