<template>
  <lazy-model-detail :path="pathUpdate.path" :model="model.name" :object-id="object.id">
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
      <model-field :field="fields.born" :value="object.born" />
      <model-field :field="fields.death" :value="object.death" />
      <model-field :field="fields.wikipedia" :value="object.wikipedia">
        <a :href="object.wikipedia" rel="noopener noreferrer" target="_blank" class="text-purple-800 text-sm">
          {{ $t('utils.link') }}
        </a>
      </model-field>
      <model-tags :tags="object.tags" />
      <model-field :field="fields.profil" :value="object.profil">
        <img :src="object.profil.original_jpeg" :alt="object.name">
      </model-field>
      <model-langs :object="object.langs">
        <template slot-scope="{obj}">
          <p class="timeline-text p-4 leading-6 whitespace-pre-line" v-html="$sanitizeHtml(obj.biography)"/>
        </template>
      </model-langs>
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
        if (response.status!==200) {
          throw new Error("error-server")
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
