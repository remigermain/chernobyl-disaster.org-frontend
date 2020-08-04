/*
  mixxins for field/input components
*/
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
  },

  watch: {
    value (value) {
      this.valueModel = value
      return value
    }
  },

  data () {
    return {
      valueModel: this.value
    }
  }

}
