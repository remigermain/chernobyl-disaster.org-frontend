<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-utils-header :title="model.name" :description="$t('help.video.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.detail') }}
        </template>
        <template #button>
          <div class="inline-flex space-x-2">
            <admin-action-report @click="activeModalReport = true">
              {{ $t('word.report') }}
            </admin-action-report>
            <admin-action-edit :to="pathEdit(object.id)" />
            <admin-action-create :to="pathCreate" />
            <admin-action-delete v-if="$auth.hasScope('staff')" :to="pathCreate" @click="setDeleted(object)" />
          </div>
        </template>
      </admin-utils-header>
      <admin-model-detail :object="object" :to-edit="pathEdit(object.id)">
        <template #head>
          <div class="flex flex-col justify-center space-y-4 text-center px-2">
            <div class="flex flex-col space-y-4">
              <h1 class="text-4xl text-gray-800 font-medium dark:text-gray-300 break-words capitalize">
                {{ object.title }}
              </h1>
              <div class="flex flex-col">
                <div v-if="object.event" class="flex flex-col justify-center">
                  <span class="italic text-base capitalize text-gray-600">
                    {{ modelField.event.label }}
                  </span>
                  <a :href="localePath({name: 'contribute-event-id',  params: {id: object.event.value}})"
                        class="text-4xl -sm:text-lg -sm:font-semibold transition-color duration-300
                            dark:text-gray-200 dark:hover:text-indigo-700 hover:text-indigo-700 text-gray-800"
                      target="_target" rel="noopenner,noreferrer"
                  >
                    {{ object.event.display_name }}
                  </a>
                </div>
                <div v-if="object.date.date" class="flex flex-col justify-center">
                  <span class="italic text-base capitalize text-gray-600">
                    {{ $t('word.date') }}
                  </span>
                  <time :datetime="object.date.date" class="text-4xl -sm:text-lg -sm:font-semibold">
                    {{ getDateYear(object.date.date) }}
                  </time>
                  <timeline-time :date="object.date" />
                </div>
              </div>
            </div>
            <gallery-video :link="object.video" />
            <admin-detail-tags :object="object.tags" />
          </div>
        </template>
        <template #lang="{currentObj}">
          <div class="flex flex-col justify-center space-y-4 text-center p-4">
            <h2 class="text-4xl text-gray-800 font-medium dark:text-gray-300 break-words capitalize">
              {{ currentObj.title }}
            </h2>
          </div>
        </template>
      </admin-model-detail>
      <lazy-admin-report v-if="activeModalReport" :id="object.id" uuid="video" @close="activeModalReport = false" />
      <lazy-admin-modal v-if="acticeModalDelete" @close="acticeModalDelete = false" @delete="submitDelete"/>
    </div>
  </div>
</template>

<script>
import videoMixins from "~/mixins/model/video"
import detailMixins from "~/mixins/admin/detail"

export default {

  mixins: [videoMixins, detailMixins],

  validate ({params}) {
    return /^\d+$/.test(params.id)
  },

  asyncData ({app, store, params, redirect}) {
    return app.$axios.get(`video/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }

        // convert tag
        response.data.tags = response.data.tags.map(id => store.getters["model/tag"](id))
        response.data.event = store.getters["model/event"](response.data.event)
        // convert date
        response.data.date.date && (response.data.date.date = new Date(response.data.date.date))

        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: 'contribute-video'}))
      })
  },

  data: () => ({activevideo: false}),

  methods: {
    getDateYear (date, locale = this.$i18n.locale) {
      return date.toLocaleDateString(locale, {year: "numeric", month: "long", day: "numeric" })
    },
  }

}
</script>
