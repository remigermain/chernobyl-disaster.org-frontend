<template>
  <admin-field-base :field="field" :errors="errors">
    <div class="flex flex-wrap flex-col space-y-2">
      <vue-datetime
        v-model="valueModel.date"
        class="datetime"
        :required="field.required"
        :phrases="{ ok: 'OK', cancel: $t('word.cancel') }"
      >
        <svg-icon slot="before" name="calendar" class="opacity-50 text-2xl" />
        <svg-icon
          slot="after"
          name="x"
          class="h-full opacity-50 text-2xl cursor-pointer hover:scale-110 hover:text-indigo-700"
          @click="valueModel.date = null"
        />
      </vue-datetime>
      <div
        class=" flex justify-around shadow-lg text-gray-800 dark:bg-gray-600 dark:text-gray-200 p-2 rounded-sm items-center text-2xl"
        :class="{ disabled: disabled }"
      >
        <svg-icon slot="icon" name="clock" class="opacity-50" />
        <span class="time">
          <template v-if="haveHours">
            <span>
              {{ to2Digits(valueModel.hours) }}
              {{ $t('word.hours')[0] }}
            </span>
            <span v-if="haveMinutes">
              {{ to2Digits(valueModel.minutes) }}
              {{ $t('word.minutes')[0] }}
            </span>
            <span v-if="haveSecond">
              {{ to2Digits(valueModel.seconds) }}
              {{ $t('word.seconds')[0] }}
            </span>
          </template>
          <span
            v-else
            class="text-gray-600 dark:text-gray-200 italic opacity-50"
          >
            {{ $t('word.empty') }}
          </span>
        </span>
      </div>
      <label
        class="grid-time shadow-md text-gray-300 rounded-sm dark:bg-gray-600"
        :class="{ disabled: disabled }"
      >
        <div
          class="h-full h-full flex justify-center items-center  rounded-sm p-2"
          :class="{ 'bg-gray-900': !disabled }"
        >
          <svg-icon
            name="x"
            class="transform transition-transform duration-300
                    text-xl  inline-block w-40px h-32px w-32px"
            :class="{ 'cursor-pointer hover:scale-125': !disabled }"
            @click="deleteHour"
          />
        </div>
        <span
          class="italic text-lg flex justify-center items-center p-2 capitalize text-gray-800"
        >
          {{ $t('word.hours') }}:
        </span>
        <span class="flex justify-center items-center p-2">
          <input
            v-model="valueModel.hours"
            type="range"
            min="00"
            max="23"
            :disabled="disabled"
          />
        </span>
      </label>
      <label
        class="grid-time shadow-md text-gray-300 rounded-sm dark:bg-gray-600"
        :class="{ disabled: disabled }"
      >
        <div
          class="h-full h-full flex justify-center items-center rounded-sm p-2"
          :class="{ 'bg-gray-900': !disabled }"
        >
          <svg-icon
            name="x"
            class="transform transition-transform duration-300
                    text-xl  inline-block w-40px h-32px w-32px"
            :class="{ 'cursor-pointer hover:scale-125': !disabled }"
            @click="deleteMinute"
          />
        </div>
        <span
          class="italic text-lg flex justify-center items-center p-2 capitalize text-gray-800"
        >
          {{ $t('word.minutes') }}:
        </span>
        <span class="flex justify-center items-center p-2">
          <input
            v-model="valueModel.minutes"
            type="range"
            min="00"
            max="59"
            :disabled="disabled"
          />
        </span>
      </label>
      <label
        class="grid-time shadow-md text-gray-300 rounded-sm dark:bg-gray-600"
        :class="{ disabled: disabled }"
      >
        <div
          class="h-full h-full flex justify-center items-center rounded-sm p-2"
          :class="{ 'bg-gray-900': !disabled }"
        >
          <svg-icon
            name="x"
            class="transform transition-transform duration-300
                    text-xl  inline-block w-40px h-32px w-32px"
            :class="{ 'cursor-pointer hover:scale-125': !disabled }"
            @click="deleteSecond"
          />
        </div>
        <span
          class="italic text-lg flex justify-center items-center p-2 capitalize text-gray-800"
        >
          {{ $t('word.seconds') }}:
        </span>
        <span class="flex justify-center items-center p-2">
          <input
            v-model="valueModel.seconds"
            type="range"
            min="00"
            max="59"
            :disabled="disabled"
          />
        </span>
      </label>
    </div>
  </admin-field-base>
</template>

<script>
import { Datetime } from 'vue-datetime'
import FieldMixins from '~/mixins/field'

// CSS
import 'vue-datetime/dist/vue-datetime.min.css'

export default {
  components: {
    vueDatetime: Datetime
  },

  mixins: [FieldMixins],

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  computed: {
    haveHours() {
      return this.valueModel.hours !== undefined || this.haveMinutes
    },
    haveMinutes() {
      return this.valueModel.minutes !== undefined || this.haveSecond
    },
    haveSecond() {
      return this.valueModel.seconds !== undefined
    },
    disabled() {
      return !this.valueModel.date
    }
  },

  watch: {
    'valueModel.minutes'(newValue) {
      if (newValue !== undefined && this.valueModel.hours === undefined) {
        this.valueModel.hours = 0
      }
    },
    'valueModel.seconds'(newValue) {
      if (newValue !== undefined && this.valueModel.minutes === undefined) {
        this.valueModel.minutes = 0
      }
      if (newValue !== undefined && this.valueModel.hours === undefined) {
        this.valueModel.hours = 0
      }
    }
  },

  methods: {
    to2Digits(num) {
      num = num.toString()
      return (num.length === 2 && num) || `0${num}`
    },
    deleteHour() {
      this.valueModel.hours = undefined
      this.deleteMinute()
    },
    deleteMinute() {
      this.valueModel.minutes = undefined
      this.deleteSecond()
    },
    deleteSecond() {
      this.valueModel.seconds = undefined
    }
  }
}
</script>

<style lang="scss">
.datetime {
  padding: 0.3em 0.5em;
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

input[type='range'] {
  appearance: slider-horizontal;
}
</style>

<style scoped>
.grid-time {
  display: grid;
  grid-template-columns: 48px minmax(auto, 80px) 1fr;
  height: 48px;
}

.time > *:not(:last-child)::after {
  content: ':';
}

.disabled {
  @apply bg-gray-500;
  @apply opacity-50;
}
</style>
