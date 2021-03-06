export const state = () => ({
  langs: [],
  events: [],
  tags: [],
  characters: [],
  news: []
})

export const mutations = {
  POPULATE(state, data) {
    state.langs = data.langs
    state.events = data.events
    state.tags = data.tags
  },
  POPULATE_CHARACTERS(state, data) {
    state.characters = data.characters
  },
  POPULATE_NEWS(state, data) {
    state.news = data
  }
}

export const getters = {
  langs: state => state.langs,
  lang: state => value => state.langs.find(t => t.value === value),

  events: state => state.events,
  event: state => value => state.events.find(t => t.value === value),

  tags: state => state.tags,
  tag: state => value => state.tags.find(t => t.value === value),

  characters: state => state.characters,
  character: state => value => state.characters.find(t => t.value === value),

  news: state => state.news
}
