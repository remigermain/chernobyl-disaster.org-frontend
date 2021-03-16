export default function({ $axios, store, redirect, app }) {
  // populate store with global items like tags, langs, event ..ect
  return $axios
    .get('populate/store')
    .then(response => {
      if (response.status !== 200) {
        throw new Error('error-server')
      }
      store.commit('model/POPULATE', response.data)
    })
    .catch(error => {
      store.commit('ERROR_SERVER', error.message || error)
      return redirect(app.localePath({ name: 'index' }))
    })
}
