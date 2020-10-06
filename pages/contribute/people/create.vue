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
      <div class="w-full flex justify-around">
        <lazy-admin-date :field="fields.born" :errors="errors.born" />
        <lazy-admin-date :field="fields.death" :errors="errors.death" />
      </div>
      <lazy-admin-image :field="fields.profil" :errors="errors.profil" />
      <lazy-admin-url :field="fields.wikipedia" :errors="errors.wikipedia" />
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
        <lazy-admin-text-editor class="border-none"
                        :prefix="prefixLang(idx)"
                        :field="fields.langs.biography"
                        :action="false"
                        :errors="getErrorsIdx(errors.langs, idx, 'biography')"
        />
      </model-card-lang>
    </template>
  </lazy-model-form>
</template>

<script>
import create from "~/mixins/admin/create"
import people from "~/mixins/model/people"

export default {
  name: "ContrubtePictureCreate",

  mixins: [
    create,
    people
  ],

  methods: {
    assignFormData (form) {
      // remove date key if is empty
      if (form.get("death") === "") {
        form.delete("death")
      }
      if (form.get("born") === "") {
        form.delete("born")
      }
      if (form.get("profil") === "") {
        form.delete("profil")
      }
    },
  }


}
</script>
