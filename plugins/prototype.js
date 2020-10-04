import Vue from "vue"

// server pagination element
Vue.prototype.$pagination = 10

// the site name
Vue.prototype.$siteName = process.env.SITE_NAME

function toUrlBackend (url) {
  return `${process.env.BACKEND_URL}${url}`
}

Vue.prototype.$media = toUrlBackend
Vue.prototype.$static = toUrlBackend
