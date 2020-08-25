<template>
  <div class="timeline border-2 border-gray-900 shadow-sm rounded-md overflow-y-scroll flex flex-col justify-center items-center hide-scroolbar">
    <div v-for="obj in listCopy" :key="obj.id" class="timeline-content mb-4">
      <div class="timeline-date flex justify-center items-center text-center flex-col px-4">
        <p class="text-3xl">
          {{ obj.date.getFullYear() }}
        </p>
        <p class="text-md italic text-gray-600">
          {{ date(obj.date) }}
        </p>
      </div>
      <section class="timeline-item">
        <div v-for="element in obj.list" :key="`${obj.id}-${element.id}`"
             class="group border-l-4 border-gray-700 bg-gray-300 p-4 border-opacity-50 cursor-pointer hover:bg-gray-400"
             @click="$emit('emit', element)"
        >
          <span class="timeline-point bg-blue-500 group-hover:bg-red-700" />
          <h3>
            {{ time(element.date) }}
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
export default {
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
      const d1 = new Date(newEl)
      if (
        d1.getFullYear() != original.getFullYear() ||
        d1.getMonth() != original.getMonth() ||
        d1.getDay() != original.getDay()
      ) {
        return true
      }
      return false
    },
    listCreate () {
      const list = []
      const objectList = this.object.sort((x, y) => x > y)
      objectList.forEach((el, idx) => {
        if (list.length == 0 || this.compareDate(list[list.length - 1], el.date)) {
          list.push({ date: new Date(el.date), id: idx, list: [el]})
        } else {
          list[list.length - 1].list.push(el)
        }
      })
      return list
    },
    date (date) {
      return date.toLocaleDateString(this.$i18n.locale, { month: "long", day: "numeric" })
    },
    time (obj) {
      const date = new Date(obj)
      if (date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0) {
        return ""
      }
      return `${date.getHours()}${this.$t("utils.hours-mini")} : ${date.getMinutes()}${this.$t("utils.minutes-mini")} : ${date.getSeconds()}${this.$t("utils.secondes-mini")}`
    }
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
}
</style>
