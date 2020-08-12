<template>
  <lazy-field-text v-bind="$attrs" :type="passwordType">
    <template v-slot:icon>
      <icon-lock-open v-if="showPassword" class="inline text-gray-900 cursor-pointer" @click="showPassword = false" />
      <icon-lock v-else class="inline text-gray-600 cursor-pointer" @click="showPassword = true" />
    </template>
  </lazy-field-text>
</template>

<script>
import iconLock from "@/assets/svg/lock.svg"
import iconLockOpen from "@/assets/svg/lock-open.svg"
export default {


  components: {
    iconLock,
    iconLockOpen,
  },

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
