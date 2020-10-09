import deleteMixins from "~/mixins/admin/delete"

export default {

  mixins: [deleteMixins],

  methods: {

    getErrorIdx (idx, key) {
      return this.errors[idx] && this.errors[idx][key] || []
    },

    addObjLang(array, obj) {
      // add new key
      obj._new = true
      array.push(obj)
    }

  }
}
