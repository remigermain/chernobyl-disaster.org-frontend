<template>
  <button type="button" :title="$t('word.edit')" class="action text-white bg-purple-700 hover:bg-purple-800" @click="$router.push(localePath(to))">
    <svg-icon name="edit" class="action-icon" />
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
