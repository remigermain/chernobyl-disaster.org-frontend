<template>
  <div class="md:p-3 flex justify-between items-center flex-wrap border-b border-gray-700 border-opacity-50 -md:justify-center">
    <label v-if="label" class="text-xl capitalize italic w2/4 text-gray-800 -md:w-full">
      <icon-help class="cursor-pointer text-gray-500 hover:text-gray-700" @click="toogleHelp" />
      <slot name="label" />
    </label>
    <div class="w-2/4 flex items-center p-2 -md:w-full -md:justify-center">
      <slot name="icon">
        <template v-slot:icon />
      </slot>
      <slot name="input" />
    </div>
    <admin-help v-if="label && active" :field="field" />
    <div v-if="errors && errors.length" class="w-full mt-2">
      <admin-error :errors="errors" />
    </div>
  </div>
</template>

<script>
import iconHelp from "@/assets/svg/help.svg"

export default {

  components: {
    iconHelp
  },

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
    },
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
