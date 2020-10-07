
export const state = () => ({
  have_background: false,
  error_server: null,
})

export const mutations = {
  ACTIVE_BACKGROUND (state, value) {
    state.have_background = value
  },
  ERROR_SERVER (state, message) {
    state.error_server = message
  }
}

export const getters = {
  have_background: state => state.have_background,
  error_server: state => state.error_server,
}
