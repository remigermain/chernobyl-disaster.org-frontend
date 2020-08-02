<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <div>
        <bread-crumb :paths="paths" />
      </div>
      <h1 class="text-3xl capitalize self-start">
        <slot name="label" />
        <span class="text-md italic text-gray-500">
          {{ $route.params.id }}
        </span>
      </h1>
    </div>
    <h2 class="capitalize text-xl italic">
      Detail object:
    </h2>
    <form class="flex flex-col justify-end" @submit.prevent="$emit('submit', $event)">
      <slot name="form" />
      <div class="w-full">
        <div class="bg-blue-700 text-white p-2 mt-4 capitalize">
          <slot name="label" /> languages
        </div>
        <slot name="form-lang" />
      </div>
      <div class="w-full text-right p-4 bg-gray-200 mt-2 text-white text-sm rounded-lg">
        <button type="submit" class="px-2 py-2 bg-blue-300 hover:bg-blue-400 rounded-md">
          {{ $t('global.save-add-other') }}
        </button>
        <button type="submit" class="px-2 py-2 bg-blue-300 hover:bg-blue-400 rounded-md">
          {{ $t('global.save-continue-editing') }}
        </button>
        <button type="submit" class="px-2 py-2 bg-blue-700 hover:bg-blue-800 rounded-md">
          {{ $t('global.save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    object: {
      type: Object,
      required: true
    },
    paths: {
      type: Array[Object],
      required: true
    }
  },
}
</script>
