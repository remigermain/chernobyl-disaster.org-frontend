<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.event.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath({name: 'contribute-event'})">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.create') }}
        </template>
      </admin-header>
      <div class="w-full space-y-4">
        <model-event-form />
      </div>
    </div>
  </div>

</template>

<script>
import eventMixins from "~/mixins/model/event"

export default {

  mixins: [eventMixins],

}
</script>
