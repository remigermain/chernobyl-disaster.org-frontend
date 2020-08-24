
export function galleryUrl(query) {
  const excludeKey = ["page"]

    return Object.keys(query).reduce((params, key) => {
      if (!excludeKey.includes(key)) {
        return `${params}&${key}=${query[key]}`
      }
      return params
    }, "")
  }

export function asynDataUrl (model, query) {
  return `${model}/?page${query.page || 1}${galleryUrl(query)}`
}
