<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <div class="flex flex-col">
        <vue-datetime v-model="valueModel" min-datetime="1900-W01-1" class="datetime" :required="field.required" :phrases="{ok: 'OK', cancel: $t('utils.cancel')}" />
        <input v-model="allValue" type="text" :name="name" class="hidden">
      </div>
    </template>
  </component>
</template>

<script>
import FieldMixins from "@/mixins/admin/field"

export default {

  mixins: [FieldMixins],

 data () {
    return {
      allValue: this.value,
    }
  },

  watch: {
    valueModel (value) {
      if (value) {
        const date = new Date(value)
        this.allValue = date.toISOString().slice(0,10)
      } else {
        this.allValue = null
      }
    }
  }
}
</script>

<style scoped>

.datetime {
  padding: 0.5rem !important;
  display: block !important;
  border-width: 1px !important;
  border-radius: 0.25rem !important;
  border-color: rgb(43, 108, 176) !important;
  background-color: rgb(237, 242, 247) !important;
}
</style>

