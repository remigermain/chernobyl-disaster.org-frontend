export function timelineElement(list, slug) {
  if (!slug) {
    return list[Math.floor(Math.random() * (list.length - 1))]
  }
  const current = list.find(e => e.slug === slug)
  if (!current) {
    // return random element
    return list[Math.floor(Math.random() * (list.length - 1))]
  } else {
    return current
  }
}
