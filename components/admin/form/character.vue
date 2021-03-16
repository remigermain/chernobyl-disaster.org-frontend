<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-utils-header :title="model.name" :description="model.help">
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
            v-model="data.name"
            :field="modelField.name"
            :errors="errors.name"
          />
          <div class="flex flex-wrap">
            <div class="flex flex-col justify-start w-2/4 -mobile:w-full">
              <admin-field-date
                v-model="data.born"
                :field="modelField.born"
                :errors="errors.born"
              />
              <admin-field-date
                v-model="data.death"
                :field="modelField.death"
                :errors="errors.death"
              />
            </div>
            <div class="flex flex-col justify-around w-2/4 -mobile:w-full">
              <admin-field-image
                v-model="data.profil"
                :original="data.profil"
                :field="modelField.profil"
                :errors="errors.profil"
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
          <admin-field-text-editor
            v-model="currentObj.biography"
            :field="modelField.langs.biography"
            :errors="currentError.biography"
          />
        </template>
      </admin-model-form>
    </div>
  </div>
</template>

<script>
import characterMixins from '~/mixins/model/character'
import FormMixins from '~/mixins/admin/form'

export default {
  mixins: [characterMixins, FormMixins]
}
</script>
