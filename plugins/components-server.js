//import Vue from "vue"
import Vue from "vue"
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css"

//Vue.use(Datetime)

import { Datetime } from "vue-datetime"

Vue.component("vue-datetime", Datetime)
