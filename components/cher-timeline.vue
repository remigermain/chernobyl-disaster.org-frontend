<template>
  <div class="flex justify-center flex-wrap bg-black  bg-opacity-50 sm:flex-no-wrap items-center rounded-md">
    <div class="p-4 h-24 flex justify-start items-center
      timeline-parent overflow-x-scroll relative sm:order-2 sm:w-2/4"
         @mousedown="enabled"
         @mouseup="disabled"
         @mouseleave="disabled"
         @mousemove="move"
    >
      <section class="text-gray-500 relative whitespace-no-wrap select-none">
        <ol class="px-4 list-none timeline">
          <li v-for="(el, idx) in elements" :id="generateId(idx)" :key="idx" class="timeline-item inline relative z-10
          cursor-default"
              :class="{'active': idx == currentShow}"
              @mouseover="disabled"
              @click="moveIdx(idx)"
          >
            <span class="timeline-point" />
            <span class="timeline-join" />
          </li>
        </ol>
      </section>
    </div>
    <button class="px-2 py-2 h-full timeline-button  sm:order-1 w-2/4 sm:w-auto" @click="prevIdx">
      <img class="w-4 sm:w-12 mx-auto" src="~assets/img/previous.svg">
    </button>
    <button class="px-2 py-2 h-full  timeline-button sm:order-3 w-2/4 sm:w-auto" @click="nextIdx">
      <img class="w-4 sm:w-12 mx-auto" src="~assets/img/next.svg">
    </button>
  </div>
</template>

<script>

export default {
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      click: false,
      clickPos: -1,
      elPos: -1,
      currentShow: -1,
      timeline: null
    }
  },
  mounted () {
    // timeline vaut le premier enfant
    this.timeline = this.$el.childNodes[0]
  },
  methods: {
    generateId (idx) {
      return `timeline-${idx}`
    },
    enabled (event) {
      this.click = true
      this.clickPos = event.x
      this.elPos = this.timeline.scrollLeft
    },
    disabled () {
      this.click = false
    },
    move (event) {
      if (this.click) {
        /*
          calcul de la posiitio original du click
          moin la position de la souris
          plus la position original de l'element
        */
        let delta = this.elPos - (event.x - this.clickPos)
        delta = Math.max(Math.min(delta, this.timeline.scrollWidth), 0)
        this.timeline.scrollTo(delta, 0)
      }
    },
    middleTimeline() {
      // recupere le millieu de la zone de timeline
      return (this.timeline.offsetWidth / 2) - 40
    },
    moveTo (el, idx) {
      /*
        calulc la largeur de l'element / 2 pour le millieu
        on soustrait le x du click
        et on ajout/enleve le delta de la position original
      */
      const delta = el.offsetLeft - this.middleTimeline()
      this.timeline.scrollTo(delta, 0)
      this.currentShow = idx
      console.log(this.elements[idx])
      this.$emit("change", this.elements[idx])
    },
    moveIdx(idx) {
      this.moveTo(document.getElementById(this.generateId(idx)), idx)
    },
    prevIdx () {
      this.moveIdx(Math.max(this.currentShow - 1, 0))
    },
    nextIdx () {
      this.moveIdx(Math.min(this.currentShow + 1, this.elements.length - 1))
    },
  }
}
</script>

<style lang="scss">

.timeline-parent {
  cursor: ew-resize;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* point active element */
.timeline-point:hover, .timeline-item.active .timeline-point {
  transform: scale(2);
}

.timeline {
  & > * + * {
    padding-left: 1em;
  }
}

.timeline-item:nth-child(even) .timeline-point {
  background-color: rgb(92, 92, 92);
}

.timeline-point {
  display: inline-block;
  margin-top: auto;
  width: 1em;
  height: 1em;
  background-color: rgb(170, 170, 170);
  border-radius: 50%;
  transition: transform .2s;
  cursor: pointer;
}

.timeline-join {
  --size-join: .1em;
  display: inline-block;
  position: absolute;
  width: 100%;
  z-index: -1;
  top: calc(50% - var(--size-join));
  left: 0;
  height: var(--size-join);
  background-color: rgb(170, 170, 170);
}

.timeline-center {
  position: fixed;
  left: 50%;
  background-color: red;
  height: 100%;
  width: 2em;
}

.timeline-button {
  transition: transform .2s;
}
.timeline-button:hover {
  transform: scale(1.3);
}
</style>
