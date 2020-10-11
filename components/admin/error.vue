<template>
  <div class="wrapper">
    <p v-for="error in listErrors" :key="error" class="text-red-600 dark:text-red-500 font-medium text-md italic error">
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
  },

  computed: {
    listErrors () {
      const list = []
      Object.keys(this.errors).forEach(x => {
        if (this.errors[x] instanceof Object) {
          /* for sub keys element */
          Object.keys(this.errors[x]).forEach(j => { list.push(this.errors[x][j]) })
        } else {
          list.push(this.errors[x])
        }
      })
      return list
    }
  },

}
</script>

<style lang="scss" scoped>
.error:first-child {
  margin-top: .7em;
}
</style>
