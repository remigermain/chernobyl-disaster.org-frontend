<template>
  <utils-modal @close="$emit('close')">
    <template #content>
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10
                  dark:bg-gray-900
      ">
        <svg-icon name="alert-triangle" class="h-6 w-6 text-red-600" />
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-500">
          {{ $t('tools.deleted') }}
        </h3>
      </div>
    </template>
    <template #action>
      <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button" class="inline-flex justify-center w-full rounded-md border
        border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500
        focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                @click.prevent="$emit('delete')"
        >
          {{ $t('utils.delete') }}
        </button>
      </span>
    </template>
  </utils-modal>
</template>
