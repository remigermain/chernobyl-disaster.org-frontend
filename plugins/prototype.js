import Vue from "vue"
const isDev = process.env.Node_ENV !== "production"
const url = isDev ? "http://localhost:8000/": "https://chernobyl.org"

Vue.prototype.$url = url
Vue.prototype.$pagination = 10
Vue.prototype.$siteName = "chernobyl.org"
