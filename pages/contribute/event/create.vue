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
        <model-event-form
          v-model="data"
          :model-field="modelField"
          :errors="errors"
          @submit="submit"
        />
      </div>
    </div>
  </div>

</template>

<script>
import eventMixins from "~/mixins/model/event"
import createMixins from "~/mixins/admin/create"

export default {

  mixins: [createMixins, eventMixins],

  data () {
    return {
      data: {title: "", date: {date: "", time: {HH: "", mm: "", ss: ""}}, tags: [], langs: []}
    }
  },

  methods: {
    resetData () {
      this.data = {title: "", date: {date: "", time: {HH: "", mm: "", ss: ""}}, tags: [], langs: []}
    },
  }

}
</script>
