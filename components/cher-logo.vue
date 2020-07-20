<template>
  <div class=" text-white" v-bind="$attrs">
    <extra-nuxt-link :to="{name: 'index'}">
      <h1 class="font-linear text-chernobyl text-gray-800 uppercase">
        {{ name }}
      </h1>
    </extra-nuxt-link>
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

// .font-linear {
//     background: linear-gradient(white, rgba(var(--primary-rev), .1));
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
// }

.text-chernobyl {
  font-size: 5em !important;
}

@screen -md {
  .text-chernobyl  {
    font-size: 3em !important;
  }
}

</style>
