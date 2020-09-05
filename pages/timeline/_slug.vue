<template>
  <div class="wrapper">
    <p class="timeline-date">
      <span class="text-4xl">
        {{ getDateYear(current.date) }}
      </span>
      <span v-show="!isTimeEmpty(current.date)" class="text-xl italic">
        {{ getTime(current.date) }}
      </span>
    </p>
    <h1 class="timeline-title text-4xl capitalize italic">
      <extra-nuxt-link v-if="$auth.loggedIn" :to="{name: 'contribute-event-id', params: {id: current.id}}">
        <svg-icon name="edit" class="w-8 hover:scale-110 text-purple-800 hover:text-purple-700 block transform" />
      </extra-nuxt-link>
      {{ i18nAttr(current, 'title') }}
    </h1>
    <p class="timeline-text p-4 leading-6 overflow-y-scroll">
      {{ i18nAttr(current, 'description') }}
    </p>
    <timeline-extra class="timeline-extra" :object="current" />
  </div>
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

  beforeCreate () {
    console.log("iicic")
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
</style>
