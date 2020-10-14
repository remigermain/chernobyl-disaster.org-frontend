<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-utils-header :title="model.name" :description="$t('description.picture')">
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
            <admin-action-delete v-if="$auth.hasScope('staff')" :to="pathCreate" @click="setDeleted(object)" />
          </div>
        </template>
      </admin-utils-header>
      <admin-model-detail :object="object" :to-edit="pathEdit(object.id)" @delete="langDelete">
        <template #head>
          <div class="flex flex-col justify-center space-y-4 text-center">
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
            <div class="p-2 relative preview-image">
              <picture>
                <source :srcset="object.picture.thumbnail_webp" media="(max-width: 550px)" type="image/webp">
                <source :srcset="object.picture.thumbnail_jpeg" media="(max-width: 550px)" type="image/jpeg">
                <source :srcset="object.picture.original_webp" type="image/webp">
                <img :src="object.picture.original_jpeg" alt="image" class=""/>
              </picture>
              <span class="w-full h-full absolute top-0 left-0 cursor-pointer duration-300 transition-opacity justify-center opacity-0
                    hover:opacity-100 items-center flex z-10 picture-hover" @click="activePicture = true">
                <svg-icon name="link" class="text-gray-900 text-6xl" />
              </span>
            </div>
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
      <lazy-gallery-detail-picture v-if="activePicture" :object="object.picture" :idx="0" :length="1" @close="activePicture = null" />
      <lazy-admin-utils-report v-if="activeModalReport" :id="object.id" uuid="picture" @close="activeModalReport = false" />
      <lazy-admin-utils-modal v-if="acticeModalDelete" @close="acticeModalDelete = false" @delete="submitDelete"/>
    </div>
  </div>
</template>

<script>
import pictureMixins from "~/mixins/model/picture"
import detailMixins from "~/mixins/admin/detail"
import { convertImageUrl } from "~/lib/contribute"

export default {

  mixins: [pictureMixins, detailMixins],

  validate ({params}) {
    return /^\d+$/.test(params.id)
  },

  asyncData ({app, store, params, redirect}) {
    return app.$axios.get(`picture/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }

        // convert tag
        response.data.tags = response.data.tags.map(id => store.getters["model/tag"](id))
        response.data.event = store.getters["model/event"](response.data.event)
        // convert profil image
        response.data.picture && convertImageUrl(response.data.picture, app.$media)
        // convert date born et death
        response.data.date.date && (response.data.date.date = new Date(response.data.date.date))

        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: 'contribute-picture'}))
      })
  },

  data: () => ({activePicture: false}),

  head () {
    const title = `${this.$t("menu.picture")} - ${this.$t("word.detail")}`
    return {
      title,
      meta: [
          { property: "og:title", content: title},
          { name: "twitter:title", content: title },
          { name: "twitter:image:alt", content: title }
      ]
    }
  },

  methods: {
    getDateYear (date, locale = this.$i18n.locale) {
      return date.toLocaleDateString(locale, {year: "numeric", month: "long", day: "numeric" })
    },
  }

}
</script>

<style lang="scss" scoped>
.preview-image {
  width: 650px;
  height: 450px;
  margin: auto;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    margin: auto;
  }
}
@media screen and (max-width: 850px) {
  .preview-image {
    width: 550px;
    height: 360px;
    margin: 0;
  }
}

@media screen and (max-width: 650px) {
  .preview-image {
    width: 100%;
    height: 100%;
    margin: 0;
  }
}

.picture-hover:hover {
  @apply bg-white;
  @apply bg-opacity-25;
}

.dark .picture-hover:hover {
  @apply bg-gray-700;
  @apply bg-opacity-25;
}
</style>
