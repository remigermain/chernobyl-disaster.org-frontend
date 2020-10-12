<template>
  <div class="no-visible"/>
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
    if (process.client) {
      this.$observer = new IntersectionObserver(this.isVisible)
      console.log(this.$el)
      this.$observer.observe(this.$el)
    }
  },

  methods: {
    isVisible () {
      console.log("isVisible")
      this.$emit('visible')
    }
  }

}
</script>


<style scoped>
.no-visible {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
}
</style>
