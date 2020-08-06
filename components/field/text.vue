<template>
  <field-base v-bind="$attrs">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <input v-model="valueModel"
             type="text"
             :name="name"
             class="bg-gray-200 rounded p-2 block border border-blue-700 focus:border-purple-700"
             :placeholder="field.label"
             :maxlength="field.max_length"
             :required="field.required"
             @change="$emit('change', valueModel)"
             @input="$emit('input', valueModel)"
      >
    </template>
  </field-base>
</template>

<script>
import FieldMixins from "@/mixins/field"
export default {

  mixins: [FieldMixins]

}
</script>
