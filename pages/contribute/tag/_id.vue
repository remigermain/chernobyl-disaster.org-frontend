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
      <model-field :field="fields.name" :value="object.name" />
      <model-langs :object="object.langs">
        <template slot-scope="{obj}">
          <model-field :field="fields.langs.name" :value="obj.name" />
        </template>
      </model-langs>
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
