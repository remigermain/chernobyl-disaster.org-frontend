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
      <lazy-admin-text :field="fields.title" :errors="errors.title" />
      <lazy-admin-multi-select :field="fields.tags" :errors="errors.tags" />
      <lazy-admin-select :field="fields.event" :errors="errors.event" />
      <lazy-admin-file :field="fields.doc" :errors="errors.doc" />
      <admin-datetime :field="fields.date" :errors="errors.date" />
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
                           :field="fields.langs.title"
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
import document from "@/mixins/model/document"

export default {
  name: "ContrubtePictureCreate",

  mixins: [
    create,
    document
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
