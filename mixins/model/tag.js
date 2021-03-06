import { setObjectKeysValue } from '~/lib/utils'
import baseModel from '~/mixins/model/base'

export default {
  mixins: [baseModel],

  data() {
    return {
      model: {
        name: 'tag',
        label: this.$t('menu-name.tag'),
        help: this.$t('description.tag')
      },
      modelField: {
        name: {
          label: this.$t('word.name'),
          name: 'name',
          required: true,
          max_length: 50,
          help: this.$t('help-tag.name')
        },
        langs: {
          name: {
            label: this.$t('word.name'),
            name: 'name',
            max_length: 50,
            required: true,
            help: this.$t('help-tag.langs-name')
          },
          language: {
            label: this.$t('word.language'),
            name: 'language',
            required: true,
            choices: this.$store.getters['model/langs']
          }
        }
      },
      errors: setObjectKeysValue(this.baseData(), []),
      pathList: { name: 'contribute-tag' },
      pathCreate: { name: 'contribute-tag-create' },
      linkDeleteLang: 'tag-lang'
    }
  },

  methods: {
    pathDetail(id) {
      return { name: 'contribute-tag-id', params: { id } }
    },
    pathEdit(id) {
      return { name: 'contribute-tag-edit-id', params: { id } }
    },
    getData(dataValue) {
      return dataValue
    },

    assignError(data) {
      /* add error after request */
      data.name && (this.errors.name = data.name)
      data.langs && (this.errors.langs = data.langs)
    },

    baseData() {
      return { name: '', langs: [] }
    },

    baseDataLang(language) {
      return { name: '', language }
    }
  }
}
