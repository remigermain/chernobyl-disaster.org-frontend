<template>
  <button v-if="$auth.hasScope('staff')" @click="$emit('click')">
    <svg-icon name="trash" class="cursor-pointer text-red-700 action-btn" />
  </button>
</template>

<style lang="scss" scoped>
.action-btn {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  transition: transform .4s;
  &:hover {
    transform: scale(1.2);
  }
}
</style>
