<template>
  <div class="p-3 flex justify-between items-center flex-col border-b border-gray-700 border-opacity-50 -md:justify-center">
    <label v-if="label" class="w-full text-gray-700 text-sm font-bold mb-2 capitalize">
      <slot name="label" />
    </label>
    <div class="w-full flex items-center p-2">
      <slot name="icon">
        <template v-slot:icon />
      </slot>
      <slot name="input" />
    </div>
    <admin-help v-if="label && active" :field="field" />
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
