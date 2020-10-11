<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.picture.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.create') }}
        </template>
      </admin-header>
      <model-form v-model="data" :errors="errors" :delete-model="linkDeleteLang" @add="addLang" @submit="submit">
        <template #head>
          <form-text v-model="data.title" :field="modelField.title" :errors="errors.title" />
          <div class="flex flex-wrap">
            <div class="flex flex-col justify-start w-2/4">
              <form-select v-model="data.event" :field="modelField.event" :errors="errors.event">
                <a v-if="data.event" :href="localePath({name: 'contribute-event-id', params: {id: data.event.value}})"
                   target="_blank" rel="noopener,noreferer" class="p-3"
                >
                  <svg-icon name="external-link" class="dark:text-gray-200 dark:hover:text-indigo-700 hover:text-indigo-700 text-gray-800
                  transform transition-all duration-300 text-4xl hover:scale-125"/>
                </a>
              </form-select>
              <form-datetime v-model="data.date" :field="modelField.date" :errors="errors.date" />
            </div>
            <div class="flex flex-col justify-around w-2/4">
              <form-image v-model="data.picture" :field="modelField.picture" :errors="errors.picture" />
            </div>
          </div>
          <form-multiselect v-model="data.tags" :field="modelField.tags" :errors="errors.tags" />
        </template>
        <template #lang="{currentObj, currentError}" >
          <admin-error :errors="currentError.language" class="text-center" />
          <form-text v-model="currentObj.title" :field="modelField.langs.title" :errors="currentError.title" />
        </template>
      </model-form>
    </div>
  </div>
</template>

<script>
import pictureMixins from "~/mixins/model/picture"
import createMixins from "~/mixins/admin/create"

export default {

  mixins: [pictureMixins, createMixins],

  data () { return { data: this.baseData() } },

}
</script>
