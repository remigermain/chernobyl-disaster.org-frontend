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
      <field-table :fields="objectField"
                   :length="objectlength"
                   :model="model"
                   :object-list="objectList"
                   @pagination="pagnination"
                   @search="search"
      />
      <h2 class="text-xl mt-5">
        {{ $t('global.need-traduction') }}
      </h2>
      <field-table :fields="objectFieldLang"
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

import ModelsList from "@/mixins/model/list"
export default {

  mixins:  [ModelsList],

  async asyncData ({redirect, $axios, app}) {
    // get objects
    const response = await $axios.get("picture/?page=1")
    const responseLang = await $axios.get("picture/?page=1&completed=false")

    // check if all request is ok
    if (response.status != 200 || responseLang.status != 200) {
      this.$i18nToast().error(this.$t("global.error"))
      // redirect to parent objects
      return redirect(app.$i18n.localePath({name: "contribute-picture"}))
    }
    return {
      objectList: response.data.results,
      objectlength: response.data.count, // return count for pagination
      objectListLang: responseLang.data.results,
      objectlengthLang: responseLang.data.count, // return count for pagination

    }
  },

  data () {
    return {
      objectField: [
        {field: "id", label: "id", type: Number},
        {field: "title", label: "title", type: String},
        {field: "event", label: "event", type: Date},
      ],
      objectFieldLang: [
        {field: "id", label: "id", type: Number},
        {field: "title", label: "title", type: String},
        {field: "not_available_languages", label: "no translate", type: Array},
      ],
      model: "picture",
    }
  },

}
</script>
