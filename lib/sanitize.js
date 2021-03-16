import sanitize from 'sanitize-html'

export function sanitizeHtml(value) {
  return sanitize(value, {
    ...sanitize.defaults,
    allowedAttributes: {
      ...sanitize.defaults.allowedAttributes,
      '*': ['style']
    }
  })
}

// remove all html tags
export function removeHtml(value) {
  return sanitize(value, { allowedTags: [] })
}
