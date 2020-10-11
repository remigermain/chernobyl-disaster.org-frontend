<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-utils-header :title="model.label" :description="$t('help.people.global-description')" :to="{name: 'contribute-people-create'}">
        <template #breadcrumbs>
          {{ model.label }}
        </template>
        <template #button>
          <admin-action-create :to="pathCreate">
            {{ $t('word.create') }}
          </admin-action-create>
        </template>
      </admin-utils-header>
      <div class="w-full space-y-4">
        <lazy-admin-utils-table :length="objectlength" @pagination="setPagination">
          <template #header>
            <admin-utils-table-header v-model="searchValue" :title="$t('word.list')" @search="refresh"/>
          </template>
          <template #thead>
              <th> id </th>
              <th>{{ modelField.name.label }}</th>
              <th>{{ $t("tools.action") }}</th>
          </template>
          <template #tbody>
            <tr v-for="(obj, idx) in object" :key="idx">
              <td>{{ obj.id }}</td>
              <td>{{ obj.name }}</td>
              <td class="space-x-1">
                <lazy-admin-action-detail :to="pathDetail(obj.id)" />
                <lazy-admin-action-edit :to="pathEdit(obj.id)" />
                <lazy-admin-action-delete v-if="$auth.hasScope('staff')" @click="setDeleted(obj)" />
              </td>
            </tr>
          </template>
        </lazy-admin-utils-table>
        <lazy-admin-utils-table :length="objectlengthLang" @pagination="setLangPagination">
          <template #header>
            <admin-utils-table-header v-model="searchValueLang" :title="$t('help.need-translation')" @search="refreshLang"/>
          </template>
          <template #thead>
              <th> id </th>
              <th>{{ modelField.name.label }}</th>
              <th>{{ $t("utils.need-translation") }}</th>
              <th>{{ $t("tools.action") }}</th>
          </template>
          <template #tbody>
            <tr v-for="(obj, idx) in objectLang" :key="idx">
              <td>{{ obj.id }}</td>
              <td>{{ obj.name }}</td>
              <td>{{ obj.not_available_languages.join(", ") }}</td>
              <td class="inline-flex space-x-2">
                <lazy-admin-action-detail :to="pathDetail(obj.id)" />
                <lazy-admin-action-edit :to="pathEdit(obj.id)" />
                <lazy-admin-action-delete v-if="$auth.hasScope('staff')" @click="setDeleted(obj)" />
              </td>
            </tr>
          </template>
        </lazy-admin-utils-table>
        <admin-utils-modal v-if="acticeModalDelete" @close="acticeModalDelete = false" @delete="submitDelete"/>
      </div>
    </div>
  </div>
</template>

<script>
import { generateUrl } from "~/lib/contribute"

import listMixins from "~/mixins/admin/list"
import peopleMixins from "~/mixins/model/people"

export default {

  mixins: [listMixins, peopleMixins],

  async asyncData ({redirect, $axios, app, store}) {
    try {
      const response = await $axios.get(generateUrl("people", 1))
      const responseLang = await $axios.get(generateUrl("people", 1, null, false))
      if (response.status !== 200 || responseLang.status !== 200) {
        throw new Error("error-server")
      }

      return {
        object: response.data.results,
        objectlength: response.data.count, // return count for pagination
        objectLang: responseLang.data.results,
        objectlengthLang: responseLang.data.count, // return count for pagination
      }
    }
    catch (error) {
      store.commit("ERROR_SERVER", error.message || error)
      return {object: [], objectlength: 0, objectLang: [], objectlengthLang: 0}
    }
  },

}
</script>
