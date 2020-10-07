<template>
  <div class="grid-contribute">
    <contribute-navbar :menus="menus" />
    <div class="grid-contribute-content overflow-y-scroll md:p-4 -md:pt-4 min-h-full">
      <nuxt-child :menus="menus" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Contribute",
  layout: "default",

  middleware: [
    "model",
    "auth",
  ],

  transition: "page",

  data () {
    return {
      menus: [
        {
          name: this.$t("admin.label.event"),
          help: this.$t("help.event.global-description"),
          to: {name: "contribute-event"},
          toCreate: {name: "contribute-event-create"}
        },
        {
          name: this.$t("admin.label.people"),
          help: this.$t("help.people.global-description"),
          to: {name: "contribute-people"},
          toCreate: {name: "contribute-people-create"}
        },
        {
          name: this.$t("admin.label.tag"),
          help: this.$t("help.tag.global-description"),
          to: {name: "contribute-tag"},
          toCreate: {name: "contribute-tag-create"}
        },
        {
          name: this.$t("admin.label.picture"),
          help: this.$t("help.picture.global-description"),
          to: {name: "contribute-picture"},
          toCreate: {name: "contribute-picture-create"}
        },
        {
          name: this.$t("admin.label.video"),
          help: this.$t("help.video.global-description"),
          to: {name: "contribute-video"},
          toCreate: {name: "contribute-video-create"}
        },
        {
          name: this.$t("utils.translation"),
          help: this.$t("help.translate.global-description"),
          to: {name: "contribute-translate"},
        },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.grid-contribute {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

@media screen and (max-width:1000px){
  .grid-contribute {
    display: block;
  }
}
</style>
