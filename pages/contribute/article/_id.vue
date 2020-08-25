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
          <model-field :label="fields.event.label" :value="object.event">
            {{ $store.getters["model/event"](object.event).display_name }}
          </model-field>
          <model-field :label="fields.date.label" :value="object.date">
            {{ getDateYear(object.date) }}
          </model-field>
          <model-tags :tags="object.tags" />
        </div>
        <div class="w-2/4 -md:w-full flex justify-center text-2xl text-gray-800 detail-items flex-col">
          <a :href="object.link" rel="noopener noreferrer" target="_blank" class="text-purple-700">
            {{ $t('errors.link') }}
          </a>
          <p class="text-3xl capitalize">
            {{ $t('utils.preview') }} :
          </p>
          <iframe :src="object.link" frameborder="0" class="article-detail"
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
import article from "@/mixins/model/article"

export default {
  name: "ContrubteArticleDetail",

  mixins: [
    detail,
    article
  ],

  asyncData ({ params, $axios, app, redirect }) {
    return $axios.get(`article/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error(app.i18n.t("errors.status"))
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-article"}))
      })
  },
}
</script>

<style>
.article-detail {
  width: 100%;
  height: 300px;
}
</style>
