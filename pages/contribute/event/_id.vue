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
          <model-field :label="fields.date.label" :value="object.date" />
          <model-tags :tags="object.tags" />
        </div>
        <div class="w-2/4 -md:w-full flex justify-center text-2xl text-gray-800 detail-items">
          iiiciicici
        </div>
        <model-langs :object="object.langs">
          <template slot-scope="{obj}">
            <model-field :label="fields.langs.title.label" :value="obj.title" />
            <model-field :label="fields.langs.description.label" :value="obj.description" />
          </template>
        </model-langs>
      </div>
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
    return $axios.get(`event/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error(app.i18n.t("errors.status"))
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {
        console.log(Object.keys(app))
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
