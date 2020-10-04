import sanitizeHtml from "sanitize-html"

export default {
  methods: {

    // add sanitaize html for safe description
    $sanitizeHtml (value) {
      return sanitizeHtml(value, {
        ...sanitizeHtml.defaults,
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          '*': ['style']
        }
      })
    }
  }
}
