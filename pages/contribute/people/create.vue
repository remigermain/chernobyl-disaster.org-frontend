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
        {{ pathCreate.label }}
      </lazy-bread-crumb>
    </template>
    <template v-slot:form>
      <lazy-admin-text :field="fields.name" :errors="errors.name" />
      <lazy-admin-date :field="fields.born" :errors="errors.born" />
      <lazy-admin-date :field="fields.death" :errors="errors.death" />
      <lazy-admin-file :field="fields.profil" :errors="errors.profil" />
      <lazy-admin-url :field="fields.wikipedia" :errors="errors.wikipedia" />
      <lazy-admin-multi-select :field="fields.tags" :errors="errors.tags" />
    </template>
    <template v-slot:table-header>
      <th> {{ fields.langs.biography.label }} </th>
      <th> {{ $t('admin.model.language') }} </th>
      <th> {{ $t('utils.actions') }} </th>
    </template>
    <template v-slot:table-body>
      <tr v-for="(val, idx) in langs" :key="val">
        <td>
          <lazy-admin-textarea class="border-none"
                               :prefix="prefixLang(idx)"
                               :label="false"
                               :field="fields.langs.biography"
                               :action="false"
                               :inline="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'biography')" />
        </td>
        <td>
          <lazy-admin-select class="border-none"
                             :prefix="prefixLang(idx)"
                             :label="false"
                             :field="fields.langs.language"
                             :action="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'language')" />
        </td>
        <td class="flex justify-center items-center">
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
import create from "@/mixins/admin/create"
import people from "@/mixins/model/people"

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
