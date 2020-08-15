<template>
  <lazy-model-detail :path="pathUpdate.path" :model="model.name">
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:breadcrumbs>
      <lazy-bread-crumb>
        <lazy-extra-nuxt-link :to="pathList.path">
          {{ pathList.label }}
        </lazy-extra-nuxt-link>
        {{ $route.params.id }}
      </lazy-bread-crumb>
    </template>
    <template v-slot:detail>
      <div class="flex -md:flex-col items-center p-4 flex-wrap">
        <div class="w-2/4 -md:w-full flex justify-center pl-10 flex-col text-2xl text-gray-800 detail-items">
          <model-field :label="fields.title.label" :value="object.title" />
          <model-field :label="fields.event.label" :value="object.event" />
          <model-field :label="fields.date.label" :value="object.date" />
          <model-tags :tags="object.tags" />
        </div>
        <div class="w-2/4 -md:w-full flex justify-center text-2xl text-gray-800 detail-items">
          <a :href="object.doc" :alt="object.title" class="w-24 hover:text-purple-800 block">
            <icon-file-download class="w-full" />
          </a>
        </div>
        <model-langs :object="object.langs">
          <template slot-scope="{obj}">
            <model-field :label="fields.langs.title.label" :value="obj.title" />
          </template>
        </model-langs>
      </div>
    </template>
  </lazy-model-detail>
</template>

<script>
import detail from "@/mixins/admin/detail"
import document from "@/mixins/model/document"
import iconFileDownload from "@/assets/svg/file-download.svg"

export default {
  name: "ContrubteDocumentDetail",

  components: {
    iconFileDownload,
  },

  mixins: [
    detail,
    document
  ],

  asyncData ({ params, $axios, app, redirect }) {
    return $axios.get(`document/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error(app.i18n.t("errors.status"))
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-document"}))
      })
  },

}
</script>


<style lang="scss" scoped>
.document-detail {
  width: 600px;
}
</style>
