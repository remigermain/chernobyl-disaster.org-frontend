/*
  mixxins for field/input components
*/
import _ from "lodash"

import fieldInline  from "@/components/admin/inline"
import fieldBase  from "@/components/admin/base"

export default {

  components: {
    fieldInline,
    fieldBase,
  },

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
    inline: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    name () {
      if (!_.isNil(this.prefix)) {
        return `${this.prefix}[${this.field.label.toLowerCase()}]`
      }
      return this.field.label.toLowerCase()
    },
    component () {
      return (this.inline ? "field-inline" : "field-base")
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
      valueModel: this.value || "",
      fieldCopy: {...this.field}

    }
  }

}
