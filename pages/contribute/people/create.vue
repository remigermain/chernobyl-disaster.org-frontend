<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.people.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.create') }}
        </template>
      </admin-header>
      {{ errors }}
      <model-form v-model="data" :errors="errors" delete-model="people-lang" @add="addLang" @submit="submit">
        <template #head>
          <form-text v-model="data.name" :field="modelField.name" :errors="errors.name" />
          <form-text v-model="data.wikipedia" :field="modelField.wikipedia" :errors="errors.wikipedia" type="url" />
          <div class="w-full flex flex-wrap justify-around">
            <form-date v-model="data.born" :field="modelField.born" :errors="errors.born" />
            <form-date v-model="data.death" :field="modelField.death" :errors="errors.death" />
          </div>
          <form-image v-model="data.profil" :field="modelField.profil" :errors="errors.profil" />
          <form-multiselect v-model="data.tags" :field="modelField.tags" :errors="errors.tags" />
        </template>
        <template #lang="{currentObj, currentError}" >
          <admin-error :errors="currentError.language" class="text-center" />
          <form-text-editor v-model="currentObj.biography" :field="modelField.langs.biography" :errors="currentError.biography" />
        </template>
      </model-form>
    </div>
  </div>
</template>

<script>
import peopleMixins from "~/mixins/model/people"
import createMixins from "~/mixins/admin/create"

export default {

  mixins: [peopleMixins, createMixins],

  data () { return { data: this.baseData() } },

}
</script>
