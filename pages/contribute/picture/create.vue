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
      <lazy-admin-text :field="fields.title" :errors="errors.title" />
      <lazy-admin-image :field="fields.picture" :errors="errors.picture" />
      <lazy-admin-select :field="fields.event" :errors="errors.event" />
      <div class="flex justify-around">
        <lazy-admin-datetime :field="fields.date" :errors="errors.date" />
        <lazy-admin-select :field="fields.photographer" :errors="errors.photographer" />
      </div>
      <lazy-admin-multi-select :field="fields.tags" :errors="errors.tags" />
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
                         :field="fields.langs.title"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx, 'title')"
        />
      </model-card-lang>
    </template>
  </lazy-model-form>
</template>

<script>
import picture from "~/mixins/model/picture"
import create from "~/mixins/admin/create"

export default {
  name: "ContrubtePictureCreate",

  mixins: [
    create,
    picture
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
