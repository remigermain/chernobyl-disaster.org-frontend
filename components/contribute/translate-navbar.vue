<template>
  <ol class="py-2 space-y-2 completed-list">
    <li class="bg-indigo-700 text-gray-300 rounded-sm p-2 text-center hover:bg-indigo-600">
      <svg-icon name="language" />
      <span class="label-maxi">
        {{ $t("word.category") }}
      </span>
    </li>
    <li v-for="obj in object" :key="obj.name" class="list" :class="{'active': current === obj}" @click="setCurrent(obj)">
      <div class="flex justify-center items-center space-x-2 mr-2">
        <svg-icon v-if="obj.isUnCompleted" name="alert-triangle" class="text-lg font-medium text-red-700" role="img"/>
        <svg-icon v-else name="circle-check" class="text-lg font-medium text-green-600" role="img"/>
      </div>
      <span class="label-maxi">
        {{ translateLabel(obj) }}
      </span>
      <div class="flex justify-center items-center self-end">
        <svg-icon name="arrow-left" class="transform transition-all duration-200 ml-2" role="img" :class="{'rotate-180': current === obj}" />
      </div>
    </li>
  </ol>
</template>

<script>
export default {

  loading: false,

  props: {
    object: {
      type: Array,
      required: true
    },
  },

  data () {
    return {
      current: {}
    }
  },

  watch: {
    current (menu) {
      if (this.$route.query.key !== menu.label) {
        this.$router.push({query: {...this.$route.query, key: menu.label}})
      }
    },
    object() {
      if (this.current) {
        this.findCurrent()
      }
    }
  },

  created () {
    this.findCurrent()
  },

  methods: {
    translateLabel (obj) {
      // to convert label in object list
      const path = `word.${obj.label}`
      if (this.$te(path)) {
        return this.$t(`${path}`)
      }
      return obj.label
    },
    findCurrent() {
      if (this.$route.query.key) {
        const current = this.object.find(x => x.label === this.$route.query.key)
        if (current) {
          this.setCurrent(current)
        }
      }
    },
    setCurrent (obj) {
      this.current = obj
      this.$emit('change', obj)
    }
  }

}
</script>

<style lang="scss" scoped>
.list {
  @apply p-2;
  @apply shadow-sm;
  @apply bg-gray-400;
  @apply font-medium;
  @apply rounded-sm;
  @apply flex;
  @apply justify-between;
  @apply cursor-pointer;
  @apply border-t-4;
  @apply border-gray-400;
  @apply transition-colors;
  @apply duration-300;
  &:hover {
    @apply text-indigo-700;
    @apply bg-gray-400;
  }
  &.active {
    @apply text-indigo-700;
    @apply border-indigo-700;
    @apply font-medium;
  }
}
.dark .list {
  @apply bg-gray-900;
  @apply border-gray-900;
  &.active {
    @apply text-gray-300;
    @apply bg-gray-700;
    @apply border-indigo-700;
  }
}

.label-mini {
  transform: translateX(-100%);
  opacity: 0;
}

.label-mini, .label-maxi {
  transition: transform .3s, opacity .3s;
}
.list {
  overflow: hidden;
  position: relative;
}

@media screen and (max-width:1000px){
  .label-mini {
    transform: translateX(0%);
    opacity: 1;
  }
  .label-maxi {
    transform: translateX(-100%);
    position: absolute;
    opacity: 0;
  }
  .completed-list:hover {
    .label-mini {
      transform: translateX(-100%);
      opacity: 0;
    }
    .label-maxi {
      transform: translateX(0%);
      position: initial;
      opacity: 1;
    }
  }

}
</style>
