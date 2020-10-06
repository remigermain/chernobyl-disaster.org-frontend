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
        {{ pathUpdate.label }}
        {{ $route.params.id }}
      </lazy-contribute-breadcrumb>
    </template>
    <template #form>
      <lazy-admin-text :value="object.name" :field="fields.name" :errors="errors.name" />
    </template>
    <template #form-lang>
      <model-card-lang v-for="(lang, idx) in object.langs" :key="lang.id" :title="langConv(lang.language)">
        <input class="hidden" :name="`${prefixLang(idx)}[id]`" :value="lang.id">
        <lazy-admin-select class="border-none"
                           :value="lang.language"
                           :prefix="prefixLang(idx)"
                           :field="fields.langs.language"
                           :action="false"
                           :errors="getErrorsIdx(errors.langs, idx, 'language')"
        />
        <lazy-admin-text class="border-none"
                         :value="lang.name"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.name"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx, 'name')"
        />
      </model-card-lang>
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
                           :errors="getErrorsIdx(errors.langs, idx + object.langs.length, 'language')"
        />
        <lazy-admin-text class="border-none"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.name"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx + object.langs.length, 'name')"
        />
      </model-card-lang>
    </template>
  </lazy-model-form>
</template>

<script>
import Update from "~/mixins/admin/update"
import Tag from "~/mixins/model/tag"

export default {
  name: "ContrubteTagUpdate",

  mixins: [Update, Tag],

  asyncData ({params, redirect, $axios, app}) {
    return $axios.get(`tag/${params.id}/`)
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        return { object: response.data }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-tag"}))
      })
  },
}
</script>
