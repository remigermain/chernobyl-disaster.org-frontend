<template>
  <models-detail model="picture">
    <template v-slot:label>
      {{ model }}
    </template>
    <tempalte v-slot:form>
      <extra-field>
        lalalalala
      </extra-field>
    </tempalte>
  </models-detail>
</template>

<script>
import modelsDetail from "@/mixins/models-detail"
export default {
  mixins: [modelsDetail],
  data () {
    return {
      model: "picture"
    }
  }
}
</script>

<style>

</style>
