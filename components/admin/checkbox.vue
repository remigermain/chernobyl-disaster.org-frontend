<template>
  <component :is="component" :errors="errors" :label="label">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <input v-model="valueModel"
             :name="field.label.toLowerCase()"
             class="bg-gray-200 rounded p-2 block placeholder-opacity-50"
             type="checkbox"
             :required="field.required"
             @change="$emit('change', valueModel)"
             @input="$emit('input', valueModel)"
      >
    </template>
  </component>
</template>

<script>
import FieldMixins from "@/mixins/field"
export default {

  mixins: [FieldMixins]

}
</script>
