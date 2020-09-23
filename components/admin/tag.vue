<template>
  <span class="bg-blue-700 text-white rounded-full flex items-center h-6">
    <div class="w-8 bg-gray-800 rounded-bl-full rounded-tl-full h-full flex justify-center items-center group hover:bg-gray-700 cursor-pointer"
         @click="$emit('close')"
    >
      <svg-icon name="x" class=" group-hover:scale-125 text-white text-lg transform transition-transform duration-300" />
    </div>
    <span class="w-full py-1 px-2 italic text-gray-400">
      {{ name }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }

}
</script>
