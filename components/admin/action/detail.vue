<template>
  <button
    type="button"
    :title="$t('word.detail')"
    class="action text-white bg-blue-700 hover:bg-blue-800"
    @click="$router.push(localePath(to)) && $emit('click')"
  >
    <svg-icon name="eye" class="action-icon" />
    <span v-if="$slots.default" class="mx-2">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true
    }
  }
}
</script>
