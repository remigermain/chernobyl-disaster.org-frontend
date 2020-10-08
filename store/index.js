
export const state = () => ({
  have_background: false,
  error_server: null,
  on_loading: false
})

export const mutations = {
  ACTIVE_BACKGROUND (state, value) {
    state.have_background = value
  },
  ERROR_SERVER (state, message) {
    state.error_server = message
  },
  ON_LOADING (state, value) {
    console.log("ON_LOADING", value)
    state.on_loading = value
  }
}

export const getters = {
  have_background: state => state.have_background,
  error_server: state => state.error_server,
}
