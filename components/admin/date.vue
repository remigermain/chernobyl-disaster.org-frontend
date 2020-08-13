<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <div class="flex flex-col">
        <vue-datetime v-model="valueModel" />
        <input v-model="valueModel" type="text" :name="name" class="hidden">
      </div>
    </template>
  </component>
</template>

<script>
import FieldMixins from "@/mixins/admin/field"

export default {

  mixins: [FieldMixins],

}
</script>
