
export const state = () => ({
  langs: null,
  events: null,
  tags: null,
  photographer: null,
})

export const mutations = {
  POPULATE(state, data) {
    state.langs = data.langs
    state.events = data.events
    state.tags = data.tags
  },
  POPULATE_PICTURE(state, data) {
    state.photographer = data.photographer
  },

}

export const getters = {
  langs: (state) => {
    return state.langs
  },
  events: (state) => {
    return state.events
  },
  tags: (state) => {
    return state.tags
  },
  tag: (state, idx) => {
    return state.tags.find(t => t.id === idx)
  },
  lastPopulate: (state) => {
    return state.lastPopulate
  },
  photographer: (state) => {
    return state.photographer
  },
}
