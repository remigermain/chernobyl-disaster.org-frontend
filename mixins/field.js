/*
  mixxins for field/input components
*/
import _ from "lodash"

export default {

  inheritAttrs: false,

  props: {
    field: {
      type: Object,
      required: true,
    },
    value: {
      type: [String, Array, Number],
      required: false,
      default: null
    },
    action: {
      type: Boolean,
      default: true
    },
    prefix: {
      type: String,
      default: null
    },
  },

  computed: {
    name () {
      if (!_.isNil(this.prefix)) {
        return `${this.prefix}[${this.field.label.toLowerCase()}]`
      }
      return this.field.label.toLowerCase()
    }
  },

  watch: {
    value (value) {
      this.valueModel = value
      return value
    }
  },

  data () {
    return {
      valueModel: this.value || ""
    }
  }

}
