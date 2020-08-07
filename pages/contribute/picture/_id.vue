<template>
  <model-detail :path="pathUpdate.path">
    <template v-slot:label>
      {{ model }}
    </template>
    <template v-slot:breadcrumbs>
      <bread-crumb>
        <extra-nuxt-link :to="pathList.path">
          {{ pathList.label }}
        </extra-nuxt-link>
        {{ $route.params.id }}
      </bread-crumb>
    </template>
    <template v-slot:detail>
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-3xl">
          {{ object.title }}
        </h1>
        <img loading="lazy" :src="object.picture" :alt="i18nAttr(object, 'title')" :title="i18nAttr(object, 'title')">
        <div v-if="object.photographer">
          {{ $t('global.picture-take-by') }}
          <h2>{{ object.photographer.name }}</h2>
        </div>
      </div>
    </template>
  </model-detail>
</template>

<script>
import detail from "@/mixins/model-view/detail"
import picture from "@/mixins/model/picture"

export default {

  mixins: [
    detail,
    picture
  ],

  asyncData ({ params, $axios, app, redirect }) {
    return $axios.get(`picture/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error(app.i18n.t("global.error"))
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
