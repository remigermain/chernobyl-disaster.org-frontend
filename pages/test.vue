<template>
  <div class="grid-test">
    <template v-for="i in 30">
      <div :key="i" class="bg-green-500" :class="`g1-${i}`">tt {{ i }} </div>
      <div :key="i" class="bg-yellow-500" :class="`g2-${i}`">tt {{ i }} </div>
      <div :key="i" class="bg-blue-500" :class="`g3-${i}`">tt {{ i }} </div>
      <div :key="i" class="bg-red-500" :class="`g4-${i}`">tt {{ i }} </div>
      <div :key="i" class="bg-purple-500" :class="`g5-${i}`">tt {{ i }} </div>
    </template>
  </div>
</template>

<script>
export default {
  layout: "test"
}
</script>

<style lang="scss">

.grid-test {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.g1-2 {
  background-color: red;
  grid-row: span  2;
}
</style>
