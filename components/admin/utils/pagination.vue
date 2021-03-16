<template>
  <div class="wrapper">
    <button
      v-if="havePrevMore"
      type="button"
      class="p-2 rounded-sm hover:bg-gray-500"
      @click="value = 1"
    >
      <svg-icon name="chevrons-left" />
    </button>
    <button
      v-if="havePrev"
      type="button"
      class="p-2 rounded-sm hover:bg-gray-500"
      @click="value -= 1"
    >
      <svg-icon name="chevron-left" />
    </button>
    <button
      v-if="havePrev"
      type="button"
      class="p-2 rounded-sm hover:bg-gray-500"
      @click="value -= 1"
    >
      {{ value - 1 }}
    </button>
    <button type="button" class="p-2 bg-blue-700 text-white rounded-sm">
      {{ value }}
    </button>
    <button
      v-if="haveNext"
      type="button"
      class="p-2 rounded-sm hover:bg-gray-500"
      @click="value += 1"
    >
      {{ value + 1 }}
    </button>
    <button
      v-if="haveNext"
      type="button"
      class="p-2 rounded-sm hover:bg-gray-500"
      @click="value += 1"
    >
      <svg-icon name="chevron-right" />
    </button>
    <button
      v-if="haveNextMore"
      type="button"
      class="p-2 rounded-sm hover:bg-gray-500"
      @click="value = end"
    >
      <svg-icon name="chevrons-right" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    length: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: false,
      default: 1
    }
  },

  data() {
    return {
      value: this.current
    }
  },

  computed: {
    end() {
      return Math.ceil(this.length / this.$pagination)
    },
    havePrev() {
      return this.value * this.$pagination > this.$pagination
    },
    havePrevMore() {
      return this.value * this.$pagination > this.$pagination * 2
    },
    haveNext() {
      return this.value * this.$pagination < this.length
    },
    haveNextMore() {
      return this.value * this.$pagination < this.length - 1
    }
  },

  watch: {
    value(newValue) {
      this.$emit('change', newValue)
      return newValue
    }
  }
}
</script>
