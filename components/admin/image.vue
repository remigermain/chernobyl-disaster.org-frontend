<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <div class="flex flex-col flex-wrap">
        <span v-if="valueModel" class="p-2">
          {{ $t('global.currently') }} :
          <a :href="valueModel" class="text-purple-700 text-md italic" rel="noopener noreferrer" target="_blank">
            link
          </a>
        </span>
        <input type="file"
               :name="name"
               accept="image/*"
               :required="valueModel ? false : field.required"
               @change="$emit('change', $event.target.files[0])"
        >
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
