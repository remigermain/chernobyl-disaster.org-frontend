<template>
  <div class="wrapper">
    <div class="col-span-2 grid-chernobyl">
      <div class="grid-date text-center md:extra-auto">
        <cher-date :element="current" />
      </div>
      <div class="grid-logo text-center md:extra-auto">
        <cher-logo :element="current" />
      </div>
      <div class="grid-text p-4 overflow-y-scroll scrollbar">
        <cher-text :element="current" />
      </div>
      <div class="grid-extra h-inherit">
        <cher-extra :element="current" />
      </div>
      <div class="grid-timeline col-span-2 extra-auto">
        <cher-timeline :elements="elements" @change="updateElement" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
    async asyncData({ $content }) {
      return {elements: await $content("timeline").fetch()}
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

.grid-chernobyl {
    display: grid;
    grid-template-columns: 7fr 3fr;
    grid-template-rows: auto 70% 1fr;
    min-height: inherit;
    height: inherit;
    padding: 5px;
    gap: 5px;
}

@screen -md {
  .grid-chernobyl {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center
  }
  .grid-logo {
    order: -1;
  }
  .grid-text {
    height: 55%;
  }
  .grid-extra {
    display: none
  }
  .grid-timeline {
  }

}

.grid-text {
  background-color: rgba(141, 124, 124, 0.3);
  line-height: 2em;
  word-spacing: .1em;
  color: black;
  font-weight: 600;
}
</style>
