<template>
  <div class="wrapper action-list">
    <nuxt-link v-if="add"  :to="localePath({name: `contribute-${field.model || field.name}-create`})" target="_blank">
      <svg-icon name="plus" class=" text-green-700" />
    </nuxt-link>
    <nuxt-link v-if="edit"  :to="localePath({name: `contribute-${field.model || field.name}-update-id`, params: {id: objectId}})" target="_blank">
      <svg-icon name="edit" class=" text-yellow-700" />
    </nuxt-link>
    <svg-icon v-if="deleted" name="trash" class="text-red-700 cursor-pointer" @click="$emit('delete')" />
  </div>
</template>

<script>
export default {

  props: {
    field: {
      type: Object,
      required: true
    },
    objectId: {
      type: [Number, String],
      default: 0,
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
