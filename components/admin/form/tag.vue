<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-utils-header :title="model.name" :description="$t('description.tag')">
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
          <admin-field-text v-model="data.name" :field="modelField.name" :errors="errors.name" />
        </template>
        <template #lang="{currentObj, currentError}" >
          <admin-utils-error :errors="currentError.language" class="text-center" />
          <admin-field-text v-model="currentObj.name" :field="modelField.langs.name" :errors="currentError.name" />
        </template>
      </admin-model-form>
    </div>
  </div>
</template>

<script>
import tagMixins from "~/mixins/model/tag"
import FormMixins from "~/mixins/admin/form"

export default {

  mixins: [tagMixins, FormMixins],

}
</script>
