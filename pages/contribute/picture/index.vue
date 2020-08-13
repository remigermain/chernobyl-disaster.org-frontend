<template>
  <lazy-model-list :model="model">
    <template v-slot:breadcrumbs>
      <lazy-bread-crumb>
        {{ pathList.label }}
      </lazy-bread-crumb>
    </template>
    <template v-slot:label>
      {{ model }}
    </template>
    <template v-slot:table>
      <lazy-admin-table :fields="tableField"
                        :length="objectlength"
                        :model="model"
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
                        :model="model"
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
import picture from "@/mixins/model/picture"

export default {
  name: "ContrubtePictureList",

  mixins:  [
    list,
    picture
  ],

  async asyncData ({redirect, $axios, app}) {
    // get objects
    try {
      const response = await $axios.get("picture/?page=1")
      const responseLang = await $axios.get("picture/?page=1&completed=false")
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
      return redirect(app.$i18n.localePath({name: "contribute-picture"}))
    }
  },

  data () {
    return {
      tableField: [
        {field: "id", label: "id", type: Number},
        {field: "title", label: "title", type: String},
        {field: "event", label: "event", type: Date},
      ],
      tableFieldLang: [
        {field: "id", label: "id", type: Number},
        {field: "title", label: "title", type: String},
        {field: "not_available_languages", label: "no translate", type: Array},
      ],
    }
  },

}
</script>
