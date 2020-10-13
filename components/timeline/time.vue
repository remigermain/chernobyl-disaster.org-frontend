<template>
  <div class="wrapper">
    <time v-if="!isTimeEmpty(date)" :datetime="date.date" class="timeline-time">
      <div v-if="date.have_hour" class="flex flex-col items min-size justify-center">
        <span class="text-3xl time font-bold dark:text-gray-500 text-center">{{ hours }}</span>
        <span class="italic uppercase text-gray-600 text-xs">
          {{ $t("word.hours") }}
        </span>
      </div>
      <div v-if="date.have_minute" class="flex flex-col items min-size justify-center">
        <span class="text-3xl time font-bold dark:text-gray-500 text-center">{{ minutes }}</span>
        <span class="italic uppercase text-gray-600 text-xs">
          {{ $t("word.minutes") }}
        </span>
      </div>
      <div v-if="date.have_second" class="flex flex-col items min-size justify-center">
        <span class="text-3xl time font-bold dark:text-gray-500 text-center">{{ seconds }}</span>
        <span class="italic uppercase text-gray-600 text-xs">
          {{ $t("word.seconds") }}
        </span>
      </div>
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
    isTimeEmpty
  }

}
</script>

<style lang="scss" scoped>

.timeline-time {
  display: flex;
  // text-align: center;
  justify-content: center;
  & > .items {
    position: relative;
    margin: 0 .2em;
    &:not(:last-child) > .time::after {
      content: ':';
      position: absolute;
      right: -.2em;
      top: 0;
    }
  }
}

.min-size {
  min-width: 40px;
  height: auto;
}

</style>
