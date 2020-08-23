
export default function galleryUrl(query) {
  const excludeKey = ["detail", "page"]

    return Object.keys(query).reduce((params, key) => {
      if (!excludeKey.includes(key)) {
        return `${params}&${key}=${query[key]}`
      }
      return params
    }, "")
  }
