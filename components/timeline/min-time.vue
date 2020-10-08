<template>
  <div class="wrapper">
    <time v-if="!isTimeEmpty(date)" :datetime="date.date" class="wrapper timeline-time w-min mb-1 dark:text-gray-400" :class="{'w-max': min}">
      <span v-if="date.have_hour" class="items text-xs w-max">
        {{ hours }}{{ $t("utils.hours")[0] }}
      </span>
      <span v-if="date.have_minute"  class="items text-xs w-max">
        {{ minutes }}{{ $t("utils.minutes")[0] }}
      </span>
      <span v-if="date.have_second" class="items text-xs w-max">
        {{ seconds }}{{ $t("utils.seconds")[0] }}
      </span>
    </time>
  </div>
</template>

<script>
import { isTimeEmpty } from "~/lib/date"

export default {

  props: {
    date: {
      type: Object,
      default: null
    },
    min: {
      type: Boolean,
      default: false
    }

  },

  computed: {
    hours () {
      const h = this.date.date.getUTCHours().toString()
      return (h.length === 1 ? `0${h}`: h)
    },
    minutes () {
      const h = this.date.date.getUTCMinutes().toString()
      return (h.length === 1 ? `0${h}`: h)
    },
    seconds () {
      const h = this.date.date.getUTCSeconds().toString()
      return (h.length === 1 ? `0${h}`: h)
    },
  },

  methods: {
    isTimeEmpty,
  }

}
</script>

<style lang="scss" scoped>

.timeline-time {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  & > .items {
    position: relative;
    margin: 0 .3em;
    &:not(:last-child)::after {
      content: ':';
      position: absolute;
      right: -.4em;
      top: 0;
    }
  }
}

</style>
