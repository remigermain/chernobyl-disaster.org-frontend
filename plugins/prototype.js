import Vue from "vue"
import sanitizeHtml from "sanitize-html"

// server pagination element
Vue.prototype.$pagination = 10

// the site name
Vue.prototype.$siteName = process.env.SITE_NAME

// add sanitaize html for safe description
Vue.prototype.$sanitizeHtml = (value) => {
  return sanitizeHtml(value, {
    ...sanitizeHtml.defaults,
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['style']
    }
  })
}
