export default {

  methods: {
    getErrorIdx(tab, idx, key) {
      return tab[idx] && tab[idx][key] || []
    }
  }
}
