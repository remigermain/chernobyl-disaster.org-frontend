<template>
  <div class="wrapper action-list">
    <lazy-extra-nuxt-link v-if="add" :to="{name: `contribute-${field.model}-create`}">
      <icon-plus class=" text-green-700" />
    </lazy-extra-nuxt-link>
    <lazy-extra-nuxt-link v-if="edit" :to="{name: `contribute-${field.model}-update`}">
      <icon-edit class=" text-yellow-700" />
    </lazy-extra-nuxt-link>
    <icon-trash v-if="deleted" class="text-red-700 cursor-pointer" @click="$emit('delete')" />
  </div>
</template>

<script>
import iconPlus from "@/assets/svg/plus.svg"
import iconEdit from "@/assets/svg/edit.svg"
import iconTrash from "@/assets/svg/trash.svg"
export default {

  components: {
    iconPlus,
    iconEdit,
    iconTrash
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
    },
    deleted: {
      type: Boolean,
      default: false
    },
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
