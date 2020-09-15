<template>
  <div class="flex justify-center trophy text-white w-2/4 mt-4">
    <div class="card-buble flex justify-center items-center">
      <span class="bg-indigo-700 buble second shadow-md">2</span>
    </div>
    <div class="card-buble flex justify-center items-center">
      <span class="bg-indigo-800 buble first shadow-md">1</span>
    </div>
    <div class="card-buble flex justify-center items-center">
      <span class="bg-indigo-700 buble tree shadow-md">3</span>
    </div>
    <div class="bg-white text-gray-700 shadow-md italic font-medium rounded-lg flex justify-center items-center card-buble">
      <span v-if="object.length >= 2">
        {{ object[1].user }}
      </span>
      <span v-else class="text-xs text-gray-400">
        {{ empty }}
      </span>
    </div>
    <div class="bg-white text-gray-700 shadow-md italic font-medium rounded-lg flex justify-center items-center card-buble">
      {{ object[0].user }}
    </div>
    <div class="bg-white text-gray-700 shadow-md italic font-medium rounded-lg flex justify-center items-center card-buble">
      <span v-if="object.length >= 3">
        {{ object[2].user }}
      </span>
      <span v-else class="text-xs text-gray-400">
        {{ empty }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    object: {
      type: Array[Object],
      required: true
    },
  }
}
</script>

<style lang="scss" scoped>

.second {
  width: 70px;
  height: 70px;
}
.first {
  width: 80px;
  height: 80px;
}
.tree {
  width: 60px;
  height: 60px;
}

.buble {
  border-radius: 50%;
  display: inline-block;
  color: white;
  font-size: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-buble {
  width: max-content;
  width: 100px;
  height: 40px;
  border-radius: 10px;
}

.trophy {
 display: grid;
 grid-template-columns: auto auto auto;
 grid-template-rows: 3em auto auto;
 gap: .1em
}

.title {
  grid-area:  1 / 1 / 1 / 4;
}
</style>
