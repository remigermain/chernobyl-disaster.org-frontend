<template>
  <button type="button" :title="$t('word.create')" class="action text-white bg-blue-700 hover:bg-blue-800" @click="$router.push(localePath(to))">
    <svg-icon name="plus" class="action-icon" />
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
    },
  },

}
</script>
