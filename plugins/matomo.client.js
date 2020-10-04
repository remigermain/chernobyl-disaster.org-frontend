/*
  noting
*/
import Vue from "vue"
import VueMatomo from "vue-matomo"

export default ({ app, isDev }) => {
  if (!isDev) {
    Vue.use(VueMatomo, {
      router: app.router,
      host: "https://matomo.germainremi.fr",
      siteId: 2,
      trackerFileName: "matomo",
      enableLinkTracking: true,
      requireConsent: false,
      trackInitialView: true,
      disableCookies: false,
      enableHeartBeatTimer: false,
      heartBeatTimerInterval: 15,
      debug: false,
      userId: undefined,
      preInitActions: []
    })
  }
}
