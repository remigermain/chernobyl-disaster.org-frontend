<template>
  <button type="submit" class="px-2 py-2 bg-indigo-600 rounded text-gray-200 hover:bg-indigo-700 mt-4 text-center" v-bind="$attrs">
    <slot />
  </button>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
