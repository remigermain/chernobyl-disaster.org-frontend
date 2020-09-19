function randomElement (list) {
  return list[Math.floor(Math.random() * (list.length - 1))]
}
export function timelineElement(list, slug) {
  if (!slug) return randomElement(list)
  return (list.find(e => e.slug === slug) ?? randomElement(list))
}
