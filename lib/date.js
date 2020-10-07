export function getDateMini (date, locale) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }
  return date.toLocaleDateString(locale, options)
}

export function isTimeEmpty(date) {
  return !date.have_second && !date.have_minute && !date.have_hour
}

export function getDate (date, locale) {
  return date.toLocaleDateString(locale, { month: "long", day: "numeric" })
}

export function getFullDate (date, locale) {
  if (!date) {
    return null
  }
  return date.toLocaleDateString(locale, {year: "numeric", month: "long", day: "numeric" })
}

export function getFullDateTime (date, locale) {
  if (!date) {
    return null
  }

  let options = {year: "numeric", month: "long", day: "numeric" }

  if (!isTimeEmpty(date)) {
    options = {...options, hour: "2-digit", minute: "2-digit", second: "2-digit"}
  }

  if (typeof date.date === "string") {
    date.date = new Date(date.date)
  }

  return date.date.toLocaleDateString(locale, options)
}
