<template>
  <lazy-field-text v-bind="$attrs" :type="passwordType">
    <template v-slot:icon>
      <svg-icon v-if="showPassword" name="lock-open" class="inline text-gray-900 cursor-pointer animate-pulse" @click="showPassword = false" />
      <svg-icon v-else name="lock" class="inline text-gray-600 cursor-pointer animate-pulse" @click="showPassword = true" />
    </template>
  </lazy-field-text>
</template>

<script>
export default {

  inheritAttrs: false,

  data () {
    return {
      showPassword: false
    }
  },

  computed: {
    passwordType () {
      return (this.showPassword ? "text" : "password")
    }
  }

}
</script>
