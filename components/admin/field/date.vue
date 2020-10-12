<template>
  <admin-field-base :field="field" :errors="errors">
    <div class="flex flex-wrap flex-col space-y-2">
      <vue-datetime v-model="valueModel" class="datetime" :required="field.required" :phrases="{ok: 'OK', cancel: $t('word.cancel')}">
        <svg-icon slot="before" name="calendar" class="opacity-50 text-2xl" />
        <svg-icon slot="after" name="x" class="h-full opacity-50 text-2xl cursor-pointer hover:scale-110 hover:text-indigo-700" @click="dataDate = null" />
      </vue-datetime>
    </div>
  </admin-field-base>
</template>

<script>
import { Datetime } from "vue-datetime"
import FieldMixins from "~/mixins/field"

// CSS
import "vue-datetime/dist/vue-datetime.min.css"

export default {

  components: {
    vueDatetime: Datetime,
    // vueTimepicker
  },

  mixins: [FieldMixins],

  watch: {
    valueModel (newValue) {
      // convert datetime to date
      const date = new Date(newValue)
      this.newValue = date.toISOString().slice(0,10)
      this.$emit('input', this.newValue)
    }
  }

}

</script>

<style lang="scss">
.datetime {
  padding: .3em .5em;
  height: 2.2em;
  display: block !important;
  border: 1px solid #d2d2d2;
}

.dark {
  .datetime {
    @apply bg-gray-600;
    @apply text-gray-900;
    .vdatetime-input {
      @apply bg-gray-600;
    }
  }
}

input[type="range"] {
  appearance: slider-horizontal;
}
</style>
