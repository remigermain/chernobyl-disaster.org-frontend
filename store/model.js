
export const state = () => ({
  langs: [],
  events: [],
  tags: [],
  photographers: [],
  peoples: []
})

export const mutations = {
  POPULATE(state, data) {
    state.langs = data.langs
    state.events = data.events
    state.tags = data.tags
  },
  POPULATE_PICTURE(state, data) {
    state.photographers = data.photographers
  },
  POPULATE_PEOPLES(state, data) {
    state.peoples = data.peoples
  },

}

export const getters = {
  langs: state => state.langs,
  lang: state => value => state.langs.find(t => t.value === value),

  events: state => state.events,
  event: state => value => state.events.find(t => t.value === value),

  tags: state => state.tags,
  tag: state => value => state.tags.find(t => t.value === value),

  peoples: state => state.peoples,
  people: state => value => state.peoples.find(t => t.value === value),

  photographers: state => state.photographers,
  photographer: state => value => state.photographers.find(t => t.value === value),
}
