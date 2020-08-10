<template>
  <infinite-loading class="w-full" :identifier="identifier" @infinite="$emit('infinite', $event)">
    <div slot="spinner">
      {{ $t('global.loading') }}
    </div>
    <div slot="no-more">
      {{ $t('global.no-more') }}
    </div>
    <div slot="no-results">
      {{ $t('global.no-results') }}
    </div>
  </infinite-loading>
</template>

<script>
import infiniteLoading from "vue-infinite-loading"

export default {

  components: {
    infiniteLoading
  },

  props: {
    identifier: {
      type: Number,
      required: true,
    }
  }
}
</script>
