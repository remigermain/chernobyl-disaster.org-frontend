<template>
  <div class="grid-timeline">
    <p class="timeline-date">
      <span class="text-6xl">
        {{ time }}
      </span>
      <span class="text-md">
        {{ date }}
      </span>
    </p>
    <h1 class="timeline-title text-4xl capitalize italic">
      {{ i18nAttr(current, 'title') }}
    </h1>
    <timeline-list class="timeline-list" :object="object" />
    <p class="timeline-text p-4">
      {{ i18nAttr(current, 'description') }}
    </p>
    <timeline-extra class="timeline-extra" :object="current" />
  </div>
</template>

<script>
export default {
  name: "Timeline",

  async asyncData({ app }) {
    return app.$axios.get("event/?no_page=true")
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
        }
        return {
          object: response.data,
          current: response.data[0]
        }
      })
  },

  data () {
    return {
      object: {}
    }
  },

  computed: {
    date () {
      const date = new Date(this.current.date)
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      return date.toLocaleDateString(this.$i18n.locale, options)
    },
    time () {
      const date = new Date(this.current.date)
      return `${date.getHours()} : ${date.getMinutes()} . ${date.getSeconds()}`
    }
  },

  head () {
    return {
      title: this.$t("pages.menu.timeline"),
      meta: [
          { hid: "description", name: "description", content: this.$t("pages.meta.timeline.description") },
          { property: "og:title", content: this.$t("pages.meta.timeline.title")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.$t("pages.meta.timeline.description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.$t("pages.meta.timeline.description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.$t("pages.meta.timeline.title") },
          { name: "twitter:description", content: this.$t("pages.meta.timeline.description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.$t("pages.meta.timeline.title") }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-timeline {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr 200px;
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
