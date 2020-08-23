
export const state = () => ({
  langs: null,
  events: null,
  tags: null,
  photographer: null,
  peoples: []
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
  POPULATE_PEOPLES(state, data) {
    state.peoples = data.peoples
  },

}

export const getters = {
  langs: state => {
    return state.langs
  },
  lang: state => value => {
    return state.langs.find(t => t.value == value)
  },
  events: state => {
    return state.events
  },
  event: state => value => {
    return state.events.find(t => t.value == value)
  },
  tags: state => {
    return state.tags
  },
  tag: state => value => {
    return state.tags.find(t => t.value == value)
  },

  peoples: state => state.peoples,

  lastPopulate: state => {
    return state.lastPopulate
  },
  photographer: state => {
    return state.photographer
  },
}
