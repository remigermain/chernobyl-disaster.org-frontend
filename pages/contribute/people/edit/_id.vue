<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.people.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.update') }}
        </template>
      </admin-header>
      <model-form v-model="object" :errors="errors" delete-model="people-lang" @add="addLang" @submit="submit">
        <template #head>
          <form-text v-model="object.name" :field="modelField.name" :errors="errors.name" />
          <div class="flex flex-wrap">
            <div class="flex flex-col justify-start w-2/4">
              <form-date v-model="object.born" :field="modelField.born" :errors="errors.born" />
              <form-date v-model="object.death" :field="modelField.death" :errors="errors.death" />
            </div>
            <div class="flex flex-col justify-around w-2/4">
              <form-image v-model="object.profil" :original="object.profil" :field="modelField.profil" :errors="errors.profil" />
            </div>
          </div>
          <form-multiselect v-model="object.tags" :field="modelField.tags" :errors="errors.tags" />
        </template>
        <template #lang="{currentObj, currentError}" >
          <admin-error :errors="currentError.language" class="text-center" />
          <form-text-editor v-model="currentObj.biography" :field="modelField.langs.biography" :errors="currentError.biography" />
        </template>
      </model-form>
    </div>
  </div>
</template>

<script>
import peopleMixins from "~/mixins/model/people"
import updateMixins from "~/mixins/admin/update"
import { convertImageUrl } from "~/lib/contribute"

export default {

  mixins: [updateMixins, peopleMixins],

  validate ({params}) {
    return /^\d+$/.test(params.id)
  },

  asyncData ({app, store, params, redirect}) {
    return app.$axios.get(`people/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }

        // convert tag
        response.data.tags = response.data.tags.map(id => store.getters["model/tag"](id))
        // convert profil
        response.data.profil && convertImageUrl(response.data.profil, app.$media)

        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: 'contribute-people'}))
      })
  },

}
</script>
