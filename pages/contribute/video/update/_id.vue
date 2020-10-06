<template>
  <lazy-model-form @submit="submit" @add-extra="addLang">
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:breadcrumbs>
      <lazy-contribute-breadcrumb>
        <nuxt-link  :to="localePath(pathList.path)">
          {{ pathList.label }}
        </nuxt-link>
        {{ pathUpdate.label }}
        {{ $route.params.id }}
      </lazy-contribute-breadcrumb>
    </template>
    <template v-slot:form>
      <lazy-admin-text :value="object.title" :field="fields.title" :errors="errors.title" />
      <lazy-admin-url :value="object.video" :field="fields.video" :errors="errors.video" />
      <lazy-admin-select :value="object.event" :field="fields.event" :errors="errors.event" />
      <lazy-admin-datetime :value="object.date" :field="fields.date" :errors="errors.date" />
      <lazy-admin-multi-select :value="object.tags" :field="fields.tags" :errors="errors.tags" />
    </template>
    <template v-slot:table-header>
      <th> {{ fields.langs.title.label }} </th>
      <th> {{ $t('utils.language') }} </th>
      <th> {{ $t('utils.actions') }} </th>
    </template>
    <template v-slot:form-lang>
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
                         :value="lang.title"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.title"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx, 'title')"
        />
      </model-card-lang>
      <model-card-lang v-for="(lang, idx) in langs" :key="lang" :title="$t('tools.new')">
        <template v-slot:header>
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
                         :field="fields.langs.title"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx + object.langs.length, 'title')"
        />
      </model-card-lang>
    </template>
  </lazy-model-form>
</template>

<script>
import Update from "~/mixins/admin/update"
import Video from "~/mixins/model/video"

export default {
  name: "ContrubteVideoUpdate",

  mixins: [Update, Video],

  asyncData ({params, redirect, $axios, app}) {
    return $axios.get(`video/${params.id}/`)
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        return { object: response.data }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-video"}))
      })
  },
}
</script>
