<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-utils-header :title="model.name" :description="model.help">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.detail') }}
        </template>
        <template #button>
          <div class="inline-flex space-x-2">
            <admin-action-report @click="activeModalReport = true" />
            <admin-action-edit :to="pathEdit(object.id)" />
            <admin-action-create :to="pathCreate" />
            <admin-action-delete
              v-if="$auth.hasScope('staff')"
              :to="pathCreate"
              @click="setDeleted(object)"
            />
          </div>
        </template>
      </admin-utils-header>
      <admin-model-detail
        :object="object"
        :to-edit="pathEdit(object.id)"
        @delete="langDelete"
      >
        <template #head>
          <div class="flex flex-col justify-center space-y-4 text-center">
            <h1
              class="text-4xl text-gray-800 font-medium dark:text-gray-300 break-words"
            >
              {{ object.title }}
            </h1>
            <div class="flex flex-col justify-center">
              <time
                :datetime="object.date.date"
                class="text-4xl -sm:text-lg -sm:font-semibold"
              >
                {{ getDateYear(object.date.date) }}
              </time>
              <timeline-time :date="object.date" />
            </div>
            <admin-detail-tags :object="object.tags" />
          </div>
        </template>
        <template #lang="{currentObj, language}">
          <div class="flex flex-col justify-center space-y-4 text-center p-4">
            <h2
              class="text-4xl text-gray-800 font-medium dark:text-gray-300 break-words"
            >
              {{ currentObj.title }}
            </h2>
            <div class="flex flex-col justify-center">
              <time
                :datetime="object.date.date"
                class="text-4xl -sm:text-lg -sm:font-semibold"
              >
                {{ getDateYear(object.date.date, language.value) }}
              </time>
              <timeline-time :date="object.date" />
            </div>
            <section class="ql-snow">
              <span
                class="timeline-text p-4 leading-6 ql-editor antialiased text-lg"
                v-html="currentObj.description"
              />
            </section>
          </div>
        </template>
      </admin-model-detail>
      <div class="extra">
        <timeline-extra :object="object" />
      </div>
      <admin-utils-report
        v-if="activeModalReport"
        :id="object.id"
        uuid="event"
        @close="activeModalReport = false"
      />
      <admin-utils-modal
        v-if="acticeModalDelete"
        @close="acticeModalDelete = false"
        @delete="submitDelete"
      />
    </div>
  </div>
</template>

<script>
import eventMixins from '~/mixins/model/event'
import detailMixins from '~/mixins/admin/detail'
import { sanitizeHtml } from '~/lib/sanitize'
import { convertImageUrl } from '~/lib/contribute'

import 'quill/dist/quill.snow.css'

export default {
  mixins: [eventMixins, detailMixins],

  validate({ params }) {
    return /^\d+$/.test(params.id)
  },

  asyncData({ app, store, params, redirect }) {
    return app.$axios
      .get(`event/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('error-server')
        }

        // convert tag
        response.data.tags = response.data.tags.map(id => {
          return store.getters['model/tag'](id)
        })
        response.data.date.date = new Date(response.data.date.date)
        response.data.langs.forEach(obj => {
          obj.description = sanitizeHtml(obj.description)
        })

        response.data.pictures.forEach(p => {
          convertImageUrl(p.picture, app.$media)
        })

        return { object: response.data }
      })
      .catch(error => {
        store.commit('ERROR_SERVER', error.message || error)
        return redirect(app.localePath({ name: 'contribute-event' }))
      })
  },

  head() {
    const title = `${this.$t('menu-name.event')} - ${this.$t('word.detail')}`
    return {
      title,
      meta: [
        { property: 'og:title', content: title },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image:alt', content: title }
      ]
    }
  },

  methods: {
    getDateYear(date, locale = this.$i18n.locale) {
      date = new Date(date)
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.extra {
  height: 200px;
}

@media screen and (max-width: 850px) {
  .extra {
    height: 40px;
  }
}
</style>
