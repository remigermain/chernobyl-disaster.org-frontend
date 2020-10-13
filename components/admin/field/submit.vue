<template>
  <div class="w-full text-right p-4 bg-gray-400 mt-2 dark:bg-gray-900  text-sm rounded-full">
    <button type="submit" class="py-2 px-3 bg-indigo-600 mhover:bg-indigo-700 rounded-full text-white dark:text-gray-300" @click.stop.prevent="$router.back()">
      {{ $t('word.cancel') }}
    </button>
    <button type="submit" class="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white dark:text-gray-300" data-go-to="new">
      {{ $t('text.save-add-other') }}
    </button>
    <button type="submit" class="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white dark:text-gray-300" data-go-to="continue">
      {{ $t('text.save-continue-editing') }}
    </button>
    <button type="submit" class="py-2 px-3 bg-indigo-700 hover:bg-indigo-600 rounded-full text-white dark:text-gray-300" data-go-to="detail">
      {{ $t('word.save') }}
    </button>
  </div>
</template>

<style scoped>
.action > * {
  margin: .5em .5em .5em 0;
}
</style>
