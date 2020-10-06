<template>
  <lazy-field-text v-bind="$attrs" :type="passwordType">
    <template v-slot:icon>
      <svg-icon name="lock" class="inline text-gray-800 cursor-pointer"
                :aria-label="$t('utils.lock-password')"
                role="button"
      />
    </template>
    <template v-slot:icon-right>
      <svg-icon :name="icon" class="inline text-gray-800 cursor-pointer animate-pulse"
                :aria-label="$t('utils.lock-password')"
                tabindex="0"
                role="button"
                @click="showPassword = !showPassword"
      />
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
    icon () {
      return (this.showPassword ? "eye" : "eye-off")
    },
    passwordType () {
      return (this.showPassword ? "text" : "password")
    }
  }

}
</script>
