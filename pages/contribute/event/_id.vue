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
      <model-field :field="fields.title" :value="object.title" />
      <model-field :field="fields.date" :value="object.date" />
      <model-tags :tags="object.tags" />
      <div class="w-full h-40">
        <timeline-extra :object="object" />
      </div>
      <model-langs :object="object.langs">
        <template slot-scope="{obj}">
          <model-field :field="fields.langs.title" :value="obj.title" />
          <model-field :field="fields.langs.description" :value="obj.description" />
        </template>
      </model-langs>
    </template>
  </lazy-model-detail>
</template>

<script>
import detail from "@/mixins/admin/detail"
import event from "@/mixins/model/event"

export default {
  name: "ContrubteEventDetail",

  mixins: [
    detail,
    event
  ],

  asyncData ({ params, $axios, app, redirect }) {
    return $axios.get(`event/${params.id}/?contribute=true`)
      .then(response => {
        if (response.status != 200) {
          throw Error(app.i18n.t("errors.status"))
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {
        return redirect(app.i18n.localePath({name: "contribute-event"}))
      })
  },

}
</script>


<style lang="scss" scoped>
.event-detail {
  width: 100%;
  min-height: 300px;
}
</style>
