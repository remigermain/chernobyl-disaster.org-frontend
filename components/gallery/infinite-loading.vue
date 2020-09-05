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
    emit () {
      this.$emit("visible")
      return true
    },
    isVisible () {
      if (this.position === "top") {
        if (this.topVisible()) {
          return this.emit()
        }
      } else if (this.bottomVisible()) {
          return this.emit()
      }
      return false
    }
  }

}
</script>
