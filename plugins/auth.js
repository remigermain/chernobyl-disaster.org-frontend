/*
 ** plugins pour nuxt-auth modules
 ** qui redirige vers la lang definie
 */
export default ({ app }) => {
  app.$auth.onRedirect((to) => {
    return app.localePath(to)
  })
}
