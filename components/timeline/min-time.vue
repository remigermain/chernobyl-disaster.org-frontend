<template>
  <div class="wrapper">
    <time v-if="!isTimeEmpty(date)" :datetime="date.date" class="wrapper timeline-time w-min-content mb-1" :class="{'w-max-content': min}">
      <span v-if="date.have_hour" class="items text-xs w-max-content">
        {{ hours }}{{ this.$t("utils.hours")[0] }}
      </span>
      <span v-if="date.have_minute"  class="items text-xs w-max-content">
        {{ minutes }}{{ this.$t("utils.minutes")[0] }}
      </span>
      <span v-if="date.have_second" class="items text-xs w-max-content">
        {{ seconds }}{{ this.$t("utils.seconds")[0] }}
      </span>
    </time>
  </div>
</template>

<script>
import dateMixinx from "@/mixins/date"

export default {

  mixins: [
    dateMixinx
  ],

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
