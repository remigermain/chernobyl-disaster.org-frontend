<template>
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
      <contribute-ranking :object="object['total']" />
      <contribute-ranking :object="object['week']" class="-md:order-2" />
    </div>
    <div class="w-full">
      <lazy-admin-tabler :length="object.results.length" @pagination="setPagination">
        <template #head>
            <th>{{ $t("tools.creator") }}</th>
            <th>{{ $t("tools.date") }}</th>
            <th>{{ $t("admin.model.title") }}</th>
            <th>{{ $t("tools.uuid") }}</th>
            <th>{{ $t("tools.action") }}</th>
        </template>
        <template #body>
          <tr v-for="(obj, idx) in list" :key="idx">
            <td>{{ obj.creator }}</td>
            <td>{{ getDateMini(obj.date) }}</td>
            <td>{{ obj.display }}</td>
            <td>{{ $t(`admin.label.${obj.uuid}`) }}</td>
            <td>
              <lazy-action-detail :id="obj.id" :model="obj.uuid" />
              <lazy-action-edit :id="obj.id" :model="obj.uuid" />
              <lazy-action-delete @click="setDeleted(obj)" />
            </td>
          </tr>
        </template>
      </lazy-admin-tabler>
    </div>
  </div>
</template>

<script>
import detail from "~/mixins/admin/detail"
import { getDateMini } from "~/lib/date"

export default {

  mixins: [detail],

  props: {
    object: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      pagination: 1,
    }
  },

  computed: {
    list () {
      const start = (this.pagination * this.$pagination) - this.$pagination
      return this.object.results.slice(start, start + this.$pagination)
    },
  },

  methods: {
    getDateMini,
    setPagination (val) {
      this.pagination = val
    },
    setDeleted (val) {
      this.$store.commit("ACTIVE_BACKGROUND", val)
    }
  }

}
</script>

