<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.event.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.update') }}
        </template>
      </admin-header>
      <model-form v-model="object" :errors="errors" :delete-model="linkDeleteLang" @add="addLang" @submit="submit">
        <template #head>
          <form-text v-model="object.title" :field="modelField.title" :errors="errors.title" />
          <div class="w-full flex flex-wrap justify-around">
            <form-datetime v-model="object.date" :field="modelField.date" :errors="errors.date" />
            <form-multiselect v-model="object.tags" :field="modelField.tags" :errors="errors.tags" />
          </div>
        </template>
        <template #lang="{currentObj, currentError}" >
          <admin-error :errors="currentError.language" class="text-center" />
          <form-text v-model="currentObj.title" :field="modelField.langs.title" :errors="currentError.title" />
          <form-text-editor v-model="currentObj.description" :field="modelField.langs.description" :errors="currentError.description" />
        </template>
      </model-form>
    </div>
  </div>
</template>

<script>
import eventMixins from "~/mixins/model/event"
import updateMixins from "~/mixins/admin/update"
import { convertFromDate } from "~/lib/contribute"

export default {

  mixins: [updateMixins, eventMixins],

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
        response.data.date = convertFromDate(response.data.date)

        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: 'contribute-event'}))
      })
  },

}
</script>
