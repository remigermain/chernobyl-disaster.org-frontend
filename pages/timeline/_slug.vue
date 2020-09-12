<template>
  <article class="wrapper">
    <div class="timeline-date">
      <time :datetime="current.date" class="text-4xl">
        {{ getDateYear(current.date) }}
      </time>
      <div v-show="!isTimeEmpty(current.date)" :datetime="current.date" class="timeline-time">
        <span class="items text-3xl font-bold"> {{ hours }} </span>
        <span class="items text-3xl font-bold"> {{ minutes }} </span>
        <span class="text-3xl font-bold"> {{ seconds }} </span>
        <span class="italic uppercase text-gray-600 text-opacity-75 text-xs"> {{ $t('utils.hours') }} </span>
        <span class="italic uppercase text-gray-600 text-opacity-75 text-xs"> {{ $t('utils.minutes') }} </span>
        <span class="italic uppercase text-gray-600 text-opacity-75 text-xs"> {{ $t('utils.secondes') }} </span>
      </div>
    </div>
    <h1 class="timeline-title text-4xl capitalize italic text-center">
      <extra-nuxt-link v-if="$auth.loggedIn" :to="{name: 'contribute-event-id', params: {id: current.id}}"
                       :title="$t('utils.edit')"
      >
        <svg-icon name="edit"
                  class="w-8 hover:scale-110 text-purple-800 hover:text-purple-700 block transform"
        />
      </extra-nuxt-link>
      {{ i18nAttr(current, 'title') }}
    </h1>
    <section class="overflow-y-scroll">
      <p class="timeline-text p-4 leading-6">
        {{ i18nAttr(current, 'description') }}
      </p>
    </section>
    <timeline-extra class="timeline-extra" :object="current" />
  </article>
</template>

<script>
import timelineMixins from "@/mixins/page/timeline"

export default {
  name: "TimelineDetail",

  mixins: [timelineMixins],

  props: {
    current: {
      type: Object,
      required: true
    }
  },

  computed: {
    hours () {
      const h = this.current.date.getHours().toString()
      return (h.length == 1 ? `0${h}`: h)
    },
    minutes () {
      const h = this.current.date.getMinutes().toString()
      return (h.length == 1 ? `0${h}`: h)
    },
    seconds () {
      const h = this.current.date.getSeconds().toString()
      return (h.length == 1 ? `0${h}`: h)
    },
  },

  head () {
    return {
      title: this.i18nAttr(this.current, "title"),
      meta: [
          { hid: "description", name: "description", content: this.i18nAttr(this.current, "description") },
          { property: "og:title", content: this.i18nAttr(this.current, "title")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.i18nAttr(this.current, "description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.i18nAttr(this.current, "description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.i18nAttr(this.current, "title") },
          { name: "twitter:description", content: this.i18nAttr(this.current, "description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.i18nAttr(this.current, "title") }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

@media screen and (max-width: 850px){
  .timeline-date,
  .timeline-list,
  .timeline-text,
  .timeline-extra,
  .timeline-title {
    grid-area: unset !important;
  }
}

.timeline-date {
  grid-area: 1 / 1 / 1 / 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.timeline-title {
  grid-area: 1 / 2 / 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timeline-text {
  grid-area: 2 / 2 / 2 / 3;
}
.timeline-extra {
  grid-area: 3 / 2 / 4 / 3;
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
    }
  }
}
</style>