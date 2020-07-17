<template>
  <div class="flex justify-center p-8 flex-col h-full w-full">
    <div class="w-full text-center text-5xl text-md text-gray-300">
      20 
      <span class="text-white">:</span>
      50
    </div>
    <div class="w-full h-full">
      components
    </div>
    <div class="w-full self-end">
      <timeline />
    </div>
  </div>
</template>

<script>
const timeline = () => import("~/components/timeline.vue")
export default {
  components: { timeline },
  data () {
    return {
    }
  }
}
</script>