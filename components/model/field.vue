<template>
  <span>
    <span class="detail-item-title">
      {{ field.label }} :
    </span>
    <span v-if="value" class="detail-item-content">
      <template v-if="!$slots.default">
        {{ field.display ? field.display(value) : value[field.name] || value }}
      </template>
      <slot v-else />
    </span>
    <span v-else class="text-sm text-gray-500 italic">
      {{ empty }}
    </span>
  </span>
</template>

<script>
export default {

  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Number, Object],
      default: null
    },
  }

}
</script>

<style>
.detail-item-title {
  color: rgba(77, 77, 77, 0.5);
  font-style: italic;
  text-transform: capitalize;
}

.dark .detail-item-title {
  @apply text-gray-600
}

.detail-item-content {
  font-style: italic
}
</style>
