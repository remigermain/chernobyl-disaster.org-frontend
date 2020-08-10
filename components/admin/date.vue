<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <div class="flex flex-col">
        <vue-ctk-date-time-picker v-model="valueModel" :locale="$i18n.locale" format="YYYY-MM-DDThh:mm">
          <input type="text" class="bg-gray-200 rounded p-2 block border border-blue-700 focus:border-purple-700">
        </vue-ctk-date-time-picker>
        <input v-model="allValue" type="text" name="date" class="hidden">
        <label class="flex justify-between items-center mt-2">
          <span class="">
            {{ $t('global.secondes') }}
          </span>
          <input v-model="secondsValue" type="number" min="0" max="59" class="bg-gray-200 rounded p-2 border border-blue-700 focus:border-purple-700 w-20">
        </label>
      </div>
    </template>
  </component>
</template>

<script>
import FieldMixins from "@/mixins/field"
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
      const date = new Date(value)
      date.setSeconds(this.secondsValue)
      this.allValue = date.toISOString()
    },
    secondsValue (value) {
      const date = new Date(this.valueModel)
      date.setSeconds(value)
      this.allValue = date.toISOString()
    },
  }

}
</script>
