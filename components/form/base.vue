<template>
  <div class="p-3 flex items-center flex-col -md:justify-center text-center">
    <label class="w-full text-gray-700 text-lg font-bold mb-2 capitalize dark:text-gray-400">
      <svg-icon name="help" class="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" @click="help = !help" />
      {{ field.label }}
    </label>
    <transition name="opacity">
      <admin-help v-if="help" :field="field" />
    </transition>
    <div class="w-full flex items-center p-2 text-left justify-center">
      <slot />
    </div>
    <admin-error :errors="errors" />
  </div>
</template>

<script>
export default {

  props: {
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
      help: this.$auth.user.show_help
    }
  }
}
</script>
