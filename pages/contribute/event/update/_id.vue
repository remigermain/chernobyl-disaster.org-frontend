<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.event.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath({name: 'contribute-event'})">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.update') }} {{ object.id }}
        </template>
      </admin-header>
      <div class="w-full space-y-4">
        <model-event-form
          v-model="object"
          :model-field="modelField"
          :errors="errors"
          @submit="submit"
          @delete="deleteObjLang"
        />
      </div>
    </div>
  </div>

</template>

<script>
import eventMixins from "~/mixins/model/event"
import updateMixins from "~/mixins/admin/update"

export default {

  mixins: [eventMixins, updateMixins],

  validate ({params}) {
    return /^\d+$/.test(params.id)
  },

  asyncData ({app, store, params, redirect}) {
    return app.$axios.get(`event/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }

        // convert tag
        response.data.tags = response.data.tags.map(id => {
          return store.getters["model/tag"](id)
        })

        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: 'contribute-event'}))
      })
  },

  methods: {
    deleteObjLang (obj) {
      // TODO
    }
  },


}
</script>
