export const state = () => ({
  events: [],
  has_populate: false
})

export const mutations = {
  EVENTS(state, data) {
    state.events = data
    state.has_populate = true
  }
}

export const getters = {
  events: state => state.events,
  has_populate: state => state.has_populate
}
