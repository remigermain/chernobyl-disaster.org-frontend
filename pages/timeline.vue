<template>
  <div class="wrapper">
    <div class="bg-green-500 overflow-y-scroll timeline-content">
      <nuxt-content :document="current" />
      <nuxt-content :document="current" />
    </div>
    <div class="bg-red-500">extra</div>
    <div class="bg-blue-500 col-span-2">timeline</div>
  </div>
</template>

<script>

export default {
    async asyncData() {
      return {elements: []}
    },
    data () {
      return {
        current: null
      }
    },
    created () {
      // assgine first element
      this.current = this.elements[0]
    },
    methods: {
      updateElement (element) {
        this.current = element
      }
    }
}
</script>

<style lang="scss">
.grid-timeline {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 150px;
}

.grid-home {
  grid-template-columns: 6fr 5fr;
  grid-template-rows: auto 1fr  120px;
}


.timeline-content {
  //height: calc(100% - 150px);
}
</style>
