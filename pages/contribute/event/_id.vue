<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.event.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath({name: 'contribute-event'})">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.create') }}
        </template>
      </admin-header>
      <model-detail :object="object" >
        <template #head>
          <div class="flex flex-col justify-center space-y-4 text-center">
            <h1 class="text-4xl text-gray-800 leading-3 font-medium">
              {{ object.title }}
            </h1>
            <div class="flex flex-col">
              <time :datetime="object.date.date" class="text-4xl -sm:text-lg -sm:font-semibold">
                {{ getDateYear(object.date.date) }}
              </time>
              <timeline-time :date="object.date" />
            </div>
          </div>
        </template>
        <template #lang="{currentObj}">
          <div class="flex flex-col justify-center space-y-4 text-center p-4">
            <h2 class="text-4xl text-gray-800 leading-3 font-medium">
              {{ currentObj.title }}
            </h2>
            <section class="ql-snow">
              <span class="timeline-text p-4 leading-6 ql-editor antialiased text-lg" v-html="currentObj.description"/>
            </section>
          </div>
        </template>
      </model-detail>
    </div>
  </div>
</template>

<script>
import eventMixins from "~/mixins/model/event"
import 'quill/dist/quill.snow.css'

export default {

  mixins: [eventMixins],

  validate ({params}) {
    return /^\d+$/.test(params.id)
  },

  asyncData ({app, store, params, redirect}) {
    return app.$axios.get(`event/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }

        // convert tag
        response.data.tags = response.data.tags.map(id => {
          return store.getters["model/tag"](id)
        })

        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: 'contribute-event'}))
      })
  },

  methods: {
    getDateYear (date) {
      date = new Date(date)
      return date.toLocaleDateString(this.$i18n.locale, {year: "numeric", month: "long", day: "numeric" })
    },
  }

}
</script>
