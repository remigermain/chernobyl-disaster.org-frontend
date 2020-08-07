<template>
  <model-list :model="model">
    <template v-slot:breadcrumbs>
      <bread-crumb>
        {{ pathList.label }}
      </bread-crumb>
    </template>
    <template v-slot:label>
      {{ model }}
    </template>
    <template v-slot:table>
      <field-table :fields="tableField"
                   :length="objectlength"
                   :model="model"
                   :object-list="objectList"
                   @pagination="pagnination"
                   @search="search"
      />
      <h2 class="text-xl mt-5">
        {{ $t('global.need-traduction') }}
      </h2>
      <field-table :fields="tableFieldLang"
                   :length="objectlengthLang"
                   :model="model"
                   :object-list="objectListLang"
                   @pagination="pagninationLang"
                   @search="searchLang"
      />
    </template>
  </model-list>
</template>

<script>

import list from "@/mixins/model-view/list"
import picture from "@/mixins/model/picture"

export default {

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
