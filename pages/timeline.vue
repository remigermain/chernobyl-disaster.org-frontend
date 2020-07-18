<template>
  <div class="grid h-screen w-screen">
    <div class="grid-date text-center p-4">
      <cher-date :element="current" />
    </div>
    <div class="grid-logo text-center my-auto">
      <cher-logo :element="current" />
    </div>
    <div class="grid-text -sm:col-span-2 overflow-y-scroll rounded mx-2">
      <cher-text :element="current" />
    </div>
    <div class="grid-extra -md:hidden">
      <cher-extra :element="current" />
    </div>
    <div class="grid-timeline col-span-2 mx-auto my-auto">
      <cher-timeline :elements="elements" @change="updateElement"/>
    </div>
  </div>
</template>

<script>

export default {
    layout: "test",
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

body {
    margin: 0;
    padding: 0
}

.grid {
    display: grid;
    grid-template-columns: 7fr 4fr;
    grid-template-rows: 2fr 8fr 2fr;
}
@screen -xl {
  .grid {
    grid-template-columns: 7fr 5fr;
  }
}


@screen -md {
  .grid {
    display: flex;
    flex-direction: column;
  }
  .grid-logo {
    order: -1;
  }
  .grid-date {
    padding: 0;
  }
  .grid-timeline {
    padding-top: .5em;
  }
}

.grid-text {
  //background-color: rgba(0, 0, 0, .5);
  background-color: rgba(255, 255, 255, .3);
  line-height: 2em;
  word-spacing: .1em;
  //color: rgb(211, 211, 211);
  color: black;
  font-weight: 600;
}

.grid-text::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
.grid-text::-webkit-scrollbar-track {
}

.grid-text::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, .9);
}
.grid-text::-webkit-scrollbar-thumb:hover {
  background: rgba(50, 50, 50, .5);
}

</style>
