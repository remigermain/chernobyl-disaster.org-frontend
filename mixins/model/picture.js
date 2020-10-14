import { convertToTags, convertToDate } from "~/lib/contribute"
import { setObjectKeysValue } from "~/lib/utils"
import baseModel from "~/mixins/model/base"

export default {

  mixins: [baseModel],

  data () {
    return {
      model: {
        name: "picture",
        label: this.$t("menu-name.picture"),
      },
      modelField: {
        title: {
          label: this.$t("text.referent-title"),
          name: "title",
          required: true,
          max_length: 50,
          help: this.$t("help-picture.referent-title")
        },
        event: {
          label: this.$t("word.event"),
          name: "event",
          required: false,
          choices: this.$store.getters["model/events"],
          help: this.$t("description.event"),
        },
        picture: {
          label: this.$t("word.picture"),
          name: "picture",
          required: true,
          help: this.$t("help-picture.picture")
        },
        date: {
          label: this.$t("word.date"),
          name: "date",
          required: false,
          help: this.$t("help-picture.date"),
        },
        tags: {
          label: this.$t("word.tags"),
          name: "tags",
          model: "tag",
          required: false,
          max_length: 50,
          choices: this.$store.getters["model/tags"],
          help: this.$t("description.tag")
        },
        langs: {
          title: {
            label: this.$t("word.title"),
            name: "title",
            max_length: 50,
            required: true,
            help: this.$t("help-picture.langs-title")
          },
          language: {
            label: this.$t("word.language"),
            name: "language",
            required: true,
            choices: this.$store.getters["model/langs"],
          }
        }
      },
      errors: setObjectKeysValue(this.baseData(), []),
      pathList: {name: 'contribute-picture'},
      pathCreate: {name: 'contribute-picture-create'},
      linkDeleteLang: "picture-lang"
    }
  },

  methods: {
    pathDetail (id) {
      return {name: 'contribute-picture-id', params: {id}}
    },
    pathEdit (id) {
      return {name: 'contribute-picture-edit-id', params: {id}}
    },
    getData(dataValue) {
      const tags = convertToTags(dataValue.tags)
      const date = convertToDate(dataValue.date)
      const data = {
        ...dataValue,
        ...date,
        tags,
      }

      /* convet event */
      if (data.event && data.event.value) {
        data.event = data.event.value
      } else if (data.event) {
        delete data.event
      }

      /* check picture image */
      if (data.picture && data.picture._new) {
        const picture = data.picture._new
        delete data.picture

        const form = this.toFormData(data)
        form.append('picture', picture)
        return form

      } else if (data.picture) {
        delete data.picture
      }
      return data
    },

    assignError (data) {
      /* add error after request */
        data.title && (this.errors.title = data.title)
        data.date && (this.errors.date = data.date)
        data.event && (this.errors.event = data.event)
        data.picture && (this.errors.picture = data.picture)
        data.tags && (this.errors.tags = data.tags)
        data.langs && (this.errors.langs = data.langs)
    },

    baseData () {
      return {title: '', picture: null, date: {}, event: null, tags: [], langs: []}
    },

    baseDataLang (language) {
      return {title: '', language}
    }
  }
}
