<template>
  <div class="w-full flex justify-center items-center h-min-content">
    <template v-if="completed">
      <slot name="completed">
        <span class="text-md text-gray-600 italic p-4">
          {{ $t('utils.no-more') }}
        </span>
      </slot>
    </template>
    <span v-else>
      <slot name="loading">
        <svg class="animate-spin text-black h-24px w-24px p-4" xmlns="http://www.w3.org/2000/svg" fill="none" view-box="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        {{ $t('utils.loading') }}
      </slot>
    </span>
  </div>
</template>

<script>
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
    lower() {
      return this.$el.clientHeight >= this.$parent.$el.scrollTop
    },
    upper() {
      return (this.$parent.$el.scrollHeight  - this.$parent.$el.scrollTop - this.$parent.$el.clientHeight) < this.$el.clientHeight
    },
    isVisible () {
      if (this.position === "lower") {
        if (this.lower()) {
          this.$emit("visible")
          return true
        }
      } else if (this.upper()) {
        this.$emit("visible")
        return true
      }
      return false
    }
  }

}
</script>
