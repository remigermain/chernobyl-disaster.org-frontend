<template>
  <div class="wrapper">
    <div class="flex flex-col gap-y-2">
      <slot name="breadcrumbs" />
      <h1 class="text-3xl capitalize self-start">
        <slot name="label" />
      </h1>
      <nuxt-link v-if="create"  :to="localePath({name: `contribute-${model}-create`})"
                            class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600"
      >
        {{ $t('utils.create') }}
        <svg-icon name="plus" class=" w-24px text-white" />
      </nuxt-link>
      <p v-if="description"
         class="w-full bg-gray-400 bg-opacity-25 italic text-lg p-4 rounded-md text-gray-800 text-opacity-75 whitespace-pre-line description">{{ $t(`help.${model}.global-description`) }}</p>
    </div>
    <slot name="table" />
    <slot name="table-lang" />
  </div>
</template>

<script>
export default {

  props: {
    lang: {
      type: Boolean,
      default: true
    },
    model: {
      type: String,
      required: true
    },
    create: {
      type: Boolean,
      default: true
    },
    description: {
      type: Boolean,
      default: true
    }
  }

}
</script>

<style lang="scss" scoped>
.dark {
  .description {
    @apply text-gray-300
  }
}
</style>
