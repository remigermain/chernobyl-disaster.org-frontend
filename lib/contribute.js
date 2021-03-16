export function generateUrl(model, pagination, search, completed) {
  let queryParams = ''
  if (pagination) {
    queryParams += `&page=${pagination}`
  }
  if (search) {
    queryParams += `&search=${search}`
  }
  if (completed === true) {
    queryParams += `&completed=true`
  } else if (completed === false) {
    queryParams += `&completed=false`
  }

  return `${model}/?contribute=true${queryParams}`
}

export function convertFromDate(obj) {
  /* convert date for date picker and time selection */
  const data = {
    date: obj.date
  }
  const date = new Date(obj.date)

  if (obj.have_hour) {
    data.hours = date.getHours() + date.getTimezoneOffset() / 60
    if (data.hours < 0) {
      data.hours = 24 + data.hours
    }
  }
  if (obj.have_minute) {
    data.minutes = date.getMinutes()
  }
  if (obj.have_second) {
    data.seconds = date.getSeconds()
  }
  return data
}

export function convertToDate(obj) {
  /* convert date */
  const data = {
    have_hour: false,
    have_minute: false,
    have_second: false
  }

  if (!obj.date) {
    return { ...data, date: null }
  }

  const date = new Date(obj.date)

  if (
    obj.hours !== undefined ||
    obj.minutes !== undefined ||
    obj.seconds !== undefined
  ) {
    data.have_hour = true
    date.setHours((obj.hours || 0) - date.getTimezoneOffset() / 60)
  }
  if (obj.minutes !== undefined || obj.seconds !== undefined) {
    data.have_minute = true
    date.setMinutes(obj.minutes || 0)
  }
  if (obj.seconds !== undefined) {
    data.have_second = true
    date.setSeconds(obj.seconds || 0)
  }
  data.date = date.toISOString()

  return data
}

export function convertToTags(tags) {
  return tags.map(o => {
    const obj = { name: o.display_name }
    if (o.value !== -1) {
      obj.id = o.value
    }
    return obj
  })
}

export function convertImageUrl(obj, fnc) {
  Object.keys(obj).forEach(key => {
    obj[key] = fnc(obj[key])
  })
}
