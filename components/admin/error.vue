<template>
  <div class="wrapper">
    <p v-for="error in errors" :key="error" class="text-red-600 dark:text-red-500 font-medium text-md italic error">
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
