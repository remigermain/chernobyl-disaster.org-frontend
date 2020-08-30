<template>
  <button type="submit" class="px-2 py-2 bg-blue-600 rounded text-gray-200 hover:bg-blue-700 w-full mt-4 text-center" v-bind="$attrs">
    <slot />
  </button>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
