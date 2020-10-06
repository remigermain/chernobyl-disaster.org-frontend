<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template #label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template #input>
      <div class="flex flex-col">
        <vue-datetime v-model="valueModel" min-datetime="1900-W01-1" class="datetime" :required="field.required" :phrases="{ok: 'OK', cancel: $t('utils.cancel')}">
          <svg-icon slot="before" name="calendar" class="opacity-50 text-2xl"/>
          <svg-icon slot="after" name="x" class="opacity-50 text-2xl" @click="valueModel = null" />
        </vue-datetime>
        <input v-model="allValue" type="text" :name="name" class="hidden">
      </div>
    </template>
  </component>
</template>

<script>
import FieldMixins from "~/mixins/admin/field"
import dateField from "~/mixins/admin/dateField"

export default {

  mixins: [FieldMixins, dateField],

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
  padding: .3em .5em;
  height: 2.2em;
  display: block !important;
  border: 1px solid #d2d2d2;
}
</style>

