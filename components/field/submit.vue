<template>
  <button type="submit" class="p-2 bg-indigo-600 rounded text-white hover:bg-indigo-700 mt-4 text-center" v-bind="$attrs">
    <slot />
  </button>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
