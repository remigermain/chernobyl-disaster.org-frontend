import isNil from "lodash/isNil"

export function timelineElement(list, slug) {
  if (isNil(slug)) {
    return list[Math.floor(Math.random() * (list.length - 1))]
  }
  const current = list.find(e => e.slug === slug)
  if (isNil(current)) {
    // return random element
    return list[Math.floor(Math.random() * (list.length - 1))]
  } else {
    return current
  }
}
