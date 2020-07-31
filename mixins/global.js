export default {
  methods: {
    // shortcut for router change
    redirect(obj) {
      this.$router.push(this.localePath(obj))
    },
    // methods for logout and redirect to login page
    logout () {
      this.$auth.logout()
      this.redirect({ name: "aut-login" })
    },
    exactLink(to) {
      return this.localePath(to) == this.$route.path
    },
    StaticApiLink(link) {
      return this.$apiUrl + link
    }
  }
}
