import Vue from "vue"
const isDev = process.env.Node_ENV !== "production"
const apiUrl = isDev ? "http://localhost:8000/": "https://chernobyl.org"

Vue.prototype.$apiUrl = apiUrl
