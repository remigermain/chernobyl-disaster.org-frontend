/*
 ** plugins pour changer le header "Accept-language" des requettes ajax
 ** par la language utilisateur
 */
export default ({ $axios, app }) => {
  $axios.onRequest((config) => {
    /* on recupere le element correspondant a la langue */
    const lang = app.i18n.locales.filter((el) => {
      return el.code === app.i18n.locale
    })[0]

    /* on construct le accept language */
    if (lang) {
      config.headers["Accept-Language"] = `${lang.iso}, ${lang.code};q=0.9, en;q=0.8, *;q=0.5`
    }

    /* on ajoute le crsf token */
    config.xsrfCookieName = "csrftoken"
    config.xsrfHeaderName = "X-CSRFToken"
  })
}
