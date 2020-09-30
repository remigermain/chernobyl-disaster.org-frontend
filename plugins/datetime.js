import Vue from "vue"
import { Datetime } from "vue-datetime"
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.min.css"

import VueTimepicker from 'vue2-timepicker/src'

// CSS
import 'vue2-timepicker/dist/VueTimepicker.css'

Vue.component("vue-datetime", Datetime)
Vue.component("vue-timepicker", VueTimepicker)
