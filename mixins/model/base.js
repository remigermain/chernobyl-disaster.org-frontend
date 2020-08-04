import _ from "lodash"

const STATE_REDIRECT = Object.freeze({
  NO_REDIRECT: 1,
  REDIRECT_LIST: 2,
  REDIRECT_CREATE: 3,
  REDIRECT_UPDATE: 4,
  REDIRECT_DETAIL: 5,
})

export default {

  data () {
    return {
      redirectTo: null,
      dataExtra: {
        langs: []
      },
      errors: {
        ..._.clone(this.data)
      },
      loading: false,
      STATE_REDIRECT: STATE_REDIRECT
    }
  },

  computed: {
    pathList () {
      return {
          label: this.model,
          path: {
            name: `contribute-${this.model}`
          },
        }
    },
    pathDetail () {
      return {
        label: "create",
        path: {
          name: `contribute-${this.model}-id`,
          params: this.$route.params
        }
      }
    },
    pathUpdate () {
      return {
        label: "update",
        path: {
          name: `contribute-${this.model}-update-id`,
          params: this.$route.params
        }
      }
    },
    pathCreate () {
      return {
        label: "create",
        path: {
          name: `contribute-${this.model}-create`
        }
      }
    }
  },

  methods: {
    assignFormData (form, list, path) {

      // generate unique path
      const nestedPath = (form, path, key) => {
        const name = (_.isNil(path) ? key : `${path}[${key}]`)
        return `${name}${form.getAll(name)}`
      }
      // assign key value in form
      _.each(list, (value, key) => {
        if (value) {
          if (_.isObject(value) || _.isArray(value)) {
            this.assignFormData(form, value, nestedPath(form, path, key))
          } else {
            form.append(nestedPath(form, path, key), value)
          }
        }
      })
    },
    getData () {
      // return all object data
      return [
        this.data,
        this.dataExtra
      ]
    },
    mergeData() {
      // merge object data
      let data = {}
      _.each(this.getData(), (element) => {
        data = _.mergeWith(data, element, (objValue, srcValue) => {
          if (_.isArray(objValue)) {
            return objValue.concat(srcValue)
          }
        })
      })
      return data
    },
    assignFormExtraData () {
      return
    },
    noRedirect () {
      this.redirectTo = STATE_REDIRECT.NO_REDIRECT
    },
    redirectToList () {
      this.redirectTo = STATE_REDIRECT.REDIRECT_LIST
    },
    redirectToCreate () {
      this.redirectTo = STATE_REDIRECT.REDIRECT_CREATE
    },
    redirectToUpdate () {
      this.redirectTo = STATE_REDIRECT.REDIRECT_UPDATE
    },
    redirectToDetail () {
      this.redirectTo = STATE_REDIRECT.REDIRECT_DETAIL
    },
    addExtra () {
      this.dataExtra.langs.push({...this.objectLang})
    }
  }

}
