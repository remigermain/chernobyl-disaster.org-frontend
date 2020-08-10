<template>
  <component :is="component" :errors="errors" :label="label">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <div class="flex flex-col flex-wrap">
        <span v-if="valueModel" class="p-2">
          {{ $t('global.currently') }} :
          <a :href="valueModel" class="text-purple-700 text-md italic">
            link
          </a>
        </span>
        <input :id="`field-${field.label.toLowerCase()}`"
               type="file"
               :name="field.label.toLowerCase()"
               accept="image/*"
               :required="valueModel ? false : field.required"
               @change="$emit('change', $event.target.files[0])"
        >
      </div>
    </template>
  </component>
</template>

<script>
import FieldMixins from "@/mixins/field"
export default {

  mixins: [FieldMixins],

}
</script>
