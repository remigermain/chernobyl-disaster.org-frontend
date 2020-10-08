export default {

  props: {
    errors: {
      type: Object,
      required: true,
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
      activeModal: false,
    }
  },

  computed: {
    currentObj () {
      return this.value.langs.find(x => x.language === this.currentLang.value)
    },
    indexOfCurrent () {
      return this.value.langs.indexOf(this.currentObj)
    }
  },

  watch: {
    value: {
      handler (newValue) {
        this.$emit('input', newValue)
      },
      deep: true
    },
  },

  methods: {

    langExist (language) {
      /* find if language have object in list of langs */
      return this.value.langs.find(x => x.language === language)
    },
    langIsNew (language) {
      /* find object lang is a new object */
      return this.langExist(language)._new
    },

    haveError (language) {
      /* find if language have error */
      const idx = this.value.langs.indexOf(this.langExist(language))
      if (this.errors.langs[idx]) {
        return Object.keys(this.errors.langs[idx]).length
      }
      return false
    },
    getErrorIdx(key) {
      /* get idx of error langs */
      const idx = this.indexOfCurrent
      return this.errors.langs[idx] && this.errors.langs[idx][key] || []
    },

    submitDelete() {
      /* remove only lang object ( only admin user ) */
      this.$store.commit("ON_LOADING")
      this.activeModal = false

      this.$axios.delete(this.urlDeleteLang(this.currentObj))
        .then(response => {
          if (response.status !== 204) {
            throw new Error("errer-server")
          }
          this.i18nToast.success(this.$t('sucess.delete'))
          // delete object
          this.$delete(this.value.langs, this.indexOfCurrent)
        })
        .catch(error => { this.responseError(error) })
        .finally(() => this.$store.commit("ON_LOADING"))

    },
    deleteObject () {
      if (this.currentObj._new) {
        /* remove directly in array if is a new elements */
        this.$delete(this.value.langs, this.indexOfCurrent)
      } else {
        this.activeModal = true
      }
    }

  }
}
