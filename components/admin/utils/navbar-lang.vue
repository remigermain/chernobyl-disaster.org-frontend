<template>
  <ol class="py-2 space-y-2 completed-list">
    <li
      class="bg-indigo-700 text-gray-300 rounded-sm p-2 cursor-pointer text-center hover:bg-indigo-600"
      @click="current = {}"
    >
      <svg-icon name="language" />
      <span class="label-maxi">
        {{ $t('word.language') }}
      </span>
    </li>
    <li
      v-for="lang in langChoices"
      :key="lang.value"
      class="list"
      :class="{ active: current.value === lang.value }"
      @click="current = lang"
    >
      <div
        v-if="langExist(lang.value)"
        class="flex justify-center items-center space-x-2 mr-2"
      >
        <svg-icon
          v-if="langIsNew(lang.value)"
          name="dots-circle-horizontal"
          class="text-lg font-medium text-green-600"
          role="img"
        />
        <svg-icon
          v-else
          name="circle-check"
          class="text-lg font-medium text-green-600"
          role="img"
        />
        <div v-if="haveError(lang.value)" class="inline-flex relative">
          <svg-icon
            name="alert-circle"
            class="text-red-800 dark:text-red-600 relative text-lg font-medium"
            role="img"
          />
          <svg-icon
            name="alert-circle"
            class="text-red-800 dark:text-red-600 absolute text-lg font-medium animate-ping"
            role="img"
          />
        </div>
      </div>
      <span class="label-mini">
        {{ lang.value }}
      </span>
      <span class="label-maxi">
        {{ lang.display_name }}
      </span>
      <div class="flex justify-center items-center self-end">
        <svg-icon
          name="arrow-left"
          class="transform transition-all duration-200 ml-2"
          role="img"
          :class="{ 'rotate-180': current.value == lang.value }"
        />
      </div>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    object: {
      type: Array,
      required: true
    },
    errors: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      current: {}
    }
  },

  computed: {
    langChoices() {
      return this.$store.getters['model/langs']
    }
  },

  watch: {
    current(lang) {
      this.$emit('input', lang)
    }
  },

  created() {
    /* select lang if add key in params */
    if (this.$route.query.add) {
      const lang = this.$store.getters['model/lang'](this.$route.query.add)
      if (lang) {
        this.current = lang
      }
    }
  },

  methods: {
    langExist(language) {
      /* find if language have object in list of langs */
      return this.object.find(x => x.language === language)
    },
    langIsNew(language) {
      /* find object lang is a new object */
      return this.langExist(language)._new
    },
    haveError(language) {
      /* find if language have error */
      const idx = this.object.indexOf(this.langExist(language))
      if (this.errors[idx]) {
        return Object.keys(this.errors[idx]).length
      }
      return false
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

.label-mini,
.label-maxi {
  transition: transform 0.3s, opacity 0.3s;
}
.list {
  overflow: hidden;
  position: relative;
}

@media screen and (max-width: 1000px) {
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
