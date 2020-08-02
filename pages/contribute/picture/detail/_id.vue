<template>
  <div>
    <models-detail model="picture" :object="object" :paths="paths">
      <template v-slot:label>
        {{ model }}
      </template>
      <template v-slot:form>
        <models-field v-for="field in fields" :key="field.label" :field="field" />
      </template>
    </models-detail>
  </div>
</template>

<script>
import modelsDetail from "@/mixins/models-detail"
export default {
  mixins: [modelsDetail],
  data () {
    return {
      model: "picture",
    }
  }
}
</script>

<style>

</style>
