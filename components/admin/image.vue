<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template #label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template #input>
      <div class="flex flex-col flex-wrap">
        <span v-if="valueModel.original_jpeg" class="p-2">
          {{ $t('utils.currently') }} :
          <a :href="valueModel.original_jpeg" class="text-purple-700 text-md italic" rel="noopener noreferrer" target="_blank">
            <img :src="$media(valueModel.thumbnail_jpeg)" loading="lazy" alt="">
          </a>
        </span>
        <input type="file"
               :name="name"
               accept="image/*"
               :required="valueModel.original_jpeg ? false : field.required"
               @change="$emit('change', $event.target.files[0])"
        >
      </div>
    </template>
  </component>
</template>

<script>
import FieldMixins from "~/mixins/admin/field"
export default {

  mixins: [FieldMixins],

  props: {
    value: {
      type: Object,
      default: null
    }
  }

}
</script>
