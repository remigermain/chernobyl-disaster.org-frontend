/*
  mixxins for field/input components
*/
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
      type: [String, Array, Number, Object],
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
    suffix: {
      type: Number,
      default: 0
    },
    inline: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    name () {
      if (this.prefix) {
        return `${this.prefix}[${this.field.name}]`
      }
      return this.field.name
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
