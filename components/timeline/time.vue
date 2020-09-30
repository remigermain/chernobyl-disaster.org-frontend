<template>
  <div class="wrapper">
    <time v-if="!isTimeEmpty(date)" :datetime="date.date" class="wrapper timeline-time">
      <span v-if="date.have_hour" class="items text-3xl font-bold"> {{ hours }} </span>
      <span v-if="date.have_minute" class="items text-3xl font-bold"> {{ minutes }} </span>
      <span v-if="date.have_second" class="space-items text-3xl font-bold"> {{ seconds }} </span>
      <span v-if="date.have_hour" class="italic uppercase text-gray-600 text-opacity-75 text-xs">
        {{ $t("utils.hours") }}
      </span>
      <span v-if="date.have_minute" class="italic uppercase text-gray-600 text-opacity-75 text-xs">
        {{ $t("utils.minutes") }}
      </span>
      <span v-if="date.have_second" class="italic uppercase text-gray-600 text-opacity-75 text-xs">
        {{ $t("utils.seconds") }}
      </span>
    </time>
  </div>
</template>

<script>
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
    margin: 0 .2em;
    &::after {
      content: ':';
      position: absolute;
      right: -.3em;
      top: 0;
    }
  }
}

</style>
