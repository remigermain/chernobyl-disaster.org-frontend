<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <div class="flex flex-wrap">
        <vue-datetime v-model="pickerModel" class="datetime" :required="field.required" :phrases="{ok: 'OK', cancel: $t('utils.cancel')}" />
        <vue-timepicker v-model="data" format="HH:mm:ss" manual-input fixed-dropdown-button auto-scroll />
        <input v-model="dateModel" class="hidden" :name="field.name" />
        <input v-model="haveHours" class="hidden" name="have_hour" />
        <input v-model="haveMinute" class="hidden" name="have_minute" />
        <input v-model="haveSecond" class="hidden" name="have_second" />
        {{ data }}
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
      pickerModel: this.value.date,
      data: this.splitDate()
    }
  },

  computed: {
    haveHours () {
      const val = parseInt(this.data.HH)
      return val >= 0 && val <= 24
    },
    haveMinute () {
      const val = parseInt(this.data.mm)
      return val >= 0 && val <= 59
    },
    haveSecond () {
      const val = parseInt(this.data.ss)
      return val >= 0 && val <= 59
    },
    dateModel () {
      const date = new Date(Date.parse(this.pickerModel))
      date.setHours((this.data.HH || 0) - (date.getTimezoneOffset() / 60))
      date.setMinutes(this.data.mm || 0)
      date.setSeconds(this.data.ss || 0)
      return date.toISOString()
    }
  },


  methods: {
    needDigits (num) {
      num = num.toString()
      return (num.length === 1 ? `0${num}` : num)
    },
    splitDate () {
      const date = new Date(Date.parse(this.value.date))
      const data = {}
      if (this.value.have_hour) {
        data.HH = this.needDigits(date.getHours() + (date.getTimezoneOffset() / 60))
      }
      if (this.value.have_minute) {
        data.mm = this.needDigits(date.getMinutes())
      }
      if (this.value.have_second) {
        data.ss = this.needDigits(date.getSeconds())
      }
      return data
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
