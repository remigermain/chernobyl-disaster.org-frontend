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
      <model-detail :object="object" >
        <template #head>
          {{ object.title }}
          {{ object.date }}
          {{ object.tags }}
        </template>
        <template #lang="{currentObj}">
          <h1>
            {{ currentObj.title }}
          </h1>
          <p>
            {{ currentObj.description }}
          </p>
        </template>
      </model-detail>
    </div>
  </div>
</template>

<script>
import eventMixins from "~/mixins/model/event"

export default {

  mixins: [eventMixins],

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

}
</script>
