<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template #label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template #input>
      <span v-if="valueModel" class="p-2">
        {{ $t('utils.currently') }} :
        <a :href="valueModel" class="text-purple-700 text-md italic" rel="noopener">
          {{ $t('utils.actual-link') }}
        </a>
      </span>
      <input type="file"
             :name="name"
             :required="field.required"
             @change="$emit('change', $event.target.files[0])"
      >
    </template>
  </component>
</template>

<script>
import FieldMixins from "~/mixins/admin/field"
export default {

  mixins: [FieldMixins]

}
</script>
