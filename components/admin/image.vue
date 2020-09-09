<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <div class="flex flex-col flex-wrap">
        <span v-if="valueModel.full" class="p-2">
          {{ $t('utils.currently') }} :
          <a :href="valueModel.full" class="text-purple-700 text-md italic" rel="noopener noreferrer" target="_blank">
            <img :src="valueModel.thumbnail" loading="lazy" alt="">
          </a>
        </span>
        <input type="file"
               :name="name"
               accept="image/*"
               :required="valueModel.full ? false : field.required"
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

  props: {
    value: {
      type: Object,
      default: null
    }
  }

}
</script>
