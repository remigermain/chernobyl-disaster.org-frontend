<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.label" :description="$t('help.tag.global-description')" :to="{name: 'contribute-tag-create'}">
        <template #breadcrumbs>
          {{ model.label }}
        </template>
        <template #button>
          <action-create :to="pathCreate">
            {{ $t('word.create') }}
          </action-create>
        </template>
      </admin-header>
      <div class="w-full space-y-4">
        <lazy-admin-table :length="objectlength" @pagination="setPagination">
          <template #header>
            <admin-table-header v-model="searchValue" :title="$t('word.list')" @search="refresh"/>
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
                <lazy-action-detail :to="pathDetail(obj.id)" />
                <lazy-action-edit :to="pathEdit(obj.id)" />
                <lazy-action-delete v-if="$auth.hasScope('staff')" @click="setDeleted(obj)" />
              </td>
            </tr>
          </template>
        </lazy-admin-table>
        <lazy-admin-table :length="objectlengthLang" @pagination="setLangPagination">
          <template #header>
            <admin-table-header v-model="searchValueLang" :title="$t('help.need-translation')" @search="refreshLang"/>
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
                <lazy-action-detail :to="pathDetail(obj.id)" />
                <lazy-action-edit :to="pathEdit(obj.id)" />
                <lazy-action-delete v-if="$auth.hasScope('staff')" @click="setDeleted(obj)" />
              </td>
            </tr>
          </template>
        </lazy-admin-table>
        <admin-modal v-if="acticeModalDelete" @close="acticeModalDelete = false" @delete="deleteObject"/>
      </div>
    </div>
  </div>
</template>

<script>
import { generateUrl } from "~/lib/contribute"

import listMixins from "~/mixins/admin/list"
import tagMixins from "~/mixins/model/tag"

export default {

  mixins: [listMixins, tagMixins],

  async asyncData ({redirect, $axios, app, store}) {
    try {
      const response = await $axios.get(generateUrl("tag", 1))
      const responseLang = await $axios.get(generateUrl("tag", 1, null, false))
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
