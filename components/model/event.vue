<template>
  <model-field :label="label" :value="event" />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: null
    }
  },

  computed: {
    event () {
      if (!this.value) return null
      const event = this.$store.getters["model/event"](this.value)
      if (!event) return null
      return event.display_name
    }
  }
}
</script>

<style>

</style>
