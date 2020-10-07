<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template #label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template #input>
      <select v-model="valueModel"
              :name="name"
              :required="field.required"
              class="form-select bg-gray-300"
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
      <admin-action v-if="action" :field="field" :object-id="valueModel" :edit="valueModel!==''" />
    </template>
  </component>
</template>

<script>
import FieldMixins from "~/mixins/field"
export default {

  mixins: [FieldMixins],

}
</script>

<style scoped>
.form-select {
  min-width: 180px;
  width: max-content;
  width: auto;
  width: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 6px;
  padding-right: 36px;
  margin-top: 0;
}
</style>
