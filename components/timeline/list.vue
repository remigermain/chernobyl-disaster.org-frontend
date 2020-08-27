<template>
  <div class="timeline shadow-inner rounded-md border-l-8 border-yellow-600 overflow-y-scroll flex flex-col justify-center items-center hide-scroolbar bg-gray-800">
    <div v-for="obj in listCopy" :key="obj.id" class="timeline-content relative">
      <div class="timeline-date flex items-center text-center flex-col px-4 text-gray-200">
        <p class="text-3xl">
          {{ obj.date.getFullYear() }}
        </p>
        <p class="text-md italic text-gray-400">
          {{ getDate(obj.date) }}
        </p>
      </div>
      <section class="">
        <extra-nuxt-link v-for="element in obj.list" :key="`${obj.id}-${element.id}`"
                         :to="{name: 'timeline', query: {'detail': element.id}}"
                         class="group block border-l-8 border-yellow-600 border-opacity-25 bg-gray-700 p-4 cursor-pointer hover:bg-gray-600 relative text-gray-200"
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
  </div>
</template>

<script>
import timelineMixins from "@/mixins/page/timeline"
import { timelineElement } from "@/lib/timeline"

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

  watch: {
    object () {
      this.listCopy = this.listCreate()
    },
    "$route.query": {
      handler (query) {
        return this.setCurrent(timelineElement(this.object, query))
      }
    }
  },

  created() {
    return this.setCurrent(timelineElement(this.object, this.$route.query))
  },

  methods: {
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
      this.$emit("select", element)
    },
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  width: 100%;
  height: 100%;
  & > * {
    margin-top: 2em;
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
</style>
