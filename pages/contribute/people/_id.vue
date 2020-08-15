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
          <model-field :label="fields.name.label" :value="object.name" />
          <model-field :label="fields.born.label" :value="object.born" />
          <model-field :label="fields.death.label" :value="object.death" />
          <model-field :label="fields.wikipedia.label" :value="object.wikipedia" />
          <model-tags :tags="object.tags" />
        </div>
        <div class="w-2/4 -md:w-full flex justify-center text-2xl text-gray-800 detail-items">
          <img :src="object.profil" :alt="object.name">
        </div>
        <model-langs :object="object.langs">
          <template slot-scope="{obj}">
            <model-field :label="fields.langs.biography.label" :value="obj.biography" />
          </template>
        </model-langs>
      </div>
    </template>
  </lazy-model-detail>
</template>

<script>
import detail from "@/mixins/admin/detail"
import People from "@/mixins/model/people"

export default {
  name: "ContrubtePeopleDetail",

  mixins: [
    detail,
    People
  ],

  asyncData ({ params, $axios, app, redirect }) {
    return $axios.get(`people/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error(app.i18n.t("errors.status"))
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-people"}))
      })
  },

}
</script>
