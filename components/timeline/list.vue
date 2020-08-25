<template>
  <div class="timeline shadow-inner border border-gray-400 bg-gray-100 rounded-md overflow-y-scroll flex flex-col justify-center items-center hide-scroolbar">
    <div v-for="obj in listCopy" :key="obj.id" class="timeline-content mb-4">
      <div class="timeline-date flex items-center text-center flex-col px-4">
        <p class="text-3xl">
          {{ obj.date.getFullYear() }}
        </p>
        <p class="text-md italic text-gray-600">
          {{ getDate(obj.date) }}
        </p>
      </div>
      <section class="timeline-item">
        <div v-for="element in obj.list" :key="`${obj.id}-${element.id}`"
             class="group border-l-4 border-gray-700 bg-gray-300 p-4 border-opacity-50 cursor-pointer hover:bg-gray-400"
             @click="$emit('select', element)"
        >
          <span class="timeline-point bg-blue-500 group-hover:bg-red-700" />
          <h3>
            {{ getTime(element.date) }}
          </h3>
          <h4 class="timeline-footer">
            {{ i18nAttr(element, 'title') }}
          </h4>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import timelineMixins from "@/mixins/page/timeline"

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
      listCopy: this.listCreate()
    }
  },

  watch: {
    object () {
      this.listCopy = this.listCreate()
    }
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
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  width: 100%;
  height: 100%;
}

.timeline-point {
  position: absolute;
  transform: translateX(calc(-1.5em - 2px));
  margin-top: auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
}

.timeline-content {
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
}
</style>
