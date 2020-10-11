<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.people.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.detail') }}
        </template>
        <template #button>
          <div class="inline-flex space-x-2">
            <action-report @click="activeModalReport = true">
              {{ $t('word.report') }}
            </action-report>
            <action-edit :to="pathEdit(object.id)" />
            <action-create :to="pathCreate" />
            <action-delete v-if="$auth.hasScope('staff')" :to="pathCreate" @click="setDeleted(object)" />
          </div>
        </template>
      </admin-header>
      <model-detail :object="object" :to-edit="pathEdit(object.id)">
        <template #head>
          <div class="flex flex-col justify-center space-y-4 text-center">
            <div class="flex justify-around items-center">
              <picture v-if="object.profil" class="preview-image">
                <source :srcset="object.profil.thumbnail_webp" media="(max-width: 550px)" type="image/webp">
                <source :srcset="object.profil.thumbnail_jpeg" media="(max-width: 550px)" type="image/jpeg">
                <source :srcset="object.profil.original_webp" type="image/webp">
                <img :src="object.profil.original_jpeg" alt="image" />
              </picture>
              <div class="flex flex-col space-y-4">
                <h1 class="text-4xl text-gray-800 font-medium dark:text-gray-300 break-words">
                  {{ object.name }}
                </h1>
                <div class="flex justify-center w-full">
                  <div v-if="object.born" class="flex flex-col w-2/4">
                    <span class="italic text-base capitalize text-gray-600">
                      {{ $t('word.born') }}
                    </span>
                    <time :datetime="object.born" class="text-xl -sm:text-lg -sm:font-semibold">
                      {{ getDateYear(object.born) }}
                    </time>
                  </div>
                  <div v-if="object.death" class="flex flex-col w-2/4">
                    <span class="italic text-base capitalize text-gray-600">
                      {{ $t('word.death') }}
                    </span>
                    <time :datetime="object.death" class="text-xl -sm:text-lg -sm:font-semibold">
                      {{ getDateYear(object.death) }}
                    </time>
                  </div>
                </div>
              </div>
            </div>
            <detail-tags :object="object.tags" />
          </div>
        </template>
        <template #lang="{currentObj}">
          <div class="flex flex-col justify-center space-y-4 text-center p-4">
            <section class="ql-snow">
              <span class="timeline-text p-4 leading-6 ql-editor antialiased text-lg" v-html="currentObj.biography"/>
            </section>
          </div>
        </template>
      </model-detail>
      <admin-report v-if="activeModalReport" :id="object.id" uuid="people" @close="activeModalReport = false" />
      <admin-modal v-if="acticeModalDelete" @close="acticeModalDelete = false" @delete="deleteObject"/>
    </div>
  </div>
</template>

<script>
import peopleMixins from "~/mixins/model/people"
import detailMixins from "~/mixins/admin/detail"
import { sanitizeHtml } from "~/lib/sanitize"
import { convertImageUrl } from "~/lib/contribute"
import 'quill/dist/quill.snow.css'

export default {

  mixins: [peopleMixins, detailMixins],

  validate ({params}) {
    return /^\d+$/.test(params.id)
  },

  asyncData ({app, store, params, redirect}) {
    return app.$axios.get(`people/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }

        // convert tag
        response.data.tags = response.data.tags.map(id => store.getters["model/tag"](id))
        // convert profil image
        response.data.profil && convertImageUrl(response.data.profil, app.$media)
        // convert date born et death
        response.data.born && (response.data.born = new Date(response.data.born))
        response.data.death && (response.data.death = new Date(response.data.death))
        // convert biography html
        response.data.langs.forEach(obj => { obj.biography = sanitizeHtml(obj.biography) })

        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: 'contribute-people'}))
      })
  },

  methods: {
    getDateYear (date, locale = this.$i18n.locale) {
      date = new Date(date)
      return date.toLocaleDateString(locale, {year: "numeric", month: "long", day: "numeric" })
    },
  }

}
</script>

<style lang="scss" scoped>
.preview-image {
  width: 250px;
  height: 250px;
  @apply rounded-full;
  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
