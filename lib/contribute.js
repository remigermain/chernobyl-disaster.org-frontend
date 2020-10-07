export function generateUrl(model, pagination, search, completed) {
  let queryParams = ""
  if (pagination) {
    queryParams += `&page=${pagination}`
  }
  if (search) {
    queryParams += `&search=${search}`
  }
  if (completed) {
    queryParams += `&completed=true`
  }

  return `${model}/?contribute=true${queryParams}`
}
