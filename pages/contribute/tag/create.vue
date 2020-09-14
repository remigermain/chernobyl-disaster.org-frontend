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
    <template v-slot:table-header>
      <th> {{ fields.langs.name.label }} </th>
      <th> {{ $t('utils.language') }} </th>
      <th> {{ $t('utils.actions') }} </th>
    </template>
    <template v-slot:form-lang>
      <tr v-for="(val, idx) in langs" :key="val">
        <td>
          <lazy-admin-text class="border-none"
                           :prefix="prefixLang(idx)"
                           :label="false"
                           :field="fields.langs.name"
                           :action="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'name')" />
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
import tag from "@/mixins/model/tag"

export default {
  name: "ContrubtePictureCreate",

  mixins: [
    create,
    tag
  ],


}
</script>
