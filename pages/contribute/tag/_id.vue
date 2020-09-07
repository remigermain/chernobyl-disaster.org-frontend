<template>
  <lazy-model-detail :path="pathUpdate.path" :model="model.name">
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:breadcrumbs>
      <lazy-contribute-breadcrumb>
        <lazy-extra-nuxt-link :to="pathList.path">
          {{ pathList.label }}
        </lazy-extra-nuxt-link>
        {{ $route.params.id }}
      </lazy-contribute-breadcrumb>
    </template>
    <template v-slot:detail>
      <div class="flex -md:flex-col items-center p-4 flex-wrap">
        <div class="w-2/4 -md:w-full flex justify-center pl-10 flex-col text-2xl text-gray-800 detail-items">
          <model-field :label="fields.name.label" :value="object.name" />
        </div>
        <div class="w-2/4 -md:w-full flex justify-center text-2xl text-gray-800 detail-items">
          <model-langs :object="object.langs">
            <template slot-scope="{obj}">
              <model-field :label="fields.langs.name.label" :value="obj.name" />
            </template>
          </model-langs>
        </div>
      </div>
    </template>
  </lazy-model-detail>
</template>

<script>
import detail from "@/mixins/admin/detail"
import tag from "@/mixins/model/tag"

export default {
  name: "ContrubteTagDetail",

  mixins: [
    detail,
    tag
  ],

  asyncData ({ params, $axios, app, redirect }) {
    return $axios.get(`tag/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error(app.i18n.t("errors.status"))
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-tag"}))
      })
  },

}
</script>
