<template>
  <div class="wrapper">
    <component :is="'style'">
      .grid-home {
      grid-template-columns: 6fr 5fr;
      grid-template-rows: auto 1fr 250px;
      }
    </component>
    <div class="bg-green-500 overflow-y-scroll timeline-content" />
    <div class="bg-red-500">
      extra
    </div>
    <div class="bg-blue-500 col-span-2">
      timeline
    </div>
  </div>
</template>

<script>

export default {
    //layout: "dd",
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
    },
}
</script>
