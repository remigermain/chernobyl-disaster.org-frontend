
export const state = () => ({
  have_background: false,
})

export const mutations = {
  ACTIVE_BACKGROUND(state, value) {
    state.have_background = value
  },
}

export const getters = {
  have_background: state => state.have_background,
}
