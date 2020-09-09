/*
 ** plugins for change header "Accept-language"
 */
export default ({ $axios, app }) => {
  $axios.onRequest((config) => {
    /* get langue */
    const lang = app.i18n.locales.find(el => {
      return el.code === app.i18n.locale
    })

    /* construct accept language */
    if (lang) {
      config.headers["Accept-Language"] = `${lang.code};q=0.9, ${app.i18n.defaultLocale};q=0.8, *;q=0.5`
    }

    /* add crsf token */
    config.xsrfCookieName = "csrftoken"
    config.xsrfHeaderName = "X-CSRFToken"
  })
}
