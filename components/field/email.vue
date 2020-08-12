<template>
  <field-text v-bind="$attrs" type="email">
    <template v-slot:icon>
      <icon-mail class="inline text-gray-600 cursor-pointer" />
    </template>
  </field-text>
</template>

<script>
import iconMail from "@/assets/svg/mail.svg"
export default {

  components: {
    iconMail,
  },

  inheritAttrs: false,

}
</script>
