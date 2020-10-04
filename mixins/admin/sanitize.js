import sanitizeHtml from "sanitize-html"

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

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
