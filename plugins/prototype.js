export default ({ app }, inject) => {
  // convert media backend to full url
  inject('media', url => `${process.env.BACKEND_URL}${url}`)

  // server pagination element
  inject('pagination', 10)
}
