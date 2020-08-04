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

    // check if all request is ok
    if (response.status != 200) {
      this.$toat.error(this.$t("global.error"))
      // redirect to parent objects
      return redirect(app.$i18n.localePath({name: "contribute-picture"}))
    }
    return {
      objectList: response.data.results,
      objectlength: response.data.count, // return count for pagination
    }
  },

  data () {
    return {
      objectField: [
        {field: "id", label: "id", type: Number},
        {field: "title", label: "title", type: String},
        {field: "event", label: "event", type: Date},
      ],
      model: "picture",
    }
  }

}
</script>
