<template>
  <models-list model="picture"
               :object-list="objectList"
               :field-list="fieldList"
               :length="length"
               :object-list-lang="objectListLang"
               :field-list-lang="fieldListLang"
               :length-lang="lengthLang"
               @change="change"
               @changelang="changeLang"
  />
</template>

<script>

import ModelsList from "@/mixins/models-list"
export default {
  props: {
  },
  mixins:  [ModelsList],
  data () {
    return {
      fieldList: [
        {field: "id", label: "id", type: Number},
        {field: "title", label: "title", type: String},
        {field: "event", label: "event", type: Date},
      ],
      fieldListLang: [
        {field: "id", label: "id", type: Number},
        {field: "title", label: "title", type: String},
        {field: "not_available_languages", label: "language not available", type: String},
      ],
      url: "picture/",
      queryLang: "langs__isnull=true"
    }
  },
}
</script>
