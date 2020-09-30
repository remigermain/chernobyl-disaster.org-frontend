<template>
  <div class="flex justify-center trophy text-white w-2/4 mt-4 text-center">
    <div class="card-buble flex justify-center items-center">
      <span class="bg-indigo-700 buble second shadow-md">2</span>
    </div>
    <div class="card-buble flex justify-center items-center">
      <span class="bg-indigo-800 buble first shadow-md">1</span>
    </div>
    <div class="card-buble flex justify-center items-center">
      <span class="bg-indigo-700 buble tree shadow-md">3</span>
    </div>
    <div
      class="flex flex-col bg-white text-gray-700 shadow-md italic font-medium rounded-lg justify-center items-center card-buble"
    >
      <span v-if="second">
        {{ second.username }}
        <span class="text-indigo-700">{{ second.count }}</span>
      </span>
      <span v-else class="italic text-opacity-50 text-gray-700">{{ empty }}</span>
    </div>
    <div
      class="flex flex-col bg-white text-gray-700 shadow-md italic font-medium rounded-lg justify-center items-center card-buble"
    >
      <span v-if="first">
        {{ first.username }}
        <span class="text-indigo-700">{{ first.count }}</span>
      </span>
      <span v-else class="italic text-opacity-50 text-gray-700">{{ empty }}</span>
    </div>
    <div
      class="flex flex-col bg-white text-gray-700 shadow-md italic font-medium rounded-lg justify-center items-center card-buble"
    >
      <span v-if="third">
        {{ third.username }}
        <span class="text-indigo-700">{{ third.count }}</span>
      </span>
      <span v-else class="italic text-opacity-50 text-gray-700">{{ empty }}</span>
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
  },

  computed: {
    first() {
      return this.object.first
    },
    second() {
      return this.object.second
    },
    third() {
      return this.object.third
    },
    unk () {
      return this.$t("utils.empty")
    }
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
  // height: 40px;
  border-radius: 10px;
  word-break: break-word;
  padding: 0.5em;
}

.trophy {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 3em auto auto;
  gap: 0.1em;
}

.title {
  grid-area: 1 / 1 / 1 / 4;
}
</style>
