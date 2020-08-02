<template>
  <label class="label" v-bind="$attrs">
    <span class="block text-gray-700 text-sm font-bold mb-2 capitalize">
      <slot name="label" />
    </span>
    <div class="bg-gray-400 bg-opacity-50 px-2 py-3 focus:bg-gray-300 rounded-sm shadow appearance-none leading-none w-full">
      <slot name="icon" />
      <slot name="input">
        <input v-model="localValue" :autocomplete="autocomplete" :required="required" :type="inputType" class="bg-transparent italic text-gray-800 ml-1"
               :placeholder="placeholder" @input="$emit('input', localValue)">
      </slot>
    </div>
    <p v-for="error in errors" :key="error" class="text-red-800 italic">
      {{ error }}
    </p>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    inputType: {
      type: [String],
      default: "text",
      required: false
    },
    value: {
      type: [String, Number, Boolean],
      default: "",
      required: false
    },
    errors: {
      type: Array,
      default: () => [],
      required: false
    },
    required: {
      type: Boolean,
      default: false,
      required: false
    },
    autocomplete: {
      type: Boolean,
      default: true,
      required: false
    },
    placeholder: {
      type: String,
      default: "",
      required: false
    },
  },

  data () {
    return {
      localValue: this.value
    }
  },

}
</script>

<style>

</style>
