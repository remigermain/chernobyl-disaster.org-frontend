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
          <model-field :label="fields.photographer.label" :value="object.photographer">
            <div v-if="object.photographer">
              {{ object.photographer.name }}
              <img :src="object.photographer.profil.thumbnail" :alt="object.photographer.name" class="rounded-full">
            </div>
          </model-field>
          <model-tags :tags="object.tags" />
        </div>
        <div class="w-2/4 -md:w-full flex justify-center flex-col text-2xl text-gray-800 detail-items">
          <img loading="lazy" :src="object.picture.full" :alt="object.title">
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
import picture from "@/mixins/model/picture"

export default {
  name: "ContrubtePictureDetail",

  mixins: [
    detail,
    picture
  ],

  asyncData ({ params, $axios, app, redirect }) {
    return $axios.get(`picture/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error(app.i18n.t("errors.status"))
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-picture"}))
      })
  },

}
</script>
