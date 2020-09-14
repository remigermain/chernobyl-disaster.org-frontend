<template>
  <lazy-model-form @submit="submit" @add-extra="addLang">
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:breadcrumbs>
      <lazy-contribute-breadcrumb>
        <lazy-extra-nuxt-link :to="pathList.path">
          {{ pathList.label }}
        </lazy-extra-nuxt-link>
        {{ pathCreate.label }}
      </lazy-contribute-breadcrumb>
    </template>
    <template v-slot:form>
      <lazy-admin-text :field="fields.name" :errors="errors.name" />
    </template>
    <template v-slot:form-lang>
      <model-card-lang v-for="(lang, idx) in langs" :key="lang" :lang="$t('tools.new')">
        <template v-slot:header>
          <lazy-admin-action :add="false"
                             :edit="false"
                             :deleted="true"
                             :field="fields.langs.language"
                             @delete="deleteLang(idx)"
          />
        </template>
        <lazy-admin-text class="border-none"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.name"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx, 'name')"
        />
        <lazy-admin-select class="border-none"
                           :prefix="prefixLang(idx)"
                           :field="fields.langs.language"
                           :action="false"
                           :errors="getErrorsIdx(errors.langs, idx, 'language')"
        />
      </model-card-lang>
    </template>
  </lazy-model-form>
</template>

<script>
import create from "@/mixins/admin/create"
import tag from "@/mixins/model/tag"

export default {
  name: "ContrubtePictureCreate",

  mixins: [
    create,
    tag
  ],


}
</script>
