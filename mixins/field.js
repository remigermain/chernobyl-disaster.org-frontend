/*
  mixxins for field/input components
*/

export default {

  props: {
    field: {
      type: Object,
      required: true,
    },
    errors: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ""
    },
  },

  data () {
    return {
      valueModel: this.value || "",
    }
  },

  watch: {
    value (value) {
      this.valueModel = value
      return value
    }
  }
}
