<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.name" :description="$t('help.tag.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.create') }}
        </template>
      </admin-header>
      <model-form v-model="data" :errors="errors" :delete-model="linkDeleteLang" @add="addLang" @submit="submit">
        <template #head>
          <form-text v-model="data.name" :field="modelField.name" :errors="errors.name" />
        </template>
        <template #lang="{currentObj, currentError}" >
          <admin-error :errors="currentError.language" class="text-center" />
          <form-text v-model="currentObj.name" :field="modelField.langs.name" :errors="currentError.name" />
        </template>
      </model-form>
    </div>
  </div>
</template>

<script>
import tagMixins from "~/mixins/model/tag"
import createMixins from "~/mixins/admin/create"

export default {

  mixins: [tagMixins, createMixins],

  data () { return { data: this.baseData() } },

}
</script>
