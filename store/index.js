
export const state = () => ({
  have_background: false,
  error_server: null,
  on_loading: false
})

export const mutations = {
  ERROR_SERVER (state, message) {
    state.error_server = message
  },
  ON_LOADING (state, value) {
    state.on_loading = value
  }
}

export const getters = {
  error_server: state => state.error_server,
}
