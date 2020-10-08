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
        <template #button>
          <button class="p-2 bg-red-700 rounded text-gray-200 hover:bg-red-600 text-center text-base" @click="activeReport = true">
            <svg-icon name="send" />
            {{ $t('word.report') }}
          </button>
          <nuxt-link :to="localePath({name: 'contribute-event-update-id', params: {id: object.id}})"
            class="p-2 bg-blue-700 rounded text-gray-200 hover:bg-blue-600 text-center text-base">
            <svg-icon name="edit" />
            {{ $t('word.edit') }}
          </nuxt-link>
          <nuxt-link :to="localePath({name: 'contribute-event-create'})"
            class="p-2 bg-indigo-600 rounded text-gray-200 hover:bg-indigo-700 text-center text-base">
            <svg-icon name="plus" />
            {{ $t('word.create') }}
          </nuxt-link>
        </template>
      </admin-header>
      <model-detail :object="object">
        <template #head>
          <div class="flex flex-col justify-center space-y-4 text-center">
            <h1 class="text-4xl text-gray-800 leading-3 font-medium">
              {{ object.title }}
            </h1>
            <div class="flex flex-col justify-center">
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
        <template #extra>
          <div class="extra">
            <timeline-extra :object="object" />
          </div>
        </template>
      </model-detail>
      <admin-report v-if="activeReport" :id="object.id" uuid="event" @close="activeReport = false" />
    </div>
  </div>
</template>

<script>
import eventMixins from "~/mixins/model/event"
import detailMixins from "~/mixins/admin/detail"
import 'quill/dist/quill.snow.css'

export default {

  mixins: [eventMixins, detailMixins],

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

        response.data.date.date = new Date(response.data.date.date)

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

<style scoped>
.extra {
  height: 200px;
}
</style>
