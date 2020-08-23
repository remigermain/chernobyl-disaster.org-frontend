<template>
  <div class="w-full flex justify-center items-center">
    <template v-if="completed">
      <slot name="completed">
        <span class="text-md text-gray-600 italic">
          {{ $t('utils.no-more') }}
        </span>
      </slot>
    </template>
    <span v-else>
      <slot name="loading">
        <svg class="animate-spin text-black h-24px w-24px" xmlns="http://www.w3.org/2000/svg" fill="none" view-box="0 0 24 24">
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
    parent: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      parentEl: null
    }
  },

  mounted () {
    this.parentEl = document.getElementById(this.parent)
    this.isVisible()
  },

  methods: {
    lower() {
      return this.$el.scrollHeight >= this.parentEl.scrollTop
    },
    upper() {
      return (this.parentEl.scrollHeight - this.parentEl.scrollTop - this.$el.scrollHeight) < this.parentEl.clientHeight
    },
    isVisible () {
      if (this.lower() || this.upper()) {
        this.$emit("visible")
      }
    }
  }

}
</script>

<style>

</style>
