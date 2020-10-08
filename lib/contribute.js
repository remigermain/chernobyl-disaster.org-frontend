export function generateUrl(model, pagination, search, completed) {
  let queryParams = ""
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


export function convertDate (obj) {
  /* convert date for date picker and time selection */
  const data = {
    date: obj.date
  }
  const date = new Date(obj.date)

  if (obj.have_hour) {
    data.hours = (date.getHours() + (date.getTimezoneOffset() / 60))
    if (data.hours < 0) {
      data.hours = 24 + data.hours
    }
  }
  if (obj.have_minute) {
    data.minutes =  date.getMinutes()
  }
  if (obj.have_second) {
    data.seconds =  date.getSeconds()
  }
  return data

}
