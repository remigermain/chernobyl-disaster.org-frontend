export function setObjectKeysValue(obj, _default) {
  /*
    reset all errors in object
  */
  Object.keys(obj).forEach(key => {
    obj[key] = _default
  })
  return obj
}

export function toFlatObject(data) {
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
  recursiveKey('', data)
  return obj
}
