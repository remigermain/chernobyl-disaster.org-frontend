<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <div class="flex flex-col">
        <vue-datetime v-model="valueModel" type="datetime" class="datetime" :required="field.required" :phrases="{ok: 'OK', cancel: $t('utils.cancel')}" />
        <input v-model="allValue"
               type="datetime-local"
               :name="name"
               class="hidden"
               :required="field.required"
               @change="$emit('change', valueModel)"
               @input="$emit('input', valueModel)"
        >
        <label class="flex justify-between items-center mt-2">
          <span class="">
            {{ $t('utils.secondes') }}
          </span>
          <input v-model="secondsValue" type="number" min="0" max="59" class="datetime w-20">
        </label>
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
      secondsValue: new Date(this.value).getSeconds(),
      allValue: this.value
    }
  },

  watch: {
    valueModel (value) {
      if (value) {
        const date = new Date(value)
        date.setSeconds(this.secondsValue)
        this.allValue = date.toISOString()
      } else {
        this.allValue = null
      }
    },
    secondsValue (value) {
      if (value) {
        const date = new Date(this.valueModel)
        date.setSeconds(value)
        this.allValue = date.toISOString()
      } else {
        this.allValue = null
      }
    },
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
