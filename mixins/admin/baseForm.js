import deleteMixins from "~/mixins/admin/delete"

export default {

  mixins: [deleteMixins],

  methods: {

    addObjLang(array, obj) {
      // add new key
      obj._new = true
      array.push(obj)
    }

  }
}
