<template>
  <span class="flex flex-wrap mt-2 justify-center items-center">
    <span v-for="tag in object" :key="tag.value" class="rounded-l-full rounded-r-full bg-blue-700 text-gray-200 text-sm py-1 px-3 mr-1 mt-1">
      {{ tag.display_name }}
    </span>
  </span>
</template>

<script>
export default {

  props: {
    object: {
      type: Array,
      required: true,
    }
  }

}
</script>
