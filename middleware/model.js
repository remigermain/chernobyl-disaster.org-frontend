
export default function ({$axios, store}) {
  // populate store with global items like tags, langs, event ..ect
  return $axios.get("populate/store")
    .then(response => {
      if (response.status != 200) {
        throw Error("")
      }
      store.commit("model/POPULATE", response.data)
    })
    .catch(() => {
      // TODO
    })
}
