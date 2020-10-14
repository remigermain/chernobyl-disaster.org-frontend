<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-utils-header :title="model.name" :description="model.help">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.create') }}
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
          <admin-field-text v-model="data.title" :field="modelField.title" :errors="errors.title" />
          <div class="w-full flex flex-wrap justify-around">
            <admin-field-datetime v-model="data.date" :field="modelField.date" :errors="errors.date" />
            <admin-field-multiselect v-model="data.tags" :field="modelField.tags" :errors="errors.tags" />
          </div>
        </template>
        <template #lang="{currentObj, currentError}" >
          <admin-utils-error :errors="currentError.language" class="text-center" />
          <admin-field-text v-model="currentObj.title" :field="modelField.langs.title" :errors="currentError.title" />
          <admin-field-text-editor v-model="currentObj.description" :field="modelField.langs.description" :errors="currentError.description" />
        </template>
      </admin-model-form>
    </div>
  </div>
</template>

<script>
import eventMixins from "~/mixins/model/event"
import FormMixins from "~/mixins/admin/form"

export default {

  mixins: [eventMixins, FormMixins],

}
</script>
