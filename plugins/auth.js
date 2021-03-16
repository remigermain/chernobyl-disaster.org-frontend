/*
 ** plugins for nuxt-auth modules
 ** redirect on i18n routes
 */
export default ({ app }) => {
  if (app.$auth) {
    app.$auth.onRedirect(to => {
      return app.localePath(to)
    })
  }
}
