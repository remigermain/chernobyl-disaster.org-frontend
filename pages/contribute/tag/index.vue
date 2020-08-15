<template>
  <lazy-model-list :model="model.name">
    <template v-slot:breadcrumbs>
      <lazy-bread-crumb>
        {{ pathList.label }}
      </lazy-bread-crumb>
    </template>
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:table>
      <lazy-admin-table :fields="tableField"
                        :length="objectlength"
                        :model="model.name"
                        :object-list="objectList"
                        @pagination="pagnination"
                        @search="search"
      >
        <template v-slot:table-title>
          {{ $t('model.list') }}
        </template>
      </lazy-admin-table>
      <lazy-admin-table :fields="tableFieldLang"
                        :length="objectlengthLang"
                        :model="model.name"
                        :object-list="objectListLang"
                        class="mt-2"
                        @pagination="pagninationLang"
                        @search="searchLang"
      >
        <template v-slot:table-title>
          {{ $t('model.need-translate') }}
        </template>
      </lazy-admin-table>
    </template>
  </lazy-model-list>
</template>

<script>

import list from "@/mixins/admin/list"
import tags from "@/mixins/model/tag"

export default {
  name: "ContrubteTagsList",

  mixins:  [
    list,
    tags
  ],

  async asyncData ({redirect, $axios, app}) {
    // get objects
    try {
      const response = await $axios.get("tag/?page=1")
      const responseLang = await $axios.get("tag/?page=1&completed=false")
      if (response.status != 200 || responseLang.status != 200) {
        throw Error(app.i18n.t("global.error"))
      }
      return {
        objectList: response.data.results,
        objectlength: response.data.count, // return count for pagination
        objectListLang: responseLang.data.results,
        objectlengthLang: responseLang.data.count, // return count for pagination
      }
    }
    catch {
      return redirect(app.$i18n.localePath({name: "contribute-tag"}))
    }
  },

  data () {
    return {
      tableField: [
        {field: "id", label: this.$t("model.tag.id"), type: Number},
        {field: "name", label: this.$t("model.tag.name"), type: String},
      ],
      tableFieldLang: [
        {field: "id", label: this.$t("model.tag.id"), type: Number},
        {field: "name", label: this.$t("model.tag.name"), type: String},
        {field: "not_available_languages", label: this.$t("model.global.no-translate"), type: Array},
      ],
    }
  },

}
</script>
