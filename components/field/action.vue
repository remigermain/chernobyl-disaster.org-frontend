<template>
  <div class="wrapper action-list">
    <extra-nuxt-link v-if="add" :to="{name: `contribute-${field.model}-create`}">
      <icon-plus class=" text-green-700" />
    </extra-nuxt-link>
    <extra-nuxt-link v-if="edit" :to="{name: `contribute-${field.model}-update`}">
      <icon-edit class=" text-yellow-700" />
    </extra-nuxt-link>
  </div>
</template>

<script>
import iconPlus from "@/assets/svg/plus.svg"
import iconEdit from "@/assets/svg/edit.svg"
export default {

  components: {
    iconPlus,
    iconEdit,
  },

  props: {
    field: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      default: true
    },
    add: {
      type: Boolean,
      default: true
    }
  }

}
</script>

<style lang="scss" scoped>
.action-list >  {
  margin-left: 1em;
  transition: transform .8s;
  :hover {
    transform: scale(1.2);
  }
}
</style>
