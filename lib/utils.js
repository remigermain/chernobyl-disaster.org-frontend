export function setObjectKeysValue (obj, _default) {
  /*
    reset all errors in object
  */
  Object.keys(obj).forEach(key => {
    obj[key] = _default
  })
  return obj
}
