<template>
  <component :is="component" :errors="errors" :label="label">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <select v-model="valueModel"
              :name="field.label.toLowerCase()"
              multiple="true"
              class="field-select-multiple"
              :required="field.required"
              @input="$emit('input', valueModel)"
              @change="$emit('input', valueModel)"
      >
        <option v-for="choice in field.choices"
                :key="choice.display_name"
                :value="choice.value"
        >
          {{ choice.display_name }}
        </option>
      </select>
      <admin-action v-if="action" :field="field" />
    </template>
  </component>
</template>

<script>
import FieldMixins from "@/mixins/field"
export default {

  mixins: [FieldMixins],

  data () {
    return {
      valueModel: this.value || []
    }
  }

}
</script>

<style scoped>
.field-select-multiple {
  height: auto;
  min-height: 200px;
  min-width: 180px;
  width: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 6px;
  margin-top: 0;
}
</style>
