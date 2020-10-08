<template>
  <div class="w-full text-right p-4 bg-gray-400 mt-2 text-white dark:bg-gray-900 dark:text-gray-300 text-sm rounded-b-lg">
    <button type="submit" class="p-2 bg-indigo-600 mhover:bg-indigo-700 rounded-md" @click.stop.prevent="$router.back()">
      {{ $t('tools.cancel') }}
    </button>
    <button type="submit" class="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-md" data-type="new">
      {{ $t('tools.save-add-other') }}
    </button>
    <button type="submit" class="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-md" data-type="continue">
      {{ $t('tools.save-continue-editing') }}
    </button>
    <button type="submit" class="p-2 bg-indigo-700 hover:bg-indigo-600 rounded-md" data-type="detail">
      {{ $t('tools.save') }}
    </button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
