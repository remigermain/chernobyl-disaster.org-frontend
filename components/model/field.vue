<template>
  <span>
    <span class="detail-item-title">
      {{ label }} :
    </span>
    <span v-if="value" class="detail-item-content">
      <slot>
        {{ value }}
      </slot>
    </span>
    <span v-else class="text-sm text-gray-500 italic">
      {{ empty }}
    </span>
  </span>
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

.detail-item-content {
  font-style: italic
}
</style>
