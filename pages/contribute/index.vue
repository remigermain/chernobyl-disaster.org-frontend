<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <div class="flex flex-col">
        <lazy-contribute-breadcrumb />
        <slot name="breadcrumbs" />
        <h1 class="text-3xl capitalize self-start">
          {{ $t('menu-name.dashboard') }}
        </h1>
      </div>
      <div class="flex -md:flex-col -md:space-y-8 -md:items-center flex-wrap">
        <h2 class="title text-gray-800 dark:text-gray-200 p-1 text-center text-xl font-semibold w-2/4 -md:w-full">
          {{ $t('text.best-contributor') }}
        </h2>
        <h2 class="title text-gray-800 dark:text-gray-200 p-1 text-center text-xl font-semibold w-2/4 -md:w-full -md:order-1">
          {{ $t('text.best-contributor-week') }}
        </h2>
        <contribute-ranking :object="object.total" />
        <contribute-ranking :object="object.week" class="-md:order-2" />
      </div>
      <contribute-news />
      <div class="w-full">
        <lazy-admin-utils-table :length="object.results.length" @pagination="setPagination">
          <template #thead>
              <th>{{ $t("word.creator") }}</th>
              <th>{{ $t("word.date") }}</th>
              <th>{{ $t("word.title") }}</th>
              <th>{{ $t("word.identifier") }}</th>
              <th>{{ $t("word.action") }}</th>
          </template>
          <template #tbody>
            <tr v-for="(obj, idx) in list" :key="idx">
              <td>{{ obj.creator }}</td>
              <td>{{ getDateMini(obj.date) }}</td>
              <td>{{ obj.display }}</td>
              <td>{{ $t(`name.${obj.uuid}`) }}</td>
              <td class="inline-flex space-x-2">
                <lazy-admin-action-detail v-if="obj.detail" :to="pathDetail(obj)" />
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

  head () {
    const title = this.$t("menu-name.dashboard")
    return {
      title,
      meta: [
          { property: "og:title", content: title},
          { name: "twitter:title", content: title },
          { name: "twitter:image:alt", content: title }
      ]
    }
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
      if (obj.query || obj.params) {
        return {name: `contribute-${obj.uuid}-edit-id`, params: obj.params, query: obj.query}
      }
      return {name: `contribute-${obj.uuid}-edit-id`, params: {id: obj.id}}
    }
  }

}
</script>
