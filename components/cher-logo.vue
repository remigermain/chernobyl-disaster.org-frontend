<template>
  <div class="font-russia text-white" v-bind="$attrs">
    <cher-nuxt-link :to="{name: 'index'}">
      <h1 class="font-linear text-chernobyl">
        {{ name }}
      </h1>
    </cher-nuxt-link>
  </div>
</template>

<script>
export default {
    props: {
        element: {
            type: Object,
            default: null
        },
        siteName: {
          type: Boolean,
          default: false
        }
    },
    computed: {
      name () {
        return this.$t("components.cher-logo.chernobyl") + (this.siteName ? ".org" : "")
      }
    }
}
</script>

<style lang="scss">

.text-chernobyl {
  font-size: 5em !important;
}

@screen -md {
  .text-chernobyl  {
    font-size: 3em !important;
  }
}

</style>
