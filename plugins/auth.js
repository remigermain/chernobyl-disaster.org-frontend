/*
 ** plugins for nuxt-auth modules
 ** redirect on i18n routes
 */
export default ({ app }) => {
  app.$auth.onRedirect((to) => {
    return app.localePath(to)
  })
}
