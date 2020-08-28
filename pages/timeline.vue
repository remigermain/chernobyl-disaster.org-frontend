<template>
  <div class="grid-timeline">
    <p class="timeline-date">
      <span class="text-3xl">
        {{ getDateYear(current.date) }}
      </span>
      <span v-show="!isTimeEmpty(current.date)" class="text-lg italic">
        {{ getTime(current.date) }}
      </span>
    </p>
    <h1 class="timeline-title text-4xl capitalize italic">
      {{ i18nAttr(current, 'title') }}
    </h1>
    <timeline-list class="timeline-list" :object="object" @select="setCurrent" />
    <p class="timeline-text p-4 leading-6 overflow-y-scroll">
      {{ i18nAttr(current, 'description') }}
    </p>
    <timeline-extra class="timeline-extra" :object="current" />
  </div>
</template>

<script>
import timelineMixins from "@/mixins/page/timeline"
import { timelineElement } from "@/lib/timeline"

export default {
  name: "Timeline",

  mixins: [timelineMixins],

  async asyncData({ app, route }) {
    return app.$axios.get("event/?no_page=true")
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
        }
        // change date string to Date object
        const result = response.data.map(el => {
          el.date = new Date(el.date)
          return el
        })

        // simulate many event
        let results = [
            ...result.map(x => {return {...x, id: x.id *1 }}),
          ...result.map(x => {return {...x, id: x.id * 10}}),
          ...result.map(x => {return {...x, id: x.id * 100}}),
          ...result.map(x => {return {...x, id: x.id * 1000}})]
        return {
          object: results,
          current: timelineElement(results, route.query)
        }
      })
  },

  methods: {
    setCurrent (obj) {
      this.current = obj
    }
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
.grid-timeline {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 80px 1fr 200px;
  height: 100%;
  gap: .5em .5em;
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
.timeline-list {
  grid-area: 2 / 1 / 4 / 1;
}
.timeline-text {
  grid-area: 2 / 2 / 2 / 3;
}
.timeline-extra {
  grid-area: 3 / 2 / 4 / 3;
}
</style>
