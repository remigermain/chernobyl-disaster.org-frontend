import { convertToTags, convertToDate } from "~/lib/contribute"
import { setObjectKeysValue } from "~/lib/utils"

export default {

  data () {
    return {
      model: {
        name: "video",
        label: this.$t("admin.label.video"),
      },
      modelField: {
        title: {
          label: this.$t("admin.model.title"),
          name: "title",
          required: true,
          max_length: 50,
          help: this.$t("help.video.title")
        },
        tags: {
          label: this.$t("admin.model.tags"),
          name: "tags",
          model: "tag",
          required: false,
          choices: this.$store.getters["model/tags"],
          help: this.$t("help.tag.global-description")
        },
        event: {
          label: this.$t("admin.model.event"),
          name: "event",
          required: false,
          choices: this.$store.getters["model/events"],
          help: this.$t("help.event.global-description"),
        },
        video: {
          label: this.$t("admin.model.video"),
          name: "video",
          required: true,
          help: this.$t("help.video.video")
        },
        date: {
          label: this.$t("admin.model.date"),
          name: "date",
          required: false,
          max_length: 50,
          help: this.$t("help.video.date"),
        },
        langs: {
          title: {
            label: this.$t("admin.model.title"),
            name: "title",
            max_length: 50,
            required: true,
            help: this.$t("help.video.langs-title")
          },
          language: {
            label: this.$t("utils.language"),
            name: "language",
            required: true,
            choices: this.$store.getters["model/langs"],
            help: this.$t("help.language.global-description")
          }
        }
      },
      errors: setObjectKeysValue(this.baseData(), []),
      pathList: {name: 'contribute-video'},
      pathCreate: {name: 'contribute-video-create'},
      linkDeleteLang: "video-lang"
    }
  },

  methods: {
    pathDetail (id) {
      return {name: 'contribute-video-id', params: {id}}
    },
    pathEdit (id) {
      return {name: 'contribute-video-edit-id', params: {id}}
    },
    getData(dataValue) {
      const tags = convertToTags(dataValue.tags)
      const date = convertToDate(dataValue.date)
      const data = {
        ...dataValue,
        ...date,
        tags,
      }

      /* convert event */
      if (data.event && data.event.value) {
        data.event = data.event.value
      } else if (data.event) {
        delete data.event
      }

      return data
    },

    assignError (data) {
      /* add error after request */
        data.title && (this.errors.title = data.title)
        data.date && (this.errors.date = data.date)
        data.event && (this.errors.event = data.event)
        data.video && (this.errors.video = data.video)
        data.tags && (this.errors.tags = data.tags)
        data.langs && (this.errors.langs = data.langs)
    },

    baseData () {
      return {title: '', video: '', date: {}, event: {}, tags: [], langs: []}
    },

    baseDataLang (language) {
      return {title: '', language}
    }
  }
}
