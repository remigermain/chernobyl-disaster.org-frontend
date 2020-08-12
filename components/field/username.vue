<template>
  <lazy-field-text v-bind="$attrs">
    <template v-slot:icon>
      <icon-user class="inline text-gray-600 cursor-pointer" />
    </template>
  </lazy-field-text>
</template>

<script>
import iconUser from "@/assets/svg/user.svg"
export default {

  components: {
    iconUser,
  },

}
</script>
