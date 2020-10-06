<template>
  <lazy-model-detail :path="pathUpdate.path" :model="model.name" :object-id="object.id">
    <template #label>
      {{ model.label }}
    </template>
    <template #breadcrumbs>
      <lazy-contribute-breadcrumb>
        <nuxt-link  :to="localePath(pathList.path)">
          {{ pathList.label }}
        </nuxt-link>
        {{ $route.params.id }}
      </lazy-contribute-breadcrumb>
    </template>
    <template #detail>
      <model-field :field="fields.title" :value="object.title" />
      <model-field :field="fields.event" :value="object.event" />
      <model-field :field="fields.date" :value="object" />
      <model-field :field="fields.photographer" :value="object.photographer">
        <span v-if="object.photographer">
          {{ fields.photographer.display(object) }}
        </span>
      </model-field>
      <model-tags :tags="object.tags" />
      <model-field :field="fields.picture" :value="object.picture">
        <img :src="$media(object.picture.original_jpeg)" :alt="object.title">
      </model-field>
      <model-langs :object="object.langs">
        <template slot-scope="{obj}">
          <model-field :field="fields.langs.title" :value="obj.title" />
        </template>
      </model-langs>
    </template>
  </lazy-model-detail>
</template>

<script>
import detail from "~/mixins/admin/detail"
import picture from "~/mixins/model/picture"

export default {
  name: "ContrubtePictureDetail",

  mixins: [
    detail,
    picture
  ],

  asyncData ({ params, $axios, app, redirect }) {
    return $axios.get(`picture/${params.id}/`)
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
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
