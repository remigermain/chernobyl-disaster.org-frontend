<template>
  <div v-if="errors.length" class="w-full">
    <p v-for="error in errors" :key="error" class="text-red-900 text-md italic">
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
