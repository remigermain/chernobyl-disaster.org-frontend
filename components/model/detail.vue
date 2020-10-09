<template>
  <div class="dark:bg-gray-800 rounded-md shadow-lg py-4">
    <slot name="head" />
    <div class="p-4 space-y-2">
      <div class="rounded-full text-center text-gray-800 bg-gray-400 text-2xl py-2 dark:bg-indigo-700 dark:text-gray-300">
        <svg-icon name="language" />
        {{ $t('word.translation')}}
      </div>
      <div class="grid-lang">
        <model-navbar-lang v-model="currentLang" :object="object.langs" />
        <div class="p-2">
          <div v-if="currentObj">
            <slot name="lang" :current-obj="currentObj" :language="currentLang" />
          </div>
          <div v-else-if="currentLang.value" class="flex justify-center items-center flex-col h-full space-y-4">
            <span class="text-xl capitalize">{{ currentLang.display_name }}</span>
            <p class="p-2 bg-gray-300 whitespace-pre-line rounded-md dark:bg-gray-700">{{ $t('help.language-dosent-exist') }}</p>
            <nuxt-link :to="localePath(toEdit)" type="button" class="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-md shadow-md text-gray-200">
              <svg-icon name="plus" />
              {{ $t('word.add') }}
            </nuxt-link>
          </div>
          <div v-else class="flex justify-center items-center flex-col h-full space-y-4">
            <p class="p-2 bg-gray-300 whitespace-pre-line rounded-md dark:bg-gray-700">{{ $t('help.language-no-selected') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    object: {
      type: Object,
      required: true,
    },
    toEdit: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      currentLang: {},
    }
  },

  computed: {
    currentObj () {
      return this.object.langs.find(x => x.language === this.currentLang.value)
    },
  }

}
</script>


<style lang="scss" scoped>
.grid-lang {
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>

