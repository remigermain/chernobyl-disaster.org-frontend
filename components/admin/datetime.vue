<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template v-slot:label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template v-slot:input>
      <div class="flex flex-wrap flex-col space-y-2">
        <vue-datetime v-model="pickerModel" class="datetime" :required="field.required" :phrases="{ok: 'OK', cancel: $t('utils.cancel')}">
          <svg-icon slot="before" name="calendar" class="opacity-50 text-2xl" />
          <svg-icon slot="after" name="x" class="h-full opacity-50 text-2xl cursor-pointer hover:scale-110 hover:text-indigo-700" @click="pickerModel = null" />
        </vue-datetime>
        <vue-timepicker v-model="data" format="HH:mm:ss" manual-input fixed-dropdown-button auto-scroll>
          <svg-icon slot="icon" name="clock" class="opacity-50 text-2xl"/>
        </vue-timepicker>
        <input v-model="dateModel" class="hidden" :name="field.name" />
        <input v-model="haveHours" class="hidden" name="have_hour" />
        <input v-model="haveMinute" class="hidden" name="have_minute" />
        <input v-model="haveSecond" class="hidden" name="have_second" />
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
      pickerModel: this.value && this.value.date || "",
      data: this.splitDate(this.value && this.value.date || "")
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
      if (!this.pickerModel) return ""
      const date = new Date(Date.parse(this.pickerModel))
      date.setHours((this.data.HH || 0) - (date.getTimezoneOffset() / 60))
      date.setMinutes(this.data.mm || 0)
      date.setSeconds(this.data.ss || 0)
      return date.toISOString()
    }
  },

  watch: {
    value (newValue) {
      this.pickerModel = newValue.date
      this.data = this.splitDate(newValue.date)
    }
  },

  methods: {
    needDigits (num) {
      num = num.toString()
      return (num.length === 1 ? `0${num}` : num)
    },
    splitDate (ori) {
      if (!ori) return {}
      const date = new Date(Date.parse(ori))
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
  padding: .3em .5em;
  height: 2.2em;
  display: block !important;
  border: 1px solid #d2d2d2;
}
</style>

<style>
.vue__time-picker .dropdown ul li:not([disabled]).active {
  background: #416ab8;
}
.vue__time-picker,
.vue__time-picker > input {
  width: 100% !important;
}
</style>
