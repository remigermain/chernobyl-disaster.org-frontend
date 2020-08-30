<template>
  <div class="wrapper">
    <div class="timeline-list-grid shadow-inner rounded-md border-l-8 border-yellow-600 bg-gray-800" :class="{'active': active}">
      <div id="timeline" class="timeline overflow-y-scroll flex flex-col items-center hide-scroolbar ">
        <div v-for="obj in listCopy" :key="obj.id" class="timeline-content relative z-0">
          <div class="timeline-date flex items-center text-center flex-col px-4 text-gray-200">
            <p class="text-3xl">
              {{ obj.date.getFullYear() }}
            </p>
            <p class="text-md italic text-gray-400">
              {{ getDate(obj.date) }}
            </p>
          </div>
          <section class="mr-1">
            <extra-nuxt-link v-for="element in obj.list"
                             :id="element.id"
                             :key="`${obj.id}-${element.id}`"
                             :to="{name: 'timeline', query: {'detail': element.id}}"
                             class="group block border-l-8 border-yellow-600 border-opacity-25 bg-gray-700 p-4 cursor-pointer hover:bg-gray-600 relative text-gray-200 rounded-md mt-1"
                             :class="{'bg-gray-600 border-opacity-100': current.id == element.id }"
            >
              <span class="timeline-point bg-white shadow-sm" :class="{'active': current.id == element.id }" />
              <h3 v-show="!isTimeEmpty(element.date)" class="text-xl italic">
                {{ element.date.toLocaleTimeString($i18n.locale) }}
              </h3>
              <h4 class="timeline-footer">
                {{ i18nAttr(element, 'title') }}
              </h4>
            </extra-nuxt-link>
          </section>
        </div>
        <div class="timeline-content relative" />
      </div>
      <div class="w-full flex justify-center border-t-4 border-yellow-600">
        <extra-nuxt-link :to="{name: 'timeline', query: {'detail': prevId}}" class="w-2/4 inline-block">
          <svg-icon name="arrow-left" class="h-full w-full text-gray-500 hover:text-gray-300 hover:scale-110 hover:-translate-x-2 transform transition-transform duration-400" />
        </extra-nuxt-link>
        <extra-nuxt-link :to="{name: 'timeline', query: {'detail': nextId}}" class="w-2/4 inline-block">
          <svg-icon name="arrow-right" class="h-full w-full text-gray-500 hover:text-gray-300 hover:scale-110 hover:translate-x-2 transform transition-transform duration-400" />
        </extra-nuxt-link>
      </div>
    </div>
    <div class="background-navbar" :class="{'active': active, 'hidden': !active }" @click="active = false" />
    <div class="icon-timeline rounded-r-full w-6 h-12 bg-gray-800 text-white shadow-lg" :class="{'active': active}" @click="toogleActive">
      <svg-icon name="arrow-right" />
    </div>
  </div>
</template>

<script>
import timelineMixins from "@/mixins/page/timeline"
import { timelineElement } from "@/lib/timeline"
//import { scrollIntoView} from "@/lib/scrool"
import scrollIntoView from "scroll-into-view-if-needed"

export default {

  mixins: [timelineMixins],

  props: {
    object: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      listCopy: this.listCreate(),
      current: {},
      active: false,
    }
  },

  computed: {
    hasNext () {
      return this.object.indexOf(this.current) + 1 < this.object.length
    },
    hasPrev () {
      return this.object.indexOf(this.current) > 0
    },
    nextId () {
      if (this.hasNext) {
        return this.object[this.object.indexOf(this.current) + 1].id
      }
      return this.current.id
    },
    prevId () {
      if (this.hasPrev) {
        return this.object[this.object.indexOf(this.current) - 1].id
      }
      return this.current.id
    },
  },

  watch: {
    object () {
      this.listCopy = this.listCreate()
    },
    "$route.query": {
      handler (query) {
        return this.setCurrent(timelineElement(this.object, query))
      }
    },
    current () {
     this.scroll()
    }
  },

  created() {
    return this.setCurrent(timelineElement(this.object, this.$route.query))
  },

  methods: {
    toogleActive () {
      this.active = !this.active
    },
    scroll () {
      if (process.client) {
        const el = document.getElementById(this.current.id)
        if (el) {
          scrollIntoView(el, {behavior: "smooth", scrollMode: "always"})
        }
      }
    },
    compareDate (original, newEl) {
      if (
        newEl.getFullYear() != original.getFullYear() ||
        newEl.getMonth() != original.getMonth() ||
        newEl.getDay() != original.getDay()
      ) {
        return true
      }
      return false
    },
    listCreate () {
      /*
      ** function to construct list of element
      */
      const list = []
      this.object.forEach((el, idx) => {
        if (list.length == 0 || this.compareDate(list[list.length - 1].date, el.date)) {
          list.push({ date: el.date, id: idx, list: [el]})
        } else {
          list[list.length - 1].list.push(el)
        }
      })
      return list
    },
    setCurrent (element) {
      this.$router.push({query: {"detail": element.id}})
      this.current = element
      this.scroll()
      this.$emit("select", element)
    },
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  width: 100%;
  height: 100%;
  & > *:not(:first-child) {
    margin-top: 2em;
  }
  & > *:first-child {
    margin-top: .5em;
  }
  & > *:last-child {
    margin-bottom: 2em;
  }
}

.timeline-point {
  --size: 1em;
  position: absolute;
  top: var(--size);
  // 8 px == border size
  left: calc((var(--size) + 8px) / 2 * -1);
  transform-origin: center;
  transition: transform .2s;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  &.active, &:hover {
    transform: scale(1.5);
  }
}

.timeline-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
}

.timeline-list-grid {
  grid-area: 2 / 1 / 4 / 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px;
}

.icon-timeline {
  display: none;
  position: absolute;
  top: 50vh;
  left: 0;
  cursor: pointer;
  transition: transform .5s;
}

@media screen and (max-width: 850px){
  .timeline-list-grid {
    position: absolute;
    top: 1vh;
    left: 0;
    width: 50vw;
    height: 98vh;
    transition: transform .5s;
    transform: translateX(-100%);
    &.active {
      z-index: 41;
      transform: translateX(0);
    }
  }
  .icon-timeline {
    display: flex;
    align-items: center;
    z-index: 42;
    transition: transform .5s;
    & > svg {
      transition: transform .5s;
    }
    &.active {
      transform: translateX(50vw);
      & > svg {
        transform: rotate(-180deg);
      }
    }
  }
}

.background-navbar {
  transition: background-color .2s;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  &.active {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
