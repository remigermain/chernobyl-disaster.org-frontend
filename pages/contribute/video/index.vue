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
          {{ $t('admin.tools.list') }}
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
          {{ $t('utils.need-translate') }}
        </template>
      </lazy-admin-table>
    </template>
  </lazy-model-list>
</template>

<script>

import list from "@/mixins/admin/list"
import video from "@/mixins/model/video"

export default {
  name: "ContrubteVideoList",

  mixins:  [
    list,
    video
  ],

  async asyncData ({redirect, $axios, app}) {
    // get objects
    try {
      const response = await $axios.get("video/?page=1")
      const responseLang = await $axios.get("video/?page=1&completed=false")
      if (response.status != 200 || responseLang.status != 200) {
        throw Error(app.i18n.t("errors.status"))
      }
      return {
        objectList: response.data.results,
        objectlength: response.data.count, // return count for pagination
        objectListLang: responseLang.data.results,
        objectlengthLang: responseLang.data.count, // return count for pagination
      }
    }
    catch {
      return redirect(app.localePath({name: "contribute"}))
    }
  },

  data () {
    return {
      tableField: [
        {field: "id", label: this.$t("admin.model.id")},
        {field: "title", label: this.$t("admin.model.title")},
        {
          field: "event",
          label: this.$t("admin.model.event"),
          fnc: (el) => this.$store.getters["model/event"](el)?.display_name || el
        },
      ],
      tableFieldLang: [
        {field: "id", label: this.$t("admin.model.id")},
        {field: "title", label: this.$t("admin.model.title")},
        {field: "not_available_languages", label: this.$t("admin.model.need-translate")},
      ],
    }
  },

}
</script>
