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

    convertDate(date) {
      /* convert date */
      const _date = new Date(date.date)
      const data = {}

      if (date.hours !== undefined) {
        data.have_hour = true
        _date.setHours((date.hours || 0) - (_date.getTimezoneOffset() / 60))
      }
      if (date.hours !== undefined) {
        data.minutes = true
        _date.setMinutes(date.minutes || 0)
      }
      if (date.hours !== undefined) {
        data.seconds = true
        _date.setSeconds(date.seconds || 0)
      }
      data.date = _date.toISOString()

      return data
    },

    getErrorIdx (idx, key) {
      return this.errors[idx] && this.errors[idx][key] || []
    }

  }
}
