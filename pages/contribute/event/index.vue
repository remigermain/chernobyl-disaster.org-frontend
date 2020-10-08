<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-header :title="model.label" :description="$t('help.event.global-description')" :to="{name: 'contribute-event-create'}">
        <template #breadcrumbs>
          {{ model.label }}
        </template>
      </admin-header>
      <div class="w-full space-y-4">
        <lazy-admin-table :length="objectlength" @pagination="setPagination">
          <template #header>
            <admin-table-header v-model="searchValue" :title="$t('tools.list')" @search="refresh"/>
          </template>
          <template #thead>
              <th> id </th>
              <th>{{ modelField.title.label }}</th>
              <th>{{ modelField.date .label }}</th>
              <th>{{ $t("tools.action") }}</th>
          </template>
          <template #tbody>
            <tr v-for="(obj, idx) in object" :key="idx">
              <td>{{ obj.id }}</td>
              <td>{{ obj.title }}</td>
              <td>{{ getFullDateTime(obj.date, $i18n.locale) }}</td>
              <td>
                <lazy-action-detail :id="obj.id" :model="model.name" />
                <lazy-action-edit :id="obj.id" :model="model.name" />
                <lazy-action-delete v-if="$auth.hasScope('staff')" @click="setDeleted(obj)" />
              </td>
            </tr>
          </template>
        </lazy-admin-table>
        <lazy-admin-table :length="objectlengthLang" @pagination="setLangPagination">
          <template #header>
            <admin-table-header v-model="searchValueLang" :title="$t('utils.need-translation')" @search="refreshLang"/>
          </template>
          <template #thead>
              <th> id </th>
              <th>{{ modelField.title.label }}</th>
              <th>{{ modelField.date .label }}</th>
              <th>{{ $t("utils.need-translation") }}</th>
              <th>{{ $t("tools.action") }}</th>
          </template>
          <template #tbody>
            <tr v-for="(obj, idx) in objectLang" :key="idx">
              <td>{{ obj.id }}</td>
              <td>{{ obj.title }}</td>
              <td>{{ getFullDateTime(obj.date, $i18n.locale) }}</td>
              <td>{{ obj.not_available_languages.join(", ") }}</td>
              <td>
                <lazy-action-detail :id="obj.id" :model="model.name" />
                <lazy-action-edit :id="obj.id" :model="model.name" />
                <lazy-action-delete v-if="$auth.hasScope('staff')" @click="setDeleted(obj)" />
              </td>
            </tr>
          </template>
        </lazy-admin-table>
        <admin-modal v-if="activeModal" @close="activeModal = false" @delete="deleteObject"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getFullDateTime } from "~/lib/date"
import { generateUrl } from "~/lib/contribute"

import listMixins from "~/mixins/admin/list"
import eventMixins from "~/mixins/model/event"

export default {

  mixins: [listMixins, eventMixins],

  async asyncData ({redirect, $axios, app, store}) {
    try {
      const response = await $axios.get(generateUrl("event", 1))
      const responseLang = await $axios.get(generateUrl("event", 1, null, false))
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

  methods: {
    getFullDateTime,
  }

}
</script>
