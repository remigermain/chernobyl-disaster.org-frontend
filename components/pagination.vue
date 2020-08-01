<template>
  <div class="text-center mt-2 pagination-parent">
    <button v-if="havePrevMore" class="p-2 rounded-sm hover:bg-gray-500" @click="value = 1">
      <icon-chevrons-left />
    </button>
    <button v-if="havePrev" class="p-2 rounded-sm hover:bg-gray-500" @click="value -= 1">
      <icon-chevron-left />
    </button>
    <button v-if="havePrev" class="p-2 rounded-sm hover:bg-gray-500" @click="value -= 1">
      {{ value - 1 }}
    </button>
    <button class="p-2 bg-blue-700 text-white rounded-sm">
      {{ value }}
    </button>
    <button v-if="haveNext" class="p-2 rounded-sm hover:bg-gray-500" @click="value += 1">
      {{ value + 1 }}
    </button>
    <button v-if="haveNext" class="p-2 rounded-sm hover:bg-gray-500" @click="value += 1">
      <icon-chevron-right />
    </button>
    <button v-if="haveNextMore" class="p-2 rounded-sm hover:bg-gray-500" @click="value = end">
      <icon-chevrons-right />
    </button>
  </div>
</template>

<script>
import iconChevronsRight from "@/assets/svg/chevrons-right.svg"
import iconChevronsLeft from "@/assets/svg/chevrons-left.svg"
import iconChevronRight from "@/assets/svg/chevron-right.svg"
import iconChevronLeft from "@/assets/svg/chevron-left.svg"
export default {
  components: {
    iconChevronsRight,
    iconChevronsLeft,
    iconChevronRight,
    iconChevronLeft
  },
  props: {
    length: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: false,
      default: 1
    },
  },

  data () {
    return {
      value: this.current
    }
  },

  computed: {
    end () {
      return  Math.ceil(this.length / this.$pagination)
    },
    havePrev () {
      return (this.value * this.$pagination) > this.$pagination
    },
    havePrevMore () {
      return (this.value * this.$pagination) > (this.$pagination * 2)
    },
    haveNext () {
      return (this.value * this.$pagination) < this.length
    },
    haveNextMore () {
      return (this.value * this.$pagination) < this.length - 1
    },
  },

  watch: {
    value (newValue) {
      this.$emit("change", newValue)
      return newValue
    },
  }
}
</script>

<style lang="scss">
</style>
