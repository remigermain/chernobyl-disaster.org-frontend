export function setObjectKeysValue (obj, _default) {
  /*
    reset all errors in object
  */
  Object.keys(obj).forEach(key => {
    obj[key] = _default
  })
  return obj
}


export function toFlatObject (data) {
  const obj = {}
  const toPath = (path, key) => (path ? `${path}[${key}]` : key)

  function recursiveKey(path, value) {
    Object.keys(value).forEach(key => {
      if (value[key] instanceof Object) {
        recursiveKey(toPath(path, key), value[key])
      } else {
        obj[toPath(path, key)] = value[key]
      }
    })
  }
  recursiveKey("", data)
  return obj
}


export function toUrl (path, query, removeNull = true) {

  const isQueryNotNull = value => value !== "" && value !== undefined && value !== null

  if (query) {
    const extra = []

    Object.keys(query).forEach(key => {
      if (removeNull || isQueryNotNull(query[key])) {
        extra.push(`${key}=${query[key]}`)
      }
    })
    if (extra.length) {
      return `${path}?${extra.join("&")}`
    }
  }
  return path
}
