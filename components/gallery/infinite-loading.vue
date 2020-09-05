<template>
  <div class="w-full flex justify-center items-center h-1px" />
</template>

<script>
import elementInView from "element-in-view-rgermain"
export default {
  props: {
    completed: {
      type: Boolean,
      default: false
    },
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
      if (elementInView(this.$el, this.$parent.$el)) {
        this.$emit("visible")
        return true
      }
      return false
    }
  }

}
</script>
