import {convertToTags, convertToDate} from "~/lib/contribute"
import { setObjectKeysValue } from "~/lib/utils"

export default {
  data () {
    return {
      model: {
        name: "event",
        label: this.$t("help-event.event"),
      },
      modelField: {
        title: {
          label: this.$t("word.title"),
          name: "title",
          required: true,
          max_length: 100,
          help: this.$t("help-event.title")
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
        date: {
          label: this.$t("word.date"),
          name: "date",
          required: true,
          help: this.$t("help-event.date"),
        },
        langs: {
          title: {
            label: this.$t("word.title"),
            name: "title",
            max_length: 100,
            required: true,
            help: this.$t("help-event.langs-title")
          },
          description: {
            label: this.$t("word.description"),
            name: "description",
            required: true,
            help: this.$t("help-event.langs-description")
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
      pathList: {name: 'contribute-event'},
      pathCreate: {name: 'contribute-event-create'},
      linkDeleteLang: "event-lang"
    }
  },

  methods: {
    pathDetail (id) {
      return {name: 'contribute-event-id', params: {id}}
    },
    pathEdit (id) {
      return {name: 'contribute-event-edit-id', params: {id}}
    },
    getData(dataValue) {
      const tags = convertToTags(dataValue.tags)
      const date = convertToDate(dataValue.date)
      const data = {
        ...dataValue,
        ...date,
        tags,
      }
      return data
    },

    assignError (data) {
      /* add error after request */
      data.title && (this.errors.title = data.title)
      data.date && (this.errors.date = data.date)
      data.tags && (this.errors.tags = data.tags)
      data.langs && (this.errors.langs = data.langs)
    },

    baseData () {
      return {title: "", date: {date: ""}, tags: [], langs: []}
    },

    baseDataLang (language) {
      return {title: '', description: '', language}
    }
  }

}
