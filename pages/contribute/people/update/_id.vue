<template>
  <lazy-model-form @submit="submit" @add-extra="addLang">
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:breadcrumbs>
      <lazy-bread-crumb>
        <lazy-extra-nuxt-link :to="pathList.path">
          {{ pathList.label }}
        </lazy-extra-nuxt-link>
        {{ pathUpdate.label }}
        {{ $route.params.id }}
      </lazy-bread-crumb>
    </template>
    <template v-slot:form>
      <lazy-admin-text :value="object.name" :field="fields.name" :errors="errors.name" />
      <lazy-admin-date :value="object.born" :field="fields.born" :errors="errors.born" />
      <lazy-admin-date :value="object.death" :field="fields.death" :errors="errors.death" />
      <lazy-admin-file :value="object.profil" :field="fields.profil" :errors="errors.profil" />
      <lazy-admin-url :value="object.wikipedia" :field="fields.wikipedia" :errors="errors.wikipedia" />
      <lazy-admin-multi-select :value="object.tags" :field="fields.tags" :errors="errors.tags" />
    </template>
    <template v-slot:table-header>
      <th> {{ fields.langs.biography.label }} </th>
      <th> {{ $t('admin.model.language') }} </th>
      <th> {{ $t('utils.actions') }} </th>
    </template>
    <template v-slot:table-body>
      <!-- actual langs -->
      <tr v-for="(lang, idx) in object.langs" :key="lang.id" class="text-center rounded-b-lg">
        <td class="text-center">
          <input class="hidden" :name="`${prefixLang(idx)}[id]`" :value="lang.id">
          <lazy-admin-textarea :value="lang.biography"
                               class="border-none"
                               :prefix="prefixLang(idx)"
                               :label="false"
                               :field="fields.langs.biography"
                               :action="false"
                               :inline="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'biography')" />
        </td>
        <td>
          <lazy-admin-select :value="lang.language"
                             class="border-none"
                             :prefix="prefixLang(idx)"
                             :label="false"
                             :field="fields.langs.language"
                             :action="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'language')" />
        </td>
        <td />
      </tr>
      <tr v-for="(val, idx) in langs" :key="val">
        <td>
          <lazy-admin-textarea class="border-none"
                               :prefix="prefixLang(idx + object.langs.length)"
                               :label="false"
                               :field="fields.langs.biography"
                               :action="false"
                               :inline="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'biography')" />
        </td>
        <td>
          <lazy-admin-select class="border-none"
                             :prefix="prefixLang(idx + object.langs.length)"
                             :label="false"
                             :field="fields.langs.language"
                             :action="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'language')" />
        </td>
        <td>
          <lazy-admin-action :add="false"
                             :edit="false"
                             :deleted="true"
                             :field="fields.langs.language"
                             @delete="deleteLang(idx)"
          />
        </td>
      </tr>
    </template>
  </lazy-model-form>
</template>

<script>
import Update from "@/mixins/admin/update"
import Document from "@/mixins/model/people"

export default {
  name: "ContrubteDocumentUpdate",

  mixins: [Update, Document],

  asyncData ({params, redirect, $axios, app}) {
    return $axios.get(`people/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
        }
        return { object: response.data }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-people"}))
      })
  },

  methods: {
    assignFormData (form) {
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
