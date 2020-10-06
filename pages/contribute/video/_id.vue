<template>
  <lazy-model-detail :path="pathUpdate.path" :model="model.name" :object-id="object.id">
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:breadcrumbs>
      <lazy-contribute-breadcrumb>
        <nuxt-link  :to="localePath(pathList.path)">
          {{ pathList.label }}
        </nuxt-link>
        {{ $route.params.id }}
      </lazy-contribute-breadcrumb>
    </template>
    <template v-slot:detail>
      <model-field :field="fields.title" :value="object.title" />
      <model-field :field="fields.event" :value="object.event" />
      <model-field :field="fields.date" :value="object" />
      <model-tags :tags="object.tags" />
      <model-field :field="fields.video" :value="object.video">
        <iframe :src="urlVideo(object.video)" frameborder="0" class="video-detail"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
        />
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
import detail from "@/mixins/admin/detail"
import video from "@/mixins/model/video"

export default {
  name: "ContrubteVideoDetail",

  mixins: [
    detail,
    video
  ],

  asyncData ({ params, $axios, app, redirect }) {
    return $axios.get(`video/${params.id}/`)
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-video"}))
      })
  },

  methods: {
    urlVideo (src) {
      return src.replace("watch?v=", "embed/")
    }
  },

}
</script>


<style lang="scss" scoped>
.video-detail {
  width: 100%;
  min-height: 300px;
}
</style>
