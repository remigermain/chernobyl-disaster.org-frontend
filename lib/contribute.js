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
