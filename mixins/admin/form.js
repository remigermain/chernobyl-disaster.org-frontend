export default {

  props: {
    errors: {
      type: Object,
      required: true,
    },
    object: {
      type: Object,
      default: () => ({})
    },
    modelField: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      data: {...this.value}
    }
  },

  computed: {
    currentObj () {
      return this.data.langs.find(x => x.language === this.currentLang.value)
    },
    indexOf () {
      return this.data.langs.indexOf(this.currentObj)
    }
  },

  watch: {
    data: {
      handler (newValue) {
        this.$emit('input', newValue)
      },
      deep: true
    }
  },

  methods: {

    langExist (language) {
      return this.data.langs.find(x => x.language === language)
    },
    haveError (language) {
      const idx = this.data.langs.indexOf(this.langExist(language))
      if (this.errors.langs[idx]) {
        return !this.errors.langs[idx].length
      }
      return false
    },
    getErrorIdx(tab, idx, key) {
      return tab[idx] && tab[idx][key] || []
    },

    submitDelete(url) {
      this.$axios.delete(url)
        .then(response => {
          if (response.status !== 204) {
            throw new Error("errer-server")
          }
          this.i18nToast.success(this.$t('sucess.delete'))
        })
        .catch(error => { this.responseError(error) })

    },
    deleteObject (obj, idx) {
      if (obj._new) {
        // remove directly in array if is a new elements
        this.$delete(this.data.langs, idx)
      } else {
        this.$emit('delete', obj.id)
      }
    }

  }
}
