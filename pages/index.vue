<template>
  <div class="grid h-screen w-screen">
    <div class="grid-date text-center p-4">
      <cher-date :element="current" />
    </div>
    <div class="grid-logo text-center">
      <cher-logo :element="current" />
    </div>
    <div class="grid-text -sm:col-span-2">
      <cher-text :element="current" />
    </div>
    <div class="grid-extra -sm:hidden">
      <cher-extra :element="current" />
    </div>
    <div class="grid-timeline col-span-2 mx-auto my-auto">
      <cher-timeline :elements="elements" />
    </div>
  </div>
</template>

<script>
//const cherDate  = () => import("@/components/cher-date.vue")
//const cherLogo = () => import("@/components/cher-logo.vue")
//const cherText = () => import("@/components/cher-text.vue")
//const cherExtra = () => import("@/components/cher-extra.vue")
//const cherTimeline = () => import("@/components/cher-timeline.vue")

export default {
    layout: "test",
    // components: {
    //   cherDate,
    //   cherLogo,
    //   cherText,
    //   cherExtra,
    //   cherTimeline
    // },
    async asyncData({ $content }) {
      return {elements: await $content("timeline").fetch()}
    },
    data () {
      return {
        current: null
      }
    },
    beforeMount () {
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

body {
    margin: 0;
    padding: 0
}

.grid {
    display: grid;
    grid-template-columns: 7fr 3fr;
    grid-template-rows: 2fr 8fr 2fr;
}

</style>
