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
        {{ pathCreate.label }}
      </lazy-contribute-breadcrumb>
    </template>
    <template v-slot:form>
      <lazy-admin-text :field="fields.title" :errors="errors.title" />
      <lazy-admin-url :field="fields.video" :errors="errors.video" />
      <lazy-admin-select :field="fields.event" :errors="errors.event" />
      <lazy-admin-datetime :field="fields.date" :errors="errors.date" />
      <lazy-admin-multi-select :field="fields.tags" :errors="errors.tags" />
    </template>
    <template v-slot:form-lang>
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
                           :errors="getErrorsIdx(errors.langs, idx, 'language')"
        />
        <lazy-admin-text class="border-none"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.title"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx, 'title')"
        />
      </model-card-lang>
    </template>
  </lazy-model-form>
</template>

<script>
import create from "~/mixins/admin/create"
import video from "~/mixins/model/video"

export default {
  name: "ContrubtePictureCreate",

  mixins: [
    create,
    video
  ],

  methods: {
    assignFormData (form) {
      // remove date key if is empty
      if (form.get("date") === "") {
        form.delete("date")
      }
    },
  }


}
</script>
