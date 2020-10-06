<template>
  <div class="wrapper">
    <lazy-model-list :model="model.name" :create="false" :description="false">
      <template #breadcrumbs>
        <lazy-contribute-breadcrumb>{{ pathList.label }}</lazy-contribute-breadcrumb>
      </template>
      <template #label>
        {{ model.label }}
      </template>
      <template #table>
        <contribute-translate-admin v-if="$auth.hasScope('staff')" />
        <lazy-admin-table
          :fields="fields"
          :columns="columns"
          :length="length"
          :model="model.name"
          :object-list="list"
          :deleted="false"
          :detail="false"
          @pagination="setPagination"
          @search="search"
        >
          <template #table-title>
            {{ $t('tools.list') }}
          </template>
          <template #delete="{obj}">
            <button @click="setDeleted(obj.language)">
              <svg-icon name="trash" class="cursor-pointer text-red-700 action-btn" />
            </button>
          </template>
        </lazy-admin-table>
      </template>
    </lazy-model-list>
    <admin-modal
      v-if="deletedId"
      :object="deletedId"
      model="populate/translate/delete"
      @close="close"
    />
  </div>
</template>

<script>
import translate from "~/mixins/model/translate"
import base from "~/mixins/admin/base"

export default {
  name: "ContrubteTranslateList",

  mixins:  [
    base,
    translate,
  ],

  asyncData ({app}) {
    return app.$axios.get("populate/translate/overview")
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {})
  },

  data () {
    return {
      columns: ["language", "ratio"],
      deletedId: null,
      pagination: 1,
      searchVal: null
    }
  },

  computed: {
    list () {
      if (this.searchVal) {
        return this.object.filter(x => x.language.match(this.searchVal))
      }
      return this.object
    },
    listPage () {
      const start = (this.pagination * this.$pagination) - this.$pagination
      return this.list.slice(start, start + this.$pagination)
    },
    length () {
      return this.list.length
    }
  },

  methods: {
    setPagination (val) {
      this.pagination = val
    },
    search (val) {
      this.searchVal = val || null
      this.pagination = 1
    },
    close () {
      this.deletedId = null
      this.$nuxt.refresh()
    },
    setDeleted (id) {
      this.deletedId = id
    },
  }

}
</script>
