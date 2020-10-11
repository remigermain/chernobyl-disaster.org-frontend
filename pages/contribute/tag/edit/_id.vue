<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.tag.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.update') }}
        </template>
      </admin-header>
      <model-form v-model="object" :errors="errors" :delete-model="linkDeleteLang" @add="addLang" @submit="submit">
        <template #head>
          <form-text v-model="object.name" :field="modelField.name" :errors="errors.name" />
        </template>
        <template #lang="{currentObj, currentError}" >
          <admin-error :errors="currentError.language" class="text-center" />
          <form-text v-model="currentObj.name" :field="modelField.langs.name" :errors="currentError.name" />
        </template>
      </model-form>
    </div>
  </div>
</template>

<script>
import tagMixins from "~/mixins/model/tag"
import updateMixins from "~/mixins/admin/update"

export default {

  mixins: [updateMixins, tagMixins],

  validate ({params}) {
    return /^\d+$/.test(params.id)
  },

  asyncData ({app, store, params, redirect}) {
    return app.$axios.get(`tag/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }
        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: 'contribute-tag'}))
      })
  },

}
</script>
