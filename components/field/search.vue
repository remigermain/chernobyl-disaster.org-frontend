<template>
  <field-text
    v-model="valueModel"
    :field="{ label: $t('word.search') }"
    type="search"
    @input="$emit('input', $event)"
  >
    <template #icon>
      <svg-icon name="search" />
    </template>
    <template #icon-right>
      <transition name="opacity">
        <button
          v-show="valueModel && button"
          type="button"
          class="py-2 px-3 rounded-full font-medium text-base self-end transition-allduration-300 bg-indigo-700 hover:bg-indigo-600 text-gray-200 cursor-pointer"
          @click="$emit('search', valueModel)"
        >
          {{ $t('word.search') }}
        </button>
      </transition>
    </template>
  </field-text>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    button: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      valueModel: this.value
    }
  },

  watch: {
    value(newValue) {
      this.valueModel = newValue
    }
  }
}
</script>
