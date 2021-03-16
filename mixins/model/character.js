import { convertToTags } from '~/lib/contribute'
import { setObjectKeysValue } from '~/lib/utils'
import baseModel from '~/mixins/model/base'

export default {
  mixins: [baseModel],

  data() {
    return {
      model: {
        name: 'character',
        label: this.$t('menu-name.character'),
        help: this.$t('description.character')
      },
      modelField: {
        name: {
          label: this.$t('text.name-surname'),
          name: 'name',
          required: true,
          max_length: 100,
          help: this.$t('help-character.name-surname')
        },
        born: {
          label: this.$t('text.date-of-birth'),
          name: 'born',
          required: false,
          help: this.$t('help-character.date-of-birth')
        },
        death: {
          label: this.$t('text.date-of-death'),
          name: 'death',
          required: false,
          help: this.$t('help-character.date-of-death')
        },
        profil: {
          label: this.$t('text.profile-photo'),
          name: 'profil',
          required: false,
          help: this.$t('help-character.profile-photo')
        },
        tags: {
          label: this.$t('text.tags'),
          name: 'tags',
          model: 'tag',
          required: false,
          max_length: 50,
          choices: this.$store.getters['model/tags'],
          help: this.$t('description.tag')
        },
        langs: {
          biography: {
            label: this.$t('word.biography'),
            name: 'biography',
            required: true,
            help: this.$t('help-character.biography')
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
      pathList: { name: 'contribute-character' },
      pathCreate: { name: 'contribute-character-create' },
      linkDeleteLang: 'character-lang'
    }
  },

  methods: {
    pathDetail(id) {
      return { name: 'contribute-character-id', params: { id } }
    },
    pathEdit(id) {
      return { name: 'contribute-character-edit-id', params: { id } }
    },
    getData(dataValue) {
      const tags = convertToTags(dataValue.tags)
      const data = {
        ...dataValue,
        tags
      }

      /* check profil image */
      if (data.profil && data.profil._new) {
        const profil = data.profil._new
        delete data.profil

        const form = this.toFormData(data)
        form.append('profil', profil)
        return form
      } else if (data.profil) {
        delete data.profil
      }
      return data
    },

    assignError(data) {
      /* add error after request */
      data.name && (this.errors.name = data.name)
      data.born && (this.errors.born = data.born)
      data.death && (this.errors.death = data.death)
      data.profil && (this.errors.profil = data.profil)
      data.wikipedia && (this.errors.wikipedia = data.wikipedia)
      data.tags && (this.errors.tags = data.tags)
      data.langs && (this.errors.langs = data.langs)
    },

    baseData() {
      return {
        name: '',
        profil: null,
        born: null,
        death: null,
        wikipedia: '',
        tags: [],
        langs: []
      }
    },

    baseDataLang(language) {
      return { biography: '', language }
    }
  }
}
