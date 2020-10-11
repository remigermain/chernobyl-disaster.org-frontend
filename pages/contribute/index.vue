<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <div class="flex flex-col">
        <lazy-contribute-breadcrumb />
        <slot name="breadcrumbs" />
        <h1 class="text-3xl capitalize self-start">
          {{ $t('menu.dashboard') }}
        </h1>
      </div>
      <div class="flex -md:flex-col -md:space-y-8 -md:items-center flex-wrap">
        <h2 class="title text-gray-800 dark:text-gray-200 p-1 text-center text-xl font-semibold w-2/4">
          {{ $t('utils.best-contributor') }}
        </h2>
        <h2 class="title text-gray-800 dark:text-gray-200 p-1 text-center text-xl font-semibold w-2/4 -md:order-1">
          {{ $t('utils.best-contributor-week') }}
        </h2>
        <contribute-ranking :object="object.total" />
        <contribute-ranking :object="object.week" class="-md:order-2" />
      </div>
      <div class="w-full">
        <lazy-admin-utils-table :length="object.results.length" @pagination="setPagination">
          <template #thead>
              <th>{{ $t("tools.creator") }}</th>
              <th>{{ $t("tools.date") }}</th>
              <th>{{ $t("admin.model.title") }}</th>
              <th>{{ $t("tools.uuid") }}</th>
              <th>{{ $t("tools.action") }}</th>
          </template>
          <template #tbody>
            <tr v-for="(obj, idx) in list" :key="idx">
              <td>{{ obj.creator }}</td>
              <td>{{ getDateMini(obj.date) }}</td>
              <td>{{ obj.display }}</td>
              <td>{{ $t(`admin.label.${obj.uuid}`) }}</td>
              <td class="inline-flex space-x-2">
                <lazy-admin-action-detail :to="pathDetail(obj)" />
                <lazy-admin-action-edit :to="pathEdit(obj)" />
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
import listMixins from "~/mixins/admin/list"
import { getDateMini } from "~/lib/date"

export default {
  name: "ContributeOverview",

  mixins: [listMixins],

  layout: "default",

  middleware: [
    "model",
    "auth",
  ],

  transition: "page",

  asyncData({app, store}) {
    return app.$axios.get("populate/overview")
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        response.data.results.forEach(o => {
          o.date = new Date(o.date)
        })
        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return {object: {'results': [], 'total': [], 'week': []}}
      })
  },

  computed: {
    list () {
      const start = (this.page * this.$pagination) - this.$pagination
      return this.object.results.slice(start, start + this.$pagination)
    },
  },

  methods: {
    getDateMini,
    submitDelete () {
      this.submitDelete(`${this.objDelete.uuid}/${this.objDelete.id}/`)
    },
    setPagination (val) {
      this.page = val
    },
    pathDetail (obj) {
      return {name: `contribute-${obj.uuid}-id`, params: {id: obj.id}}
    },
    pathEdit (obj) {
      return {name: `contribute-${obj.uuid}-edit-id`, params: {id: obj.id}}
    }
  }

}
</script>
