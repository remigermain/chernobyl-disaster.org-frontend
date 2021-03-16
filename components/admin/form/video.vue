<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-utils-header
        :title="model.name"
        :description="$t('description.video')"
      >
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.update') }}
        </template>
      </admin-utils-header>
      <admin-model-form
        v-model="data"
        :errors="errors"
        @add="addLang"
        @submit="submit"
        @delete="langDelete"
      >
        <template #head>
          <admin-field-text
            v-model="data.title"
            :field="modelField.title"
            :errors="errors.title"
          />
          <div class="flex flex-wrap px-2">
            <div
              class="flex flex-col justify-start w-2/4 -mobile:w-full -mobile:order-1"
            >
              <admin-field-select
                v-model="data.event"
                :field="modelField.event"
                :errors="errors.event"
              >
                <a
                  v-if="data.event"
                  :href="
                    localePath({
                      name: 'contribute-event-id',
                      params: { id: data.event.value }
                    })
                  "
                  target="_blank"
                  rel="noopener,noreferer"
                  class="p-3"
                >
                  <svg-icon
                    name="external-link"
                    class="dark:text-gray-200 dark:hover:text-indigo-700 hover:text-indigo-700 text-gray-800
                  transform transition-all duration-300 text-4xl hover:scale-125"
                  />
                </a>
              </admin-field-select>
              <admin-field-datetime
                v-model="data.date"
                :field="modelField.date"
                :errors="errors.date"
              />
            </div>
            <div class="flex flex-col justify-around w-2/4 -mobile:w-full">
              <admin-field-video
                v-model="data.video"
                :field="modelField.video"
                :title="data.title"
                :errors="errors.video"
              />
            </div>
          </div>
          <admin-field-multiselect
            v-model="data.tags"
            :field="modelField.tags"
            :errors="errors.tags"
          />
        </template>
        <template #lang="{currentObj, currentError}">
          <admin-utils-error
            :errors="currentError.language"
            class="text-center"
          />
          <admin-field-text
            v-model="currentObj.title"
            :field="modelField.langs.title"
            :errors="currentError.title"
          />
        </template>
      </admin-model-form>
    </div>
  </div>
</template>

<script>
import videoMixins from '~/mixins/model/video'
import FormMixins from '~/mixins/admin/form'

export default {
  mixins: [videoMixins, FormMixins]
}
</script>
