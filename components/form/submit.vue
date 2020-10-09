<template>
  <div class="w-full text-right p-4 bg-gray-400 mt-2 dark:bg-gray-900  text-sm rounded-b-lg action">
    <button type="submit" class="py-2 px-3 bg-indigo-600 mhover:bg-indigo-700 rounded-full text-white dark:text-gray-300" @click.stop.prevent="$router.back()">
      {{ $t('tools.cancel') }}
    </button>
    <button type="submit" class="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white dark:text-gray-300" data-type="new">
      {{ $t('tools.save-add-other') }}
    </button>
    <button type="submit" class="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white dark:text-gray-300" data-type="continue">
      {{ $t('tools.save-continue-editing') }}
    </button>
    <button type="submit" class="py-2 px-3 bg-indigo-700 hover:bg-indigo-600 rounded-full text-white dark:text-gray-300" data-type="detail">
      {{ $t('tools.save') }}
    </button>
  </div>
</template>

<style scoped>
.action > * {
  margin-right: .5em;
}
</style>
