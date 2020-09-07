<template>
  <div class="wrapper">
    <p v-for="error in errors" :key="error" class="text-red-800 text-xs italic error">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {

  props: {
    errors: {
      type: Array,
      default: () => []
    }
  }

}
</script>

<style lang="scss" scoped>
.error:first-child {
  margin-top: .7em;
}
</style>
