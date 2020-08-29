<template>
  <div class="timeline-list-grid shadow-inner rounded-md border-l-8 border-yellow-600 bg-gray-800">
    <div id="timeline" class="timeline overflow-y-scroll flex flex-col items-center hide-scroolbar ">
      <div v-for="obj in listCopy" :key="obj.id" class="timeline-content relative">
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
            <h3>
              {{ getTime(element.date) }}
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
      current: {}
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px;
}
</style>
