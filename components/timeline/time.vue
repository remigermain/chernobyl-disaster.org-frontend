<template>
  <div class="wrapper">
    <time v-if="!isTimeEmpty(date)" :datetime="date.date" class="wrapper timeline-time">
      <span class="items text-3xl font-bold"> {{ hours }} </span>
      <span class="items text-3xl font-bold"> {{ minutes }} </span>
      <span class="space-items text-3xl font-bold"> {{ seconds }} </span>
      <span class="italic uppercase text-gray-600 text-opacity-75 text-xs">
        {{ $t("utils.hours") }}
      </span>
      <span class="italic uppercase text-gray-600 text-opacity-75 text-xs">
        {{ $t("utils.minutes") }}
      </span>
      <span class="italic uppercase text-gray-600 text-opacity-75 text-xs">
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
      const h = this.date.date.getHours().toString()
      return (h.length === 1 ? `0${h}`: h)
    },
    minutes () {
      const h = this.date.date.getMinutes().toString()
      return (h.length === 1 ? `0${h}`: h)
    },
    seconds () {
      const h = this.date.date.getSeconds().toString()
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
