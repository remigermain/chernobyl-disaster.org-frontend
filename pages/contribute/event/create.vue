<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.event.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.create') }}
        </template>
      </admin-header>
      <model-form v-model="data" :errors="errors" delete-model="event-lang" @add="addLang" @submit="submit">
        <template #head>
          <form-text v-model="data.title" :field="modelField.title" :errors="errors.title" />
          <div class="w-full flex flex-wrap justify-around">
            <form-datetime v-model="data.date" :field="modelField.date" :errors="errors.date" />
            <form-multiselect v-model="data.tags" :field="modelField.tags" :errors="errors.tags" />
          </div>
        </template>
        <template #lang="{currentObj, currentError}" >
          <admin-error :errors="currentError.language" class="text-center" />
          <form-text v-model="currentObj.title" :field="modelField.langs.title" :errors="currentError.title" />
          <form-text-editor v-model="currentObj.description" :field="modelField.langs.description" :errors="currentError.description" />
        </template>
      </model-form>
    </div>
  </div>
</template>

<script>
import eventMixins from "~/mixins/model/event"
import createMixins from "~/mixins/admin/create"

export default {

  mixins: [eventMixins, createMixins],

  data () { return { data: this.baseData() } },

}
</script>
