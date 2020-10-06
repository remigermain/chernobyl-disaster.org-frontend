<template>
  <lazy-model-list :model="model.name">
    <template v-slot:breadcrumbs>
      <lazy-contribute-breadcrumb>
        {{ pathList.label }}
      </lazy-contribute-breadcrumb>
    </template>
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:table>
      <lazy-admin-table :fields="fields"
                        :columns="columns"
                        :length="objectlength"
                        :model="model.name"
                        :object-list="objectList"
                        @pagination="pagnination"
                        @search="search"
      >
        <template v-slot:table-title>
          {{ $t('tools.list') }}
        </template>
      </lazy-admin-table>
      <lazy-admin-table :fields="fields"
                        :columns="columnsLang"
                        :length="objectlengthLang"
                        :model="model.name"
                        :object-list="objectListLang"
                        class="mt-2"
                        @pagination="pagninationLang"
                        @search="searchLang"
      >
        <template v-slot:table-title>
          {{ $t('utils.need-translation') }}
        </template>
      </lazy-admin-table>
    </template>
  </lazy-model-list>
</template>

<script>

import list from "~/mixins/admin/list"
import video from "~/mixins/model/video"

export default {
  name: "ContrubteVideoList",

  mixins:  [
    list,
    video
  ],

  async asyncData ({redirect, $axios, app}) {
    // get objects
    try {
      const response = await $axios.get("video/?page=1&contribute=true")
      const responseLang = await $axios.get("video/?page=1&completed=false&contribute=true")
      if (response.status!==200 || responseLang.status!==200) {
        throw new Error("error-server")
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
      columns: ["id", "title", "event"],
      columnsLang: ["id", "title",
        {
          field: "not_available_languages",
          label: this.$t("utils.need-translation"),
          display: (obj) => obj.not_available_languages.join(", ")
        }
      ],
    }
  },

}
</script>
