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
          <model-event :label="fields.event.label" :value="object.event" />
          <model-field :label="fields.date.label" :value="object.date">
            {{ getDateYear(object.date) }}
          </model-field>
          <model-tags :tags="object.tags" />
        </div>
        <div class="w-2/4 -md:w-full flex justify-center text-2xl text-gray-800 detail-items">
          <p class="text-3xl capitalize">
            {{ $t('utils.preview') }} :
          </p>
          <iframe :src="urlVideo(object.video)" frameborder="0" class="video-detail"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
          />
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
        if (response.status != 200) {
          throw Error(app.i18n.t("errors.server"))
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
