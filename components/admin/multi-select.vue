<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <select v-model="valueModel"
              :name="name"
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
      <admin-action v-if="action" :field="field" :edit="false" />
    </template>
  </component>
</template>

<script>
import FieldMixins from "@/mixins/admin/field"
import isArray from "lodash/isArray"
export default {

  mixins: [FieldMixins],

  data () {
    return {
      valueModel: this.value || []
    }
  },

  watch: {
    value (value) {
      this.valueModel = (isArray(value) ? value : [])
      return value
    }
  },

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
