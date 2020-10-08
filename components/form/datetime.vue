<template>
  <form-base :field="field" :errors="errors">
    <div class="flex flex-wrap flex-col space-y-2">
      <vue-datetime v-model="dataDate" class="datetime" :required="field.required" :phrases="{ok: 'OK', cancel: $t('utils.cancel')}">
        <svg-icon slot="before" name="calendar" class="opacity-50 text-2xl" />
        <svg-icon slot="after" name="x" class="h-full opacity-50 text-2xl cursor-pointer hover:scale-110 hover:text-indigo-700" @click="dataDate = null" />
      </vue-datetime>
      <vue-timepicker v-model="dataTime" format="HH:mm:ss" manual-input fixed-dropdown-button auto-scroll>
        <svg-icon slot="icon" name="clock" class="opacity-50 text-2xl"/>
      </vue-timepicker>
    </div>
  </form-base>
</template>

<script>
import { Datetime } from "vue-datetime"
import vueTimepicker from 'vue2-timepicker'
import FieldMixins from "~/mixins/field"

// CSS
import "vue-datetime/dist/vue-datetime.min.css"
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {

  components: {
    vueDatetime: Datetime,
    vueTimepicker
  },

  mixins: [FieldMixins],

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      dataDate: this.value.date || "",
      dataTime: this.assignTime(this.value),
    }
  },

  computed: {
    haveHours () {
      const val = parseInt(this.dataDate.HH)
      return val >= 0 && val <= 24
    },
    haveMinute () {
      const val = parseInt(this.dataDate.mm)
      return val >= 0 && val <= 59
    },
    haveSecond () {
      const val = parseInt(this.dataDate.ss)
      return val >= 0 && val <= 59
    },
    dateModel () {
      if (!this.dataDate) return ""

      const date = new Date(this.dataDate)
      date.setHours((this.dataTime.HH || 0) - (date.getTimezoneOffset() / 60))
      date.setMinutes(this.dataTime.mm || 0)
      date.setSeconds(this.dataTime.ss || 0)

      return {
        date: date.toISOString(),
        have_hour: this.haveHours,
        have_minute: this.haveMinute,
        have_second: this.haveSecond,
      }
    }

  },

  watch: {
    dateModel (newValue) {
      this.$emit('input', newValue)
    },
  },

  methods: {
    needDigits (num) {
      num = num.toString()
      return (num.length === 1 ? `0${num}` : num)
    },
    assignTime (original) {
      const time = {}

      if (!original.date) return time

      const date = new Date(original.date)
      if (this.value.have_hour) {
        time.HH = this.needDigits(date.getHours() + (date.getTimezoneOffset() / 60))
      }
      if (this.value.have_minute) {
        time.mm = this.needDigits(date.getMinutes())
      }
      if (this.value.have_second) {
        time.ss = this.needDigits(date.getSeconds())
      }
      return time
    },
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
