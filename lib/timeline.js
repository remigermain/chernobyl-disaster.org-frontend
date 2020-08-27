import isNil from "lodash/isNil"

export function timelineElement(list, query) {
  const current = list.find(e => e.id == query.detail)
  if (isNil(current) || isNil(query.detail)) {
    // return random element
    return list[Math.floor(Math.random() * (list.length - 1))]
  } else {
    return current
  }
}
