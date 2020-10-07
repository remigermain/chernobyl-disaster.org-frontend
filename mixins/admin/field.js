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
      required: false,
      default: null
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
  },


}
