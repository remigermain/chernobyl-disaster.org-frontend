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
        <h1 class="text-3xl">{{ object.title }}</h1>
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
import modelsDetail from "@/mixins/model/base"
export default {

  mixins: [modelsDetail],

  async asyncData ({params, redirect, $axios, app}) {
    // get options information form
    const options = await $axios.options(`picture/${params.id}/`)
    // get objects
    const response = await $axios.get(`picture/${params.id}/`)

    // check if all request is ok
    if (options.status != 200 || response.status != 200) {
      this.$toat.error(this.$t("global.error"))
      // redirect to parent objects
      return redirect(app.$i18n.localePath({name: "contribute-picture"}))
    }
    return {
      fields: options.data.actions.PUT,
      object: response.data,
      data: {
        title: response.data.title,
        tags: response.data.tags,
        event: response.data.event,
        photographer: response.data.photographer,
        langs: response.data.langs
      },
    }
  },

  data () {
    return {
      objectLang: {
        title: "",
        language: ""
      },
      model: "picture",
      dataExtra: {
        langs: [],
        picture: null
      },
    }
  },

  methods: {
    changePicture (value) {
      this.extraData.picture = value
    },
  }

}
</script>
