<template>
  <lazy-model-form @submit="submit" @add-extra="addLang">
    <template #label>
      {{ model.label }}
    </template>
    <template #breadcrumbs>
      <lazy-contribute-breadcrumb>
        <nuxt-link  :to="localePath(pathList.path)">
          {{ pathList.label }}
        </nuxt-link>
        {{ pathCreate.label }}
      </lazy-contribute-breadcrumb>
    </template>
    <template #form>
      <lazy-admin-text :field="fields.name" :errors="errors.name" />
    </template>
    <template #form-lang>
      <model-card-lang v-for="(lang, idx) in langs" :key="lang" :title="$t('tools.new')">
        <template #header>
          <lazy-admin-action :add="false"
                             :edit="false"
                             :deleted="true"
                             :field="fields.langs.language"
                             @delete="deleteLang(idx)"
          />
        </template>
        <lazy-admin-select class="border-none"
                           :prefix="prefixLang(idx)"
                           :field="fields.langs.language"
                           :action="false"
                           :errors="getErrorsIdx(errors.langs, idx, 'language')"
        />
        <lazy-admin-text class="border-none"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.name"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx, 'name')"
        />
      </model-card-lang>
    </template>
  </lazy-model-form>
</template>

<script>
import create from "~/mixins/admin/create"
import tag from "~/mixins/model/tag"

export default {
  name: "ContrubtePictureCreate",

  mixins: [
    create,
    tag
  ],


}
</script>
