<template>
  <div class="p-3 flex justify-between items-center flex-col -md:justify-center text-center">
    <label v-if="label" class="w-full text-gray-700 text-lg font-bold mb-2 capitalize">
      <svg-icon name="help" class="cursor-pointer text-gray-500 hover:text-gray-700" @click="toogleHelp" />
      <slot name="label" />
    </label>
    <admin-help v-if="label && active" :field="field" />
    <div class="w-full flex items-center p-2 text-left justify-center">
      <slot name="icon">
        <template v-slot:icon />
      </slot>
      <slot name="input" />
    </div>
    <admin-error :errors="errors" />
  </div>
</template>

<script>
export default {

  props: {
    label: {
      type: Boolean,
      default: true
    },
    field: {
      type: Object,
      required: true
    },
    errors: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      active: false
    }
  },

  methods: {
    toogleHelp () {
      this.active = !this.active
    }
  }

}
</script>
