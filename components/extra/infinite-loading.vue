<template>
  <infinite-loading class="text-gray-600 italic capitalize w-full"
                    :identifier="identifier"
                    @infinite="$emit('infinite', $event)"
  >
    <div slot="spinner">
      {{ $t('utils.loading') }}
    </div>
    <div slot="no-more">
      {{ $t('utils.no-more') }}
    </div>
    <div slot="no-results">
      {{ $t('utils.no-results') }}
    </div>
  </infinite-loading>
</template>

<script>

export default {

  props: {
    identifier: {
      type: Number,
      required: true,
    }
  }
}
</script>
