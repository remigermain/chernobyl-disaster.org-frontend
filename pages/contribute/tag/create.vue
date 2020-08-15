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
    </template>
    <template v-slot:table-header>
      <th> {{ $t('model.picture.langs.title') }} </th>
      <th>
        {{ $t('global.language') }}
        <lazy-admin-error :errors="errors.langs" />
      </th>
      <th>
        {{ $t('model.actions') }}
      </th>
    </template>
    <template v-slot:table-body>
      <tr v-for="(val, idx) in langs" :key="val">
        <td>
          <lazy-admin-text class="border-none"
                           :prefix="prefixLang(idx)"
                           :label="false"
                           :field="fields.langs.name"
                           :action="false"
          />
        </td>
        <td>
          <lazy-admin-select class="border-none"
                             :prefix="prefixLang(idx)"
                             :label="false"
                             :field="fields.langs.language"
                             :action="false"
          />
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
