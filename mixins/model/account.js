export default {
  data() {
    return {
      modelField: {
        email: {
          label: this.$t('word.email'),
          name: 'email',
          required: true,
          max_length: 50
        },
        username: {
          label: this.$t('word.username'),
          name: 'username',
          required: true,
          max_length: 50
        },
        password: {
          label: this.$t('word.password'),
          name: 'password1',
          min_length: 8,
          required: true
        },
        show_helpers: {
          label: this.$t('text.show-helper'),
          help: this.$t('description.show-helper'),
          name: 'show_helpers'
        },
        show_admin: {
          label: 'show-admin',
          help: 'show-admin',
          name: 'show_admin'
        }
      }
    }
  }
}
