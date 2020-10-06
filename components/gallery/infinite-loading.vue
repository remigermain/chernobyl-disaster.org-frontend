<template>
  <div />
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      required: true,
      validator (el) {
        return ["top", "bottom"].includes(el)
      }
    }
  },

  mounted () {
    this.isVisible()
  },

  methods: {
    bottomVisible() {
      return this.$el.getBoundingClientRect().top < this.$parent.$el.getBoundingClientRect().bottom
    },
    topVisible () {
      return this.$el.getBoundingClientRect().bottom > this.$parent.$el.getBoundingClientRect().top
    },
    isVisible () {
      if (this.position === "top") {
        if (this.topVisible()) {
          this.$emit("visible")
          return true
        }
      } else if (this.bottomVisible()) {
        this.$emit("visible")
        return true
      }
      return false
    }
  }

}
</script>
