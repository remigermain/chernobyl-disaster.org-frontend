<template>
  <div class="wrapper">
    <time v-if="!isTimeEmpty(date)" :datetime="date" class="wrapper timeline-time w-min-content mb-1" :class="{'w-max-content': min}">
      <span class="items text-xs w-max-content">
        {{ hours }}{{ this.$t("utils.hours")[0] }}
      </span>
      <span class="items text-xs w-max-content">
        {{ minutes }}{{ this.$t("utils.minutes")[0] }}
      </span>
      <span class="space-items text-xs w-max-content">
        {{ seconds }}{{ this.$t("utils.seconds")[0] }}
      </span>
    </time>
  </div>
</template>

<script>
import timelineMixins from "@/mixins/page/timeline"

export default {

  mixins: [timelineMixins],

  props: {
    date: {
      type: [String, Date],
      default: null
    },
    min: {
      type: Boolean,
      default: false
    }

  },

  computed: {
    hours () {
      const h = this.date.getHours().toString()
      return (h.length == 1 ? `0${h}`: h)
    },
    minutes () {
      const h = this.date.getMinutes().toString()
      return (h.length == 1 ? `0${h}`: h)
    },
    seconds () {
      const h = this.date.getSeconds().toString()
      return (h.length == 1 ? `0${h}`: h)
    },
  },

}
</script>

<style lang="scss" scoped>

.space-items {
  margin: 0 .2em;
}

.timeline-time {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  & > .items {
    position: relative;
    margin: 0 .5em;
    &::after {
      content: ':';
      position: absolute;
      right: -.5em;
      top: 0;
    }
  }
}

</style>
