<template>
  <div />
</template>

<script>
import elementInView from "element-in-view-rgermain"
export default {
  props: {
    position: {
      type: String,
      default: "upper",
      validator (el) {
        return ["upper", "lower"].includes(el)
      }
    }
  },

  mounted () {
    this.isVisible()
  },

  methods: {
    isVisible () {
      if (process.client && elementInView(this.$el, {parent: this.$parent.$el, partial: true})) {
        this.$emit("visible")
        return true
      }
      return false
    }
  }

}
</script>
