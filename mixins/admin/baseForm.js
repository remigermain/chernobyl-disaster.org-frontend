export default {

  methods: {

    convertTagsData(tags) {
      // convert tags from vue multiselete to normal object
      return tags.map(o => {
        const obj =  {name: o.display_name}
        if (o.value !== -1) {
          obj.id = o.value
        }
        return obj
      })
    },

  }
}
