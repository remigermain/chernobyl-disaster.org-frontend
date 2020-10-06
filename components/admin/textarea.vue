<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <textarea v-model="valueModel"
                v-autosize
                :name="name"
                class="bg-gray-200 rounded p-2 block border border-blue-700 focus:border-purple-700 w-inherit form-textarea"
                :placeholder="field.label"
                :maxlength="field.max_length"
                :required="field.required"
                @change="$emit('change', valueModel)"
                @input="$emit('input', valueModel)"
      />
    </template>
  </component>
</template>

<script>
import FieldMixins from "~/mixins/admin/field"
import autosize from "v-autosize"

export default {

  directives: {
    autosize
  },

  mixins: [FieldMixins],
}
</script>


<style lang="scss">
.admin-textarea {
  min-height: 200px;
}
</style>
