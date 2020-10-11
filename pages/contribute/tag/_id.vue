<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.tag.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.detail') }}
        </template>
        <template #button>
          <div class="inline-flex space-x-2">
            <action-report @click="activeModalReport = true">
              {{ $t('word.report') }}
            </action-report>
            <action-edit :to="pathEdit(object.id)" />
            <action-create :to="pathCreate" />
            <action-delete v-if="$auth.hasScope('staff')" :to="pathCreate" @click="setDeleted(object)" />
          </div>
        </template>
      </admin-header>
      <model-detail :object="object" :to-edit="pathEdit(object.id)">
        <template #head>
          <div class="w-full text-center">
            <h1 class="text-4xl text-gray-800 font-medium dark:text-gray-300 break-words">
              {{ object.name }}
            </h1>
          </div>
        </template>
        <template #lang="{currentObj}">
          <div class="w-full text-center">
            <h1 class="text-4xl text-gray-800 font-medium dark:text-gray-300 break-words">
              {{ currentObj.name }}
            </h1>
          </div>
        </template>
      </model-detail>
      <admin-report v-if="activeModalReport" :id="object.id" uuid="tag" @close="activeModalReport = false" />
      <admin-modal v-if="acticeModalDelete" @close="acticeModalDelete = false" @delete="deleteObject"/>
    </div>
  </div>
</template>

<script>
import tagMixins from "~/mixins/model/tag"
import detailMixins from "~/mixins/admin/detail"
import 'quill/dist/quill.snow.css'

export default {

  mixins: [tagMixins, detailMixins],

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
