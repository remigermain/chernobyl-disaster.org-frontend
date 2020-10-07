<template>
  <lazy-field-text v-bind="$attrs" :type="passwordType" @input="$emit('input', $event)">
    <template #icon>
      <svg-icon name="lock" class="inline text-gray-600"
                :aria-label="$t('utils.lock-password')"
      />
    </template>
    <template #icon-right>
      <svg-icon :name="icon" class="inline cursor-pointer animate-pulse hover:scale-110 transform transition-transofrm duration-300"
                :aria-label="$t('utils.lock-password')"
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
