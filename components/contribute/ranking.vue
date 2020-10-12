<template>
  <div class="flex justify-center trophy text-white w-2/4 mt-4 text-center">
    <div class="card-buble flex justify-center items-center">
      <img src="~/assets/img/medal/medal_2_mobile.png" alt="medal" class="object-contain grayscale"/>
    </div>
    <div class="card-buble flex justify-center items-center">
      <img src="~/assets/img/medal/medal_1_mobile.png" alt="medal" class="object-contain grayscale"/>
    </div>
    <div class="card-buble flex justify-center items-center">
      <img src="~/assets/img/medal/medal_3_mobile.png" alt="medal" class="object-contain grayscale"/>
    </div>
    <div
      class="flex flex-col bg-white text-gray-700 shadow-md italic font-medium rounded-lg justify-end items-center card-buble items"
    >
      <span class="text-2xl font-russia">2</span>
      <span v-if="second" class="data">
        {{ second.username }}
        <span class="text-indigo-700 dark:text-indigo-400">{{ second.count }}</span>
      </span>
      <span v-else class="italic text-opacity-50 text-gray-700 data">{{ this.$t("word.empty") }}</span>
    </div>
    <div
      class="flex flex-col bg-white text-gray-700 shadow-md italic font-medium rounded-lg justify-end items-center card-buble items"
    >
      <span class="text-3xl font-russia">1</span>
      <span v-if="first" class="data">
        {{ first.username }}
        <span class="text-indigo-700 dark:text-indigo-400">{{ first.count }}</span>
      </span>
      <span v-else class="italic text-opacity-50 text-gray-700 data">{{ this.$t("word.empty") }}</span>
    </div>
    <div
      class="flex flex-col bg-white text-gray-700 shadow-md italic font-medium rounded-lg justify-end items-center card-buble items"
    >
      <span class="text-1xl font-russia">3</span>
      <span v-if="third" class="data">
        {{ third.username }}
        <span class="text-indigo-700 dark:text-indigo-400">{{ third.count }}</span>
      </span>
      <span v-else class="italic text-opacity-50 text-gray-700 data">{{ this.$t("word.empty") }}</span>
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
      return this.object[0]
    },
    second() {
      return this.object[1]
    },
    third() {
      return this.object[2]
    },
    unk () {
      return this.$t("word.empty")
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
  border-radius: 10px;
  word-break: break-word;
  padding: 0.5em;
}

.dark {
  .card-buble.items {
    @apply text-gray-300 bg-gray-800;
    .data {
      @apply text-gray-300;
    }
  }
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

.grayscale {
  filter: grayscale(.4);
  z-index: -1;
}
</style>
