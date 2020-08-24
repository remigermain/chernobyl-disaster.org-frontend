<template>
  <div />
</template>

<script>
export default {
  name: "Timeline",

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

<style>

</style>
